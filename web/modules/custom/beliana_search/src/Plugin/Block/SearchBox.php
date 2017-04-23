<?php

namespace Drupal\beliana_search\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * @Block(
 *  id = "beliana_searchbox",
 *  admin_label = @Translation("Search box"),
 * )
 */
class SearchBox extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return \Drupal::formBuilder()->getForm('Drupal\beliana_search\Form\SearchForm');
  }

}