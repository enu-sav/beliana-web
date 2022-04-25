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

  Drupal.behaviors.clickChangeFormatButton = {
    attach: function (context, settings) {
      $('.zoznam-tools .truncate-button').on('click', 'li a', function () {
        var $item = $(this);

        if ($item.hasClass('word-short')) {
          $('.views-element-container .heslo').each(function () {
            if ($(this).height() > 120) {
              $(this).addClass('truncate-wrapper');
              $(this).children('#gradient').css('display', 'block');
            }
          });
          $item.parent().parent().parent().find('.label').attr('aria-label', 'Možnosti zobrazenia - nastavené začiatok hesla');
        }
        else {
          $('.views-element-container .heslo').removeClass('truncate-wrapper');
          $('.views-element-container .heslo #gradient').css('display', 'none');
          $item.parent().parent().parent().find('.label').attr('aria-label', 'Možnosti zobrazenia - nastavené celé heslo');
        }

        $('.truncate-button .label').html($item.text() + '<b class="button"></b>');

        Drupal.behaviors.onLoadTrigger.setCookie('word_search_label', $item.attr('class'), 1);
      });

      $('.zoznam-tools .sort-button').on('click', 'li', function () {
        var $item = $(this);

        $('.sort-button .label').html($item.text() + '<b class="button"></b>');
        $('.sort-button').toggleClass('active');

        Drupal.behaviors.onLoadTrigger.setCookie('word_search_sort', $item.attr('class'), 1);
      });
    }
  };

  Drupal.behaviors.onLoadTrigger = {
    attach: function (context, settings) {
      var self = this;

      if (self.getCookie('word_search_label') != null) {
        $('.truncate-button .' + self.getCookie('word_search_label')).click();
      }
      else {
        $('.truncate-button .word-short').click();
      }

      // if (self.getCookie('word_search_sort').length) {
      //   $('.sort-button .' + self.getCookie('word_search_sort')).click();
      // }
      // else {
      //   $('.sort-button .alphabet-asc').click();
      // }
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
