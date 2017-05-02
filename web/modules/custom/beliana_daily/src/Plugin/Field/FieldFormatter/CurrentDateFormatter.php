<?php

namespace Drupal\beliana_daily\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\datetime\Plugin\Field\FieldFormatter\DateTimeDefaultFormatter;

/**
 * Plugin implementation of the 'Current date' formatter for 'datetime' fields.
 *
 * @FieldFormatter(
 *   id = "beliana_current_date",
 *   label = @Translation("Current date"),
 *   field_types = {
 *     "datetime"
 *   }
 * )
 */
class CurrentDateFormatter extends DateTimeDefaultFormatter {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    $today = date('md');
    $output_dates = [];
    foreach ($items as $delta => $item) {
      if ($item->date) {
        /** @var \Drupal\Core\Datetime\DrupalDateTime $date */
        $date = $item->date;

        if ($this->getFieldSetting('datetime_type') == 'date') {
          // A date without time will pick up the current time, use the default.
          datetime_date_default_time($date);
        }

        // Display items belonging to the same day and month only.
        $local_today = $date->format("md");
        if ($local_today !== $today) {
          continue;
        }

        // Create the ISO date in Universal Time.
        $iso_date = $date->format("Y-m-d\TH:i:s") . 'Z';

        $this->setTimeZone($date);

        $output_dates[$this->formatDate($date)] = $iso_date;

      }
    }

    // Sort from earliest to latest.
    ksort($output_dates);

    foreach ($output_dates as $year => $iso_date) {
      // Display the date using theme datetime.
      $elements[] = [
        '#cache' => [
          'contexts' => [
            'timezone',
          ],
        ],
        '#theme' => 'time',
        '#text' => $year,
        '#html' => FALSE,
        '#attributes' => [
          'datetime' => $iso_date,
        ],
      ];
    }

    return $elements;

  }

}
