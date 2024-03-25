import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";

/**
 * BEL-128 - 12. test case
 * - Navigate to /node/nid
 *
 * - Find all ol elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: decimal
 * - Verify that each li element has a margin-left: 14.08px
 * - Verify that each li element is visible and not empty
 * - Verify that each li element contains an anchor element with an href attribute
 *
 * - Verify MathJax javascript file was loaded successfully
 * - Verify MathJax object is available in the window object
 */
describe('check ol elements on page', () => {
  before(() => {
    // exp. premostenie=18887
    const path = 'node/18887'

    cy.visit(path)
  })

  it('Verifying ol element from content', () => {
    cy.get('article.word-container .node__content')
      .should('be.visible')
      .within(() => {
        cy.step('Verify ol element')
        // prerobit na custom command
        cy.get('ol').as('ol_list')
          .should('exist')
          .children('li')
          .and('have.length', 4)
          .each(($li) => {
            cy.step('Verify li css properties in ol element')
            cy.wrap($li).should('have.css', 'list-style-type', 'decimal')
            cy.wrap($li).should('have.css', 'margin-left', '14.08px')
            cy.step('Verify li visibility and content')
            cy.wrap($li).should('be.visible')
            cy.wrap($li).should('not.be.empty')
          })
          .find('a').should('have.attr', 'href')
      })
  })

  it('Verify MathJax javascript file was loaded successfully', () => {
    cy.verifyJavascriptFileLoad(mathjaxCDNLink.link);
  })

  it('Verify MathJax object is available in the window object', () => {
    cy.verifyWindowObjectNotAvailability(mathjaxCDNLink.link);
  })
})
