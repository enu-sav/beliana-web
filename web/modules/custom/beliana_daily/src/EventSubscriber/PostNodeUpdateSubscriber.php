<?php

namespace Drupal\beliana_daily\EventSubscriber;

use Drupal\beliana_daily\Controller\OrderController;
use Drupal\beliana_sync\Event\BelianaSyncEvents;
use Drupal\beliana_sync\Event\PostNodeUpdateEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event Subscriber PostNodeUpdateSubscriber.
 */
class PostNodeUpdateSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[BelianaSyncEvents::POST_NODE_UPDATE][] = ['onRespond'];
    return $events;
  }

  /**
   * Update source for beliana daily.
   *
   * @param PostNodeUpdateEvent $event
   *   Subscribed event.
   */
  public function onRespond(PostNodeUpdateEvent $event) {
    $node = $event->getNode();
    // Empty previous order.
    $db = \Drupal::database();
    $db->delete('beliana_daily')
      ->condition('nid', $node->id())
      ->execute();

    $dates = $event->getSourceValues();
    OrderController::saveBelianaDailyDates($node->id(), $dates);
  }

}