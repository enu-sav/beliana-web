/**
 * BEL-128 - 5. test case
 * - Navigate to /node/nid
 *
 * - Verify if table exists in sidebar and has min 1 row and 2 columns
 * - Verify if table is visible in sidebar after first media-image
 * - Verify if table has min 1 row and 2 columns
 *
 */

describe('Check if table exists in sidebar and has min 1 row and 2 columns', () => {
  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  it('Verify table in sidebar', () => {
    cy.step('Verify if word-illustration is visible in sidebar')
    cy.get('article.word-container .node__sidebar .word-illustration')
      .should('be.visible')
      .within(() => {
        cy.step('Verify if visible table after first media-image in sidebar')
        cy.get('.media-image:eq(0)')
          .next()
          .should('be.visible')
          .and('match', '.field--name-field-table')
          .within(() => {
            cy.step('Verify if table exists in sidebar')
            cy.get('table')
              .should('exist')
              .and('be.visible')
            // has min 1 row and 2 columns
            cy.get('table tr')
              .should('have.length.at.least', 1)
              .each(($tr) => {
                cy.wrap($tr).find('td')
                  .should('have.length.at.least', 2)
              })
          })
      })
  })
})
