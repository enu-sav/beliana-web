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

        var footer_limit = 0;

        $(window).resize(function () {
          if (sidebar.height() > window_height - $('header.header').height() - 70 || $(window).width() < 768) {
            sidebar.css({position: 'relative'});
          } else {
            footer_limit = $('footer').position().top - sidebar.height() - $('header.header').height() - 150;
          }
        });

        $(window).scroll(function () {
          var scroll_top = $(window).scrollTop();

          if (footer_limit > 0) {
            if (scroll_top > footer_limit) {
              sidebar.css({'margin-top': (footer_limit - scroll_top) + 'px'});
            } else {
              sidebar.css({'margin-top': ''});
            }
          }
        });

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

        $(window).resize();
      });

    }
  };

})(jQuery, Drupal);
