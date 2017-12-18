/**
 * @file
 */

(function ($) {

  Drupal.behaviors.searchNavigationFix = {
    attach: function (context, settings) {
      $('#block-beliana-heslo').css({height: ($('#block-beliana-heslo ul li ul').height() + 38) + 'px'});
    }
  };

})(jQuery);