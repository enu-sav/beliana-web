<?php

namespace Drupal\beliana_search\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Class SearchForm.
 *
 * @package Drupal\beliana_search\Form
 */
class SearchForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'beliana_search_block';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $query = \Drupal::request()->query->all();

    $form['query'] = [
      '#type' => 'value',
      '#value' => $query
    ];

    $form['beliana_search_input'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['search-input-wrapper']],
      'input' => [
        '#type' => 'textfield',
        '#title' => $this->t('Search'),
        '#title_display' => 'hidden',
        '#default_value' => $query['text'] ?? '',
        '#attributes' => [
          'class' => ['search-input'],
          'placeholder' => [$this->t('Search for words, shortcuts ...')],
        ],
      ]
    ];

    if (isset($query['f'])) {
      $filter = explode(':', $query['f'][0]);
      $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($filter[1]);

      $close_query = $query;
      unset($close_query['f']);

      $form['beliana_search_input']['alphabet'] = [
        '#type' => 'container',
        '#attributes' => ['class' => ['search-alphabet-wrapper']],
        '#weight' => -99,
        'facet' => [
          '#type' => 'container',
          'text' => [
            '#markup' => $term->label(),
          ]
        ],
        'icon' => [
          '#type' => 'link',
          '#title' => [
            '#markup' => '<i class="fa fa-times"></i>'
          ],
          '#url' => Url::fromRoute('<current>', [], ['query' => $close_query]),
          '#attributes' => ['class' => ['close']]
        ],
      ];

      $form['beliana_search_input']['#attributes']['class'][] = 'has-alphabet';
    }

    $form['beliana_search_submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Enter'),
      '#attributes' => [
        'class' => ['search-submit'],
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $query = $form_state->getValue('query');
    $input = $form_state->getUserInput();

    if (!empty($input) && !empty($input['input'])) {
      $query['text'] = $input['input'];
    }
    else {
      unset($query['text']);
    }

    $form_state->setRedirect('view.solr_search_word.page_2', [], ['query' => $query]);
  }

}
