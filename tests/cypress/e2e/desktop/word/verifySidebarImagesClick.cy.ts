import {texts} from "../../../support/variables/textsForMedia";

/**
 * BEL-128 - 7. test case
 * - Navigate to /node/nid
 *
 * - Find all img elements in the sidebar
 * - Click on each img element
 * - Verify that the image is opened in a new tab
 * - Verify that the image is displayed
 * - Verify that the image has a width of 480px
 * - Verify that the image has a loading attribute set to eager
 * - Verify that the image has a picture element
 * - Verify that the picture element has a source element
 * - Verify that the source element has a srcset attribute
 * - Navigate back to the previous page
 * - Repeat the steps for each img element
 *
 */
describe('Verify if media images in sidebar are clickable and open in a new tab', () => {
  let media_links = []

  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  it('Verify if visible media images in sidebar and collect their links', () => {
    cy.step('Verify if visible word-illustration in sidebar')
    cy.get('article.word-container .node__sidebar .word-illustration')
      .should('be.visible')
      .within(() => {
        cy.step('Verify if visible media-image in sidebar.')
        cy.get('.media-image a').each(($link, index) => {
          const href = $link.prop('href')
          media_links.push(href)
        });
      })
  });

  it('Visit each media link in a new tab and verify the image', () => {
    cy.wrap(media_links).each(($link) => {
      cy.visit(`${$link}`)
      cy.step('Verify media page is opened in a new tab')
      cy.contains(texts.mediaTitle).should('exist')

      cy.step('Verify media image is visible')
      cy.get('.media-image img').as('media-img')
        .should('be.visible')
        .and('have.css', 'width', '480px')
        .and('have.attr', 'loading', 'eager')
        .parents('picture')
        .find('source')
        .should('exist')
        .and('have.attr', 'srcset')

      cy.step('Navigate back to the previous page')
      cy.go('back')
    })
  })

});
