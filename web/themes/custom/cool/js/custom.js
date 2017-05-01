/**
 * @file
 */

(function ($) {

    Drupal.behaviors.searchBox = {
        attach: function (context, settings) {
            $("#search-box-mobile-toggle").click(function () {
                $(".search-box-mobile").slideToggle(200);
            });
        }
    }

    Drupal.behaviors.responsiveNav = {
        attach: function (context, settings) {
            var navigation = responsiveNav(".nav-collapse");
        }
    }

    Drupal.behaviors.tableFade = {
        attach: function () {
            if ($('.table-500').width() > $('.table-container-outer').width()) {
                $('.table-container-outer div:first-child').addClass('table-container-fade');
            }
        }
    };

})(jQuery);
