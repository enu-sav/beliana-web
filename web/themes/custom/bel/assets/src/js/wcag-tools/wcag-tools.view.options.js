/**
 * @file
 * WCAG tools
 */
(function (Drupal, once) {

  'use strict';

  Drupal.behaviors.clickChangeFormatListTools = {
    attach: function (context, settings) {
      var wordSearchShort = localStorage.getItem('word-search-short') || 'normal';

      if (wordSearchShort !== null) {
        var activeButton = document.querySelector('.truncate-button .' + wordSearchShort);
        if (activeButton) {
          activeButton.click();
        }
      } else {
        var defaultButton = document.querySelector('.truncate-button .word-short');
        if (defaultButton) {
          defaultButton.click();
        }
      }

      once('list-tools-truncate-button', '.list-tools .truncate-button', context).forEach(function (item) {
        item.addEventListener('click', function (event) {
          if (event.target.tagName === 'A') {
            var eventItem = event.target;
            if (eventItem.classList.contains('word-short')) {
              handleShortWord();
            } else {
              handleFullWord();
            }
            updateLabel(eventItem);
          }
        });
      });

      var wordSearchSort = localStorage.getItem('word-search-sort') || 'alphabet-asc';

      if (wordSearchSort !== null) {
        var activeSortButton = document.querySelector('.sort-button .' + wordSearchSort);
        if (activeSortButton) {
          activeSortButton.click();
        }
      } else {
        var defaultSortButton = document.querySelector('.sort-button .alphabet-asc');
        if (defaultSortButton) {
          defaultSortButton.click();
        }
      }

      once('list-tools-truncate-button', '.list-tools .sort-button', context).forEach(function (item) {
        item.addEventListener('click', function (event) {
          if (event.target.tagName === 'A') {
            var item = event.target;
            updateSortLabel(item);
          }
        });
      });

      function handleShortWord() {
        var wordElements = document.querySelectorAll('.views-element-container .word');
        wordElements.forEach(function (element) {
          if (element.clientHeight > 120) {
            element.classList.add('truncate-wrapper');
            var gradient = element.querySelector('#gradient');
            if (gradient) {
              gradient.style.display = 'block';
            }
          }
        });
      }

      function handleFullWord() {
        var wordElements = document.querySelectorAll('.views-element-container .word');
        wordElements.forEach(function (element) {
          element.classList.remove('truncate-wrapper');
          var gradient = element.querySelector('#gradient');
          if (gradient) {
            gradient.style.display = 'none';
          }
        });
      }

      function updateLabel(eventItem) {
        var labelElement = document.querySelector('.truncate-button .label');
        labelElement.innerHTML = eventItem.innerHTML + '<b class="button"></b>';
        eventItem.classList.toggle('active');
        localStorage.setItem('word-search-short', eventItem.classList[0]);
        updateAriaLabel(eventItem);
      }

      function updateSortLabel(item) {
        var labelElement = document.querySelector('.sort-button .label');
        labelElement.innerHTML = item.innerHTML + '<b class="button"></b>';
        item.classList.toggle('active');
        localStorage.setItem('word-search-sort', item.classList[0]);
      }

      function updateAriaLabel(eventItem) {
        var item = document.querySelector('.list-tools .truncate-button');
        if (eventItem.classList.contains('word-short')) {
          item.querySelector('.label').setAttribute('aria-label', Drupal.t('wcag-display-options-the-beginning-of-the-article-is-set'));
        } else {
          item.querySelector('.label').setAttribute('aria-label', Drupal.t('wcag-display-options-the-entire-article-is-set'));
        }
      }
    },
  };

})(Drupal, once);
