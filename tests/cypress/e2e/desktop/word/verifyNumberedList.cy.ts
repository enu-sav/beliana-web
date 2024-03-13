/**
 * BeforeEach test - check if there are any ol elements in the content (olExists = true | false)
 *
 * BEL-128 - 12. test case
 * - Navigate to /node/nid
 * - If olExists = true
 * - Find all ol elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: lower-alpha
 * - Verify that each li element has a margin-left: 14.08px
 * - Verify that the MathJax javascript file was loaded successfully
 * - Verify that the MathJax object is available in the window object
 *
 * - If olExists = false
 * - Verification that there are no ol elements in the content
 *
 */

import {mathjaxCDNLink} from "../../../support/variables/mathjaxCDNLink";

describe('check ol elements on page', () => {
  let olExists: boolean

  before(() => {
    // exp. premostenie=18887
    const path = 'node/18887'

    cy.visit(path)
  })

  beforeEach(() => {
    cy.step('beforeEach - check if exist ol in content')
    cy.get('article.word-container .node__content')
      .as('container')
      .find('.field--name-body')
      .then(($items) => {
        olExists = $items.find('ol').length > 0
      })
  })

  it('Verifying ol element from content', () => {
    if (olExists) {
      cy.get('@container')
        .should('be.visible')
        .within(() => {
          cy.step('Verify ol element')
          cy.get('ol')
            .should('exist')
            .find('li')
            .should('have.length.greaterThan', 1)
            .get('ol').children('li').each(($li) => {
              cy.wrap($li).should('have.css', 'list-style-type', 'decimal')
              cy.wrap($li).should('have.css', 'margin-left', '14.08px')
              cy.should('be.visible')
            })
          cy.step('Verify MathJax javascript file was loaded successfully')
          cy.request(mathjaxCDNLink.link).then((response) => {
            expect(response.status).to.eq(200)
          })
          cy.step('Verify MathJax object is available in the window object')
          cy.window().then(win => {
            expect(win.document.querySelector('script[src="' + mathjaxCDNLink.link +  '"]')).to.not.exist;
          });
        })
    } else {
      cy.step('Verify if not exist ol elements in content')
    }
  })
})
