<?php

/**
* @file
* Settings for staging environment. Same will be used for production.
*/

// Don't show any error messages on the site (will still be shown in watchdog).
$config['system.logging']['error_level'] = 'hide';
// Expiration of cached pages on Varnish to 15 min.
$config['system.performance']['cache']['page']['max_age'] = 900;
// Aggregate CSS files on.
$config['system.performance']['css']['preprocess'] = 1;
// Aggregate JavaScript files on.
$config['system.performance']['js']['preprocess'] = 1;

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

// Locale settings.
$config['locale.settings']['translation']['path'] = 'sites/stage/files/translations';

// Beliana settings.
$config['beliana_sync.config']['remote_url'] = 'http://rs.beliana.sav.sk/';

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
// Last: This server specific services file.
if (file_exists(__DIR__ . '/services.local.yml')) {
  $settings['container_yamls'][] = __DIR__ . '/services.local.yml';
}