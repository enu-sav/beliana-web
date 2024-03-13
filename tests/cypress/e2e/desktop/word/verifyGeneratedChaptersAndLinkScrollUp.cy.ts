/**
 * BeforeEach tests, check if there are any h2 elements in the content (h2Exists = true | false)
 *
 * BEL-128 - 2. test case
 * - Navigate to /node/nid
 * - If h2Exists = true
 *  - Find all h2 elements in page content and verifies that each of them contains a scroll-up link
 *  - Select a random scroll-up link, click on it, verify that the page scrolled up, and h1 element is visible
 * - If h2Exists = false
 *  - Verification that there is no scroll-up link in the content
 *
 * BEL-128 - 3. test case
 * - Navigate to /node/nid
 * - If h2Exists = true
 *  - Find all h2 elements in the page content and saves them into an array of strings
 *  - Verification that a section for content is displayed in the sidebar
 *  - Compare the retrieved/saved values from the content with those present in the sidebar
 * - If h2Exists = false
 *  - Verification that there are no h2 elements in the content
 *  - Verification that there is no section displayed in the sidebar for content
 */

describe('Generated chapter content in sidebar and Link to scroll up', () => {
  let h2Exists: boolean

  before(() => {
    // exp. francuzsko=17922, konstanta=19378
    const path = 'node/17922'

    cy.visit(path)
  })

  beforeEach(() => {
    cy.step('beforeEach - check if exist h2 in content')
    cy.get('article.word-container .node__content')
      .as('container')
      .find('.field--name-body')
      .children('.field__item')
      .then(($items) => {
        h2Exists = $items.find('h2').length > 0
      })
  })

  it('Verifying text from h2 elements from content are same as in sidebar', () => {
    const textForH2Elements = []

    if (h2Exists) {
      cy.get('@container')
        .should('be.visible')
        .within(() => {
          cy.get('.field__item h2')
            .each(($elementH2) => {
              cy.step('Verify every h2 element has a scroll-up link')
              cy.wrap($elementH2)
                .siblings('span:eq(0)')
                .as('linkForScrollUp')
                .should('be.visible')
                .and('have.text', 'Naspäť na obsah')

              cy.step('Get all texts from h2 element and push them in array')
              const text = $elementH2.text()
              textForH2Elements.push(text)

              cy.log(`Text for h2 element that was pushed into the array is **${text}**`)
            })
        })

      cy.step('Verify elements in sidebar')
      cy.get('.node__sidebar .structure')
        .should('be.visible')
        .within(() => {
          cy.get('.contents')
            .should('be.visible')
            .and('have.text', 'Obsah')

          cy.step('Verify value of the content vs sidebar')
          cy.get('ul li')
            .should('be.visible')
            .find('a')
            .each(($el, index) => {
              cy.wrap($el)
                .should('be.visible')
                .invoke('text')
                .should('be.eq', textForH2Elements[index])
            })
        })
    } else {
      cy.step('Verify if not exist h2 elements in content')
      cy.get('@container')
        .should('be.visible')
        .find('h2')
        .should('not.be.exist')

      cy.step('Verify if not visible generated chapters in sidebar')
      cy.get('.node__sidebar .structure')
        .should('have.class', 'hidden')
        .and('not.be.visible')
    }
  })

  it('Verifying position on page after clicking on link scroll-up', () => {
    if (h2Exists) {
      cy.step('Click to random scroll-up link')
      cy.get('@container')
        .should('be.visible')
        .within(() => {
          cy.get('.field__item .scroll-up')
            .should('be.visible')
            .sample()
            .click()
        })

      cy.step('Verify position on page and visibility h1 element')
      cy.window().its('scrollY')
        .should('be.eq', 0)
      cy.get('h1').should('be.visible')
    } else {
      cy.step('Verify if not exist scroll-up link in content')
      cy.get('@container')
        .should('be.visible')
        .find('.scroll-up')
        .should('not.be.exist')
    }
  })
})
