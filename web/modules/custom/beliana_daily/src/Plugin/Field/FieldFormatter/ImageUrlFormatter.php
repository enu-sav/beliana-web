<?php

namespace Drupal\beliana_daily\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;

/**
 * Plugin implementation of the 'Image URL' formatter for 'link' fields.
 *
 * @FieldFormatter(
 *   id = "beliana_image_url",
 *   label = @Translation("Image from URL"),
 *   field_types = {
 *     "link"
 *   }
 * )
 */
class ImageUrlFormatter extends LinkFormatter {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return ['image_link' => ''] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $element['image_link'] = [
      '#title' => t('Link image to'),
      '#type' => 'select',
      '#default_value' => $this->getSetting('image_link'),
      '#empty_option' => t('Nothing'),
      '#options' => ['content' => t('Content')],
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $image_link_setting = $this->getSetting('image_link');

    $link_types = ['content' => t('Linked to content')];
    if (isset($link_types[$image_link_setting])) {
      $summary[] = $link_types[$image_link_setting];
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    $entity = $items->getEntity();

    foreach ($items as $delta => $item) {
      $image = [
        '#type' => 'responsive_image',
        '#theme' => 'image',
        '#uri' => $item->uri,
        '#attributes' => [
          'alt' => empty($item->title) ? '' : \Drupal::token()->replace($item->title, [$entity->getEntityTypeId() => $entity], ['clear' => TRUE]),
        ]
      ];
      
      if ($this->getSetting('image_link') == 'content') {
        $elements[$delta] = [
          '#type' => 'html_tag',
          '#tag' => 'a',
          '#attributes' => ['href' => $entity->url()],
          'image' => $image
        ];
      }
      else {
        $elements[$delta] = $image;
      }
    }

    return $elements;
  }

}
