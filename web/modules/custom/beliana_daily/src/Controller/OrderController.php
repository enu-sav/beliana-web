<?php

namespace Drupal\beliana_daily\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;

/**
 * Class OrderController.
 *
 * @package Drupal\beliana_daily\Controller
 */
class OrderController extends ControllerBase {

  /**
   * Render summary for Today block for following 7 days.
   *
   * @return array
   *   Render array.
   */
  public function summary() {
    $output = [];
    $db = \Drupal::database();
    for ($i = 0; $i < 7; $i++) {
      $day = date('md', strtotime('+ ' . $i . ' days'));
      $nids = $db->select('beliana_daily', 'bd')
        ->fields('bd', ['nid'])
        ->condition('date', $day)
        ->orderBy('bd.weight')
        ->range(0, 3)
        ->execute()
        ->fetchCol();
      /** @var Node[] $nodes */
      $nodes = Node::loadMultiple($nids);
      $titles = [];
      foreach ($nodes as $node) {
        $titles[] = [
          'title' => $node->getTitle(),
          'url' => Url::fromRoute('entity.node.canonical', ['node' => $node->id()]),
          'type' => 'link',
        ];
      }
      $output['d' . $day] = [
        '#type' => 'container',
        '#title' => $day,
      ];
      $output['d' . $day]['header'] = [
        '#type' => 'html_tag',
        '#tag' => 'h3',
        '#value' => 'Zvýraznené heslá pre deň ' . date('d.m.Y', strtotime('+ ' . $i . ' days')),
      ];
      $output['d' . $day]['list'] = [
        '#theme' => 'links',
        '#links' => $titles,
      ];
      $output['d' . $day]['edit'] = [
        '#type' => 'link',
        '#title' => 'Zmeniť poradie',
        '#url' => Url::fromRoute('beliana_daily.edit_order', ['date' => $day]),
      ];

    }
    return $output;
  }

  /**
   * Save dates for beliana daily functionality.
   *
   * @param int $nid
   *   Node ID.
   * @param array|null $dates
   *   Array of dates.
   */
  public static function saveBelianaDailyDates($nid, array $dates = NULL) {
    $db = \Drupal::database();
    // If new data contains any dates, insert them.
    if (!is_null($dates['dates'])) {
      // in case there are two or more equal days, store just one of them
      $stored_md = [];	// keep stored days here
      foreach ($dates['dates'] as $date) {
        $monthday = date('md', strtotime($date));
        if (!in_array($monthday, $stored_md)) {
          $db->insert('beliana_daily')
            ->fields(['nid', 'date'])
            ->values([$nid, $monthday])
            ->execute();
          $stored_md[] = $monthday;
        }
      }
    }
  }

}
