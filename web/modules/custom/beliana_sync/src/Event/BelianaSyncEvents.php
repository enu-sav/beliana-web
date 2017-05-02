<?php

namespace Drupal\beliana_sync\Event;

/**
 * Defines events for the GatherContent module.
 *
 * @see \Drupal\beliana_sync\Event\PreNodeSaveEvent
 */
final class BelianaSyncEvents {

  /**
   * Name of the event fired before we save node from Beliana RS.
   *
   * This event allows modules to perform an action before new node is saved
   * from Beliana RS to Drupal. The event is triggered just before entity
   * save. The event listener method receives
   * a \Drupal\beliana_sync\Event\PreNodeSaveEvent instance.
   *
   * @Event
   *
   * @see \Drupal\beliana_sync\Event\PreNodeSaveEvent
   *
   * @var string
   */
  const PRE_NODE_SAVE = 'beliana_sync.pre_node_save';

  /**
   * Name of the event fired after we save node from Beliana RS.
   *
   * This event allows modules to perform an action after new node is saved
   * from Beliana RS to Drupal. The event listener method receives
   * a \Drupal\gathercontent\Event\PostNodeSaveEvent instance.
   *
   * @Event
   *
   * @see \Drupal\beliana_sync\Event\PostNodeSaveEvent
   *
   * @var string
   */
  const POST_NODE_SAVE = 'beliana_sync.post_node_save';

  /**
   * Name of the event fired before we update node from Beliana RS.
   *
   * This event allows modules to perform an action before existing node is
   * updated from Beliana RS to Drupal. The event is triggered before entity
   * save. The event listener method receives
   * a \Drupal\beliana_sync\Event\PreNodeSaveEvent instance.
   *
   * @Event
   *
   * @see \Drupal\beliana_sync\Event\PreNodeSaveEvent
   *
   * @var string
   */
  const PRE_NODE_UPDATE = 'beliana_sync.pre_node_update';

  /**
   * Name of the event fired after we update node from Beliana RS.
   *
   * This event allows modules to perform an action after existing node is
   * updated from Beliana RS to Drupal. The event listener method receives
   * a \Drupal\gathercontent\Event\PostNodeSaveEvent instance.
   *
   * @Event
   *
   * @see \Drupal\beliana_sync\Event\PostNodeSaveEvent
   *
   * @var string
   */
  const POST_NODE_UPDATE = 'beliana_sync.post_node_update';


}