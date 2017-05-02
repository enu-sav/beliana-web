<?php namespace Drupal\beliana_modals\Controller;

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
   * The form builder.
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
   */
  public function openModalForm($js = 'nojs', NodeInterface $node) {
    if ($js == 'ajax') {
      $response = new AjaxResponse();
      // Get the modal form using the form builder.
      $modal_form = $this->formBuilder->getForm('Drupal\beliana_modals\Form\ModalForm', $node);
      // Add an AJAX command to open a modal dialog with the form as the content.
      $response->addCommand(new OpenModalDialogCommand('Formulár na nahlásenie chyby.', $modal_form, ['width' => '80%']));
      return $response;
    }
    else {
      return $this->formBuilder->getForm('Drupal\beliana_modals\Form\ModalForm', $node);
    }
  }

  public function thankyouPage() {
    return [
      '#markup' => 'Ďakujeme za nahlásenie chyby, jej odstránením sa budeme 
          čoskoro zaoberať a o jej odstránení vás budeme informovať na 
          zadanú emailovú adresu.'
    ];
  }
}