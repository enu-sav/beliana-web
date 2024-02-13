import {TOverflow} from '../@type/TOverflow'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * - changes the value of the CSS 'overflow' property for the specified element.
       *
       * @param {string} selector - The CSS selector for the element
       * @param {TOverflow} value - The value to set for the 'overflow' property. Should be one of 'visible', 'hidden', 'scroll', 'auto', or 'clip'.
       *
       * @example
       * cy.changeValueForCssOverflow('html', 'hidden')
       */
      changeValueForCssOverflow(selector: string, value: TOverflow): void
    }
  }
}


Cypress.Commands.add('changeValueForCssOverflow', (selector: string, value: TOverflow) => {
  cy.get(`${selector}`)
    .invoke('css', 'overflow', `${value}`)
})