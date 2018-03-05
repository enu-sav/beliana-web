<?php

namespace Drupal\beliana_search\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

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
    $form['beliana_search_input'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search'),
      '#title_display' => 'hidden',
      '#attributes' => [
        'class' => ['search-input'],
        'placeholder' => [$this->t('Search for words, shortcuts ...')],
      ],
      '#default_value' => $_GET['text'] ?? '',
    ];

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
    $form_state->setRedirect('view.solr_search_word.page_2', ['text' => $form_state->getValue('beliana_search_input')]);
  }

}
