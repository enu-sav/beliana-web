/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.override = {
    attach: function (context, settings) {
      $('.smartphone-navigation .fa-bars').on('click', function () {
        if ($(this).parent().hasClass('open')) {
          $(this).parent().removeClass('open');
        }
        else {
          $(this).parent().addClass('open');
        }
      });

      $('.header .header-navigation .word-facet-wrap').on('click', function (e) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        }
        else {
          $(this).addClass('active');
        }
      });

      $('body.path-rozsirene-vyhladavanie #block-kategorie .opener').on('click', function (e) {
        if ($(this).parent().hasClass('active')) {
          $(this).parent().removeClass('active');
        }
        else {
          $(this).parent().addClass('active');
        }
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

            if (!$sidebar_wrapper.find('article.media-image.view-mode-in-word:not(.moved)').length && !$sidebar_wrapper.find('.field--name-field-table').length) {
              $sidebar_wrapper.hide();
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
        });

        $word.on('click', 'span.scroll-up', function (e) {
          $('html, body').animate({
            scrollTop: 0
          }, 300);
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
      $('.facets-widget-checkbox').on('click', '.facet-item--collapsed:not(.facet-item--active) > label', function (e) {
        $(this).parent().addClass('facet-item--expanded').removeClass('facet-item--collapsed');
        $(this).parent().find('.facets-widget- .facet-item--expanded').addClass('facet-item--collapsed').removeClass('facet-item--expanded');
      });

      // Close expanded facets
      $('.facets-widget-checkbox').on('click', '.facet-item--expanded:not(.facet-item--active) > label', function (e) {
        $(this).parent().addClass('facet-item--collapsed').removeClass('facet-item--expanded');
      });

      // Override facet link replacement with a checked checkbox.
      if (typeof (Drupal.facets) != 'undefined') {
        if ($.isFunction(Drupal.facets.makeCheckbox)) {
          Drupal.facets.makeCheckbox = function () {
            var $link = $(this);
            var active = $link.hasClass('is-active');
            var description = $link.html();
            var href = $link.attr('href');
            var id = $link.data('drupal-facet-item-id');

            var checkbox = $('<input type="checkbox" class="facets-checkbox">')
              .attr('id', id)
              .data($link.data())
              .data('facetsredir', href);
            var label = $('<label>' + description + '</label>');

            checkbox.on('change.facets', function (e) {
              Drupal.facets.disableFacet($link.parents('.js-facets-checkbox-links'));
              window.location.href = $(this).data('facetsredir');
            });

            if (active) {
              checkbox.attr('checked', true);
              label.find('.js-facet-deactivate').remove();
            }

            $link.before(checkbox).before(label).remove();
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
