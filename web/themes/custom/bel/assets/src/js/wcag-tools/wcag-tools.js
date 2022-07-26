/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  "use strict";

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

  Drupal.behaviors.click_change_format_zoznam_tools = {
    attach: function (context, settings) {
      $('.list-tools .truncate-button').on('click', 'li a', function () {
        var $item = $(this);

        if ($item.hasClass('word-short')) {
          $('.views-element-container .heslo').each(function () {
            if ($(this).height() > 120) {
              $(this).addClass('truncate-wrapper');
              $(this).children('#gradient').css('display', 'block');
            }
          });
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('wcag-display-options-the-beginning-of-the-password-is-set'));
        }
        else {
          $('.views-element-container .heslo').removeClass('truncate-wrapper');
          $('.views-element-container .heslo #gradient').css('display', 'none');
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('wcag-display-options-the-entire-password-is-set'));
        }

        $('.truncate-button .label').html($item.text() + '<b class="button"></b>');

        localStorage.setItem('word_search_sort', $item.attr('class'))
      });

      $('.list-tools .sort-button').on('click', 'li', function () {
        var $item = $(this);

        $('.sort-button .label').html($item.text() + '<b class="button"></b>');
        $('.sort-button').toggleClass('active');

        localStorage.setItem('word_search_sort', $item.attr('class'))
      });
    }
  };

  Drupal.behaviors.click_change_citation = {
    attach: function (context, settings) {
      $word.on('click', '.citation h3', function (e) {
        if ($(this).parent().hasClass('open')) {
          $(this).parent().removeClass('open');
          $(this).parent().find('#dialog-desc').css('display', 'none');
          $(this).attr('aria-expanded', false);
          $(this).attr('aria-label', Drupal.t('aria-label-section-citation-is-closed'));
        }
        else {
          $(this).parent().removeClass('open');
          $(this).parent().addClass('open');
          $(this).parent().find('#dialog-desc').css('display', 'block');
          $(this).attr('aria-expanded', true);
          $(this).attr('aria-label', Drupal.t('aria-label-section-citation-is-open'));
        }
      });
    }
  };


})(jQuery, Drupal);
