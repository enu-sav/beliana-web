/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.override = {
    attach: function (context, settings) {
      $('.heslo-tools .print').on('click', function (e) {
        e.preventDefault();

        $('article .citacia h3 a').click();
        window.print();
      });
    }
  };

})(jQuery, Drupal);