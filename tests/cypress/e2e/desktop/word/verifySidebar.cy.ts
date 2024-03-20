/**
 * BeforeEach tests, check if there are sidebar element in the content (sidebarExists = true | false)
 *
 * BEL-128 - 4, 5, 6. test case
 * - Navigate to /node/nid
 *
 * - If sidebarExists = true
 * - Verification that a section for content is displayed in the sidebar
 * - Verification that the section for content in the sidebar contains a list of links
 * - Verification that the section for content in the sidebar contains a word-illustration
 * - Verification that the section for content in the sidebar contains a media-image (first 3 images are .svg, the rest are .webp)
 * - Verification that the section for content in the sidebar contains a table
 *
 * - If sidebarExists = false
 * - Verification that there is no section displayed in the sidebar for content
 * - Verification that the sidebar is not visible
 * - Verification that the sidebar is hidden
 * - Verification that the sidebar does not contain the structure
 * - Verification that the sidebar does not contain the word-illustration
 * - Verification that the sidebar does not contain the media-image
 * - Verification that the sidebar does not contain the table
 */

describe('Check if sidebar exists in content and contains the correct structure', () => {
  let sidebarExists: boolean

  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  beforeEach(() => {
    cy.step('beforeEach - check if exist sidebar in content')
    cy.get('article.word-container .node__sidebar')
      .as('container')
      // has styles - display: none
      .children('.structure')
      .then(($items) => {
        sidebarExists = $items.length > 0
      })

  })

  it('If exist sidebar, verify if visible structure in sidebar', () => {
    if (sidebarExists) {
      cy.step('Verify if visible structure in sidebar')
      cy.get('.node__sidebar')
        .should('be.visible')
        .children('.structure')
        .should('be.visible')
        .within(() => {
          cy.step('Verify if content section in sidebar is visible and contains text "Obsah"')
          cy.get('.contents')
            .should('be.visible')
            .and('have.text', 'Obsah')

          cy.step('Verify that the section for content in the sidebar contains a list of links')
          cy.get('ul li')
            .should('be.visible')
            .find('a')
            .each(($el, index) => {
              cy.wrap($el)
                .should('be.visible')
                .invoke('text')
            })
        })
    } else {
      cy.step('Verify if not visible sidebar and not exist structure in sidebar')
      cy.get('.node__sidebar')
        .should('have.css', 'display', 'none')
        .and('not.be.visible')
        .children('.structure')
        .should('have.class', 'hidden')
        .and('not.be.visible')
    }
  })

  it('If exist sidebar, verify if visible word-illustration, media-image and table in sidebar', () => {
    if (sidebarExists) {
      cy.step('Verify if visible word-illustration in sidebar')
      cy.get('.node__sidebar .word-illustration')
        .should('be.visible')
        .within(() => {
          cy.step('Verify if visible media-image in sidebar. First 3 images are .svg, the rest are .webp')
          cy.get('.media-image')
            .should('be.visible')
            .find('picture')
            .each(($el, index) => {
              cy.wrap($el)
                .find('img')
                .should('be.visible')
                .and('have.attr', 'src')
              if (index < 3) {
                cy.wrap($el)
                  .find('img')
                  .and('have.attr', 'src')
                  .and('include', '.svg')

                // if index = 1 and in alt have text "Štátna zástava"
                if (index === 0) {
                  cy.step('Verify if alt attribute contains "Štátna zástava" in first image')
                  cy.wrap($el)
                    .find('img')
                    .and('have.attr', 'alt')
                    .and('include', 'Štátna zástava')
                }
              } else {
                cy.wrap($el)
                  .find('img')
                  .and('have.attr', 'src')
                  .and('include', '.webp')
              }
            })
          cy.step('Verify if visible table after first media-image in sidebar')
          cy.get('.media-image').first()
            .next()
            .should('be.visible')
            .and('match', '.field--name-field-table')
            .within(() => {
              cy.get('.field__item table')
                .should('be.visible')
                .and('match', 'table')
            })
        })
    } else {
      cy.step('Verify if not visible sidebar')
      cy.get('.node__sidebar')
        .should('have.css', 'display', 'none')
        .and('not.be.visible')

      cy.step('Verify if not exist word-illustration in sidebar')
      cy.get('.node__sidebar .word-illustration')
        .should('not.exist')

      cy.step('Verify if not exist media-image in sidebar')
      cy.get('.node__sidebar .media-image')
        .should('not.exist')

      cy.step('Verify if not exist table in sidebar')
      cy.get('.node__sidebar .field--name-field-table')
        .should('not.exist')
    }
  })
})
