(function ($,Drupal) {

  'use strict';

  Drupal.behaviors.search = {
    attach: function (context, settings) {
      var self = this;
      var wrapper = document.querySelector('#block-bel-searchbox .search-input-wrapper');

      if (wrapper) {
        self.setSearchInput();

        // Focus on search input if a keyword exists
        var searchInput = wrapper.querySelector('input.search-input');
        if (searchInput.value.length > 0) {
          // Delay for Firefox
          setTimeout(function () {
            searchInput.focus();
          }, 10);
        }

        // autosubmit form on autocomplete select
        $('#block-bel-searchbox .search-input-wrapper').find('input.search-input').on('autocompleteclose', function (event, node) {
          var input = $(this).val();
          input = input.match(/\d+/);
          if (input && $.isNumeric(input[0])) {
            $(this).val('');
            window.location.href = '/node/' + input[0];
          }
        });

        document.addEventListener('keyup', function (e) {
          if (e.keyCode === 27) {
            var description = document.querySelector('.search-help .description');
            if (description) {
              description.classList.remove('open');
            }
            var text = document.querySelector('.search-help .text');
            if (text) {
              text.setAttribute('aria-expanded', false);
            }
          }
        });

        window.addEventListener('resize', function () {
          self.setSearchInput();
        });
      }
    },
    setSearchInput: function () {
      var searchInputWrapper = document.querySelector('#block-bel-searchbox .search-input-wrapper .has-alphabet');
      if (searchInputWrapper) {
        var searchAlphabetWrapper = searchInputWrapper.querySelector('.search-alphabet-wrapper');
        if (searchAlphabetWrapper) {
          var searchInputWidth = searchAlphabetWrapper.offsetWidth + 40;
          var formItemInput = searchInputWrapper.querySelector('.form-item-input');
          if (formItemInput) {
            formItemInput.style.width = 'calc(100% - ' + searchInputWidth + 'px';
          }
          var editIcon = searchInputWrapper.querySelector('#edit-icon');
          if (editIcon) {
            editIcon.setAttribute('title', 'Zrušiť Vyhľadávanie');
          }
        }
      }
    },
  };
})(jQuery, Drupal);