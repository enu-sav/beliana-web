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
      $('#count-words').text($('.view-word-search-page .views-row').size());
    }
  }

  Drupal.behaviors.alphabetHeight = {
    attach: function () {
      $(window).on('load resize', function () {
        var height = $('#block-heslo ul').height();
        $('#block-heslo ul li ul').css('top', height);
      });
    }
  };

})(jQuery);
