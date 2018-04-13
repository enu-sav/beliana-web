/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.override = {
    attach: function (context, settings) {
      $('.smartphone-navigation .fa-bars').on('click', function () {
        if ($(this).parent().hasClass('open')) {
          $(this).parent().removeClass('open');
        } else {
          $(this).parent().addClass('open');
        }
      });

      if ($(window).width() < 768) {
        $('.header .header-navigation .word-facet-wrap').on('click', function (e) {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
          } else {
            $(this).addClass('active');
          }
        });
      }

      // trigger to open all ilustracie .dalsie-info wrapeprs
      setTimeout(function () {
        $('.dalsie-info').trigger('open');
      }, 100);

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

      //Configure colorbox call back to resize with custom dimensions 
      if (jQuery().colorbox) {
        $.colorbox.settings.onLoad = function () {
          Drupal.behaviors.override.colorboxResize(false);
        };

        $(window).resize(function () {
          Drupal.behaviors.override.colorboxResize(true);
        });
      }
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
    },
    colorboxResize: function (resize) {
      var width = '90%';
      var height = '90%';

      $.colorbox.settings.height = height;
      $.colorbox.settings.width = width;

      //if window is resized while lightbox open
      if (resize) {
        $.colorbox.resize({
          'height': height,
          'width': width
        });
      }
    }
  };

})(jQuery, Drupal);