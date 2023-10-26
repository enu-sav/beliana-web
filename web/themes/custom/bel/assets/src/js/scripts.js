(function ($, Drupal, once) {
  'use strict';

  /**
   * Sticky header scroll
   */
  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {

      var $body = $('body');

      $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();
        var header_offset = 40;

        if ($(window).width() < 768) {
          header_offset = 52;
        }
        else if ($(window).width() < 948) {
          header_offset = 74;
        }
        else if ($(window).width() < 1085) {
          header_offset = 58;
        }

        if ($('#content-main').height() > 500) {
          if (scroll >= header_offset) {
            $body.addClass('sticky-header');
          }
          else {
            $body.removeClass('sticky-header');
          }
        }
      });
    },
  };

  /**
   * Open external content links in new window
   */
  Drupal.behaviors.externalLinks = {
    attach: function (context, settings) {
      const links = document.querySelectorAll('a[href^="http"]');
      const currentHost = window.location.host;

      links.forEach(link => {
        if (!link.href.includes(currentHost)) {
          if (!link.classList.contains('processed')) {
            link.setAttribute('target', '_blank');
            link.classList.add('processed');
          }
        }
      });
    }
  };

  Drupal.behaviors.share = {
    attach: function () {
      $('.share').click(function () {
        $(this).toggleClass('active');
      });
    }
  };

  /**
   * Activate smooth scrolling on a.smooth-scroll
   */
  Drupal.behaviors.smoothScroll = {
    attach: function (context, settings) {
      once('smooth-scroll-once', 'a.smooth-scroll', context).forEach(function (item) {
        $(item).on('click', function (event) {
          event.preventDefault();
          $('html, body').animate({scrollTop: $($.attr(this, 'href')).offset().top - 50}, 'slow');
        });
      });
    }
  };

  /**
   * Menu toggler
   */
  Drupal.behaviors.menuToggler = {
    attach: function (context, settings) {
      once('processed', '#hamburger-toggle', context).forEach(function (item) {
        $(item).toggleClass('is-active');
        $('body').toggleClass('menu-overlay-open');
      });
    }
  };

  /**
   * Float webform labels over input
   */
  Drupal.behaviors.webformFloatingLabels = {
    attach: function (context, settings) {
      // Handle label/input state
      once('addFocusListener', 'form input, form textarea', context).forEach(function (item) {
        $(item).on('blur', function () {
          if ($(this).val() !== '') {
            $(this).addClass('focus');
          }
          else {
            $(this).removeClass('focus');
          }
        }).trigger('blur');
      });
    }
  };

  Drupal.behaviors.override = {
    attach: function (context, settings) {

      once('body-process', 'body', context).forEach(function (item) {
        var $wrapper = $(item);

        $wrapper.find('.path-rozsirene-vyhladavanie #block-bel-categories .opener').on('click', function (e) {
          if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
          }
          else {
            $(this).parent().addClass('active');
          }
        });
      });

      //set "Ilustracia" image media size in "Heslo" node
      $('.word-illustration .media-image.view-mode-in-word img').each(function (key, value) {
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
      $('.word-tools .print').on('click', function (e) {
        Drupal.behaviors.override.print(e);
      });
    },
    print: function (event) {
      event.preventDefault();
      $('article .citacia h3 a').trigger('click');
      window.print();
    },
    setMediaSize: function (image, maxHeight) {
      $('body').addClass('use-loader');
      image.css({height: 'auto', width: '100%'});

      $('body').addClass('is-loaded');
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

})(jQuery, Drupal, once);
