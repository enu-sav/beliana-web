<?php

namespace Drupal\beliana_text_filter\Plugin\Filter;

use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Class FilterBelianaTableWrapper.
 *
 * @Filter(
 *   id = "filter_beliana_table_wrapper",
 *   title = @Translation("Beliana table wrapper filter"),
 *   description = @Translation("Filter to add table class and table wrappers"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 * )
 */
class FilterBelianaTableWrapper extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    // Extract tables from field_text_hesla.
    $dom = new \DOMDocument();
    $dom->loadHTML(mb_convert_encoding($text, 'HTML-ENTITIES', 'UTF-8'));

    $table_container = $dom->createElement('div');
    $table_container->setAttribute('class', 'table-container');

    $table_container_fade = $dom->createElement('div');

    $table_container_outer = $dom->createElement('div');
    $table_container_outer->setAttribute('class', 'table-container-outer');

    /** @var \DOMElement[] $tables */
    $tables = $dom->getElementsByTagName('table');
    if (!empty($tables)) {
      for ($i = $tables->length - 1; $i >= 0; $i--) {
        $item = $tables->item($i);
        $item->setAttribute('class', 'table-500');

        // Clone our created div.
        $table_container_clone = $table_container->cloneNode();
        // Replace table with this table_container div.
        $item->parentNode->replaceChild($table_container_clone, $item);
        // Append this table to table_container div.
        $table_container_clone->appendChild($item);

        // Clone our created div.
        $table_container_outer_clone = $table_container_outer->cloneNode();
        $table_container_fade_clone = $table_container_fade->cloneNode();
        // Replace table_container div with this table_container_outer div.
        $table_container_clone->parentNode->replaceChild($table_container_outer_clone, $table_container_clone);
        // Append this table_container to table_container_outer div.
        $table_container_outer_clone->appendChild($table_container_fade_clone);
        $table_container_outer_clone->appendChild($table_container_clone);
      }
    }

    $fragment = '';
    foreach ($dom->getElementsByTagName('body')->item(0)->childNodes as $node) {
      $fragment .= $dom->saveHtml($node);
    }

    return new FilterProcessResult($fragment);
  }

}
