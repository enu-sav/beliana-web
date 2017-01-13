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

// Show all error messages on the site
$config['system.logging']['error_level'] = 'all';
// Disable Google Analytics from sending dev GA data.
$config['google_analytics.settings']['account'] = 'UA-XXXXXXXX-YY';
// Expiration of cached pages to 0
$config['system.performance']['cache']['page']['max_age'] = 0;
// Aggregate CSS files on
$config['system.performance']['css']['preprocess'] = 0;
// Aggregate JavaScript files on
$config['system.performance']['js']['preprocess'] = 0;

$settings['hash_salt'] = 'J2RATdd4h4GdghkCZH99vaNPXR2-6_q0m6fC1qlrYm6SzkpAp48cDboGnEC6iQy940JhA9rzcA';
$settings['install_profile'] = 'standard';
$config_directories['sync'] = '../config/sync';

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';
