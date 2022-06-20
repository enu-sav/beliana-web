<?php

/**
 * @file
 */
use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Unicode;

/**
 * Prepares variables for colorbox formatter templates.
 */
function beliana_daily_preprocess_colorbox_url_formatter(&$variables) {
  static $gallery_token = NULL;

  $item = $variables['item'];
  $classes_array = ['colorbox'];
  $data_cbox_img_attrs = [];

  $caption = $item->title;

  $config = \Drupal::config('colorbox.settings');
  $colorbox_style = $config->get('colorbox_style');
  $trim_length = $config->get('colorbox_caption_trim_length');

  if (((strpos($colorbox_style, 'colorbox/example') !== FALSE) || $config->get('colorbox_caption_trim')) && (mb_strlen($caption) > $trim_length)) {
    $caption = mb_substr($caption, 0, $trim_length - 5) . '...';
  }

  $gallery_id = 'gallery-all';

  if (!empty($gallery_id) && $config->get('advanced.unique_token')) {
    if (is_null($gallery_token)) {
      $gallery_token = Crypt::randomBytesBase64(8);
    }

    $gallery_id = $gallery_id . '-' . $gallery_token;
  }

  $variables['url'] = file_create_url($item->uri);
  $variables['attributes']['title'] = $caption;
  $variables['attributes']['data-colorbox-gallery'] = $gallery_id;
  $variables['attributes']['class'] = $classes_array;

  if (!empty($data_cbox_img_attrs)) {
    $variables['attributes']['data-cbox-img-attrs'] = '{' . implode(',', $data_cbox_img_attrs) . '}';
  }
}
