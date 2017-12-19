/**
 * @file
 */

(function ($, Drupal) {

  Drupal.behaviors.wordFacetsBlockTheme = {
    attach: function (context, settings) {
      // Set word search facet api second level filter position.
      Drupal.behaviors.wordFacetsBlockTheme.setHeight(context);

      $(window).resize(function () {
        Drupal.behaviors.wordFacetsBlockTheme.setHeight(context);
      });
    },
    setHeight: function (context) {
      var $block = $('#block-beliana-heslo', context);
      $block.css({height: ($block.find('ul li ul').height() + 10) + 'px'});
    }
  };

  Drupal.behaviors.setCurrentWordFacet = {
    attach: function (context, settings) {
      // Set active facet string in solr_search_word view header.
      if ($('#block-heslo .facet-item .is-active .facet-item__value')) {
        $('.view-word-search-page header h2').once().append(' ' + $('#block-heslo .facet-item .is-active .facet-item__value').text());
      }
    }
  };

  Drupal.behaviors.wordCounter = {
    attach: function (context, settings) {
      $('#count-words').text($('.view-word-search-page .views-row').length);
    }
  };

  Drupal.behaviors.alphabetHeight = {
    attach: function (context, settings) {
      $(window).on('load resize', function () {
        var height = $('#block-heslo ul').height();
        $('#block-heslo ul li ul').css('top', height);
      });
    }
  };

  Drupal.behaviors.clickChangeFormatButtonWrapper = {
    attach: function (context, settings) {
      $('.truncate-button').once().on('click', function () {
        $(this).toggleClass('active');
      });
    }
  };

  Drupal.behaviors.clickChangeFormatButton = {
    attach: function (context, settings) {
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
    attach: function (context, settings) {
      if ($('.truncate-button .label').text() === 'Začiatok hesla') {
        $('.word-short').click();
      } else {
        $('.word-full').click();
      }
    }
  }

})(jQuery, Drupal);
