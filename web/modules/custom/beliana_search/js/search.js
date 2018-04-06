/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.search = {
    attach: function (context, settings) {
      var current_letter = false;
      var window_width = $(window).width();

      //focus to search input if keyword exist
      if ($('#block-beliana-searchbox .search-input-wrapper input.search-input').val().length > 0) {
        // delay for firefox
        setTimeout(function () {
          $('#block-beliana-searchbox .search-input-wrapper input.search-input').focus();
        }, 10);
      }

      if (!$.isEmptyObject(drupalSettings)) {
        current_letter = drupalSettings.beliana_search.alphabet;
      }

      $(document).on('click', function () {
        if ($('.search-help .description').hasClass('open')) {
          $('.search-help .description').removeClass('open');
        }
      });

      $('.search-help').on('click', function () {
        var desc = $(this);
        setTimeout(function () {
          desc.find('.description').addClass('open');
        }, 150);
      });

      //set alphabet facet slides wrappers
      var alphabet_width = 155;
      var alphabet_scroll_offset = 0;
      var alphabet_navigation = $('#block-beliana-heslo .facets-widget-links');

      $('#block-beliana-heslo .item-list__links > li').each(function (i, item) {
        alphabet_width += $(item).width();
      });

      $('#block-beliana-heslo .facets-widget-links').prepend('<a href="#" class="navigation prev hide"><i class="fa fa-chevron-left"></i></a>');
      $('#block-beliana-heslo .facets-widget-links').append('<a href="#" class="navigation next"><i class="fa fa-chevron-right"></i></a>');

      if (alphabet_width > window_width) {
        $('#block-beliana-heslo').addClass('is-slider');

        if (current_letter) {
          var current_item = $('#block-beliana-heslo .item-list__links > li > a[data-drupal-facet-item-value="' + current_letter + '"]').parent();

          if (current_item.offset().left + 80 > window_width) {
            alphabet_scroll_offset = current_item.offset().left - window_width + 80;

            if (alphabet_scroll_offset > 0) {
              alphabet_navigation.find('.navigation.prev').removeClass('hide');
            }


            $('#block-beliana-heslo .item-list__links').animate({scrollLeft: alphabet_scroll_offset}, 500);
          }
        }
      }

      var alphabet_offset = $('#block-beliana-heslo .item-list__links').width() - alphabet_width;

      if (alphabet_offset > 5) {
        $('#block-beliana-heslo .item-list__links').css({
          'width': alphabet_width - 25,
          'margin-left': (alphabet_offset + 25) / 2
        });
      }

      var search_input_wrapper = $('#block-beliana-searchbox .search-input-wrapper.has-alphabet');
      var search_input_width = search_input_wrapper.find('.search-alphabet-wrapper').width() + 40;
      var scroll_width = alphabet_navigation.find('ul.item-list__links > li').first().width();
      var scroll_count = alphabet_navigation.find('ul.item-list__links > li').length;

      search_input_wrapper.find('.form-item-input').css({width: 'calc(100% - ' + search_input_width + 'px)'});

      if (alphabet_scroll_offset > 0) {
        alphabet_navigation.find('.navigation.prev').removeClass('hide');
      }

      alphabet_navigation.find('.navigation').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('next')) {
          alphabet_scroll_offset += scroll_width * 2;

        } else {
          alphabet_scroll_offset -= scroll_width * 2;
        }

        if (alphabet_scroll_offset > 0) {
          alphabet_navigation.find('.navigation.prev').removeClass('hide');
        } else {
          alphabet_navigation.find('.navigation.prev').addClass('hide');
        }

        if (alphabet_scroll_offset > (scroll_count * scroll_width - alphabet_navigation.width() + 140)) {
          alphabet_navigation.find('.navigation.next').addClass('hide');
        } else {
          alphabet_navigation.find('.navigation.next').removeClass('hide');
        }

        $(this).parent().find('ul.item-list__links').animate({scrollLeft: alphabet_scroll_offset}, 500);
      });

      if (window_width < 768) {
        $('#block-beliana-heslo .item-list__links > li > a').on('click touch', function (e) {
          e.preventDefault();

          if ($(this).parent().hasClass('opened')) {
            window.location.href = $(this).attr('href');
          } else {
            $('#block-beliana-heslo .item-list__links > li').removeClass('opened');
            $(this).parent().addClass('opened');
          }
        });
      }

      $(window).resize(function () {
        window_width = $(window).width();

        if (alphabet_width > window_width) {
          $('#block-beliana-heslo').addClass('is-slider');
        } else {
          $('#block-beliana-heslo').removeClass('is-slider');
        }
      });
    },
    scrollNavigation: function () {

    }
  };

})(jQuery, Drupal);