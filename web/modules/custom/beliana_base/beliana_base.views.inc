<?php
/**
 * Implements hook_views_data().
 *
 * @return array
 */
function beliana_base_views_data(): array {
  $data['views']['bel_view_sort_options_area'] = [
    'title' => t('View sort options area'),
    'area' => [
      'id' => 'bel_view_sort_options_area',
    ],
  ];
  return $data;
}
