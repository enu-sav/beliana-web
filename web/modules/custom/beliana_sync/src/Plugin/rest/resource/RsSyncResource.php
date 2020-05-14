<?php

namespace Drupal\beliana_sync\Plugin\rest\resource;

use Drupal\beliana_sync\Event\BelianaSyncEvents;
use Drupal\beliana_sync\Event\PostNodeSaveEvent;
use Drupal\beliana_sync\Event\PostNodeUpdateEvent;
use Drupal\beliana_sync\Event\PreNodeSaveEvent;
use Drupal\beliana_sync\Event\PreNodeUpdateEvent;
use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\media_entity\Entity\Media;
use Drupal\node\Entity\Node;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\taxonomy\Entity\Term;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * Provides a resource to get view modes by entity and bundle.
 *
 * @RestResource(
 *   id = "rs_sync_resource",
 *   label = @Translation("RS Sync"),
 *   uri_paths = {
 *     "canonical" = "/rs/api/{nid}",
 *     "https://www.drupal.org/link-relations/create" = "/rs/api"
 *   }
 * )
 */
class RsSyncResource extends ResourceBase {

  /**
   * A current user instance.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  protected $currentUser;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   *   A current user instance.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    AccountProxyInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);

    $this->currentUser = $current_user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('beliana_sync'),
      $container->get('current_user')
    );
  }

  /**
   * Create new article.
   *
   * @param array $data
   *   Array of incoming data.
   *
   * @return \Drupal\rest\ResourceResponse
   *   Return 201 on success with NID.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   *   Throws exception expected.
   */
  public function post($data) {
    if (!$this->currentUser->hasPermission('create article content')) {
      throw new AccessDeniedHttpException();
    }
    \Drupal::logger('beliana_sync')
      ->notice("Nové heslo '" . $data['title'] . " (post)");

    $event_dispatcher = \Drupal::service('event_dispatcher');

    $node = Node::create([
      'type' => 'word',
      'title' => $data['title'],
      'field_date' => $data['dates'],
      'field_sort' => $data['sort'],
      'field_info_published' => $data['info_published'],
    ]);

    if (isset($data['autor'])) {
      $term = $this->getAuthorTerm($data);
      $node->field_autor = $term->id();
    }

    // set table
    $node->field_table = [
      'value' => $data['table'][0],
      'format' => 'full_html',
    ];
    $node->field_table_weight = $data['table'][1];

    // set corresponding values in the 'categories' taxonomy according to the $data['category'] value
    // may have multiple values, each having hierarchy starting from parent and separated by ';'
    $node->field_categories = $this->getCategories($data['category']);

    $local_fids = $this->downloadMedia($data['images']);

    if (!empty($local_fids)) {
      $node->field_images = $local_fids;
    }

    $modified_body = $this->downloadBodyImages($data['body']);
    $node->body = ['value' => $modified_body, 'format' => 'full_html'];
    $node->field_alphabet = _assign_alphabet_group($data['sort']);
    $event_dispatcher->dispatch(BelianaSyncEvents::PRE_NODE_SAVE, new PreNodeSaveEvent($node, $data));
    $node->save();
    $event_dispatcher->dispatch(BelianaSyncEvents::POST_NODE_SAVE, new PostNodeSaveEvent($node, $data));

    return new ResourceResponse($node->id(), 201);
  }

