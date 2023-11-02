/**
 * @file
 * WCAG tools
 */
(function ($, Drupal, once) {

  "use strict";

  Drupal.behaviors.headerProcess = {
    attach: function (context, settings) {

      once('header-process', 'header.header', context).forEach(function (item) {
        var wrapper = item;

        // Toggle mobile menu
        var mobileMenuToggle = wrapper.querySelector('.smartphone-navigation .fa-bars');
        if (mobileMenuToggle) {
          mobileMenuToggle.addEventListener('click', function () {
            var parent = this.parentElement;
            if (parent.classList.contains('open')) {
              parent.classList.remove('open');
              parent.setAttribute('aria-expanded', false);
              parent.setAttribute('aria-label', Drupal.t('aria-label-the-mobile-menu-is-closed'));
            }
            else {
              parent.classList.add('open');
              document.querySelector('#search-help-dialog .help').focus();
              parent.setAttribute('aria-expanded', true);
              parent.setAttribute('aria-label', Drupal.t('aria-label-the-mobile-menu-is-open'));
            }
          });
        }

        // Toggle header navigation
        var wordFacetWrap = wrapper.querySelector('.header-navigation .word-facet-wrap');
        if (wordFacetWrap) {
          wordFacetWrap.addEventListener('click', function (e) {
            if (this.classList.contains('active')) {
              this.classList.remove('active');
            }
            else {
              this.classList.add('active');
            }
          });
        }
      });

    },
  };

  Drupal.behaviors.alphabeticalAccessibleMenu = {
    attach: function (context, settings) {

      $(".accessible-alphabetical").accessibleMegaMenu({
        uuidPrefix: "accessible-alphabetical-menu",
        menuClass: 'facet-inactive',
        topNavItemClass: 'facet-item--expanded',
        panelClass: 'facets-widget',
        panelGroupClass: "sub-nav",
        hoverClass: "hover",
        focusClass: "focus",
        openClass: "open"
      });

    }
  };

  Drupal.behaviors.blackWhite = {
    attach: function (context, settings) {

      /** Black and white version **/
      once('wcag-icons-icon-black-white', '.wcag-icons .icon-black-white', context).forEach(function (item) {
        // Black and white version
        var blackWhiteIcon = item;
        var blackWhite = localStorage.getItem('black-white') || 'normal';

        if (blackWhite === 'black-white') {
          document.documentElement.classList.add('black-white');
          blackWhiteIcon.setAttribute('aria-pressed', true);
          blackWhiteIcon.setAttribute('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-on'));
        }
        item.parentElement.addEventListener('click', function (event) {
          if (document.documentElement.classList.contains('black-white')) {
            document.documentElement.classList.remove('black-white');
            blackWhiteIcon.setAttribute('aria-pressed', false);
            blackWhiteIcon.setAttribute('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-off'));
            localStorage.setItem('black-white', 'normal');
          }
          else {
            document.documentElement.classList.add('black-white');
            blackWhiteIcon.setAttribute('aria-pressed', true);
            blackWhiteIcon.setAttribute('aria-label', Drupal.t('wcag-accessible-version-of-the-site-is-turned-on'));
            localStorage.setItem('black-white', 'black-white');
          }
        });
      });

    },
  };

  Drupal.behaviors.clickChangeSearch = {
    attach: function (context, settings) {

      var searchHelp = document.querySelector('.search-help');
      searchHelp.addEventListener('click', function (e) {
        if (e.target.classList.contains('text')) {
          var desc = e.target.parentElement;
          var button = e.target;

          if (document.querySelector('.search-help .description').classList.contains('open')) {
            setTimeout(function () {
              document.querySelector('.search-help .description').classList.remove('open');
              document.querySelectorAll('.search-help .text').forEach(function (element) {
                element.setAttribute('aria-expanded', false);
                element.setAttribute('aria-label', Drupal.t('aria-label-search-options-are-closed'));
              });
            }, 150);
          }
          else {
            setTimeout(function () {
              desc.querySelector('.description').classList.add('open');
              document.querySelector('#search-help-dialog .help').focus();
              button.setAttribute('aria-expanded', true);
              document.querySelectorAll('.search-help .text').forEach(function (element) {
                element.setAttribute('aria-label', Drupal.t('aria-label-search-options-are-open'));
              });
            }, 150);
          }
        }
      });

    }
  };


})(jQuery, Drupal, once);
