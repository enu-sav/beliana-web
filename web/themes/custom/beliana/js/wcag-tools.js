/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

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
