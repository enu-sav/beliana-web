/**
 * @file
 * WCAG tools
 */
(function ($, Drupal) {

  Drupal.behaviors.click_change_format_list_tools = {
    attach: function (context, settings) {
      var self = this;
      var word_search_short = localStorage.getItem('word-search-short') || 'normal';

      if (word_search_short != null) {
        $('.truncate-button .' + word_search_short).click();
      }
      else {
        $('.truncate-button .word-short').click();
      }
      $('.list-tools .truncate-button').once().on('click', 'li a', function () {
        var $item = $(this);

        if ($item.hasClass('word-short')) {
          $('.views-element-container .word').each(function () {
            if ($(this).height() > 120) {
              $(this).addClass('truncate-wrapper');
              $(this).children('#gradient').css('display', 'block');
            }
          });
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('wcag-display-options-the-beginning-of-the-article-is-set'));
        }
        else {
          $('.views-element-container .word').removeClass('truncate-wrapper');
          $('.views-element-container .word #gradient').css('display', 'none');
          $item.parent().parent().parent().find('.label').attr('aria-label', Drupal.t('wcag-display-options-the-entire-article-is-set'));
        }

        $('.truncate-button .label').html($item.text() + '<b class="button"></b>');
        $('.truncate-button').toggleClass('active');

        localStorage.setItem('word-search-short', $item.attr('class'))
      });


      var word_search_sort = localStorage.getItem('word-search-sort') || 'alphabet-asc';

      if (word_search_sort != null) {
        $('.sort-button .' + word_search_sort).click();
      }
      else {
        $('.sort-button .alphabet-asc').click();
      }

      $('.list-tools .sort-button').once().on('click', 'li a', function () {
        var $item = $(this);

        $('.sort-button .label').html($item.text() + '<b class="button"></b>');
        $('.sort-button').toggleClass('active');

        localStorage.setItem('word-search-sort', $item.attr('class'))
      });
    },
  };

})(jQuery, Drupal);
