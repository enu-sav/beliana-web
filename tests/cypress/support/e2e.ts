// commands imports
import 'cypress-plugin-steps'
import 'cypress-map'
import './commands/customCommands'

// GLOBAL HOOKS
before(() => {
  const testEnv = 'https://dw.beliana.sav.sk'

  if (`${Cypress.config('baseUrl')}` === testEnv) {
    cy.log(`${Cypress.config('baseUrl')}`)
    // close modal
    cy.window().then(win => {
      win.localStorage.setItem('info-popup', 'info-popup-closes')
    })
    // verify if modal exist in DOM
    cy.get('.bel-modal__container').should('not.exist')
  } else {
    cy.log(`${Cypress.config('baseUrl')}`)
    // verify if modal exist in DOM
    cy.get('.bel-modal__container').should('not.exist')
  }
})