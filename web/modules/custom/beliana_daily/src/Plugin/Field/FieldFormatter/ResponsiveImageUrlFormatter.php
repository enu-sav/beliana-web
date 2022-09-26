<?php

namespace Drupal\beliana_daily\Plugin\Field\FieldFormatter;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Image\ImageFactory;
use Drupal\Core\Link;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Url;
use Drupal\Core\Utility\LinkGeneratorInterface;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Plugin implementation of the 'Image URL' formatter for 'link' fields.
 *
 * @FieldFormatter(
 *   id = "beliana_responsive_image_url",
 *   label = @Translation("Beliana - Responsive image from URL"),
 *   field_types = {
 *     "link",
 *     "text",
 *     "string",
 *   },
 *   quickedit = {
 *     "editor" = "disabled"
 *   }
 * )
 */
class ResponsiveImageUrlFormatter extends FormatterBase implements ContainerFactoryPluginInterface {

  /**
   * The responsive image style storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected $responsiveImageStyleStorage;

  /**
   * The image factory service.
   *
   * @var \Drupal\Core\Image\ImageFactory
   */
  protected $imageFactory;

  /**
   * The current user.
   *
   * @var \Drupal\Core\Session\AccountInterface
   */
  protected $currentUser;

  /**
   * The link generator.
   *
   * @var \Drupal\Core\Utility\LinkGeneratorInterface
   */
  protected $linkGenerator;

