declare namespace Cypress {
  interface Chainable {
    /**
     * - close modal window after visit (test url)
     *
     * @example
     * cy.closeModalAfterVisitPage()
     */
    closeModalAfterVisitPage(): void
  }
}

Cypress.Commands.add('closeModalAfterVisitPage', () => {
  cy.get('#info-popup .bel-modal__container').should('be.visible').within(() => {
    cy.get('.bel-modal__close').should('be.visible').click()
  })
})