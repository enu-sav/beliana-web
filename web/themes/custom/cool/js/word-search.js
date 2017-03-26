jQuery(document).ready(function($) {
    // Set word search facet api second level filter position.
    $('#block-heslo ul li ul').css("top", $('#block-heslo').height() + 8);
    $('.word-facet-wrap').height($('#block-heslo').height() + $('#block-heslo ul li ul').height());

    $(window).resize(function() {
        $('.word-facet-wrap').height(0);
        $('#block-heslo ul li ul').css("top", $('#block-heslo').height() + 7);
        $('.word-facet-wrap').height($('#block-heslo').height() + $('#block-heslo ul li ul').height());
    });

    // Set Heslá string in solr_search_word view header.
    if ($('#block-heslo .facet-item .is-active .facet-item__value')) {
        $('.view-word-search-page header').prepend( '<h2>' + 'Heslá ' + $('#block-heslo .facet-item .is-active .facet-item__value').text() + '</h2>');
    }
});