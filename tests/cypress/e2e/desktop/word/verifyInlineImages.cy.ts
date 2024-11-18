import {resolutions} from '../../../support/variables/viewportResolutions'

/**
 * BEL-128 - 14. test case
 * - Navigate to /node/nid
 *
 * - Find all img elements in the page content. Find tags [IMG-N], [MIMG-N] and verify that they are visible
 *
 * - Verify that [IMG-N] and [MIMG-N] tags are in the content before javascript execution
 * - Verify that desktop images are visible and mobile images are hidden on desktop view
 * - Set viewport to mobile size and verify that mobile images are visible and desktop images are hidden
 */

describe('Verify inline images', () => {
  const path = 'node/20010'
  let htmlContent

  before(() => {
    // visit the page
    cy.request({
      url: path,
      followRedirect: true, // follow redirects
    }).then((response) => {
      // get the html content
      htmlContent = Cypress.$(response.body)
        .find('article.word-container .node__content')
        .html()
    });
  });

  it('should find [IMG-N] and [MIMG-N] tags in the content before javascript execution', () => {
    cy.step('Check if the HTML content is not empty')
    expect(htmlContent).to.exist

    cy.step('Check if the HTML content contains [IMG-N] tags')
    expect(htmlContent).to.match(/\[IMG-\d+\]/)

    cy.step('Check if the HTML content contains [MIMG-N] tags')
    expect(htmlContent).to.match(/\[MIMG-\d+\]/)
  })

  it('should verify rendered images after JavaScript execution', () => {
    // Visit the page to allow JavaScript execution
    cy.step('Visit the page to allow JavaScript execution')
    cy.visit(path)

    // Verify that desktop images are visible and mobile images are hidden on desktop view
    cy.step('Verify that desktop images are visible and mobile images are hidden on desktop view')
    cy.get('article.word-container .node__content')
      .should('be.visible')
      .within(() => {
        cy.step('Verify desktop images are visible and mobile images are hidden')
        cy.get('.desktop-image article').should('be.visible')
        cy.get('.mobile-image').should('have.css', 'display', 'none')
      })

    // Set viewport to mobile size and verify that mobile images are visible and desktop images are hidden
    cy.step('Set viewport to mobile size and verify that mobile images are visible and desktop images are hidden')
    cy.viewport(resolutions.mobile.viewportWidth, resolutions.mobile.viewportHeight)
    cy.get('article.word-container .node__content')
      .should('be.visible')
      .within(() => {
        cy.step('Verify mobile images are visible and desktop images are hidden')
        cy.get('.mobile-image article').should('be.visible')
        cy.get('.desktop-image').should('have.css', 'display', 'none')
      })
  })

})


