/**
 * BEL-128 - 4. test case
 * - Navigate to /node/nid
 *
 * - Find all img elements in the page content and sidebar. Images that are in the page content should not be displayed in the sidebar
 *
 * - Verify that the images in the content are not displayed in the sidebar
 */

describe('Verify images in content and sidebar', () => {
  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  it('Verifying images in content are not displayed in sidebar', () => {
    let contentImages = []

    // Get all images in .node__content and save their src attributes in an array
    cy.get('article.word-container .node__content img')
      .each(($img) => {
        contentImages.push($img.attr('src'))
        cy.step('Verify image is visible')
        cy.wrap($img).should('be.visible')
      })

    // Get all images in .node__sidebar and verify they are not in the contentImages array
    cy.get('article.word-container .node__sidebar img')
      .each(($img) => {
        expect(contentImages).not.to.include($img.attr('src'))
        cy.step('Verify image is visible')
        cy.wrap($img).should('be.visible')
      })
  })
})
