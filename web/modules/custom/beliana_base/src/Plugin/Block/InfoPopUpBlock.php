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

    if (getenv('ENVIRONMENT_INDICATOR_NAME') == 'Develop') {
      $prod_url = [
        'url' => 'https://beliana.sav.sk/',
        'text' => 'beliana.sav.sk',
      ];
      $build['#attached']['library'][] = 'bel/info_popup';
      $build['#attached']['drupalSettings']['beliana_base']['info_popup_delay'] = 1;

      $domain = \Drupal::request()->getHost();
      $domain = explode('.', $domain)[0];
      if (strpos($domain, 'en') !== false) {
        $prod_url = [
          'url' => 'https://en.beliana.sav.sk/',
          'text' => 'en.beliana.sav.sk',
        ];
      } else if (strpos($domain, 'skola') !== false) {
        $prod_url = [
          'url' => 'https://skola.beliana.sav.sk/',
          'text' => 'skola.beliana.sav.sk',
        ];
      }

      $build['info_popup_block'] = [
        '#theme' => 'info_popup_block',
        '#prod_url' => $prod_url,
      ];

      // Add cache tags based on the domain.
      $build['#cache']['tags'][] = 'domain:' . $domain;
      // Add cache contexts based on the domain.
      $build['#cache']['contexts'][] = 'url.site';
    }

    return $build;
  }

}
