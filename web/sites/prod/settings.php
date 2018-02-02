<?php

/**
 * @file
 * Settings for staging environment. Same will be used for production.
 */
$settings['hash_salt'] = 'J2RATdd4h4GdghkCZH99vaNPXR2-6_q0m6fC1qlrYm6SzkpAp48cDboGnEC6iQy940JhA9rzcA';
$settings['install_profile'] = 'standard';
$config_directories['sync'] = '../config/sync';

// SOLR settings.
$config['search_api.server.solr']['backend_config']['connector_config']['host'] = 'localhost';
$config['search_api.server.solr']['backend_config']['connector_config']['path'] = '/solr/';
$config['search_api.server.solr']['backend_config']['connector_config']['core'] = 'drupal';
$config['search_api.server.solr']['backend_config']['connector_config']['port'] = 8983;
$config['search_api.server.solr']['backend_config']['connector_config']['http_user'] = '';
$config['search_api.server.solr']['backend_config']['connector_config']['http']['http_user'] = '';
$config['search_api.server.solr']['backend_config']['connector_config']['http_pass'] = '';
$config['search_api.server.solr']['backend_config']['connector_config']['http']['http_pass'] = '';
$config['search_api.server.solr']['name'] = 'Solr - Environment: prod';

// Configure config split.
$config['config_split.config_split.dev']['status'] = FALSE;
$config['config_split.config_split.stage']['status'] = FALSE;
$config['config_split.config_split.prod']['status'] = TRUE;

// Disable render caches, necessary for twig files to be reloaded on every page view
$settings['cache']['bins']['render'] = 'cache.backend.null';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
// Last: This server specific services file.
if (file_exists(__DIR__ . '/services.local.yml')) {
  $settings['container_yamls'][] = __DIR__ . '/services.local.yml';
}