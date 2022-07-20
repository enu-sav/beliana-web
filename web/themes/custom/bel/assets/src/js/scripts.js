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

	})(Drupal, jQuery);
}