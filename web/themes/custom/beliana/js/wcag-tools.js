/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.wcag_tools = {
    attach: function (context, settings) {
      var $context = $(context);

      /** Black and white version **/
      var black_white = localStorage.getItem('black-white') || 'normal';

      if (black_white == 'black_white') {
        $('body').addClass('black-white');
      }
      $context.find('.wcag-icons').on('click', '.wcag-black-white', function () {
        if ($('body').hasClass('black-white')) {
          $('body').removeClass('black-white');
          localStorage.setItem('black-white', 'normal');
        }
        else {
          $('body').addClass('black-white');
          localStorage.setItem('black-white', 'black_white');
        }
      });

      /** Reset **/
      $context.find('.wcag-icons').on('click', '.wcag-reset', function () {
        $('body').removeClass('black-white');
        localStorage.setItem('black-white', 'normal');
      });

    }
  };

})(jQuery, Drupal);
