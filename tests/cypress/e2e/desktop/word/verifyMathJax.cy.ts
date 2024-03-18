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

import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";

describe('check MathJax elements on page', () => {
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
        cy.get('.math-tex').then(($mathTex) => {
          const mathEquation = $mathTex.text(); // Get the text content of the MathJax equation
          const expectedEquation = '∫abf(x,y)dx,fxyyx'; // Add your expected MathJax equation here

          expect(mathEquation, 'assert if the rendered MathJax equation matches the expected equation').to.eq(expectedEquation);
        })
      })
  })

  it('Verify MathJax javascript file was loaded successfully', () => {
    cy.request(mathjaxCDNLink.link).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Verify MathJax object is available in the window object', () => {
    cy.window().then(win => {
      expect(win.document.querySelector('script[src="' + mathjaxCDNLink.link + '"]')).to.exist;
    });
  })
})
