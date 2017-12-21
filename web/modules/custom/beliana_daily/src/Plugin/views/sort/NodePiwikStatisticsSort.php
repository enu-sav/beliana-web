<?php

namespace Drupal\beliana_daily\Plugin\views\sort;

use Drupal\views\Plugin\views\sort\Standard;

/**
 * Basic sort handler for Piwik.
 *
 * @ViewsSort("node_piwik_statistics_sort")
 */
class NodePiwikStatisticsSort extends Standard {

  /**
   * Called to add the sort to a query.
   */
  public function query() {
    $this->ensureMyTable();
    $this->query->addOrderBy($this->tableAlias, $this->realField, $this->options['order']);
  }

}
