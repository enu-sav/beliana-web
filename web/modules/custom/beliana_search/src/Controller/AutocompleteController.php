<?php

namespace Drupal\beliana_search\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Utility\Tags;

/**
 * Defines a route controller for entity autocomplete form elements.
 */
class AutocompleteController extends ControllerBase {

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
    $nodes = $query->fields('n')
        ->condition('n.type', 'word')
        ->condition('n.status', NODE_PUBLISHED)
        ->condition('n.title', $query->escapeLike($input) . '%', 'LIKE')
        ->orderBy('n.title', 'ASC')
        ->range(0, 10)
        ->execute()
        ->fetchAll();

    if (!empty($nodes)) {
      foreach ($nodes as $node) {
        $results[] = [
          'value' => $node->nid,
          'label' => $node->title,
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
