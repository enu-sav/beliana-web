// commands imports
import './commands/customCommands'


// GLOBAL HOOKS
before(() => {
  const testEnv = 'https://dw.beliana.sav.sk'

  if (`${Cypress.config('baseUrl')}` === testEnv) {
    cy.log(`${Cypress.config('baseUrl')}`)
    // close modal after visit
    cy.setCookie('info-popup', 'info-popup-closes')
  } else {
    cy.log(`${Cypress.config('baseUrl')}`)
  }
})