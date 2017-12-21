<?php

/**
 * @file
 * Provide views data for beliana_daily module.
 */

/**
 * Implements hook_views_data().
 */
function beliana_daily_views_data() {
  $data = [];

  $data['beliana_daily']['table']['group'] = t('Beliana daily');
  $data['beliana_daily']['table']['join'] = [
    'node_field_data' => [
      'left_field' => 'nid',
      'field' => 'nid',
    ],
  ];

  $data['beliana_daily']['weight'] = [
    'title' => t('Weight for Words in Today block and page'),
    'help' => t('Weight for Words in Today block and page'),
    'sort' => [
      'id' => 'standard',
    ],
  ];

  return $data;
}

/**
 * Implements hook_views_data_alter().
 */
function beliana_daily_views_data_alter(array &$data) {
  $data['node']['node_piwik_statistics'] = array(
    'title' => t('Node statistics (Piwik)'),
    'field' => array(
      'title' => t('Node statistics (Piwik)'),
      'help' => t('Get Piwik visit count statistics for node.'),
      'id' => 'node_piwik_statistics',
      'click sortable' => TRUE,
    ),
    'sort' => array(
      'id' => 'standard',
    ),
  );
}
