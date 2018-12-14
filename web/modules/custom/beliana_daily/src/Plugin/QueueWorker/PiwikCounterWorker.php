<?php

namespace Drupal\beliana_daily\Plugin\QueueWorker;

use Drupal\Core\Database\Database;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Queue\QueueWorkerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Updates the Piwik analytics counters.
 *
 * @QueueWorker(
 *   id = "beliana_piwik_counter_worker",
 *   title = @Translation("Piwik Queue Worker"),
 *   cron = {"time" = 60}
 * )
 */
class PiwikCounterWorker extends QueueWorkerBase implements ContainerFactoryPluginInterface {

  /**
   * The database connection to save the counters.
   */
  protected $connection;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);

    $this->connection = Database::getConnection();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static($configuration, $plugin_id, $plugin_definition);
  }

  /**
   * {@inheritdoc}
   */
  public function processItem($data) {
    $statistics = 0;
    $alias_manager = \Drupal::service('path.alias_manager');
    
    // DISABLE AFTER CHANGE PIWIK TO MOTAMO
    return;

    $alias = $alias_manager->getAliasByPath('/node/' . $data['nid']);
    $config = \Drupal::config('matomo.settings');

    $options = [
      'pageUrl' => $alias,
      'period' => 'month',
      'date' => 'now',
      'format' => 'PHP',
    ];

    // Request piwik data.
    if ($result = $this->getApiRequest($config->get('url_http'), $config->get('access_token'), 'Actions.getPageUrl', $config->get('site_id'), $options)) {
      if ($result['result'] != 'error') {
        $piwik = reset($result);
        $statistics = $piwik['nb_hits'];

        $this->connection->merge('beliana_piwik_counter_storage')
            ->key(array('nid' => $data['nid']))
            ->fields(array(
              'pageview_total' => $piwik['nb_hits'],
            ))
            ->execute();
      }
    }
  }

  /**
   * Sends a Piwik API request.
   *
   * @param string $piwik_url
   *  URL to piwik.
   * @param string $token
   *  Piwik API token.
   * @param string $method
   *  Piwik API request method.
   * @param int $site_id
   *  Unique site ID of piwik.
   * @param array $options
   *  Additional query options.
   *
   * @return string data
   */
  private function getApiRequest($piwik_url, $token, $method, $site_id, $options) {
    try {
      $params = ['query' => [
      'module' => 'API',
      'method' => $method,
      'idSite' => $site_id,
      'token_auth' => $token
        ] + $options];

      $response = \Drupal::httpClient()->get($piwik_url, $params);
      $data = unserialize($response->getBody());

      if (empty($data)) {
        return FALSE;
      }

      return $data;
    }
    catch (RequestException $e) {
      return FALSE;
    }
  }

}
