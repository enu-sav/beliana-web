<?php

namespace Drupal\beliana_search;

use Drupal\Core\Access\AccessManagerInterface;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Controller\TitleResolverInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Extension\ModuleHandler;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Link;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Menu\MenuLinkManager;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Path\CurrentPathStack;
use Drupal\Core\Path\PathMatcherInterface;
use Drupal\Core\PathProcessor\InboundPathProcessorInterface;
use Drupal\Core\Routing\RequestContext;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\easy_breadcrumb\EasyBreadcrumbBuilder;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Matcher\RequestMatcherInterface;

/**
 * Class to define the menu_link breadcrumb builder.
 */
class BelianaBreadcrumbBuilder extends EasyBreadcrumbBuilder implements BreadcrumbBuilderInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function __construct(RequestContext $context, AccessManagerInterface $access_manager, RequestMatcherInterface $router, RequestStack $request_stack, InboundPathProcessorInterface $path_processor, ConfigFactoryInterface $config_factory, TitleResolverInterface $title_resolver, AccountInterface $current_user, CurrentPathStack $current_path, MenuLinkManager $menu_link_manager, LanguageManagerInterface $language_manager, EntityTypeManagerInterface $entity_type_manager, EntityRepositoryInterface $entity_repository, LoggerChannelFactoryInterface $logger, MessengerInterface $messenger, ModuleHandler $module_handler, PathMatcherInterface $path_matcher) {
    parent::__construct($context, $access_manager, $router, $request_stack, $path_processor, $config_factory, $title_resolver, $current_user, $current_path, $menu_link_manager, $language_manager, $entity_type_manager, $entity_repository, $logger, $messenger, $module_handler, $path_matcher);
  }

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match) {
    return parent::applies($route_match);
  }

  /**
   * {@inheritdoc}
   */
  public function build(RouteMatchInterface $route_match) {
    $breadcrumb_old = parent::build($route_match);
    $links = $breadcrumb_old->getLinks();
    $last = array_pop($links);
    $cache_tags = [];

    if ($node = \Drupal::routeMatch()->getParameter('node')) {
      if ($node->bundle() == 'word') {
        $entity_manager = \Drupal::service('entity_type.manager');
        $categories = $node->get('field_categories')->getValue();
        $cache_tags[] = 'node:' . $node->id();

        $last->setText($node->label());

        if (!empty($categories)) {
          $count = 0;

          foreach ($categories as $category) {
            if ($term = $entity_manager->getStorage('taxonomy_term')
              ->load($category['target_id'])) {
              $count++;
              $cache_tags[] = 'taxonomy_term:' . $term->id();
              $ancestors = $entity_manager->getStorage('taxonomy_term')
                ->loadAllParents($term->id());

              foreach (array_reverse($ancestors) as $item) {
                $links[] = Link::createFromRoute($item->label(), 'view.solr_search_word.page_search_by_category', [], ['query' => ['f' => ['kategorie:' . $item->id()]]]);
              }

              if ($count < count($categories)) {
                $links[] = Link::createFromRoute('/', '<none>');
              }
            }
          }
        }

        $links[0]->setText(t('all-categories'));
        $links[0]->setUrl(Url::fromRoute('view.solr_search_word.page_search_by_category'));
      }
    }

    $links[] = $last;

    $breadcrumb = new Breadcrumb();
    $breadcrumb->addCacheContexts(['url.path']);
    $breadcrumb->addCacheTags($cache_tags);
    $breadcrumb->addCacheableDependency($this->config);
    $breadcrumb->setLinks($links);

    return $breadcrumb;
  }

}
