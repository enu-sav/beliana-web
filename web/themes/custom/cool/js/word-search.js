/**
 * @file
 */

(function ($) {

  Drupal.behaviors.wordFacetsBlockTheme = {
    attach: function () {
      // Set word search facet api second level filter position.
      $('.word-facet-wrap').height($('#block-heslo').height() + $('#block-heslo ul li ul').height());

      $(window).resize(function () {
        $('.word-facet-wrap').height(0);
        $('.word-facet-wrap').height($('#block-heslo').height() + $('#block-heslo ul li ul').height());
      });
    }
  };

  Drupal.behaviors.setCurrentWordFacet = {
    attach: function () {
      // Set active facet string in solr_search_word view header.
      if ($('#block-heslo .facet-item .is-active .facet-item__value')) {
        $('.view-word-search-page header h2').once().append(' ' + $('#block-heslo .facet-item .is-active .facet-item__value').text());
      }
    }
  };

  Drupal.behaviors.wordCounter = {
    attach: function () {
      $('#count-words').text($('.view-word-search-page .views-row').length);
    }
  };

  Drupal.behaviors.alphabetHeight = {
    attach: function () {
      $(window).on('load resize', function () {
        var height = $('#block-heslo ul').height();
        $('#block-heslo ul li ul').css('top', height);
      });
    }
  };

  Drupal.behaviors.clickChangeFormatButtonWrapper = {
    attach: function () {
      $('.truncate-button').once().on('click', function () {
        $(this).toggleClass('active');
      });
    }
  };

  Drupal.behaviors.clickChangeFormatButton = {
    attach: function () {
      $('.word-full').on('click', function () {
        $('.view-word-search-page .heslo').removeClass('truncate-wrapper');
        $('.view-word-search-page .truncate-wrapper #gradient').css('display', 'none');
        $('.truncate-button .label').html("Celé heslo<b class='button'></b>");
        $('.truncate-button').once().toggleClass('active');
      });

      $('.word-short').on('click', function () {
        $('.view-word-search-page .heslo').each(function () {
          if ($(this).height() > 120) {
            $(this).addClass('truncate-wrapper');
            $(this).children('#gradient').css('display', 'block');
          }
        });
        $('.truncate-button .label').html("Začiatok hesla<b class='button'></b>");
        $('.truncate-button').once().toggleClass('active');
      });
    }
  };

  Drupal.behaviors.onLoadTrigger = {
    attach: function () {
      if ($('.truncate-button .label').text() === 'Začiatok hesla') {
        $('.word-short').click();
      } else {
        $('.word-full').click();
      }
    }
  }

})(jQuery);
