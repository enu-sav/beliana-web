/**
 * BEL-128 - 11. test case
 * - Navigate to /node/nid
 *
 * - Find all ol elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: lower-alpha
 * - Verify that each li element has a margin-left: 14.08px
 * - Verify that each li element is visible and not empty
 *
 * - Find all ul elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: circle
 * - Verify that each li element has a margin-left: 14.08px
 * - Verify that each li element is visible and not empty
 */

describe('check ol/ul elements on page', () => {
  before(() => {
    // exp. vyhlasenie_o_pristupnosti=18531
    const path = 'node/18531'

    cy.visit(path)
  })

  it('Verifying ol element from content', () => {
    cy.get('article')
      .should('be.visible')
      .within(() => {
        cy.step('Verify ol element')
        cy.get('ol')
          .should('exist')
          .should('have.length', 1)

        cy.step('Verify li elements from ol element')
        cy.get('ol').children('li').each(($li) => {
          cy.wrap($li).should('have.css', 'list-style-type', 'lower-alpha')
          cy.wrap($li).should('have.css', 'margin-left', '14.08px')
          cy.wrap($li).should('be.visible')
          cy.wrap($li).should('not.be.empty')
        })
      })
  })
  it('Verifying ul element from content', () => {
    cy.get('article')
      .should('be.visible')
      .within(() => {
        cy.step('Verify ul element')
        cy.get('ul')
          .should('exist')
          .find('li')
          .should('have.length', 3)

        cy.step('Verify li elements from ul element')
        cy.get('ul').children('li').each(($li) => {
          cy.wrap($li).should('have.css', 'list-style-type', 'circle')
          cy.wrap($li).should('have.css', 'margin-left', '14.08px')
          cy.wrap($li).should('be.visible')
          cy.wrap($li).should('not.be.empty')
        })
      })
  })
})
