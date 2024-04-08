/**
 * BEL-128 - 9. test case
 *
 * - Navigate to /media/id
 * - Find all math-tex elements in the page content and verifies that each of them is not empty
 * - Verify that the rendered MathJax equation matches the expected equation
 * - Verify that the rendered MathJax equation is not empty
 * - Verify that the MathJax object is available in the window object
 * - Verify that the MathJax javascript file was loaded successfully
 *
 * - If mathJaxExists = false
 * - Verification that there are no math-tex elements in the content
 *
 */

import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";

describe('Check MathJax elements on page', () => {
  before(() => {
    // exp. media/7669
    const path = 'media/7669'

    cy.visit(path)
  })

  it('Verifying MathJax element from content', () => {
    cy.get('article.media')
      .should('not.be.visible')
      .within(() => {
        cy.step('Verify MathJax is not empty')
        cy.get('.math-tex').as('mathTex')
          .should('be.visible')
          .then($mathElements => {
          $mathElements.each((index, element) => {
            cy.wrap(element).then($element => {
              const mathjaxText = $element.text();
              expect(mathjaxText.trim()).to.not.equal(''); // Assert if the rendered MathJax equation is not empty
            });
          });
        });

        cy.step('Verify MathJax element')
        cy.get('.math-tex').as('mathTex')
          .then(($mathTex) => {
          const mathEquation = $mathTex.text(); // Get the text content of the MathJax equation
          const expectedEquation = 'kOdd|OP|Okd<|OP|d|OP|Okd=|OP|d|OP|Okd>|OP|'; // Add your expected MathJax equation here

          expect(mathEquation).to.eq(expectedEquation); // Assert if the rendered MathJax equation matches the expected equation
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