  /**
   * Download attached files and create media entities from them.
   *
   * @param array $images
   *   Array with image data.
   *
   * @return array
   *   Array with media IDs.
   */
  public function downloadMedia(array $images) {
    $entity_manager = \Drupal::entityTypeManager();
    $file_system = \Drupal::service('file_system');
    $taxonomy_terms = $entity_manager->getStorage('taxonomy_term');

    $local_fids = [];
    $date = date('Y-m-d');

    foreach ($images as $image) {
      $file_OK = FALSE;
      $link_OK = FALSE;

      if (isset($image['image_url_local'])) {
        // local image should be used
        $file_data = file_get_contents($image['image_url_local']);
        $exploded_path = explode('/', $image['image_url_local']);
        $file_name = array_pop($exploded_path);
        $dir = substr($file_name, 0, 3);
        $file_dir = 'public://' . $date . '/' . $dir;

        if ($file_system->prepareDirectory('public://' . $file_dir, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY)) {
          /** @var \Drupal\file\FileInterface $file */
          if ($file = file_save_data($file_data, $file_dir . '/' . $file_name)) {
            $file_OK = TRUE;
          }
        }
      }
      else {
        // we got link to external image
        $link_OK = TRUE;
      }

      if ($file_OK or $link_OK) {
        $license = $taxonomy_terms->loadByProperties(['name' => $image['license']]);

        if (empty($license)) {
          $license = $taxonomy_terms->create([
            'name' => $image['license'],
            'vid' => 'licenses',
          ]);

          $license->save();
        }
        else {
          $license = reset($license);
        }

        $media = Media::create([
          'bundle' => 'image',
          'title' => $image['title'],
          'field_licence' => $license->id(),
          'field_description' => [
            'value' => $image['description'],
            'format' => 'basic_html',
          ],
        ]);

        if ($file_OK === TRUE) {
          $media->set('field_image', [
            'target_id' => $file->id(),
            'alt' => $image['alternativny_text'],
          ]);
        }
        else { // we got link to external image
          $media->set('field_obrazok_odkaz', [
            'uri' => $image['image_url_web'],
            //'alt' =>  $image['alternativny_text'],
          ]);
        }

        if (isset($image['nazov_diela'])) {
          $media->set('field_nazov_diela', ['value' => $image['nazov_diela']]);
        }

        if (isset($image['institucia'])) {
          $media->set('field_institucia', ['value' => $image['institucia']]);
        }

        if (isset($image['meno_autora_diela'])) {
          $media->set('field_meno_autora_diela', ['value' => $image['meno_autora_diela']]);
        }

        if (isset($image['meno_autora_snimky_diela'])) {
          $media->set('field_meno_autora_snimky_diela', ['value' => $image['meno_autora_snimky_diela']]);
        }

        if (isset($image['url_diela_l'])) {
          $media->set('field_url_diela_l', [
            'uri' => $image['url_diela_l'],
            'title' => parse_url($image['url_diela_l'])['host'],
          ]);
        }

        if (isset($image['url_autora_diela_l'])) {
          $media->set('field_url_autora_diela_l', [
            'uri' => $image['url_autora_diela_l'],
            'title' => parse_url($image['url_autora_diela_l'])['host'],
          ]);
        }

        if (isset($image['url_testu_licencie_l'])) {
          $media->set('field_url_testu_licencie_l', [
            'uri' => $image['url_testu_licencie_l'],
            'title' => parse_url($image['url_testu_licencie_l'])['host'],
          ]);
        }

        $media->save();
        $local_fids[] = $media->id();
      }
    }

    return $local_fids;
  }

  // get parent with a required top parent $parentName
  // we a sure that the right parent exists, so just find it in the array
  public function getParentId($parentName, $topParentName) {
    $parentList = taxonomy_term_load_multiple_by_name($parentName, 'categories');
    if (sizeof($parentList) > 1) {
      foreach ($parentList as $candidate) {
        $topParent = $this->getTopParent($candidate);
        if ($topParent->getName() === $topParentName) {
          return $candidate->id();
        }
      }
    }
    else {
      return reset($parentList)->id();
    }
  }

  // get the topmost parent. We have just a 3-level hierarchy
  public function getTopParent($term) {
    $entity_manager = \Drupal::entityTypeManager();
    $parents = $entity_manager->getStorage('taxonomy_term')
      ->loadParents($term->id());

    if (sizeof($parents) == 0) {
      return $term;
    }

    $parent = reset($parents);
    $parents1 = $entity_manager->getStorage('taxonomy_term')
      ->loadParents($parent->id());

    if (sizeof($parents1) == 0) {
      return $parent;
    }

    $parent1 = reset($parents1);
    $parents2 = $entity_manager->getStorage('taxonomy_term')
      ->loadParents($parent1->id());

    if (sizeof($parents2) == 0) {
      return $parent1;
    }
  }

