<?php

/**
 * @file
 * Settings for staging environment. Same will be used for production.
 */
$settings['hash_salt'] = 'J2RATdd4h4GdghkCZH99vaNPXR2-6_q0m6fC1qlrYm6SzkpAp48cDboGnEC6iQy940JhA9rzcA';
$settings['install_profile'] = 'standard';
$settings['deployment_identifier'] = \Drupal::VERSION;
$settings['config_sync_directory'] = '../config/sync';

// Disable render caches, necessary for twig files to be reloaded on every page view
//$settings['cache']['bins']['render'] = 'cache.backend.null';
//$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';
