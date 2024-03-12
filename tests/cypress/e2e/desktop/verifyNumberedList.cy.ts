/**
 * BeforeEach test - check if there are any ol elements in the content (olExists = true | false)
 *
 * BEL-128 - 12. test case
 * - Navigate to /node/nid
 * - If olExists = true
 * - Find all ol elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: lower-alpha
 *
 * - If olExists = false
 * - Verification that there are no ol elements in the content
 *
 */

describe('check ol elements on page', () => {
  let olExists: boolean

  before(() => {
    // exp. vyhlasenie_o_pristupnosti=18531
    const path = 'node/18887'

    cy.visit(path)
  })

  beforeEach(() => {
    cy.step('beforeEach - check if exist ol in content')
    cy.get('article')
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
          cy.get('ol').should('exist')
          cy.get('ol').children('li').each(($li) => {
            cy.wrap($li).should('have.css', 'list-style-type', 'decimal')
            cy.wrap($li).should('have.css', 'margin-left', '14.08px')
          })
        })
    } else {
      cy.step('Verify if not exist ol elements in content')
    }
  })
})
