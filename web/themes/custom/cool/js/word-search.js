(function ($) {

  Drupal.behaviors.wordFacetsBlock = {
    attach: function () {    // Set word search facet api second level filter position.
      $('.word-facet-wrap').height($('#block-heslo').height() + $('#block-heslo ul li ul').height());

      $(window).resize(function () {
        $('.word-facet-wrap').height(0);
        $('.word-facet-wrap').height($('#block-heslo').height() + $('#block-heslo ul li ul').height());
      });

      // Set active facet string in solr_search_word view header.
      if ($('#block-heslo .facet-item .is-active .facet-item__value')) {
        $('.view-word-search-page header h2').append(' ' + $('#block-heslo .facet-item .is-active .facet-item__value').text());
      }
    }
  }
})(jQuery);
