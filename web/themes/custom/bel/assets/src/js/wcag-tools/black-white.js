/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.black_white = {
    attach: function (context, settings) {
      var self = this;

      /** Black and white version **/
      var black_white_icon = $(context).find('.wcag-icons .icon-black-white');
      var black_white = localStorage.getItem('black-white') || 'normal';

      if (black_white == 'black-white') {
        $('html').addClass('black-white');
        self.setBlackWhiteAttr(black_white_icon, true, 'Prístupná verzia stránky je zapnutá');
      }
      $(context).find('.wcag-icons').on('click', '.wcag-black-white', function () {
        if ($('html').hasClass('black-white')) {
          $('html').removeClass('black-white');
          self.setBlackWhiteAttr(black_white_icon, false, 'Prístupná verzia stránky je vypnutá');
          localStorage.setItem('black-white', 'normal');
        }
        else {
          $('html').addClass('black-white');
          self.setBlackWhiteAttr(black_white_icon, true, 'Prístupná verzia stránky je zapnutá');
          localStorage.setItem('black-white', 'black-white');
        }
      });
    },
    setBlackWhiteAttr: function (icon, aria_pressed, aria_label) {
      icon.attr('aria-pressed', aria_pressed);
      icon.attr('aria-label', aria_label);
    }
  };

})(jQuery, Drupal);
