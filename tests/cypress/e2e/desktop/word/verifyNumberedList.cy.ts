import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";
import {texts} from "../../../support/variables/textsForSectionsText";

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
        cy.verifyListElement('ol', 4, 'decimal', '14.08px', [])
      })
  })

  it('Verify MathJax javascript file was loaded successfully', () => {
    cy.verifyJavascriptFileLoad(mathjaxCDNLink.link);
  })

  it('Verify MathJax object is available in the window object', () => {
    cy.verifyWindowObjectNotAvailability(mathjaxCDNLink.link);
  })
})
