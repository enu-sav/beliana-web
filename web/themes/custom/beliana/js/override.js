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