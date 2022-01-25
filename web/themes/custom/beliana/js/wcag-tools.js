/**
 * @file
 * WCAG tools
 */
(function ($, Drupal, cookies) {

  "use strict";

  Drupal.behaviors.wcag_tools = {
    attach: function (context, settings) {
      var $context = $(context);

      $(".facets-widget-links").accessibleMegaMenu({
        uuidPrefix: "accessible-alphabetical-menu",
        menuClass: 'facet-inactive',
        topNavItemClass: 'facet-item',
        panelClass: 'facets-widget',
        panelGroupClass: "sub-nav",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open"
      });

      // $('article .citacia h3').attr('aria-label',"Rozbaľ citáciu stlačním klávesy enter");

      /** Black and white version **/
      var black_white = cookies.get('black-white') || 'normal';

      if (black_white == 'black_white') {
        $('html').addClass('black-white');
      }
      $context.find('.wcag-icons').on('click', '.wcag-black-white', function () {
        if ($('html').hasClass('black-white')) {
          $('html').removeClass('black-white');
          cookies.set('black-white', 'normal');
        }
        else {
          $('html').addClass('black-white');
          cookies.set('black-white', 'black-white');
        }
      });

      /** Reset **/
      $context.find('.wcag-icons').on('click', '.wcag-reset', function () {
        $('html').removeClass('black-white');
        cookies.set('black-white', 'normal');
      });

    },
  };

})(jQuery, Drupal, window.Cookies);
