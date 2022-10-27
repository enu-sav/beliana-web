<?php

namespace Drupal\beliana_base\Plugin\views\area;

use Drupal\Core\Url;
use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\area\AreaPluginBase;

/**
 * Views area SortOptionsArea handler.
 *
 * @ingroup views_area_handlers
 *
 * @ViewsArea("bel_view_sort_options_area")
 */
class ViewSortOptionsArea extends AreaPluginBase {

  protected function defineOptions() {
    $options = parent::defineOptions();
    return $options;
  }

  /**
   * @param $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);
  }

  /**
   * @param bool $empty
   *
   * @return array
   */
  public function render($empty = FALSE) {
    if (!$empty || !empty($this->options['empty'])) {
      $sort_option_active_link = t('label-alphabet-asc');

      $sort_types = [
        'alphabet-ASC' => t('label-alphabet-asc'),
        'alphabet-DESC' => t('label-alphabet-desc'),
        'date-ASC' => t('label-date-asc'),
        'date-DESC' => t('label-date-desc'),
      ];

      $route_name = \Drupal::routeMatch()->getRouteName();
      $route_parameters = \Drupal::routeMatch()->getRawParameters();
      $current_query = \Drupal::request()->query->all();
      unset($current_query['sort_by']);
      unset($current_query['sort_order']);

      foreach ($sort_types as $key => $sort_type) {
        $sort_by = $sort_order = 'ASC';

        if (isset($_GET['sort_by']) && isset($_GET['sort_order']) && ($key == $_GET['sort_by'] . '-' . $_GET['sort_order'])) {
          $sort_option_active_link = $sort_type->render();
        }

        switch ($key) {
          case 'alphabet-ASC':
            $sort_by = 'order';
            break;
          case 'alphabet-DESC':
            $sort_by = 'order';
            $sort_order = 'DESC';
            break;
          case 'date-ASC':
            $sort_by = 'created';
            $sort_order = 'DESC';
            break;
          case 'date-DESC':
            $sort_by = 'created';
            break;
        }

        $url = $this->_get_url_sort($route_name, $route_parameters, $current_query, $sort_by, $sort_order);
        $sort_option_links[] = $this->_create_link($url, $sort_type->render(), $key);
      }

      $build['view_sort_options'] = [
        '#theme' => 'view_sort_options',
        '#sort_option_active_link' => $sort_option_active_link,
        '#sort_option_links' => $sort_option_links,
      ];

      return $build;
    }
    return [];
  }

  private function _get_url_sort($route_name, $route_parameters, $current_query, $sort_by, $sort_order) {
    if (empty($sort_by)) {
      $sort_by = 'ASC';
    }
    if (empty($sort_order)) {
      $sort_order = 'ASC';
    }
    return Url::fromRoute($route_name, $route_parameters->all(), [
      'query' => [
        $current_query,
        'sort_by' => $sort_by,
        'sort_order' => $sort_order,
      ],
      'absolute' => 'true',
    ]);
  }

  /**
   * @param \Drupal\Core\Url $url_sort
   * @param $class
   *
   * @param $title
   *
   * @return array
   */
  private function _create_link(Url $url_sort, $title, $key) {
    return [
      'title' => $title,
      'url' => $url_sort,
      'class' => [
        $key,
      ],
    ];
  }

}
