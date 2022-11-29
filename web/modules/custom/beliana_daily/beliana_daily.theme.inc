<?php

/**
 * @file
 */
use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Unicode;
use Drupal\file\Entity\File;
use Drupal\media\Entity\Media;

/**
 * Prepares variables for colorbox formatter templates.
 */
function beliana_daily_preprocess_colorbox_url_formatter(&$variables) {
  static $gallery_token = NULL;

  $classes_array = ['colorbox'];
  $data_cbox_img_attrs = [];

  $caption = strip_tags($variables['entity']->field_description->value) ?? 'Encyclopaedia Beliana';

  $config = \Drupal::config('colorbox.settings');
  $colorbox_style = $config->get('custom.style');
  $trim_length = $config->get('advanced.caption_trim_length');

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

  $variables['url'] = $variables['image']['#uri'];
  $variables['attributes']['title'] = $caption;
  $variables['attributes']['data-colorbox-gallery'] = $gallery_id;
  $variables['attributes']['class'] = $classes_array;

  if (!empty($data_cbox_img_attrs)) {
    $variables['attributes']['data-cbox-img-attrs'] = '{' . implode(',', $data_cbox_img_attrs) . '}';
  }
}


/**
 * Prepares variables for colorbox formatter templates.
 */
function beliana_daily_preprocess_responsive_colorbox_formatter(&$variables) {
  static $gallery_token = NULL;

  $image = $variables['image'];
  $fid = $image['#item']->target_id;
  $file = File::load($fid);
  $classes_array = ['colorbox'];
  $data_cbox_img_attrs = [];

  $caption = $image['#item']->alt;

  $config = \Drupal::config('colorbox.settings');
  $colorbox_style = $config->get('custom.style');
  $trim_length = $config->get('advanced.caption_trim_length');

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

  $variables['url'] = $file->createFileUrl();
  $variables['attributes']['title'] = $caption;
  $variables['attributes']['data-colorbox-gallery'] = $gallery_id;
  $variables['attributes']['class'] = $classes_array;

  if (!empty($data_cbox_img_attrs)) {
    $variables['attributes']['data-cbox-img-attrs'] = '{' . implode(',', $data_cbox_img_attrs) . '}';
  }
}