  // select category from a list of categories with a required top parent $parentName
  public function selectItem($tname, $parentName) {
    $terms = taxonomy_term_load_multiple_by_name($tname, 'categories');
    if (!$terms) {
      return NULL;
    }
    if (sizeof($terms) == 1 and !$parentName) {
      return reset($terms);
    }
    foreach ($terms as $term) {
      $topParent = $this->getTopParent($term);
      if ($topParent->getName() == $parentName) {
        return $term;
      }
    }
    // if a category with the required name does not exist
    return NULL;
  }

  // set corresponding values in the 'categories' taxonomy according to the $data['category'] value
  // may have multiple values, each having hierarchy starting from parent and separated by ';'
  // two categories with the same name but a different parent are asigned different IDs
  public function getCategories($datacategory) {
    //\Drupal::logger('beliana_sync')->notice($datacategory[0]);
    $catlist = [];
    foreach ($datacategory as $taxo) {
      $tnames = explode(";", $taxo);
      if ($tnames[0] === "ignore") {
        continue;
      }  // do not create and assign category "ignore"
      $parentName = NULL;
      // process categories one by one
      foreach ($tnames as $tname) {
        // check if the category $tname exists, create if not
        $cterm = $this->selectItem($tname, $tnames[0]);
        if (!$cterm) { // create a new item
          if ($parentName != NULL) {
            $parentId = $this->getParentId($parentName, $tnames[0]);
            $term = Term::create([
              'name' => $tname,
              'vid' => 'categories',
              'parent' => $parentId,
            ])->save();
          }
          else {
            $term = Term::create([
              'name' => $tname,
              'vid' => 'categories',
            ])->save();
          }
          $cterm = $this->selectItem($tname, $parentName);
        }
        $parentName = $tname;
        // if the full category hierarchy should be stored
        //$catlist[] = $cterm;
      }
      // if only the lowest category in the hierarchy should be stored
      $catlist[] = $cterm;
    }
    return $catlist;
  }

