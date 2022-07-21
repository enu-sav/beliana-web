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

      if (black_white == 'black-white') {
        $('html').addClass('black-white');
        self.setBlackWhiteAttr(black_white_icon, true, 'Prístupná verzia stránky je zapnutá');
      }
      $(context).find('.wcag-icons').on('click', '.wcag-black-white', function () {
        if ($('html').hasClass('black-white')) {
          $('html').removeClass('black-white');
          self.setBlackWhiteAttr(black_white_icon, false, 'Prístupná verzia stránky je vypnutá');
          localStorage.setItem('black-white', 'normal');
        }
        else {
          $('html').addClass('black-white');
          self.setBlackWhiteAttr(black_white_icon, true, 'Prístupná verzia stránky je zapnutá');
          localStorage.setItem('black-white', 'black-white');
        }
      });
    },
    setBlackWhiteAttr: function (icon, aria_pressed, aria_label) {
      icon.attr('aria-pressed', aria_pressed);
      icon.attr('aria-label', Drupal.t(aria_label));
    }
  };

  Drupal.behaviors.click_change_format_zoznam_tools = {
    attach: function (context, settings) {
      $('.zoznam-tools .truncate-button').on('click', 'li a', function () {
        var $item = $(this);

        if ($item.hasClass('word-short')) {
          $('.views-element-container .heslo').each(function () {
            if ($(this).height() > 120) {
              $(this).addClass('truncate-wrapper');
              $(this).children('#gradient').css('display', 'block');
            }
          });
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('Možnosti zobrazenia - nastavené začiatok hesla'));
        }
        else {
          $('.views-element-container .heslo').removeClass('truncate-wrapper');
          $('.views-element-container .heslo #gradient').css('display', 'none');
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('Možnosti zobrazenia - nastavené celé heslo'));
        }

        $('.truncate-button .label').html($item.text() + '<b class="button"></b>');

        localStorage.setItem('word_search_sort', $item.attr('class'))
      });

      $('.zoznam-tools .sort-button').on('click', 'li', function () {
        var $item = $(this);

        $('.sort-button .label').html($item.text() + '<b class="button"></b>');
        $('.sort-button').toggleClass('active');

        localStorage.setItem('word_search_sort', $item.attr('class'))
      });
    }
  };

})(jQuery, Drupal);
