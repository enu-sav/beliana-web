/**
 * @file
 * WCAG tools
 */
(function ($, Drupal, cookies) {

  "use strict";

  Drupal.behaviors.wcag_tools = {
    attach: function (context, settings) {
      var $context = $(context);

      $(".accessible-alphabetical").accessibleMegaMenu({
        uuidPrefix: "accessible-alphabetical-menu",
        menuClass: 'facet-inactive',
        topNavItemClass: 'facet-item--expanded',
        panelClass: 'facets-widget',
        panelGroupClass: "sub-nav",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open"
      });

      // $context.find('article .citacia h3').attr('aria-label',"Rozbaľ citáciu stlačním klávesy enter").attr('tabindex', 0).attr('role', 'button');

      /** Black and white version **/
      var black_white = cookies.get('black-white') || 'normal';

      if (black_white == 'black-white') {
        $('html').addClass('black-white');
        $context.find('.wcag-icons .icon').attr('aria-pressed', true);
        $context.find('.wcag-icons .icon').attr('aria-label', 'Prístupná verzia stránky je zapnutá');
      }
      $context.find('.wcag-icons').on('click', '.wcag-black-white', function () {
        if ($('html').hasClass('black-white')) {
          $('html').removeClass('black-white');
          cookies.set('black-white', 'normal');
          $context.find('.wcag-icons .icon').attr('aria-pressed', false);
          $context.find('.wcag-icons .icon').attr('aria-label', 'Prístupná verzia stránky je vypnutá');
        }
        else {
          $('html').addClass('black-white');
          cookies.set('black-white', 'black-white');
          $context.find('.wcag-icons .icon').attr('aria-pressed', true);
          $context.find('.wcag-icons .icon').attr('aria-label', 'Prístupná verzia stránky je zapnutá');
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
