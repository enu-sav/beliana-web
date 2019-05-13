/**
 * @file
 */

(function ($, Drupal) {

  Drupal.behaviors.wordFacetsBlockTheme = {
    attach: function (context, settings) {
      // Set word search facet api second level filter position.
//      Drupal.behaviors.wordFacetsBlockTheme.setHeight(context);
//
//      $(window).resize(function () {
//        Drupal.behaviors.wordFacetsBlockTheme.setHeight(context);
//      });
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
      var labelMap = {short: 'Začiatok hesla', full: 'Celé heslo'};

      $('.word-full').on('click', function () {
        $('.views-element-container .heslo').removeClass('truncate-wrapper');
        $('.views-element-container .heslo #gradient').css('display', 'none');
        $('.truncate-button .label').html(labelMap.full + '<b class="button"></b>');
        $('.truncate-button').toggleClass('active');

        Drupal.behaviors.onLoadTrigger.setCookie('word_search_label', labelMap.full, 1);
      });

      $('.word-short').on('click', function () {
        $('.views-element-container .heslo').each(function () {
          if ($(this).height() > 120) {
            $(this).addClass('truncate-wrapper');
            $(this).children('#gradient').css('display', 'block');
          }
        });
        $('.truncate-button .label').html(labelMap.short + '<b class="button"></b>');
        $('.truncate-button').toggleClass('active');

        Drupal.behaviors.onLoadTrigger.setCookie('word_search_label', labelMap.short, 1);
      });
    }
  };

  Drupal.behaviors.onLoadTrigger = {
    attach: function (context, settings) {
      if (Drupal.behaviors.onLoadTrigger.getCookie('word_search_label') === 'Celé heslo') {
        $('.word-full').click();
      } else {
        $('.word-short').click();
      }
    },
    setCookie: function (name, value, days) {
      var expires = '';
      var date = new Date();

      if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
      }

      document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
    },
    getCookie: function (name) {
      var nameEQ = encodeURIComponent(name) + '=';
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }

      return null;
    }
  }

})(jQuery, Drupal);
