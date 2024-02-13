declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * - check the width of an element
     *
     * @param {number} width - expected width of the element in pixels
     *
     * @example
     * cy.get('header').checkElementWidth(100)
     * cy.checkElementWidth(100)
     */
    checkElementWidth(width: number): Chainable<Subject>
  }
}

Cypress.Commands.add('checkElementWidth', {prevSubject: true}, (subject: JQuery<HTMLElement> | undefined, width: number) => {
  const elementToCheck = subject ? cy.wrap(subject) : cy.document().then((doc) => cy.wrap(doc.body))

  return elementToCheck.then(($el) => {
    // rounding element width to int
    expect(parseInt($el.outerWidth().toFixed(0))).to.eq(width)

    return subject
  })
})
