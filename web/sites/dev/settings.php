<?php
$databases['default'] = array(
  'default' => array(
    'database' => 'drupal',
    'username' => 'drupal',
    'password' => 'drupal',
    'prefix' => '',
    'host' => 'localhost',
    'port' => '3306',
    'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
    'driver' => 'mysql',
  )
);

### amazee.io Solr connection
// WARNING: you have to create a search_api server having "solr" machine name at
// /admin/config/search/search-api/add-server to make this work.
if (getenv('AMAZEEIO_SOLR_HOST') && getenv('AMAZEEIO_SOLR_PORT')) {
  $config['search_api.server.solr']['backend_config']['connector_config']['host'] = getenv('AMAZEEIO_SOLR_HOST');
  $config['search_api.server.solr']['backend_config']['connector_config']['path'] = '/solr/';
  $config['search_api.server.solr']['backend_config']['connector_config']['core'] = getenv('AMAZEEIO_SOLR_CORE') ?: getenv('AMAZEEIO_SITENAME');
  $config['search_api.server.solr']['backend_config']['connector_config']['port'] = getenv('AMAZEEIO_SOLR_PORT');
  $config['search_api.server.solr']['backend_config']['connector_config']['http_user'] = (getenv('AMAZEEIO_SOLR_USER') ?: '');
  $config['search_api.server.solr']['backend_config']['connector_config']['http']['http_user'] = (getenv('AMAZEEIO_SOLR_USER') ?: '');
  $config['search_api.server.solr']['backend_config']['connector_config']['http_pass'] = (getenv('AMAZEEIO_SOLR_PASSWORD') ?: '');
  $config['search_api.server.solr']['backend_config']['connector_config']['http']['http_pass'] = (getenv('AMAZEEIO_SOLR_PASSWORD') ?: '');
  $config['search_api.server.solr']['name'] = 'AmazeeIO Solr - Environment: ' . getenv('AMAZEEIO_SITE_ENVIRONMENT');
}

// Show all error messages on the site
$config['system.logging']['error_level'] = 'all';
// Disable Google Analytics from sending dev GA data.
$config['google_analytics.settings']['account'] = 'UA-XXXXXXXX-YY';

//// Expiration of cached pages to 0
//$config['system.performance']['cache']['page']['max_age'] = 0;
//// Aggregate CSS files on
//$config['system.performance']['css']['preprocess'] = 0;
//// Aggregate JavaScript files on
//$config['system.performance']['js']['preprocess'] = 0;
//
// Configure config split.
$config['config_split.config_split.dev']['status'] = TRUE;
$config['config_split.config_split.stage']['status'] = FALSE;
$config['config_split.config_split.prod']['status'] = FALSE;

$settings['hash_salt'] = 'J2RATdd4h4GdghkCZH99vaNPXR2-6_q0m6fC1qlrYm6SzkpAp48cDboGnEC6iQy940JhA9rzcA';
$settings['install_profile'] = 'standard';
$settings['config_sync_directory'] = '../config/sync';

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';
