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
      '#title' => 'Vyhľadať zadaný text',
      '#title_display' => 'hidden',
      '#required' => 'required',
      '#attributes' => [
        'class' => ['search-input'],
        'placeholder' => ['Zadajte hľadané heslo ...'],
      ],
      '#default_value' => $_GET['text'] ?? '',
    ];

    $form['beliana_search_submit'] = [
      '#type' => 'submit',
      '#value' => 'Hľadať',
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
    if (!empty($form_state->getValue('beliana_search_input'))) {
      $form_state->setRedirect('view.solr_search_word.page_2', ['text' => $form_state->getValue('beliana_search_input')]);
      return;
    }
  }

}