  /**
   * Finds images in text, download them and replace paths.
   *
   * @param string $body
   *   Unprocessed text with images.
   *
   * @return string
   *   Text with replaced image links.
   */
  public function downloadBodyImages($body) {
    // Extract links from field_text_hesla.
    $dom = new \DOMDocument();
    $dom->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));
    /** @var \DOMElement[] $images */
    $images = $dom->getElementsByTagName('img');
    $remote_site_url = \Drupal::configFactory()
      ->get('beliana_sync.config')
      ->get('remote_url');

    if (empty($remote_site_url)) {
      \Drupal::logger('beliana_sync')
        ->critical('Extrakcia obrázkov zlyhala, pretože cesta k RS nie je nastavená');
      return $body;
    }

    $file_system = \Drupal::service('file_system');

    if (!empty($images)) {

      for ($i = $images->length - 1; $i >= 0; $i--) {
        /** @var \DOMElement $item */
        $item = $images->item($i);
        $remote_path = $item->getAttribute('src');

        if (!UrlHelper::isExternal($remote_path)) {
          $file_data = file_get_contents($remote_site_url . $remote_path);
          $exploded_path = explode('/', $remote_path);
          $file_name = array_pop($exploded_path);
          $dir = substr($file_name, 0, 3);
          $file_dir = 'public://' . date('Y-m-d') . '/' . $dir;

          if ($file_system->prepareDirectory($file_dir, \Drupal\Core\File\FileSystemInterface::CREATE_DIRECTORY)) {
            if ($uri = $file_system->saveData($file_data, $file_dir . '/' . $file_name)) {
              $item->setAttribute('src', file_url_transform_relative(file_create_url($uri)));
            }
          }
        }
      }
    }

    $fragment = '';
    foreach ($dom->getElementsByTagName('body')->item(0)->childNodes as $node) {
      $fragment .= $dom->saveHtml($node);
    }

    return $fragment;
  }

  /**
   * Update existing article.
   *
   * @param int $nid
   *   ID of article.
   * @param array $data
   *   Array of incoming data.
   *
   * @return \Drupal\rest\ResourceResponse
   *   Return 200 on success.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException
   *   Throws exception if used doesnt have enough permissions.
   */
  public function patch($nid, $data) {
    if (!$this->currentUser->hasPermission('edit any article content')) {
      throw new AccessDeniedHttpException();
    }

    \Drupal::logger('beliana_sync')
      ->notice("Aktualizované heslo '" . $data['title'] . " (patch)");

    $event_dispatcher = \Drupal::service('event_dispatcher');

    $node = Node::load($nid);
    $node->setTitle($data['title']);
    $modified_body = $this->downloadBodyImages($data['body']);
    $node->body = ['value' => $modified_body, 'format' => 'full_html'];
    $node->field_date = $data['dates'];
    $node->field_sort = $data['sort'];
    $node->field_info_published = $data['info_published'];
    // set table
    $node->field_table = [
      'value' => $data['table'][0],
      'format' => 'full_html',
    ];

    $node->field_table_weight = $data['table'][1];

    if (isset($data['autor'])) {
      $term = $this->getAuthorTerm($data);
      $node->field_autor = $term->id();
    }

    // set corresponding values in the 'categories' taxonomy according to the $data['category'] value
    // may have multiple values, each having hierarchy starting from parent and separated by ';'
    $node->field_categories = $this->getCategories($data['category']);

    if($node->hasField('field_images')) {
      foreach ($node->field_images->getValue() as $field_image) {
        $media = Media::load($field_image->target_id);
        if (!is_null($media)) {
          $media->delete();
        }
      }
      $local_fids = $this->downloadMedia($data['images']);
      if (!empty($local_fids)) {
        $node->field_images = $local_fids;
      }
      else {
        $node->set('field_images', []);
      }
    }
    $node->field_alphabet = _assign_alphabet_group($data['sort']);
    $event_dispatcher->dispatch(BelianaSyncEvents::PRE_NODE_UPDATE, new PreNodeUpdateEvent($node, $data));
    $node->save();
    $event_dispatcher->dispatch(BelianaSyncEvents::POST_NODE_UPDATE, new PostNodeUpdateEvent($node, $data));
    return new ResourceResponse();
  }

  private function getAuthorTerm($data) {
    $entity_manager = \Drupal::entityTypeManager();

    if ($terms = $entity_manager->getStorage('taxonomy_term')
      ->loadByProperties([
        'vid' => 'autor',
        'field_meno' => $data['autor']['meno'],
        'field_priezvisko' => $data['autor']['priezvisko'],
      ])) {
      $term = reset($terms);
      $term->field_titul_pred_menom = $data['autor']['titul_pred_menom'];
      $term->field_titul_za_menom = $data['autor']['titul_za_menom'];
      $term->field_posobisko = $data['autor']['posobisko'];
      $term->field_zivotopis = [
        'value' => $data['autor']['zivotopis'],
        'format' => 'full_html',
      ];

      $term->save();
    }
    else {
      // create term
      $term = Term::create([
        'vid' => 'autor',
        'field_meno' => $data['autor']['meno'],
        'field_priezvisko' => $data['autor']['priezvisko'],
        'field_titul_pred_menom' => $data['autor']['titul_pred_menom'],
        'field_titul_za_menom' => $data['autor']['titul_za_menom'],
        'field_posobisko' => $data['autor']['posobisko'],
        'field_zivotopis' => [
          'value' => $data['autor']['zivotopis'],
          'format' => 'full_html',
        ],
      ]);

      $term->save();
    }

    return $term;
  }

}
