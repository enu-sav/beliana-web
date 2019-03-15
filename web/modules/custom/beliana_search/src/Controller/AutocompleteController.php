<?php

namespace Drupal\beliana_search\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Utility\Tags;
use Drupal\Component\Utility\Unicode;

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

      $query = \Drupal::database()->select('node_field_data', 'n');
      $nodes = $query->fields('n')
          ->condition('n.type', 'word')
          ->condition('n.status', NODE_PUBLISHED)
          ->condition('n.title', '%' . $query->escapeLike($typed_string) . '%', 'LIKE')
          ->orderBy('n.title', 'ASC')
          ->execute()
          ->fetchAll();
    }

    if (!empty($nodes)) {
      foreach ($nodes as $node) {
        $results[] = [
          'value' => $node->title,
          'label' => $node->title,
        ];
      }
    }

    return new JsonResponse($results);
  }

}
