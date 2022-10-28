<?php

namespace Drupal\beliana_base\Plugin\views\area;

use Drupal\Core\Url;
use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\area\AreaPluginBase;

/**
 * Views area TruncateOptionsArea handler.
 *
 * @ingroup views_area_handlers
 *
 * @ViewsArea("bel_view_truncate_options_area")
 */
class ViewTruncateOptionsArea extends AreaPluginBase {

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
      $build['view_truncate_options'] = [
        '#theme' => 'view_truncate_options',
      ];

      return $build;
    }
    return [];
  }

}
