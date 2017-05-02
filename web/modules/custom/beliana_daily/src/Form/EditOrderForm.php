<?php

namespace Drupal\beliana_daily\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 * Class EditOrderForm.
 *
 * @package Drupal\beliana_daily\Form
 */
class EditOrderForm extends FormBase {

  /**
   * Date for which we are editing order.
   *
   * @var string
   */
  private $date;

  /**
   * @var \Drupal\Core\Database\Connection
   */
  private $db;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'beliana_daily_edit';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $date = NULL) {
    $this->date = $date;
    $form['beliana_daily_table'] = [
      '#type' => 'table',
      '#header' => ['Nadpis', 'Poradie'],
      '#tabledrag' => [
        [
          'action' => 'order',
          'relationship' => 'sibling',
          'group' => 'beliana-daily-table',
        ],
      ],
    ];

    $this->db = \Drupal::database();
    $query = $this->db->select('beliana_daily', 'bd')
      ->fields('bd', ['nid', 'weight'])
      ->condition('date', $this->date)
      ->orderBy('bd.weight');
    $results = $query->execute()
      ->fetchAllAssoc('nid', \PDO::FETCH_ASSOC);

    $nids = array_keys($results);
    /** @var Node[] $nodes */
    $nodes = Node::loadMultiple($nids);

    $delta = ceil(sizeof($nids)/2);

    foreach ($nodes as $node) {
      $form['beliana_daily_table'][$node->id()]['#attributes']['class'][] = 'draggable';
      $form['beliana_daily_table'][$node->id()]['#weight'] = $results[$node->id()]['weight'];
      // Some table columns containing raw markup.
      $form['beliana_daily_table'][$node->id()]['label'] = array(
        '#plain_text' => $node->getTitle(),
      );

      // TableDrag: Weight column element.
      $form['beliana_daily_table'][$node->id()]['weight'] = array(
        '#type' => 'weight',
        '#title' => t('Weight for @title', array('@title' => $node->getTitle())),
        '#title_display' => 'invisible',
        '#default_value' => $results[$node->id()]['weight'],
        // Classify the weight element for #tabledrag.
        '#attributes' => array('class' => array('beliana-daily-table')),
        '#delta' => $delta,
      );
    }

    $form['beliana_daily_submit'] = [
      '#type' => 'submit',
      '#value' => 'Uložiť poradie',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    if (!empty($form_state->getValue('beliana_daily_table'))) {
      foreach ($form_state->getValue('beliana_daily_table') as $nid=>$item) {
        $this->db->merge('beliana_daily')
          ->keys(['nid' => $nid, 'date' => $this->date])
          ->fields(['weight' => $item['weight']])
          ->execute();
      }
    }
  }

}