  /**
   * Constructs a ImagecacheExternalResponsiveImage object.
   *
   * @param string $plugin_id
   *   The plugin_id for the formatter.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Field\FieldDefinitionInterface $field_definition
   *   The definition of the field to which the formatter is associated.
   * @param array $settings
   *   The formatter settings.
   * @param string $label
   *   The formatter label display setting.
   * @param string $view_mode
   *   The view mode.
   * @param array $third_party_settings
   *   Any third party settings.
   * @param \Drupal\Core\Image\ImageFactory
   *   The image factory service.
   * @param \Drupal\Core\Entity\EntityStorageInterface $responsive_image_style_storage
   *   The responsive image style storage.
   * @param \Drupal\Core\Utility\LinkGeneratorInterface $link_generator
   *   The link generator service.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   *   The current user.
   */
  public function __construct($plugin_id, $plugin_definition, $field_definition, array $settings, $label, $view_mode, array $third_party_settings, ImageFactory $image_factory, EntityStorageInterface $responsive_image_style_storage, LinkGeneratorInterface $link_generator, AccountInterface $current_user) {
    parent::__construct($plugin_id, $plugin_definition, $field_definition, $settings, $label, $view_mode, $third_party_settings);

    $this->imageFactory = $image_factory;
    $this->responsiveImageStyleStorage = $responsive_image_style_storage;
    $this->linkGenerator = $link_generator;
    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $plugin_id,
      $plugin_definition,
      $configuration['field_definition'],
      $configuration['settings'],
      $configuration['label'],
      $configuration['view_mode'],
      $configuration['third_party_settings'],
      $container->get('image.factory'),
      $container->get('entity_type.manager')->getStorage('responsive_image_style'),
      $container->get('link_generator'),
      $container->get('current_user')
    );
  }

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
        'imagecache_external_responsive_style' => '',
        'imagecache_external_link' => '',
      ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $settings = $this->getSettings();
    $elements = [];

    $responsive_image_options = [];
    $responsive_image_styles = $this->responsiveImageStyleStorage->loadMultiple();
    if ($responsive_image_styles && !empty($responsive_image_styles)) {
      /** @var \Drupal\responsive_image\Entity\ResponsiveImageStyle $responsive_image_style */
      foreach ($responsive_image_styles as $machine_name => $responsive_image_style) {
        if ($responsive_image_style->hasImageStyleMappings()) {
          $responsive_image_options[$machine_name] = $responsive_image_style->label();
        }
      }
    }

    $elements['imagecache_external_responsive_style'] = [
      '#title' => t('Responsive image style'),
      '#type' => 'select',
      '#default_value' => $settings['imagecache_external_responsive_style'],
      '#required' => TRUE,
      '#options' => $responsive_image_options,
      '#description' => [
        '#markup' => $this->linkGenerator->generate($this->t('Configure Responsive Image Styles'), new Url('entity.responsive_image_style.collection')),
        '#access' => $this->currentUser->hasPermission('administer responsive image styles'),
      ],
    ];

    $link_types = [
      'content' => t('Linked to content'),
      'file' => t('File'),
      'colorbox' => t('Colorbox'),
    ];
    $elements['imagecache_external_link'] = [
      '#title' => t('Link image to'),
      '#type' => 'select',
      '#default_value' => $settings['imagecache_external_link'],
      '#empty_option' => t('Nothing'),
      '#options' => $link_types,
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $responsive_image_style = $this->responsiveImageStyleStorage->load($this->getSetting('imagecache_external_responsive_style'));
    if ($responsive_image_style) {
      $summary[] = t('Responsive image style: @responsive_image_style', ['@responsive_image_style' => $responsive_image_style->label()]);

      $link_types = [
        'content' => t('Linked to content'),
        'file' => t('Linked to file'),
        'colorbox' => t('Colorbox'),
      ];
      // Display this setting only if image is linked.
      if (isset($link_types[$this->getSetting('imagecache_external_link')])) {
        $summary[] = $link_types[$this->getSetting('imagecache_external_link')];
      }
    }
    else {
      $summary[] = t('Select a responsive image style.');
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    $field = $items->getFieldDefinition();
    $field_settings = $this->getFieldSettings();

    $url = NULL;
    $image_link_setting = $this->getSetting('imagecache_external_responsive_style');
    // Check if the formatter involves a link.
    if ($image_link_setting == 'content') {
      $entity = $items->getEntity();
      if (!$entity->isNew()) {
        $url = $entity->toUrl();
      }
    }
    elseif ($image_link_setting == 'file') {
      $link_file = TRUE;
    }

    // Check if the field provides a title.
    if ($field->getType() == 'link') {
      if ($field_settings['title'] != DRUPAL_DISABLED) {
        $field_title = TRUE;
      }
    }

    foreach ($items as $delta => $item) {
      // Get field value.
      $values = $item->toArray();

      $image_alt = '';
      if ($field->getType() == 'link') {
        $image_path = imagecache_external_generate_path($values['uri']);
      }
      else {
        $image_path = imagecache_external_generate_path($values['value']);
      }

      // Skip rendering this item if there is no image_path.
      if (!$image_path) {
        continue;
      }

      if (isset($link_file)) {
        $url = Url::fromUri(file_create_url($image_path));
      }

      $image = $this->imageFactory->get($image_path);
      $style_settings = $this->getSetting('imagecache_external_responsive_style');

      $image_build_base = [
        '#width' => $image->getWidth(),
        '#height' => $image->getHeight(),
        '#uri' => $image_path,
        '#alt' => strip_tags($entity->field_description->value) ?? 'Encyclopaedia Beliana',
        '#title' => '',
      ];

      if (empty($style_settings)) {
        $image_build = [
            '#theme' => 'image',
          ] + $image_build_base;
      }
      else {
        $image_build = [
            '#theme' => 'imagecache_external_responsive',
            '#responsive_image_style_id' => $style_settings,
          ] + $image_build_base;
      }

      if ($url) {
        $rendered_image = render($image_build);
        $image = Link::fromTextAndUrl($rendered_image, $url)->toRenderable();
      }
      else {
        $image = $image_build;
      }

      switch ($this->getSetting('imagecache_external_link')) {
        case 'colorbox':
          $elements[$delta] = [
            '#theme' => 'colorbox_url_formatter',
            '#item' => $item,
            '#image' => $image,
            '#entity' => $entity,
            '#cache' => ['tags' => ['file:' . $items->getEntity()->id()]],
          ];

          $colorbox_service = \Drupal::service('colorbox.attachment');

          // Attach the Colorbox JS and CSS.
          if ($colorbox_service->isApplicable()) {
            $colorbox_service->attach($elements);
          }
          break;
        case 'content':
        case 'file':
          $url = $this->getSetting('imagecache_external_link') == 'content' ? $items->getEntity()
            ->toUrl()
            ->toString() : $item->uri;
          $target = $this->getSetting('imagecache_external_link') == 'content' ? '_self' : '_blank';
          $rel = $this->getSetting('imagecache_external_link') == 'content' ? 'nofollow' : '';

          $elements[$delta] = [
            '#type' => 'html_tag',
            '#tag' => 'a',
            '#attributes' => [
              'href' => $url,
              'class' => ['field-media'],
              'target' => $target,
              'rel' => $rel,
            ],
            'image' => $image,
          ];
          break;
        default:
          $elements[$delta] = $image;
          break;
      }
    }
    return $elements;
  }

}
