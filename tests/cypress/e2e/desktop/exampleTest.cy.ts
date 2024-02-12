import {texts} from '../../support/variables/footer/textsForHomePage'

describe.skip('Example test', () => {
  before(() => {
    cy.visit('/')
  })

  it('Verifying part for alphabet', () => {
    cy.step('Verify alphabet div')
    cy.get('#block-bel-alphabet')
      .should('be.visible')
      .within(() => {
        cy.step('Verify alphabet ul and li elements')
        cy.get('ul[id*=accessible-alphabetical-menu]')
          .should('be.visible')
          .children('li')
          .should('be.visible')
          .and('have.length', 29)
      })
  })

  it('Verifying title body contains correct text and global search is visible', () => {
    cy.step('Verify text in body')
    cy.get('#block-bel-encyklopedia .field--name-body')
      .should('be.visible')
      .and('have.text', `${texts.bodyLinkText}`)

    cy.step('Verify global search')
    cy.get('#block-bel-searchbox').should('be.visible')
  })
})
