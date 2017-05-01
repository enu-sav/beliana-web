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

    Drupal.behaviors.tableFade = {
        attach: function () {
            if ($('.table-500').width() > $('.table-container-outer').width()) {
                $('.table-container-outer div:first-child').addClass('table-container-fade');
            }
        }
    };

})(jQuery);
