/**
 * @file
 * WCAG tools
 */
(function (Drupal, once) {

  'use strict';

  Drupal.behaviors.click_change_media_image_more_info = {
    attach: function (context, settings) {
      once('more-info', '.more-info', context).forEach(function (item) {
        const moreInfoElements = context.querySelectorAll('.more-info');

        moreInfoElements.forEach(function (element) {
          if (!element.classList.contains('structure-processed')) {
            element.classList.add('structure-processed');
            const h3 = element.querySelector('h3');
            if (h3) {
              h3.addEventListener('click', function (e) {
                if (element.classList.contains('open')) {
                  element.classList.remove('open');
                  element.querySelector('.detail').style.display = 'none';
                  h3.setAttribute('aria-expanded', false);
                  h3.setAttribute('aria-label', Drupal.t('aria-label-section-more-info-is-closed'));
                }
                else {
                  element.classList.remove('open');
                  element.classList.add('open');
                  element.querySelector('.detail').style.display = 'block';
                  h3.setAttribute('aria-expanded', true);
                  h3.setAttribute('aria-label', Drupal.t('aria-label-section-more-info-is-open'));
                }
              });
            }
          }
        });
      });
    }
  };
})(Drupal, once);