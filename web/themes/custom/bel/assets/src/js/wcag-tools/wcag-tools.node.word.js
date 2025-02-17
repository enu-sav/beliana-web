/**
 * @file
 * WCAG tools
 */
(function (Drupal, once) {

  'use strict';

  Drupal.behaviors.click_change_node_word_citation = {
    attach: function (context, settings) {
      var wordElements = once('structure-process', 'article > .word', context);

      if (!wordElements) {
        return;
      }

      wordElements.forEach(function (item) {
        var word = item;

        ['desktop'].forEach(function (selector) {
          var wrapper = word.querySelector('.node__content.' + selector);
          var sidebar_wrapper = word.querySelector('.node__sidebar.' + selector);

          if (wrapper && wrapper.querySelector('h2, h3')) {
            var breadcrumbs = 0;
            var sidebar = sidebar_wrapper.querySelector('.structure');
            sidebar.innerHTML += '<div class="contents">' + Drupal.t('label-content') + '</div><ul></ul>';

            wrapper.querySelectorAll('h2, h3').forEach(function (item, i) {
              var type = item.tagName === 'H2' ? 'large' : 'small';
              item.setAttribute('data-id', i);
              item.insertAdjacentHTML('afterend', '<span class="scroll-up">' + Drupal.t('label-back-to-content') + '</span>');
              sidebar.querySelector('ul').innerHTML += '<li class="' + type + '"><a href="#" data-id="' + i + '">' + item.textContent + '</a></li>';
              breadcrumbs = document.querySelector('.block-bel-breadcrumbs').offsetHeight;
            });

            sidebar.addEventListener('click', function (e) {
              if (e.target.tagName === 'A') {
                e.preventDefault();
                var offset = 130;

                if (window.innerWidth < 769) {
                  offset = 150;
                }

                var targetId = e.target.getAttribute('data-id');
                var targetElement = wrapper.querySelector('h2[data-id="' + targetId + '"], h3[data-id="' + targetId + '"]');
                if (targetElement) {
                  var scrollTop = targetElement.offsetTop - (offset + breadcrumbs);
                  window.scrollTo({ top: scrollTop, behavior: 'smooth' });
                }
              }
            });

            sidebar.classList.remove('hidden');
          }

          if (sidebar_wrapper && !sidebar_wrapper.querySelectorAll('article.media-image.view-mode-in-word:not(.moved)').length && !sidebar_wrapper.querySelector('.field--name-field-table') && !sidebar_wrapper.querySelector('.structure > ul')) {
            wrapper.style.width = '100%';
            sidebar_wrapper.style.display = 'none';
          }
        });

        once('label-back-to-content', 'span.scroll-up', context).forEach(function (item) {
          item.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        });

        word.addEventListener('click', function (e) {
          if (e.target.closest('.citation h3')) {
            const citationElement = e.target.parentElement;

            if (citationElement.classList.contains('open')) {
              citationElement.classList.remove('open');
              citationElement.querySelector('#dialog-desc').style.display = 'none';
              e.target.setAttribute('aria-expanded', false);
              e.target.setAttribute('aria-label', Drupal.t('aria-label-section-citation-is-closed'));
            } else {
              citationElement.classList.add('open');
              citationElement.querySelector('#dialog-desc').style.display = 'block';
              e.target.setAttribute('aria-expanded', true);
              e.target.setAttribute('aria-label', Drupal.t('aria-label-section-citation-is-open'));
            }
          }
        });
      });
    }
  };

})(Drupal, once);
