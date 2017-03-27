<?php

$aliases["dev"] = array (
  'root' => '/var/www/drupal/public_html/web',
  'uri' => 'http://beliana.docker.amazee.io',
  'path-aliases' => 
  array (
    '%drush' => '/var/www/drupal/public_html/vendor/drush/drush',
    '%site' => 'sites/dev/',
  ),
);

$aliases["stage"] = array (
  'root' => '/var/www/beliana.sk/web',
  'uri' => 'http://dw.beliana.sav.sk',
  'path-aliases' =>
  array (
    '%drush' => '/var/www/beliana.sk/vendor/drush/drush',
    '%site' => 'sites/stage/',
  ),
);
