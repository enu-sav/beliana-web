<?php

namespace Drupal\beliana_modals\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
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
    $form['node'] = [
      '#type' => 'value',
      '#value' => $node->id(),
    ];

    $form['header'] = [
      '#type' => 'html_tag',
      '#tag' => 'h2',
      '#value' => $this->t('entry-comment-heading'),
    ];

    $form['description'] = [
      '#type' => 'textarea',
      '#title' => $this->t('message-text-required'),
      '#required' => TRUE,
      '#default_value' => $this->t('entry-comment-heading') . ': "' . $node->getTitle() . '"',
    ];

    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('email-address'),
      '#description' => $this->t('email-notification-note'),
    ];

    $form['actions'] = [
      '#type' => 'actions',
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('submit-button'),
    ];
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
          new OpenModalDialogCommand($this->t('entry-comment-heading'), $this->t('thank-you-note'), ['width' => '80%'])
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
    $module = 'beliana_modals';
    $mail_manager = \Drupal::service('plugin.manager.mail');

    $to = \Drupal::config('system.site')->get('mail');
    $node = Node::load($form_state->getValue('node'));

    $params['node_title'] = $node->getTitle();
    $params['email'] = $form_state->getValue('email');
    $params['message'] = $form_state->getValue('description');
    $params['url'] = Url::fromRoute('entity.node.canonical', ['node' => $node->id()], ['absolute' => TRUE])->toString();

    $mail_manager->mail($module, $key, $to, 'sk', $params, NULL, TRUE);
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
