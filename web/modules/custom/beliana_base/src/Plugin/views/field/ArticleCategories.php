<?php

namespace Drupal\beliana_base\Plugin\views\field;

use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;
use Drupal\views\Plugin\views\display\DisplayPluginBase;
use Drupal\views\ViewExecutable;

/**
 * A handler to provide a field that is completely custom by the administrator.
 *
 * @ingroup views_field_handlers
 *
 * @ViewsField("article_categories")
 */
class ArticleCategories extends FieldPluginBase {

  /**
   * The current display.
   *
   * @var string
   *   The current display of the view.
   */
  protected $currentDisplay;

  /**
   * {@inheritdoc}
   */
  public function init(ViewExecutable $view, DisplayPluginBase $display, array &$options = NULL) {
    parent::init($view, $display, $options);
    $this->currentDisplay = $view->current_display;
  }

  /**
   * {@inheritdoc}
   */
  public function usesGroupBy() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function query() {
    // Do nothing -- to override the parent query.
  }

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    // First check whether the field should be hidden if the value(hide_alter_empty = TRUE) /the rewrite is empty (hide_alter_empty = FALSE).
    $options['hide_alter_empty'] = ['default' => FALSE];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function render(ResultRow $values) {
    $elements = [];
    $node = $values->_entity;

    if($node->hasField('field_categories')) {
      $word_categories = $node->get('field_categories')->getValue();

      foreach ($word_categories as $delta => $word_category) {
        $category_name_list = [];
        $parents = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadAllParents($word_category["target_id"]);
  
        foreach ($parents as $parent) {
          $category_name_list[] = $parent->getName();
        }
  
        $elements[$delta]['#markup'] = \implode(' » ', \array_reverse($category_name_list));
      }
    }

    return \implode(', ', array_column($elements, '#markup'));
  }

}
