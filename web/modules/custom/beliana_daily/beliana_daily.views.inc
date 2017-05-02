<?php

/**
 * @file
 * Provide views data for beliana_daily module.
 */

/**
 * Implements hook_views_data().
 */
function beliana_daily_views_data() {
  $data['beliana_daily']['table']['group']  = t('Beliana daily');

  $data['beliana_daily']['table']['join'] = array(
    'node_field_data' => array(
      'left_field' => 'nid',
      'field' => 'nid',
    ),
  );

  $data['beliana_daily']['weight'] = array(
    'title' => t('Weight for Words in Today block and page'),
    'help' => t('Weight for Words in Today block and page'),
    'sort' => array(
      'id' => 'standard',
    ),
  );

  return $data;
}
