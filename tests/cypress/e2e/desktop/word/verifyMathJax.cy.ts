/**
 * BeforeEach test - check if there are any MathJax elements in the content (mathJaxExists = true | false)
 *
 * BEL-128 - 9. test case
 * - Navigate to /node/nid
 * - If mathJaxExists = true
 * - Find all math-tex elements in the page content and verifies that each of them is not empty
 * - Verify that the MathJax javascript file was loaded successfully
 * - Verify that the MathJax object is available in the window object
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

describe('check MathJax elements on page', () => {
  let mathJaxExists: boolean

  before(() => {
    // exp. abelovsky-integral=150
    const path = 'node/150'

    cy.visit(path)
  })

  beforeEach(() => {
    cy.step('beforeEach - check if exist MathJax in content')
    cy.get('article.word-container .node__content')
      .as('container')
      .find('.field--name-body')
      .then(($items) => {
        mathJaxExists = $items.find('.math-tex').length > 0 // Check if there are any MathJax elements in the content
      })
  })

  it('Verifying MathJax element from content', () => {
    if (mathJaxExists) {
      cy.get('@container')
        .should('be.visible')
        .within(() => {
          cy.step('Verify MathJax element')
          cy.get('.math-tex').then(($mathTex) => {
              const mathEquation = $mathTex.text(); // Get the text content of the MathJax equation
              const expectedEquation = '∫abf(x,y)dx,fxyyx'; // Add your expected MathJax equation here

              expect(mathEquation).to.eq(expectedEquation); // Assert if the rendered MathJax equation matches the expected equation
            })
          cy.step('Verify MathJax is not empty')
          cy.get('.math-tex')
            .should('be.visible').then(mathElements => {
              mathElements.each((index, element) => {
                cy.wrap(  element).then($element => {
                  const mathjaxText = $element.text();
                  expect(mathjaxText.trim()).to.not.equal(''); // Assert if the rendered MathJax equation is not empty
                });
              });
            });
          cy.step('Verify MathJax javascript file was loaded successfully')
          cy.request(mathjaxCDNLink.link).then((response) => {
            expect(response.status).to.eq(200)
          })
          cy.step('Verify MathJax object is available in the window object')
          cy.window().then(win => {
            expect(win.document.querySelector('script[src="' + mathjaxCDNLink.link +  '"]')).to.exist;
          });
        })
    } else {
      cy.step('Verify if not exist ol elements in content')
    }
  })
})
