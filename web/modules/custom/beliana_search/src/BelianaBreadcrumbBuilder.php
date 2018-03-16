<?php

namespace Drupal\beliana_search;

use Drupal\Core\Access\AccessManagerInterface;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Controller\TitleResolverInterface;
use Drupal\Core\Path\CurrentPathStack;
use Drupal\Core\PathProcessor\InboundPathProcessorInterface;
use Drupal\Core\Routing\RequestContext;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Menu\MenuLinkManager;
use Drupal\Core\Link;
use Drupal\easy_breadcrumb\EasyBreadcrumbBuilder;
use Symfony\Component\Routing\Matcher\RequestMatcherInterface;

/**
 * Class to define the menu_link breadcrumb builder.
 */
class BelianaBreadcrumbBuilder extends EasyBreadcrumbBuilder implements BreadcrumbBuilderInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function __construct(RequestContext $context, AccessManagerInterface $access_manager, RequestMatcherInterface $router, InboundPathProcessorInterface $path_processor, ConfigFactoryInterface $config_factory, TitleResolverInterface $title_resolver, AccountInterface $current_user, CurrentPathStack $current_path, MenuLinkManager $menu_link_manager) {
    parent::__construct($context, $access_manager, $router, $path_processor, $config_factory, $title_resolver, $current_user, $current_path, $menu_link_manager);
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

    if ($node = \Drupal::routeMatch()->getParameter('node')) {
      if ($node->bundle() == 'word') {
        $entity_manager = \Drupal::service('entity_type.manager');
        $alphabet = $node->get('field_alphabet')->target_id;

        if (!empty($alphabet)) {
          if ($term = $entity_manager->getStorage('taxonomy_term')->load($alphabet)) {
            $ancestors = $entity_manager->getStorage('taxonomy_term')->loadAllParents($term->id());
            $parent = end($ancestors);

            $links[] = Link::createFromRoute($parent->label(), 'view.solr_search_word.page_1', [], ['query' => ['f' => ['alphabet:' . $parent->id()]]]);
          }
        }
      }
    }

    $links[] = $last;

    $breadcrumb = new Breadcrumb();
    $breadcrumb->addCacheContexts(['url.path']);
    $breadcrumb->addCacheableDependency($this->config);
    $breadcrumb->setLinks($links);

    return $breadcrumb;
  }

}
