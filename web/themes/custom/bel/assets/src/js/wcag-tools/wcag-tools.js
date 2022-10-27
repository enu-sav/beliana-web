/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.headerProcess = {
    attach: function (context, settings) {
      $('header.header').once('header-process').each(function () {
        var $wrapper = $(this);

        $wrapper.find('.smartphone-navigation .fa-bars').on('click', function () {
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

        $wrapper.find('.header-navigation .word-facet-wrap').on('click', function (e) {
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

  Drupal.behaviors.click_change_format_list_tools = {
    attach: function (context, settings) {
      var self = this;
      var word_search_short = localStorage.getItem('word-search-short') || 'normal';

      if (word_search_short != null) {
        $('.truncate-button .' + word_search_short).click();
      }
      else {
        $('.truncate-button .word-short').click();
      }
      $('.list-tools .truncate-button').once().on('click', 'li a', function () {
        var $item = $(this);

        if ($item.hasClass('word-short')) {
          $('.views-element-container .word').each(function () {
            if ($(this).height() > 120) {
              $(this).addClass('truncate-wrapper');
              $(this).children('#gradient').css('display', 'block');
            }
          });
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('wcag-display-options-the-beginning-of-the-password-is-set'));
        }
        else {
          $('.views-element-container .word').removeClass('truncate-wrapper');
          $('.views-element-container .word #gradient').css('display', 'none');
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('wcag-display-options-the-entire-password-is-set'));
        }

        $('.truncate-button .label').html($item.text() + '<b class="button"></b>');
        $('.truncate-button').toggleClass('active');

        localStorage.setItem('word-search-short', $item.attr('class'))
      });


      var word_search_sort = localStorage.getItem('word-search-sort') || 'alphabet-asc';

      if (word_search_sort != null) {
        $('.sort-button .' + word_search_sort).click();
      }
      else {
        $('.sort-button .alphabet-asc').click();
      }

      $('.list-tools .sort-button').once().on('click', 'li a', function () {
        var $item = $(this);

        $('.sort-button .label').html($item.text() + '<b class="button"></b>');
        $('.sort-button').toggleClass('active');

        localStorage.setItem('word-search-sort', $item.attr('class'))
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


})(jQuery, Drupal);
