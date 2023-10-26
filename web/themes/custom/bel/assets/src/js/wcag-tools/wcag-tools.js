/**
 * @file
 * WCAG tools
 */
(function ($, Drupal, once) {

  "use strict";

  Drupal.behaviors.headerProcess = {
    attach: function (context, settings) {
      once('header-process', 'header.header', context).forEach(function (item) {
        var wrapper = $(item);

        wrapper.find('.smartphone-navigation .fa-bars').on('click', function () {
          if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).parent().attr('aria-expanded', false);
            $(this).parent().attr('aria-label', Drupal.t('aria-label-the-mobile-menu-is-closed'));
          }
          else {
            $(this).parent().addClass('open');
            $('#search-help-dialog .help').focus();
            $(this).parent().attr('aria-expanded', true);
            $(this).parent().attr('aria-label', Drupal.t('aria-label-the-mobile-menu-is-open'));
          }
        });

        wrapper.find('.header-navigation .word-facet-wrap').on('click', function (e) {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
          }
          else {
            $(this).addClass('active');
          }
        });
      });
    },
  };
  Drupal.behaviors.alphabetical_accessible_menu = {
    attach: function (context, settings) {
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
    }
  };

  Drupal.behaviors.black_white = {
    attach: function (context, settings) {
      var self = this;

      /** Black and white version **/
      var black_white_icon = $(context).find('.wcag-icons .icon-black-white');
      var black_white = localStorage.getItem('black-white') || 'normal';

      // $(context).find('#edit-input').val(Drupal.t('wcag-accessible-version-of-the-site-is-turned-off'));
      // console.log(Drupal.t("wcag-accessible-version-of-the-site-is-turned-off"));

      if (black_white == 'black-white') {
        $('html').addClass('black-white');
        black_white_icon.attr('aria-pressed', true);
        black_white_icon.attr('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-on'));
      }
      $(context).find('.wcag-icons').on('click', '.wcag-black-white', function () {
        if ($('html').hasClass('black-white')) {
          $('html').removeClass('black-white');
          black_white_icon.attr('aria-pressed', false);
          black_white_icon.attr('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-off'));
          localStorage.setItem('black-white', 'normal');
        }
        else {
          $('html').addClass('black-white');
          black_white_icon.attr('aria-pressed', true);
          black_white_icon.attr('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-on'));
          localStorage.setItem('black-white', 'black-white');
        }
      });
    },
  };

  Drupal.behaviors.click_change_search = {
    attach: function (context, settings) {

      $('.search-help').on('click', '.text', function (e) {
        var desc = $(this).parent();
        var button = $(this);

        if ($('.search-help .description').hasClass('open')) {
          setTimeout(function () {
            $('.search-help .description').removeClass('open');
            $('.search-help .text').attr('aria-expanded', false);
            $('.search-help .text').attr('aria-label', Drupal.t('aria-label-search-options-are-closed'));
          }, 150);
        }
        else {
          setTimeout(function () {
            desc.find('.description').addClass('open');
            $('#search-help-dialog .help').focus();
            button.attr('aria-expanded', true);
            $('.search-help .text').attr('aria-label', Drupal.t('aria-label-search-options-are-open'));
          }, 150);
        }
      });
    }
  };


})(jQuery, Drupal, once);
