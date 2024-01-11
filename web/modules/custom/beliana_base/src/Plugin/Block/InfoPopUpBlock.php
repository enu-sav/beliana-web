<?php

namespace Drupal\beliana_base\Plugin\Block;

use Drupal;
use Drupal\block\Entity\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Routing\RedirectDestinationTrait;

/**
 * Provides a 'InfoPopUpBlock' Block.
 *
 * @Block(
 *   id = "info_pop_up_block",
 *   admin_label = @Translation("BELIANA Info - PopUp"),
 * )
 */
class InfoPopUpBlock extends BlockBase {

  use RedirectDestinationTrait;

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    $build['#attached']['library'][] = 'bel/info_popup';
    $build['#attached']['drupalSettings']['beliana_base']['info_popup_delay'] = 1;

    if (getenv('ENVIRONMENT_INDICATOR_NAME') == 'Develop') {
      $build['info_popup_block'] = [
        '#theme' => 'info_popup_block',
      ];
    }

    return $build;
  }

}
