import {texts} from "../../../support/variables/textsForSidebarText";

/**
 *
 * BEL-128 - 6. test case
 * - Navigate to /node/nid
 *
 * - Verify if structure exists in sidebar and contains the correct structure
 * - Verify if content section in sidebar is visible and contains text "Obsah"
 * - Verify that the section for content in the sidebar contains a list of links
 * - Verify link in list
 *
 */

describe('Check if structure exists in sidebar and contains the correct structure', () => {
  let sidebarExists: boolean

  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  it('Verify structure in sidebar', () => {
    cy.step('Verify if visible structure in sidebar')
    cy.get('article.word-container .node__sidebar')
      .should('be.visible')
      .children('.structure')
      .should('be.visible')
      .within(() => {
        cy.step('Verify if content section in sidebar is visible and contains text "Obsah"')
        cy.get('.contents')
          .should('be.visible')
          .and('have.text', texts.content)

        cy.step('Verify that the section for content in the sidebar contains a list of links')
        cy.get('ul li').as('list')
          .should('be.visible')
          .find('a')
          .should('have.length.at.least', 1)
          .and('not.be.empty')
          .each(($el, index) => {
            cy.step('Verify link in list')
            cy.wrap($el)
              .should('be.visible')
              .and('have.attr', 'href')
              .and('not.be.empty')
          })
      })
  })

})
