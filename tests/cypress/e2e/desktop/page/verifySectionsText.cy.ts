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

  it('Verifying ol element from content', () => {
    cy.get('article')
      .should('be.visible')
      .within(() => {
        cy.verifyListElement('ol', 1, 'lower-alpha', '14.08px', texts.olLiText)
      })
  })

  it('Verifying ul element from content', () => {
    cy.get('article')
      .should('be.visible')
      .within(() => {
        cy.verifyListElement('ul', 3, 'circle', '14.08px', texts.ulLiTexts)
      })
  })

  it('Verify MathJax javascript file was loaded successfully', () => {
    cy.verifyJavascriptFileLoad(mathjaxCDNLink.link);
  })

  it('Verify MathJax object is available in the window object', () => {
    cy.verifyWindowObjectNotAvailability(mathjaxCDNLink.link);
  })
})
