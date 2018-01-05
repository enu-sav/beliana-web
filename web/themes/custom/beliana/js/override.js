/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.override = {
    attach: function (context, settings) {
      $('.heslo-tools .print').on('click', function (e) {
        e.preventDefault();

        $('article .citacia h3 a').click();
        window.print();
      });

      //set "Ilustracia" image media size in "Heslo" node
      $('.heslo-ilustracia .media-image.view-mode-in-word img').each(function (key, value) {
        Drupal.behaviors.override.setMediaImageSize($(value), 420);
      });

      $('article.media-image.view-mode-full img').each(function (key, value) {
        Drupal.behaviors.override.setMediaImageSize($(value), 660);
      });
    },
    setMediaImageSize: function (image, maxHeight) {
      var ratio = image.height() / image.width();

      image.css({width: '100%'});

      if (ratio > 1 && image.parent().width() * ratio > maxHeight) {
        image.css({height: maxHeight + 'px', width: 'auto'});
      }
    }
  };

})(jQuery, Drupal);