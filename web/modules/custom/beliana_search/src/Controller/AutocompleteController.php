<?php

namespace Drupal\beliana_search\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\Element\EntityAutocomplete;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Utility\Tags;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines a route controller for entity autocomplete form elements.
 */
class AutocompleteController extends ControllerBase {

  protected $nodeStorage;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->nodeStorage = $entity_type_manager->getStorage('node');
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * Handler for autocomplete request.
   */
  public function handleAutocomplete(Request $request) {
    $results = [];

    if ($input = $request->query->get('q')) {
      $typed_string = Tags::explode($input);
      $typed_string = mb_strtolower(array_pop($typed_string));

      $this->getResultsNode($results, $typed_string);
    }

    return new JsonResponse($results);
  }

  private function getResultsNode(&$results, $input) {
    $query = \Drupal::database()->select('node_field_data', 'n');
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    
    #Suggestions starting with $input
    $nsuggestions = 12;
    $query = $this->nodeStorage->getQuery()
      ->condition('type', 'word')
      ->condition('title', $query->escapeLike($input), 'STARTS_WITH')
      ->condition('status', TRUE)
      ->condition('langcode', $language)
      ->accessCheck(TRUE)
      ->groupBy('nid')
      ->sort('title', 'ASC')
      ->range(0, $nsuggestions);

    $ids = $query->execute();
    $nodes = $ids ? $this->nodeStorage->loadMultiple($ids) : [];

    #if we do not have enough suggestions, try to add more
    if (count($nodes) < 10) {
        $query2 = $this->nodeStorage->getQuery()
          ->condition('type', 'word')
	  #escapeLike causes problem here
          #->condition('title', $query->escapeLike($input), 'CONTAINS')
          ->condition('title', $input, 'CONTAINS')
          ->condition('status', TRUE)
          ->condition('langcode', $language)
          ->accessCheck(TRUE)
          ->groupBy('nid')
          ->sort('title', 'ASC')
          ->range(0, $nsuggestions);

        $ids2 = $query2->execute();
        $nodes2 = $ids2 ? $this->nodeStorage->loadMultiple($ids2) : [];
	#merge both arrays (these are not strings, so array_merge does not work)
        foreach($nodes2 as $n2) {
	  if (!in_array($n2, $nodes)) {
	    $nodes[] = $n2;
	  }
        }
	#cut to $nsuggestion pieces
        $nodes = array_slice($nodes, 0, $nsuggestions - 1);
    }


    if (!empty($nodes)) {
      foreach ($nodes as $node) {

        $label = [
          $node->getTitle(),
//          '<small>(' . $node->id() . ')</small>',
        ];

        $results[] = [
          'value' => EntityAutocomplete::getEntityLabels([$node]),
          'label' => implode(' ', $label),
        ];
      }
    }
  }

  private function getResultsSolr(&$results, $input) {
    $query = \Drupal\search_api\Entity\Index::load('word_solr_index')->query();
    $query->keys($input);
    $query->range(0, 10);
    $data = $query->execute();

    $items = array_keys($data->getResultItems());

    if (!empty($items)) {
      $entity_manager = \Drupal::entityTypeManager();

      foreach ($items as $item) {
        // The pattern is "entity:[entity_type]:[entity_id]:[language_code]".
        // For example "entity:node/1:en".
        $parse = explode(':', $item);
        $entity = explode('/', $parse[1]);

        if ($node = $entity_manager->getStorage($entity[0])->load($entity[1])) {
          $results[] = [
            'value' => '"' . $node->getTitle() . '"',
            'label' => $node->getTitle(),
          ];
        }
      }
    }
  }

}
