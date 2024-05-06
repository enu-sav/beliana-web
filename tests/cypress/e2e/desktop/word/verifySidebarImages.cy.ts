import {texts} from "../../../support/variables/textsForSidebar";

/**
 * BEL-128 - 6. test case
 * - Navigate to /node/nid
 *
 * - Find all img elements in the sidebar
 *
 * - Verify that illustrations are visible in the sidebar
 * - Verify that the first image has alt attribute "Štátna zástava"
 * - Verify that the first 3 images are .svg type
 * - Verify that the rest of the images are .webp type
 *
 */
describe('Check if illustrations are visible in sidebar', () => {
  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  it('Verify illustrations in sidebar', () => {
    cy.step('Verify if visible word-illustration in sidebar')
    cy.get('article.word-container .node__sidebar .word-illustration')
      .should('be.visible')
      .within(() => {
        cy.step('Verify if visible media-image in sidebar. First 3 images are .svg, the rest are .webp')
        cy.get('.media-image')
          .should('be.visible')
          .find('picture').as('images')
          .each(($el, index) => {
            cy.wrap($el)
              .find('img')
              .should('be.visible')
              .and('have.attr', 'src')

            if (index == 0) {
              cy.step('Verify if alt attribute contains "Štátna zástava" in first image')
              cy.wrap($el)
                .find('img')
                .should('have.attr', 'alt')
                .and('include', texts.firstImageAlt)
            }

            if (index < 3) {
              cy.wrap($el)
                .find('img')
                .invoke('attr', 'src')
                .then((src) => {
                  const srcAsString = String(src).split('?')[0];
                  const img_ype = srcAsString.split('.').pop();
                  cy.step('Verify if image is .svg type')
                  expect(img_ype).to.equal('svg');
                })
            } else {
              cy.wrap($el)
                .find('img')
                .and('have.attr', 'src')
                .then((src) => {
                  const srcAsString = String(src).split('?')[0];
                  const img_ype = srcAsString.split('.').pop();
                  cy.step('Verify if image is .webp type')
                  expect(img_ype).to.equal('webp');
                })
            }
          })
      })
  })
})
