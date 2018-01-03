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
  $data['beliana_piwik_counter_storage']['table']['group'] = t('Piwik Analytics Counter');

  $data['beliana_daily']['table']['join'] = [
    'node_field_data' => [
      'left_field' => 'nid',
      'field' => 'nid',
    ],
  ];

  $data['beliana_piwik_counter_storage']['table']['join'] = array(
    'node_field_data' => array(
      'left_field' => 'nid',
      'field' => 'nid',
    ),
  );

  $data['beliana_daily']['weight'] = [
    'title' => t('Weight for Words in Today block and page'),
    'help' => t('Weight for Words in Today block and page'),
    'sort' => [
      'id' => 'standard',
    ],
  ];

  $data['beliana_piwik_counter_storage']['pageview_total'] = array(
    'title' => t('Views count'),
    'help' => t('The total number of times the node has been viewed as tracked by Piwik analytics.'),
    'field' => array(
      'id' => 'numeric',
      'click sortable' => TRUE,
    ),
    'filter' => array(
      'id' => 'numeric',
    ),
    'argument' => array(
      'id' => 'numeric',
    ),
    'sort' => array(
      'id' => 'standard',
    ),
  );

  return $data;
}
