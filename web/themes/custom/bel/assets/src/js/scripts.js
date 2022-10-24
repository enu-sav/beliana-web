/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

/**
 * SVG-Sprite: uncomment if you want to use a svg-sprite
 * If you experience to much delay when loading icons, then move this to the
 * bottom of html.html.twig
 */
// (function() {
//   var ajax = new XMLHttpRequest();
//   ajax.open("GET", "/themes/custom/stromkongress/dist/assets/svg/sprite.svg", true);
//   ajax.onload = function(e) {
//     var div = document.createElement("div");
//     div.innerHTML = ajax.responseText;
//     div.setAttribute('class', 'svg-sprite visually-hidden');
//     document.body.insertBefore(div, document.body.childNodes[0]);
//   };
//   ajax.send();
// })();

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
if (typeof Drupal !== 'undefined') {
	(function(Drupal, $) {
		'use strict';

		/**
		 * Open external content links in new window
		 */
		Drupal.behaviors.externalLinks = {
			attach: function(context, settings) {
				$('a[href^="http"]').not('[href*="' + location.host + '"]').once('processed').attr('target', '_blank');
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
			attach: function(context, settings) {
				$('a.smooth-scroll').once('smooth-scroll-once').on('click', function(event) {
					event.preventDefault();
					$('html, body').animate({scrollTop: $($.attr(this, 'href')).offset().top - 50}, 'slow');
				});
			}
		};

		/**
		 * Menu toggler
		 */
		Drupal.behaviors.menuToggler = {
			attach: function(context, settings) {
				$('#hamburger-toggle').once('processed').on('click', function() {
					$(this).toggleClass('is-active');
					$('body').toggleClass('menu-overlay-open');
				});
			}
		};

		/**
		 * Float webform labels over input
		 */
		Drupal.behaviors.webformFloatingLabels = {
			attach: function(context, settings) {
				// Handle label/input state
				$('form input, form textarea').once('addFocusListener').on('blur', function() {
					if($(this).val() !== '') {
						$(this).addClass('focus');
					} else {
						$(this).removeClass('focus');
					}
				}).trigger('blur');
			}
		};

    Drupal.behaviors.override = {
      attach: function (context, settings) {

        // sticky header
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          var header_offset = 46;
          var title_offset = 169;

          if ($(window).width() < 768) {
            header_offset = 52;
            title_offset = 174;
          }
          else if ($(window).width() < 948) {
            header_offset = 74;
            title_offset = 200;
          }

          if ($('#content-main').height() > 500) {
            if (scroll >= header_offset) {
              $('body').addClass('sticky-header');
            }
            else {
              $('body').removeClass('sticky-header');
            }

            if (scroll >= title_offset) {
              $('body').addClass('sticky-title');
            }
            else {
              $('body').removeClass('sticky-title');
            }
          }
        });

        $('body').once('body-process').each(function () {
          var $wrapper = $(this);

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

	})(Drupal, jQuery);
}
