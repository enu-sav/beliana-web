declare namespace Cypress {
  interface Chainable {
    /**
     * - check the width of an element
     *
     * @param {string} selector - css selector identifying the element to check
     * @param {number} width - expected width of the element in pixels
     *
     * @example
     * cy.checkElementWidth('.element', 100)
     */
    checkElementWidth(selector: string, width: number): void
  }
}


Cypress.Commands.add('checkElementWidth', (selector: string, width: number) => {
  cy.get(`${selector}`)
    .should('have.css', 'width', `${width}px`)
})