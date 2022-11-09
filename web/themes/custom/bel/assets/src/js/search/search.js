/**
 * @file
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.search = {
    attach: function (context, settings) {
      var self = this;
      var $wrapper = $('#block-bel-searchbox .search-input-wrapper');

      self.setSearchInput();

      //focus to search input if keyword exist
      if ($wrapper.find('input.search-input').val.length > 0) {
        // delay for firefox
        setTimeout(function () {
          $wrapper.find('input.search-input').focus();
        }, 10);
      }

      // autosubmit form on autocomplete select
      $wrapper.find('input.search-input').on('autocompleteclose', function (event, node) {
        var input = $(this).val();
        input = input.match(/\d+/);
        if ($.isNumeric(input[0])) {
          $(this).val('');
          window.location.href = '/node/' + input[0];
        }
      });

      $(document).keyup(function (e) {
        if (e.keyCode == 27) {
          $('.search-help .description').removeClass('open');
          $('.search-help .text').attr('aria-expanded', false);
        }
      });

      $(window).resize(function () {
        self.setSearchInput();
      });
    },
    setSearchInput: function () {
      var search_input_wrapper = $('#block-bel-searchbox .search-input-wrapper.has-alphabet');
      var search_input_width = search_input_wrapper.find('.search-alphabet-wrapper').width() + 40;
      search_input_wrapper.find('.form-item-input').css({width: 'calc(100% - ' + search_input_width + 'px)'});
      search_input_wrapper.find('#edit-icon').attr("title", 'Zrušiť Vyhľadávanie');
    },
  };

})(jQuery, Drupal);
