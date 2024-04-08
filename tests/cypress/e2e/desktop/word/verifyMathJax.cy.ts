import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";

/**
 * BEL-128 - 9. test case
 *
 * - Navigate to /node/nid
 * - Find all math-tex elements in the page content and verifies that each of them is not empty
 * - Verify that the rendered MathJax equation matches the expected equation
 * - Verify that the rendered MathJax equation is not empty
 * - Verify that the MathJax object is available in the window object
 * - Verify that the MathJax javascript file was loaded successfully
 *
 * - Verify MathJax javascript file was loaded successfully
 * - Verify MathJax object is available in the window object
 */
describe('Check MathJax elements on page', () => {
  before(() => {
    // exp. abelovsky-integral=150
    const path = 'node/150'

    cy.visit(path)
  })

  it('Verifying MathJax element from content', () => {
    cy.get('article.word-container .node__content')
      .should('be.visible')
      .within(() => {
        cy.step('Verify MathJax element')
        cy.get('.math-tex').as('mathTex')
          .then(($mathTex) => {
          const mathEquation = $mathTex.text(); // Get the text content of the MathJax equation
          const expectedEquation = '∫abf(x,y)dx,fxyyx'; // Add your expected MathJax equation here

          expect(mathEquation, 'assert if the rendered MathJax equation matches the expected equation').to.eq(expectedEquation);
        })
      })
  })

  it('Verify MathJax javascript file was loaded successfully', () => {
    cy.verifyJavascriptFileLoad(mathjaxCDNLink.link);
  })

  it('Verify MathJax object is available in the window object', () => {
    cy.verifyWindowObjectAvailability(mathjaxCDNLink.link);
  })
})
