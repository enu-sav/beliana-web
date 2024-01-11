(function ($, Drupal, once) {
  'use strict';

  /**
   * Sticky header scroll
   */
  Drupal.behaviors.stickyHeader = {
    attach: function (context, settings) {

      var body = document.body;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;

      function updateStickyHeader() {
        var scroll = window.scrollY || window.pageYOffset;
        var headerOffset = 40;

        if (windowWidth < 768) {
          headerOffset = 52;
        } else if (windowWidth < 948) {
          headerOffset = 74;
        } else if (windowWidth < 1085) {
          headerOffset = 58;
        }

        var contentMain = document.getElementById('content-main');

        if (contentMain && contentMain.clientHeight > 500) {
          if (scroll >= headerOffset) {
            body.classList.add('sticky-header');
          } else {
            body.classList.remove('sticky-header');
          }
        }
      }

      updateStickyHeader();

      window.addEventListener('scroll', updateStickyHeader);
      window.addEventListener('resize', function () {
        windowWidth = window.innerWidth || document.documentElement.clientWidth;
        updateStickyHeader();
      });

      Drupal.behaviors.stickyHeader.once = true;

    },
  };

  /**
   * Open external content links in a new window
   */
  (function (Drupal) {
    Drupal.behaviors.externalLinks = {
      attach: function (context, settings) {

        var externalLinks = document.querySelectorAll('.layout-container a[href^="http"]');
        externalLinks.forEach(function(link) {
          if (!link.href.includes(location.host) && link.href !== 'https://beliana.sav.sk/') {
            link.setAttribute('target', '_blank');
          }
        });

        var pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
        pdfLinks.forEach(function(link) {
          link.setAttribute('target', '_blank');
        });

      }
    };
  })(Drupal);

  Drupal.behaviors.share = {
    attach: function () {

      const shareElements = document.querySelectorAll('.share');

      shareElements.forEach(shareElement => {
        shareElement.addEventListener('click', function () {
          this.classList.toggle('active');
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
        if (item) {
          item.classList.toggle('is-active');
          document.body.classList.toggle('menu-overlay-open');
        }
      });

    }
  };

  /**
   * Float webform labels over input
   */
  Drupal.behaviors.webformFloatingLabels = {
    attach: function (context, settings) {
      // Handle label/input state
      var inputs = context.querySelectorAll('form input, form textarea');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', function () {
          if (this.value !== '') {
            this.classList.add('focus');
          } else {
            this.classList.remove('focus');
          }
        });
        inputs[i].dispatchEvent(new Event('blur'));
      }
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
