<?php

namespace Drupal\beliana_modals\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormBuilder;
use Drupal\node\NodeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * ModalFormExampleController class.
 */
class ModalController extends ControllerBase {

  /**
   * The form builder.
   *
   * @var \Drupal\Core\Form\FormBuilder
   */
  protected $formBuilder;

  /**
   * The ModalFormExampleController constructor.
   *
   * @param \Drupal\Core\Form\FormBuilder $formBuilder
   *   The form builder.
   */
  public function __construct(FormBuilder $formBuilder) {
    $this->formBuilder = $formBuilder;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
        $container->get('form_builder')
    );
  }

  /**
   * Callback for opening the modal form.
   *
   * @param NodeInterface $node
   *   Object of node from which modal form is displayed.
   * @param string $js
   *   Indication if javascript is used or not.
   *
   * @return AjaxResponse|array
   *   Return either AjaxResponse object if JS is enabled or
   *   render array of form for browsers with disabled JS.
   */
  public function openModalForm(NodeInterface $node, $js = 'nojs') {
    if ($js == 'ajax') {
      $response = new AjaxResponse();
      // Get the modal form using the form builder.
      $modal_form = $this->formBuilder->getForm('Drupal\beliana_modals\Form\ModalForm', $node);
      // Add an AJAX command to open modal dialog with the form as the content.
      $response->addCommand(new OpenModalDialogCommand('Komentár k heslu.', $modal_form, ['width' => '80%']));
      return $response;
    }
    else {
      return $this->openForm($node);
    }
  }

  /**
   * Callback for opening non-modal form.
   *
   * @param NodeInterface $node
   *   Object of node from which modal form is displayed.
   *
   * @return AjaxResponse|array
   *   Return either AjaxResponse object if JS is enabled or
   *   render array of form for browsers with disabled JS.
   */
  public function openForm(NodeInterface $node) {
    return $this->formBuilder->getForm('Drupal\beliana_modals\Form\ModalForm', $node);
  }

  /**
   * Callback for thankyou page.
   *
   * @return array
   *   Content of thankyou page.
   */
  public function thankyouPage() {
    $page = [];
//    $page['header'] = [
//      '#type' => 'html_tag',
//      '#tag' => 'h2',
//      '#value' => 'Ďakujeme za odoslanie komentára.',
//    ];
    $page['content'] = [
      '#markup' => 'Ďakujeme za odoslanie komentára.',
//      '#markup' => 'Ďakujeme za odoslanie komentára. Budeme '
//      . 'sa ním zaoberať a o výsledku Vás budeme informovať na zadanú emailovú adresu.',
    ];
    return $page;
  }

}
