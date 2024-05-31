/**
 * Verify search by category
 *
 */
describe('Verify search by category', () => {
  before(() => {
    const path = 'rozsirene-vyhladavanie'

    cy.visit(path)
  })

  it('Verifying facet hierarchy', () => {
    // Visit the page with the facet widget
    cy.visit('https://dw.beliana.sav.sk/rozsirene-vyhladavanie')

    // Check that the main facet navigation is visible
    cy.get('nav.facets-widget-checkbox')
      .should('be.visible', 'Facet navigation is visible')

    // Iterate over each top-level facet item
    cy.get('ul[data-drupal-facet-id="categories"] > li.facet-item').each(($facetItem, index) => {
      // Ensure the facet item is visible
      cy.wrap($facetItem)
        .should('be.visible', 'Facet item is visible')

      cy.step('Verify if input checkbox is visible and has correct attributes')
      cy.wrap($facetItem).find('input.facets-checkbox')
        .should('be.visible', 'Input checkbox is visible')

      cy.wrap($facetItem).find('div.sub-categories').then(($subCategoryButton) => {
        // step where sub-category has in before style #282727
        cy.wrap($subCategoryButton)
          .should('be.visible', 'Sub-category button is visible')

        cy.step('Verify if facet_item_value and facet_item_count are visible')
        cy.wrap($subCategoryButton).find('.facet-item__value')
          .should('be.visible', 'Facet item value is visible')
        cy.wrap($subCategoryButton).find('.facet-item__count')
          .should('be.visible', 'Facet item count is visible')
      });

      cy.step('Verify if facet item has class facet-item--collapsed')
      if ($facetItem.hasClass('facet-item--collapsed')) {
        cy.wrap($facetItem).find('> .facets-widget').then(($subCategory) => {
          // Check for the ::before pseudo-element content
          cy.step('Verify if facet item has before content');

          cy.wrap($subCategory).parent().find('> .sub-categories')
            .should(($el) => {
            const beforeContent = window.getComputedStyle($el[0], '::before').getPropertyValue('content')
            expect(beforeContent).to.eq('""')
          });
          cy.wrap($subCategory).should('not.be.visible');
          cy.wrap($subCategory).find('> ul.sub-nav')
            .should('not.be.visible', 'Sub-categories are not visible')
          cy.wrap($subCategory).parent().find('> .sub-categories .facet-item__value').click()
          cy.wrap($subCategory).find('ul.sub-nav')
            .should('be.visible', 'Sub-categories are visible')
            .and('have.length.greaterThan', 0, 'Sub-categories are visible')
          cy.wrap($subCategory).parent().find('> .sub-categories .facet-item__value').click()
          cy.wrap($subCategory).find('ul.sub-nav')
            .should('not.be.visible', 'Sub-categories are not visible')
        });
      }

      if (index === 10) {
        return false
      }
    });
  })

})
