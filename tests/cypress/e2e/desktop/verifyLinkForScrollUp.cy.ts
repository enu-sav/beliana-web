/**
 * BEL-128 - 2. test case
 */
describe('Link to scroll up the page', () => {
  before(() => {
    cy.visit('/heslo/francuzsko')
  })

  it('Verifying every h2 element has a scroll-up link', () => {
    cy.get('article.word-container')
      .should('be.visible')
      .within(() => {
        cy.get('.field__item h2')
          .should('be.visible')
          .and('have.length', 8)
          .each(($elementH2) => {
            cy.wrap($elementH2)
              .siblings('span:eq(0)')
              .as('linkForScrollUp')
              .should('be.visible')
              .and('have.text', 'Naspäť na obsah')
          })
      })
  })

  it('Verifying position on page after clicking on link', () => {
    cy.step('Click to random link for scroll-up')
    cy.get('article.word-container')
      .should('be.visible')
      .within(() => {
        cy.get('.field__item .scroll-up')
          .should('be.visible')
          .sample()
          .click()
      })

    cy.step('Verify position on page and visibility h1 element')
    cy.window().its('scrollY')
      .should('be.eq', 0)

    cy.get('h1').should('be.visible')
  })
})
