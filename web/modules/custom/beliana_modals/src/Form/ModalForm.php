<?php

namespace Drupal\beliana_modals\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;

/**
 * ModalForm class.
 */
class ModalForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'submit_error_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, NodeInterface $node = NULL) {
    $form['#prefix'] = '<div id="submit-error-form">';
    $form['#suffix'] = '</div>';
    // The status messages that will contain any form errors.
    $form['status_messages'] = [
      '#type' => 'status_messages',
      '#weight' => -10,
    ];
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Meno a priezvisko'),
      '#required' => TRUE,
    ];
    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Emailová adresa'),
      '#description' => $this->t('Po vyriešení nahláseného problému Vás budeme kontaktovať'),
      '#required' => TRUE,
    ];
    $form['description'] = [
      '#type' => 'textarea',
      '#title' => 'Popis chyby',
      '#required' => TRUE,
      '#default_value' => 'Nahlasujem chybu v hesle ' . $node->getTitle(),
    ];
    $form['node'] = [
      '#type' => 'value',
      '#value' => $node->id(),
    ];
    // A required checkbox field.
    $form['personal_data_agreement'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Súhlasím so spracovaním osobných údajov.'),
      '#required' => TRUE,
    ];
    $form['actions'] = [
      '#type' => 'actions',
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Odoslať'),
      '#attributes' => [
        'class' => ['use-ajax'],
      ],
      '#ajax' => [
        'callback' => [$this, 'submitModalFormAjax'],
        'event' => 'click',
      ],
    ];
    $form['#attached']['library'][] = 'core/drupal.dialog.ajax';
    return $form;
  }

  /**
   * AJAX callback handler that displays any errors or a success message.
   */
  public function submitModalFormAjax(array $form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    // If there are any form errors, re-display the form.
    if ($form_state->hasAnyErrors()) {
      $response->addCommand(new ReplaceCommand('#submit-error-form', $form));
    }
    else {
      $this->sendEmail($form_state);
      $response->addCommand(
        new OpenModalDialogCommand("Formulár na nahlásenie chyby.",
          'Ďakujeme za nahlásenie chyby, jej odstránením sa budeme 
          čoskoro zaoberať a o jej odstránení vás budeme informovať na 
          zadanú emailovú adresu.',
          ['width' => '80%'])
      );
    }
    return $response;
  }

  /**
   * Send email with content specified from form.
   *
   * @param FormStateInterface $form_state
   *   Values submitted from form.
   */
  private function sendEmail(FormStateInterface $form_state) {
    $key = 'report_error';
    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'beliana_modals';
    $to = \Drupal::config('system.site')->get('mail');
    $node = Node::load($form_state->getValue('node'));
    $params['node_title'] = $node->getTitle();
    $params['name'] = $form_state->getValue('name');
    $params['email'] = $form_state->getValue('email');
    $params['url'] = '/node/' . $node->id();
    $params['message'] = $form_state->getValue('description');
    $mailManager->mail($module, $key, $to, 'sk', $params, NULL, TRUE);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->sendEmail($form_state);
    $form_state->setRedirect('beliana_modals.error_thanks');
  }

}
