<?php

namespace Drupal\beliana_base\Plugin\Filter;

use Drupal\Component\Serialization\Json;
use Drupal\filter\Plugin\FilterBase;
use Drupal\filter\FilterProcessResult;
use Drupal\Core\Url;

/**
 * Provides a filter to format text with MathJax.
 *
 * Wraps the text in a div with a class name that is looked-for
 * by the MathJax Javascript library.
 *
 * @Filter(
 *   id = "beliana_filter_mathjax",
 *   module = "mathjax",
 *   title = @Translation("Beliana - MathJax"),
 *   description = @Translation("Mathematics inside the configured delimiters is rendered by MathJax."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 *   weight = 50
 * )
 */
class MathjaxFilter extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    // Do nothing if the text has no formulas.
    if (!$this->hasMathFormulas($text)) {
      return new FilterProcessResult($text);
    }

    $wrapped = strip_tags($text) !== 'TEST' ? '<div class="tex2jax_process">' . $text . '</div>' : $text;
    $result = new FilterProcessResult($wrapped);
    $config = \Drupal::config('mathjax.settings');
    $config_type = $config->get('config_type');
    if ($config_type == 1) {
      $result->setAttachments([
        'library' => [
          'mathjax/config',
          'mathjax/source',
          'mathjax/setup',
        ],
        'drupalSettings' => [
          'mathjax' => [
            'config_type' => $config_type,
            'config' => json_decode($config->get('config_string')),
          ],
        ],
      ]);
    }
    return $result;
  }

  /**
   * Returns a flag whether given text contains math formulas.
   *
   * @param string $text
   *   The text to process.
   *
   * @return bool
   *   Returns TRUE if the given text contains formulas. Otherwise, FALSE.
   */
  public function hasMathFormulas($text) {
    $config = \Drupal::config('mathjax.settings');
    $default_configuration = Json::decode($config->get('default_config_string'));
    $delimiters = isset($default_configuration['tex2jax']['inlineMath']) ? $default_configuration['tex2jax']['inlineMath'] : [];
    $default_delimiters = [['$$', '$$'], ['\[', '\]']];
    $delimiters = array_merge($delimiters, $default_delimiters);

    foreach ($delimiters as $delimiter) {
      list($start, $end) = $delimiter;
      if (mb_strpos($text, $start) !== FALSE) {
        return TRUE;
      }
      elseif ($end != $start && mb_strpos($text, $end) !== FALSE) {
        return TRUE;
      }
    }

    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function tips($long = FALSE) {
    return $this->t('<span class="tex2jax_ignore">Mathematics inside the <a href=":url">configured delimiters</a> is
      rendered by MathJax. The default math delimiters are $$...$$ and \[...\] for
      displayed mathematics, and $...$ and \(...\) for in-line mathematics.</span>',
        [':url' => Url::fromRoute('mathjax.settings')->toString()]
    );
  }

}
