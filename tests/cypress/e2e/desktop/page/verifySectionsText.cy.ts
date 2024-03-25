import {texts} from "../../../support/variables/textsForSectionsText";
import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";

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


  // overenie textov v liste
  // cy.log() - vypis do konzoly

  it('Verifying ol element from content', () => {
    cy.get('article')
      .should('be.visible')
      .within(() => {
        cy.step('Verify ol element')
        cy.get('ol').as('ol_list')
          .should('exist')
          .children('li')
          .and('have.length', 1)
          .each(($li, index) => {
            cy.step('Verify css properties in li element from ol element')
            cy.wrap($li).should('have.css', 'list-style-type', 'lower-alpha')
            cy.wrap($li).should('have.css', 'margin-left', '14.08px')
            cy.step('Verify li visibility and content')
            cy.wrap($li).should('be.visible')
            cy.wrap($li).should('not.be.empty')
            cy.step('Verify text in li element from ol element. Processing li element at index: ' + index)
            cy.wrap($li).contains(texts.olLiText)
          })
      })
  })

  it('Verifying ul element from content', () => {
    cy.get('article')
      .should('be.visible')
      .within(() => {
        cy.step('Verify ul element')
        cy.get('ul').as('ul_list')
          .should('exist')
          .children('li')
          .and('have.length', 3)
          .each(($li, index) => {
            cy.step('Verify css properties in li element from ul element')
            cy.wrap($li).should('have.css', 'list-style-type', 'circle')
            cy.wrap($li).should('have.css', 'margin-left', '14.08px')
            cy.step('Verify li visibility and content')
            cy.wrap($li).should('be.visible')
            cy.wrap($li).should('not.be.empty')
            cy.step('Verify text in li element from ul element. Processing li element at index: ' + index)
            cy.wrap($li[index]).contains(texts.ulLiTexts[index])
          })
      })
  })

  it('Verify MathJax javascript file was loaded successfully', () => {
    cy.verifyJavascriptFileLoad(mathjaxCDNLink.link);
  })

  it('Verify MathJax object is available in the window object', () => {
    cy.verifyWindowObjectNotAvailability(mathjaxCDNLink.link);
  })
})
