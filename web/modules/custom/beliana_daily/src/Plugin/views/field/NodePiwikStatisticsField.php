<?php

/**
 * @file
 * Definition of Drupal\beliana_daily\Plugin\views\field\NodePiwikStatisticsField
 */

namespace Drupal\beliana_daily\Plugin\views\field;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;

/**
 * Field handler to get Piwik statistics for node.
 *
 * @ingroup views_field_handlers
 *
 * @ViewsField("node_piwik_statistics")
 */
class NodePiwikStatisticsField extends FieldPluginBase {

  /**
   * @{inheritdoc}
   */
  public function query() {
    // Leave empty to avoid a query on this field.
  }

  /**
   * Define the available options
   * @return array
   */
  protected function defineOptions() {
    $options = parent::defineOptions();

    $options['period'] = array(
      'day' => t('Day'),
      'week' => t('Week'),
      'month' => t('Month'),
      'year' => t('Year')
    );

    return $options;
  }

  /**
   * Provide the options form.
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    $options = [
      'day' => t('Day'),
      'week' => t('Week'),
      'month' => t('Month'),
      'year' => t('Year')
    ];

    $form['period'] = [
      '#title' => $this->t('Select period to count visits'),
      '#type' => 'select',
      '#default_value' => $this->options['period'],
      '#options' => $options,
    ];

    parent::buildOptionsForm($form, $form_state);
  }

  /**
   * @{inheritdoc}
   */
  public function render(ResultRow $values) {
    $statistics = 0;
    $node = $values->_entity;
    $alias = \Drupal::service('path.alias_manager')->getAliasByPath('/node/' . $node->id());
    $config = \Drupal::config('piwik.settings');

    $options = [
      'pageUrl' => $alias,
      'period' => $this->options['period'],
      'date' => 'now',
      'format' => 'PHP',
    ];

    // Request piwik data.
    if ($result = $this->getApiRequest($config->get('url_http'), $config->get('access_token'), 'Actions.getPageUrl', $config->get('site_id'), $options)) {
//      debug($result);
    }

    return $statistics;
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
