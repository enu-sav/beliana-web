<?php

namespace Drupal\beliana_sync\Event;

use Drupal\node\NodeInterface;
use Symfony\Contracts\EventDispatcher\Event;

/**
 * Wraps a post node save event for event listeners.
 */
class PostNodeUpdateEvent extends Event {

  /**
   * Node object.
   *
   * @var \Drupal\node\NodeInterface
   */
  protected $node;

  /**
   * Source fields.
   *
   * @var object
   */
  protected $sourceValues;

  /**
   * Constructs a post node update event object.
   *
   * @param \Drupal\node\NodeInterface $node
   *   Node object.
   * @param object $sourceValues
   *   Source fields representing object in Beliana RS.
   */
  public function __construct(NodeInterface $node, $sourceValues) {
    $this->node = $node;
    $this->sourceValues = $sourceValues;
  }

  /**
   * Gets the node object.
   *
   * @return \Drupal\node\NodeInterface
   *   The node object.
   */
  public function getNode() {
    return $this->node;
  }

  /**
   * Gets the object of source fields.
   *
   * @return object
   *   Source fields.
   */
  public function getSourceValues() {
    return $this->sourceValues;
  }

}
