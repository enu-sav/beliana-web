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
    $entity_manager = \Drupal::entityTypeManager();
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
        '#target_type' => 'node',
        '#autocomplete_route_name' => 'beliana_search.autocomplete',
        '#attributes' => [
          'class' => ['search-input'],
          'placeholder' => t('placeholder-search-see-search-options-on-the-right'),
          'aria-label' => t('aria-label-search-for-more-search-options-continue-to-the-search-options-element)'),
        ],
      ]
    ];

    if (isset($query['text'])) {
      $form['beliana_search_input']['input']['#default_value'] = $query['text'];
    }

    $form['#attached']['drupalSettings']['beliana_search']['alphabet'] = NULL;

    if (isset($query['f'])) {
      $filter = explode(':', $query['f'][0]);

      if ($filter[0] == 'alphabet') {
        $term = $entity_manager->getStorage('taxonomy_term')->load($filter[1]);

        $close_query = $query;
        unset($close_query['f']);

        if (isset($close_query['page'])) {
          unset($close_query['page']);
        }

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
              '#markup' => '<span aria-hidden="true">×</span>'
            ],
            '#url' => Url::fromRoute('<current>', [], ['query' => $close_query]),
            '#attributes' => [
              'class' => ['close'],
              'title' => t('reset-search'),
              'aria-label' => t('reset-search')
            ]
          ],
        ];

        $form['beliana_search_input']['#attributes']['class'][] = 'has-alphabet';

        $base_letter = $term->id();
        $tree = $entity_manager->getStorage('taxonomy_term')->loadAllParents($base_letter);

        if (count($tree) > 1) {
          $base_letter = end($tree)->id();
        }

        $form['#attached']['drupalSettings']['beliana_search']['alphabet'] = $base_letter;
      }
    }

    $form['beliana_search_submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Enter'),
      '#attributes' => [
        'class' => ['search-submit'],
      ],
    ];

    $form['#attached']['library'][] = 'bel/search';

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

    if (isset($query['page'])) {
      unset($query['page']);
    }

    $form_state->setRedirect('view.solr_search_word.page_alphabet', [], ['query' => $query]);
  }

}
