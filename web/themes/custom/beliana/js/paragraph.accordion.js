/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.paragraphAccordion = {
    attach: function (context, settings) {
      var $context = $(context);

      $context.find('.paragraph--type--accordion').once('paragraph-accordion-process').each(function () {
        var sidebar = $('.sidebar-menu ul', this);
        var content = $('.content .field--name-field-section');

        sidebar.on('click', 'li a', function (e) {
          e.preventDefault();

          sidebar.find('li a').removeClass('active');
          $(this).addClass('active');

          var offset = 0;
          if ($('body').hasClass('adminimal-admin-toolbar')) {
            offset = 80;
          }

          $('html, body').animate({
            scrollTop: content.find($(this).attr('href')).offset().top - offset
          }, 500);
        });
      });

    }
  };

})(jQuery, Drupal);