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
        var window_height = $(window).height();

        if (sidebar.height() > window_height - $('header.header').height() - 70) {
          sidebar.css({position: 'relative'});
        } else {
          var footer_position_top = $('footer').position().top;

          $(window).scroll(function () {
            if ($(window).scrollTop() > footer_position_top + sidebar.height() - $('footer').height() - window_height) {
              sidebar.css({position: 'relative', top: (footer_position_top - $('header.header').height() - $('footer').height() - sidebar.height() - 50) + 'px'});
            } else {
              sidebar.css({position: 'fixed', top: ''});
            }
          });
        }

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