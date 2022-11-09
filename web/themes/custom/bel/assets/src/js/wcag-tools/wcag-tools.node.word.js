/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  Drupal.behaviors.click_change_node_word_citation = {
    attach: function (context, settings) {
      $(context).find('article > .word').once('structure-process').each(function () {
        var $word = $(this);

        $.each(['desktop', 'mobile'], function (i, selector) {
          var $wrapper = $word.find('.node__content.' + selector);
          var $sidebar_wrapper = $word.find('.node__sidebar.' + selector);
          var $images = $word.find('.word-illustration .media-image');

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

            $sidebar.append('<h3>' + Drupal.t('label-content') + '</h3><ul></ul>');

            $wrapper.find('h2, h3').each(function (i, item) {
              var type = $(item).is('h2') ? 'large' : 'small';
              $(item).attr('data-id', i).after('<span class="scroll-up">' + Drupal.t('label-back-to-content') + '</span>');
              $sidebar.find('ul').append('<li class="' + type + '"><a href="#" data-id="' + i + '">' + $(item).text() + '</a></li>');
            });

            $sidebar.on('click', 'ul > li > a', function (e) {
              e.preventDefault();
              var offset = $('body').hasClass('adminimal-admin-toolbar') ? 280 : 260;
              if ($(window).width() < 769) {
                offset = $('body').hasClass('adminimal-admin-toolbar') ? 320 : 320;
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

          if ($sidebar_wrapper.find('.structure > ul').length) {
            $sidebar_wrapper.parent().addClass('relative');
          }
        });

        $word.on('click', 'span.scroll-up', function (e) {
          $('html, body').animate({
            scrollTop: 0
          }, 300);
        });

        $word.on('click', '.citation h3', function (e) {
          if ($(this).parent().hasClass('open')) {
            $(this).parent().removeClass('open');
            $(this).parent().find('#dialog-desc').css('display', 'none');
            $(this).attr('aria-expanded', false);
            $(this).attr('aria-label', Drupal.t('aria-label-section-citation-is-closed'));
          }
          else {
            $(this).parent().removeClass('open');
            $(this).parent().addClass('open');
            $(this).parent().find('#dialog-desc').css('display', 'block');
            $(this).attr('aria-expanded', true);
            $(this).attr('aria-label', Drupal.t('aria-label-section-citation-is-open'));
          }
        });
      });
    }
  };

})(jQuery, Drupal);
