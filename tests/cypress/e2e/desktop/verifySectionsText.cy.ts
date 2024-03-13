/**
 * BeforeEach test - check if there are any ol/ul elements in the content (olExists = true | false, ulExists = true | false)
 *
 * BEL-128 - 11. test case
 * - Navigate to /node/nid
 * - If olExists = true
 * - Find all ol elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: lower-alpha
 * - Verify that each li element has a margin-left: 14.08px
 *
 * - If olExists = false
 * - Verification that there are no ol elements in the content
 *
 * - If ulExists = true
 * - Find all ul elements in the page content and verifies that each of them contains li elements
 * - Verify that each li element has a list-style-type: circle
 * - Verify that each li element has a margin-left: 14.08px
 *
 * - If ulExists = false
 * - Verification that there are no li elements in the content
 *
 */

describe('check ol/ul elements on page', () => {
  let olExists: boolean
  let liExists: boolean

  before(() => {
    // exp. vyhlasenie_o_pristupnosti=18531
    const path = 'node/18531'

    cy.visit(path)
  })

  beforeEach(() => {
    cy.step('beforeEach - check if exist ol/ul in content')
    cy.get('article')
      .as('container')
      .find('.field--name-body')
      .then(($items) => {
        olExists = $items.find('ol').length > 0
        liExists = $items.find('ul').length > 0
      })
  })

  it('Verifying ol/ul element from content', () => {
    if (olExists) {
      cy.get('@container')
        .should('be.visible')
        .within(() => {
          cy.step('Verify ol element')
          cy.get('ol').should('exist')
          cy.get('ol').children('li').each(($li) => {
            cy.wrap($li).should('have.css', 'list-style-type', 'lower-alpha')
            cy.wrap($li).should('have.css', 'margin-left', '14.08px')
          })
        })
    } else {
      cy.step('Verify if not exist ol elements in content')
    }

    if (liExists) {
      cy.get('@container')
        .should('be.visible')
        .within(() => {
          cy.step('Verify ul element')
          cy.get('ul').should('exist')
          cy.get('ul').children('li').each(($li) => {
            cy.wrap($li).should('have.css', 'list-style-type', 'circle')
            cy.wrap($li).should('have.css', 'margin-left', '14.08px')
          })
        })
    } else {
      cy.step('Verify if not exist ul elements in content')
    }
  })
})
