/**
 * Verify search by category
 *
 */
describe('Verify search by category', () => {
  const path = 'https://dw.beliana.sav.sk/rozsirene-vyhladavanie'

  before(() => {
    cy.step('Visiting the search page')
    cy.visit(path)
  })

  it('Verifying facet hierarchy', () => {
    cy.step('Checking the main facet navigation visibility')
    cy.get('nav.facets-widget-checkbox')
      .should('be.visible')

    cy.step('Iterating over each top-level facet item')
    cy.get('ul[data-drupal-facet-id="categories"] > li.facet-item').each(($facetItem, index) => {
      verifyFacetItem($facetItem);

      if (index === 9) {
        cy.step('Stopping iteration after 10 items')
        return false
      }
    });
  })
})

function verifyFacetItem($facetItem, level = 0, maxLevel = 10) {
  if (level > maxLevel) {
    return;
  }

  cy.step(`Checking visibility of facet item ${level}`)
  cy.wrap($facetItem)
    .should('be.visible')

  cy.step('Verifying input checkbox visibility and attributes')
  cy.wrap($facetItem).find('input.facets-checkbox')
    .should('be.visible')

  cy.step('Checking sub-category button visibility and its child elements')
  cy.wrap($facetItem).find('div.sub-categories').then(($subCategoryButton) => {
    cy.step('Checking sub-category button visibility')
    cy.wrap($subCategoryButton)
      .should('be.visible')

    cy.step('Verifying facet_item_value and facet_item_count visibility')
    cy.wrap($subCategoryButton).find('.facet-item__value')
      .should('be.visible')
    cy.wrap($subCategoryButton).find('.facet-item__count')
      .should('be.visible')
  });

  if ($facetItem.hasClass('facet-item--collapsed')) {
    cy.wrap($facetItem).find('> .facets-widget').then(($subCategory) => {
      cy.step('Checking for the ::before pseudo-element content')
      cy.wrap($subCategory).parent().find('> .sub-categories')
        .should(($el) => {
          const beforeContent = window.getComputedStyle($el[0], '::before').getPropertyValue('content')
          expect(beforeContent).to.eq('""')
        });

      cy.step('Checking sub-category visibility when facet item is clicked')
      cy.wrap($subCategory).parent().find('> .sub-categories .facet-item__value').click()
      cy.wrap($subCategory).find('ul.sub-nav')
        .should('be.visible')
        .and('have.length.greaterThan', 0)

      // Iterate over each sub-category item
      cy.wrap($subCategory).find('ul.sub-nav > li.facet-item').each(($subCategoryItem) => {
        verifyFacetItem($subCategoryItem, level + 1);
      });

      cy.step('Checking sub-category visibility when facet item is clicked again')
      cy.wrap($subCategory).parent().find('> .sub-categories .facet-item__value').click()
      cy.wrap($subCategory).find('ul.sub-nav')
        .should('not.be.visible')
    });
  }
}
