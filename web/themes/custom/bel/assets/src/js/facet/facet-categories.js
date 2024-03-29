/**
 * @file
 * Facet categories
 */
(function ($, Drupal, once) {

  "use strict";

  Drupal.behaviors.click_facet_categories = {
    attach: function (context, settings) {

      once('facets-categories', '#block-bel-categories', context).forEach(function (item) {
        var openers = item.querySelectorAll('.smartphone.opener');
        openers.forEach(function (opener) {
          opener.addEventListener('click', function (e) {
            if (opener.parentElement.classList.contains('active')) {
              opener.parentElement.classList.remove('active');
            }
            else {
              opener.parentElement.classList.add('active');
            }
          });
        });

        // Override facet link replacement with a checked checkbox.
        if (typeof (Drupal.facets) != 'undefined') {
          if ($.isFunction(Drupal.facets.makeCheckbox)) {
            Drupal.facets.makeCheckbox = function () {
              var $link = $(this);
              var tabindex_label = -1;
              var aria_expanded = true;
              var active = $link.hasClass('is-active');
              var collapsed = $link.parent().hasClass('facet-item--collapsed');
              var description = $link.html();
              var href = $link.attr('href');
              var id = $link.data('drupal-facet-item-id');
              var count = $link.find('.facet-item__count').attr('data-count');

              $link.parent().find('.facets-widget').attr('id', id).attr('role', 'region');
              var aria_label = Drupal.t('aria-label-category-number-of-products-count', {
                '@category': $link.find('.facet-item__value').attr('data-value'),
                '@count': count
              });
              if (collapsed) {
                tabindex_label = 0;
                aria_expanded = false;
              }

              var checkbox = $('<input type="checkbox" class="facets-checkbox">')
                  .attr('aria-controls', 'label-' + id)
                  .attr('aria-checked', false)
                  .attr('aria-label', aria_label)
                  .data($link.data())
                  .data('facetsredir', href);
              var label = $('<div aria-controls="' + id + '" tabindex="' + tabindex_label + '" role="button" class="sub-categories" aria-expanded="' + aria_expanded + '" aria-label="' + aria_label + '">' + description + '</div>');

              checkbox.on('change.facets', function (e) {
                e.preventDefault();

                var $widget = $(this).closest('.js-facets-widget');

                Drupal.facets.disableFacet($widget);
                $widget.trigger('facets_filter', [href]);
              });

              if (active) {
                checkbox.attr('checked', true);
                label.find('.js-facet-deactivate').remove();
              }

              $link.before(checkbox).before(label).hide();
            };
          }
        }
      });

      // Open collapsed facets


      // Open collapsed facets
      $('#block-bel-categories').find('.facets-widget-checkbox').on('click', '.facet-item--collapsed:not(.facet-item--active) > .sub-categories', function (e) {
        // e.preventDefault();
        $(this).attr('aria-expanded', true);
        // $(this).attr('aria-label', 'Podkategória otvorená');
        $(this).parent().addClass('facet-item--expanded').removeClass('facet-item--collapsed');
        $(this).parent().find('.facets-widget .facet-item--expanded').addClass('facet-item--collapsed').removeClass('facet-item--expanded');
        $(this).parent().find('.facets-widget ul li').first().find('.facets-checkbox').focus();
        $(this).parent().find('.facets-widget ul li').first().find('.facets-checkbox').attr('tabindex', 0)
      });

      // Close expanded facets
      $('#block-bel-categories').find('.facets-widget-checkbox').on('click', '.facet-item--expanded:not(.facet-item--active) > .sub-categories', function (e) {
        // e.preventDefault();
        $(this).attr('aria-expanded', false);
        // $(this).attr('aria-label', 'Podkategória zatvorená');
        $(this).parent().addClass('facet-item--collapsed').removeClass('facet-item--expanded');
      });
    }
  };


})(jQuery, Drupal, once);
