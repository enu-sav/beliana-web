/**
 * @file
 */

(function ($) {

  Drupal.behaviors.selectric = {
    attach: function () {
      $('.share').click(function () {
        $(this).toggleClass('active');
      });
    }
  };

})(jQuery);
