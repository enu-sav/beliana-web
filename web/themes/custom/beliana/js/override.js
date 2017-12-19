/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.searchNavigationFix = {
    attach: function (context, settings) {
      Drupal.behaviors.searchNavigationFix.setHeight(context);

      $(window).resize(function () {
        Drupal.behaviors.searchNavigationFix.setHeight(context);
      });
    },
    setHeight: function (context) {
      var $block = $('#block-beliana-heslo', context);
      $block.css({height: ($block.find('ul li ul').height() + 10) + 'px'});
    }
  };

})(jQuery, Drupal);