/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.override = {
    attach: function (context, settings) {
      $('header.header').once('header-process').each(function () {
        var $wrapper = $(this);

        $wrapper.find('.smartphone-navigation .fa-bars').on('click', function () {
          if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
          }
          else {
            $(this).parent().addClass('open');
          }
        });

        $wrapper.find('.header-navigation .word-facet-wrap').on('click', function (e) {
          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
          }
          else {
            $(this).addClass('active');
          }
        });
      });

      $('body').once('body-process').each(function () {
        var $wrapper = $(this);

        $wrapper.find('.path-rozsirene-vyhladavanie #block-kategorie .opener').on('click', function (e) {
          if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
          }
          else {
            $(this).parent().addClass('active');
          }
        });
      });

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

      // trigger to open all ilustracie .dalsie-info wrapeprs
      setTimeout(function () {
        $('.dalsie-info').trigger('open');
      }, 100);

      //add print functionallity
      $('.heslo-tools .print').on('click', function (e) {
        Drupal.behaviors.override.print(e);
      });

      //build obsah
      $(context).find('article > .heslo').once('structure-process').each(function () {
        var $word = $(this);

        $.each(['desktop', 'mobile'], function (i, selector) {
          var $wrapper = $word.find('> .obsah.' + selector);
          var $sidebar_wrapper = $word.find('.sidebar-wrapper.' + selector);
          var $images = $word.find('.heslo-ilustracia .media-image');

          $.each(['IMG', 'IMGX'], function (key, tag) {
            if ($wrapper.length) {
              var matches = $wrapper.html().match(new RegExp("\\[" + tag + "-[0-9]+\\]", 'g'));

              // replace [IMG-ID] tags in text with referenced media
              $.each(matches, function (key, match) {
                var parse = match.split('-');
                var id = parse[1].replace(']', '') - 1;
                var $tag = $wrapper.find('p:contains(' + match + ')');
                var $image = $($images[id]);

                if (tag == 'IMGX') {
                  $image.addClass('hide-description');
                }

                $($image[0].outerHTML).insertAfter($tag);
                $image.addClass('moved');
                $tag.remove();
              });
            }
          });

          if ($wrapper.find('h2, h3').length) {
            var $sidebar = $sidebar_wrapper.find('.structure');

            $sidebar.append('<h3>Obsah</h3><ul></ul>');

            $wrapper.find('h2, h3').each(function (i, item) {
              var type = $(item).is('h2') ? 'large' : 'small';
              $(item).attr('data-id', i).after('<span class="scroll-up">Naspäť na obsah</span>');
              $sidebar.find('ul').append('<li class="' + type + '"><a href="#" data-id="' + i + '">' + $(item).text() + '</a></li>');
            });

            $sidebar.on('click', 'ul > li > a', function (e) {
              e.preventDefault();
              var offset = $('body').hasClass('adminimal-admin-toolbar') ? 220 : 160;

              if (selector == 'mobile') {
                offset = $('body').hasClass('adminimal-admin-toolbar') ? 180 : 150;
              }

              $('html, body').animate({
                scrollTop: $wrapper.find('h2[data-id="' + $(this).data('id') + '"], h3[data-id="' + $(this).data('id') + '"]').offset().top - offset
              }, 300);
            });

            $sidebar.removeClass('hidden');
          }

          if (!$sidebar_wrapper.find('article.media-image.view-mode-in-word:not(.moved)').length && !$sidebar_wrapper.find('.field--name-field-table').length && !$sidebar_wrapper.find('.structure > ul').length) {
            $sidebar_wrapper.hide();
          }
        });

        $word.on('click', 'span.scroll-up', function (e) {
          $('html, body').animate({
            scrollTop: 0
          }, 300);
        });
        $word.on('click', '.citacia h3', function (e) {
          if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).parent().find('#dialog-desc').css('display', 'none');
            $(this).attr('aria-expanded', false);
            $(this).attr('aria-label', 'Sekcia: Citácia je zatvorená');
          }
          else {
            $(this).parent().removeClass('open');
            $(this).parent().addClass('open');
            $(this).parent().find('#dialog-desc').css('display', 'block');
            $(this).attr('aria-expanded', true);
            $(this).attr('aria-label', 'Sekcia: Citácia je otvorená');
          }
        });
      });

      //set "Ilustracia" image media size in "Heslo" node
      $('.heslo-ilustracia .media-image.view-mode-in-word img').each(function (key, value) {
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

      // Open collapsed facets
      $('.facets-widget-checkbox').on('click', '.facet-item--collapsed:not(.facet-item--active) > .sub-categories', function (e) {
        // e.preventDefault();
        $(this).attr('aria-expanded', true);
        // $(this).attr('aria-label', 'Podkategória otvorená');
        $(this).parent().addClass('facet-item--expanded').removeClass('facet-item--collapsed');
        $(this).parent().find('.facets-widget .facet-item--expanded').addClass('facet-item--collapsed').removeClass('facet-item--expanded');
        $(this).parent().find('.facets-widget ul li').first().find('.facets-checkbox').focus();
        $(this).parent().find('.facets-widget ul li').first().find('.facets-checkbox').attr('tabindex', 0)
      });

      // Close expanded facets
      $('.facets-widget-checkbox').on('click', '.facet-item--expanded:not(.facet-item--active) > .sub-categories', function (e) {
        // e.preventDefault();
        $(this).attr('aria-expanded', false);
        // $(this).attr('aria-label', 'Podkategória zatvorená');
        $(this).parent().addClass('facet-item--collapsed').removeClass('facet-item--expanded');
      });

      // Override facet link replacement with a checked checkbox.
      if (typeof (Drupal.facets) != 'undefined') {
        if ($.isFunction(Drupal.facets.makeCheckbox)) {
          Drupal.facets.makeCheckbox = function () {
            var $link = $(this);
            var tabindex_label = -1;
            var active = $link.hasClass('is-active');
            var collapsed = $link.parent().hasClass('facet-item--collapsed');
            var description = $link.html();
            var href = $link.attr('href');
            var id = $link.data('drupal-facet-item-id');

            $link.parent().find('.facets-widget').attr('id', id).attr('role', 'region');
            var aria_label = 'Kategória ' + $link.find('.facet-item__value')[0].outerText;
            if (collapsed) {
              aria_label = aria_label;
              tabindex_label = 0;
            }

            var checkbox = $('<input type="checkbox" class="facets-checkbox">')
              .attr('aria-controls', 'label-' + id)
              .attr('aria-checked', false)
              .attr('aria-label', aria_label)
              .data($link.data())
              .data('facetsredir', href);
            var label = $('<div aria-controls="' + id + '" tabindex="' + tabindex_label + '" role="button" class="sub-categories" aria-expanded="false" aria-label="' + aria_label + '">' + description + '</div>');

            checkbox.on('change.facets', function (e) {
              e.preventDefault();

              var $widget = $(this).closest('.js-facets-widget');

              Drupal.facets.disableFacet($widget);
              $widget.trigger('facets_filter', [ href ]);
            });

            if (active) {
              checkbox.attr('checked', true);
              label.find('.js-facet-deactivate').remove();
            }

            $link.before(checkbox).before(label).hide();
          };
        }
      }
    },
    print: function (event) {
      event.preventDefault();
      $('article .citacia h3 a').trigger('click');
      window.print();
    },
    setMediaSize: function (image, maxHeight) {
      $('body').addClass('use-loader');
      var ratio = image.height() / image.width();

      image.css({height: 'auto', width: '100%'});

//      if (ratio > 1 && image.parent().width() * ratio > maxHeight) {
//        image.css({height: maxHeight + 'px', width: 'auto'});
//      }
//
//      Drupal.behaviors.override.setMediaOrientation(image);

      $('body').addClass('is-loaded');
    },
    setMediaOrientation: function (image) {
      image.on('load', function () {
        EXIF.getData(image.get(0), function () {
          var orientation = EXIF.getTag(this, 'Orientation');
          var css = exif2css(orientation);

          if (css.transform) {
            image.css({transform: css.transform});
          }

          if (css['transform-origin']) {
            image.css({'transform-origin': css['transform-origin']});
          }
        });
      });
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

})(jQuery, Drupal);
