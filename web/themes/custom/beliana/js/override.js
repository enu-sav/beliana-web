/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.override = {
    attach: function (context, settings) {
      $(document).on('click', function () {
        if ($('.search-help .description').hasClass('open')) {
          $('.search-help .description').removeClass('open');
        }
      });

      $('.smartphone-navigation .fa-bars').on('click', function () {
        if ($(this).parent().hasClass('open')) {
          $(this).parent().removeClass('open');
        } else {
          $(this).parent().addClass('open');
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
      $('#block-beliana-heslo .item-list__links > li').each(function (i, item) {
        alphabet_width += $(item).width();
      });

      $('#block-beliana-heslo .facets-widget-links').prepend('<a href="#" class="navigation prev"><i class="fa fa-chevron-left"></i></a>');
      $('#block-beliana-heslo .facets-widget-links').append('<a href="#" class="navigation next"><i class="fa fa-chevron-right"></i></a>');

      if (alphabet_width > $(window).width()) {
        $('#block-beliana-heslo').addClass('is-slider');
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
      search_input_wrapper.find('.form-item-input').css({width: 'calc(100% - ' + search_input_width + 'px)'});

      $(window).resize(function () {
        if (alphabet_width > $(window).width()) {
          $('#block-beliana-heslo').addClass('is-slider');
        } else {
          $('#block-beliana-heslo').removeClass('is-slider');
        }
      });

      var alphabet_scroll_offset = 0;
      $('#block-beliana-heslo .facets-widget-links .navigation').on('click', function (e) {
        e.preventDefault();
        var scroll_width = $(this).parent().find('ul.item-list__links > li').width();

        if ($(this).hasClass('next')) {
          alphabet_scroll_offset += scroll_width;
        } else {
          alphabet_scroll_offset -= scroll_width;
        }

        $(this).parent().find('ul.item-list__links').scrollLeft(alphabet_scroll_offset);
      });

      //add print functionallity
      $('.heslo-tools .print').on('click', function (e) {
        Drupal.behaviors.override.print(e);
      });

      //set "Ilustracia" image media size in "Heslo" node
      $('.heslo-ilustracia .media-image.view-mode-in-word img').each(function (key, value) {
        Drupal.behaviors.override.setMediaSize($(value), 420);
      });

      $('article.media-image.view-mode-full img').each(function (key, value) {
        Drupal.behaviors.override.setMediaSize($(value), 660);
      });
    },
    print: function (event) {
      event.preventDefault();
      $('article .citacia h3 a').click();
      window.print();
    },
    setMediaSize: function (image, maxHeight) {
      $('body').addClass('use-loader');
      var ratio = image.height() / image.width();

      image.css({height: 'auto', width: '100%'});

//      if (ratio > 1 && image.parent().width() * ratio > maxHeight) {
//        image.css({height: maxHeight + 'px', width: 'auto'});
//      }
//
//      Drupal.behaviors.override.setMediaOrientation(image);

      $('body').addClass('is-loaded');
    },
    setMediaOrientation: function (image) {
      image.on('load', function () {
        EXIF.getData(image.get(0), function () {
          var orientation = EXIF.getTag(this, 'Orientation');
          var css = exif2css(orientation);

          if (css.transform) {
            image.css({transform: css.transform});
          }

          if (css['transform-origin']) {
            image.css({'transform-origin': css['transform-origin']});
          }
        });
      });
    }
  };

})(jQuery, Drupal);