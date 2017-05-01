<?php

namespace Drupal\beliana_daily\EventSubscriber;

use Drupal\beliana_daily\Controller\OrderController;
use Drupal\beliana_sync\Event\BelianaSyncEvents;
use Drupal\beliana_sync\Event\PostNodeSaveEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Event Subscriber PostNodeSaveSubscriber.
 */
class PostNodeSaveSubscriber implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[BelianaSyncEvents::POST_NODE_SAVE][] = ['onRespond'];
    return $events;
  }

  /**
   * Update source for beliana daily.
   *
   * @param PostNodeSaveEvent $event
   *   Subscribed event.
   */
  public function onRespond(PostNodeSaveEvent $event) {
    $node = $event->getNode();
    $dates = $event->getSourceValues();
    OrderController::saveBelianaDailyDates($node->id(), $dates);
  }

}