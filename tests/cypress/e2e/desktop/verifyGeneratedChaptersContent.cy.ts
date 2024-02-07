/**
 * BEL-128 - 3. test case
 */
describe('Generated chapter content in sidebar', () => {
  before(() => {
    cy.visit('/heslo/francuzsko')
  })

  it('Verifying text from h2 elements from content are same as in sidebar', () => {
    const textForH2Elements = []

    cy.step('Get all texts from h2 element and save them in array')
    cy.get('article.word-container')
      .should('be.visible')
      .within(() => {
        cy.get('.field__item h2').each(($elementH2) => {
          const text = $elementH2.text()
          textForH2Elements.push(text)
        })
      }).then(() => {
      cy.step('Verify of the number of values in array')
      cy.wrap(textForH2Elements).should('have.length', 8)
    })

    cy.step('Verify elements in sidebar')
    cy.get('.node__sidebar .structure')
      .should('be.visible')
      .within(() => {
        cy.get('h3')
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
  })

  it('Verifying after clicking on link in sidebar, page scrolls to correct breakpoint', () => {
    const textForH2Element = 'Armáda'

    cy.step(`Click to link ${textForH2Element} on sidebar`)
    cy.get('.node__sidebar .structure')
      .should('be.visible')
      .within(() => {
        cy.get('ul li')
          .should('be.visible')
          .contains(`${textForH2Element}`).should('be.visible').click()
      })

    cy.step('Verify page has scroll to correct breakpoint')
    cy.window().its('scrollY')
      .should('be.gt', 21050)
      .and('be.lt', 21250)

    cy.step('Verify text for h2 element')
    cy.get('h2[data-id=5]')
      .should('be.visible')
      .and('have.text', `${textForH2Element}`)
  })
})
