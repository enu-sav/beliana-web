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
      '#options' => [
        'content' => t('Content'),
        'file' => t('File'),
        'colorbox' => t('Colorbox'),
      ],
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $image_link_setting = $this->getSetting('image_link');

    $link_types = [
      'content' => t('Linked to content'),
      'file' => t('File'),
      'colorbox' => t('Colorbox'),
    ];

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
    $link_type = $this->getSetting('image_link');

    foreach ($items as $delta => $item) {
      $image = [
        '#type' => 'responsive_image',
        '#theme' => 'image',
        '#uri' => $item->uri,
        '#attributes' => [
          'alt' => strip_tags($entity->field_description->value) ?? 'Encyclopaedia Beliana',
          'loading' => 'lazy',
        ]
      ];

      switch ($link_type) {
        case 'colorbox':
          $elements[$delta] = [
            '#theme' => 'colorbox_url_formatter',
            '#item' => $item,
            '#image' => $image,
            '#entity' => $entity,
            '#cache' => ['tags' => ['file:' . $entity->id()]],
          ];

          $colorbox_service = \Drupal::service('colorbox.attachment');

          // Attach the Colorbox JS and CSS.
          if ($colorbox_service->isApplicable()) {
            $colorbox_service->attach($elements);
          }
          break;
        case 'content':
        case 'file':
          $url = $this->getSetting('image_link') == 'content' ? $entity->toUrl()->toString() : $item->uri;
          $target = $this->getSetting('image_link') == 'content' ? '_self' : '_blank';
          $rel = $this->getSetting('image_link') == 'content' ? 'nofollow' : '';

          $elements[$delta] = [
            '#type' => 'html_tag',
            '#tag' => 'a',
            '#attributes' => ['href' => $url, 'class' => ['field-media'], 'target' => $target, 'rel' => $rel],
            'image' => $image
          ];
          break;
        default:
          $elements[$delta] = $image;
          break;
      }
    }

    return $elements;
  }

}
