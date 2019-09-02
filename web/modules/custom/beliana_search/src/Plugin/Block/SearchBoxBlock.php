<?php

namespace Drupal\beliana_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Custom search block, so we override AJAX-driven views.
 *
 * @Block(
 *  id = "beliana_searchbox",
 *  admin_label = @Translation("Search box"),
 * )
 */
class SearchBoxBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return \Drupal::formBuilder()->getForm('Drupal\beliana_search\Form\SearchForm');
  }

}
