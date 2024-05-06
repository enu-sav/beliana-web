declare namespace Cypress {
  interface Chainable {
    /**
     * - verify that the list element is available in the DOM
     *
     *
     * @example
     * @param selector
     * @param length
     * @param style_type
     * @param margin_left
     * @param texts
     */
    verifyListElement(selector: string, length: number, style_type: string, margin_left: string, texts: string[]): void
  }
}
Cypress.Commands.add('verifyListElement', (selector: string, length: number, style_type: string, margin_left: string, texts: []) => {
  cy.get(selector).as('list')
  cy.step('Verify ' + selector + ' element')
  cy.get(selector).as(selector + '_list')
    .should('exist')
    .children('li')
    .should('have.length', length)
    .each(($li, index) => {
      cy.step('Verify css properties in li element from ' + selector + ' element')
      cy.wrap($li)
        .should('have.css', 'list-style-type', style_type)
        .and('have.css', 'margin-left', margin_left)
      cy.step('Verify li visibility and content')
      cy.wrap($li)
        .should('be.visible')
        .and('not.be.empty')

      if (texts.length !== 0) {
        cy.step('Verify text in li element from ' + selector + ' element. Processing li element at index: ' + index)
        cy.wrap($li).contains(texts[index])
      }
    })

})
