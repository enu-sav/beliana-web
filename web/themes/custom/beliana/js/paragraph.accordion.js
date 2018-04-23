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
          
          console.log($(this).attr('href'));

          sidebar.find('li a').removeClass('active');
          $(this).addClass('active');

          $('html, body').animate({
            scrollTop: content.find($(this).attr('href')).offset().top - 80
          }, 500);
        });
      });

    }
  };

})(jQuery, Drupal);