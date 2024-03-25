declare namespace Cypress {
  interface Chainable {
    /**
     * - verify that the MathJax script is loaded
     *
     * @param {string} mathjaxCDNLink - The MathJax CDN link
     *
     * @example
     * cy.verifyJavascriptFileLoad('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML')
     */
    verifyJavascriptFileLoad(mathjaxCDNLink: string): void

    /**
     * - verify that the MathJax object is available in the window object
     *
     * @param {string} mathjaxCDNLink - The MathJax CDN link
     *
     * @example
     * cy.verifyWindowObjectAvailability('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML')
     */
    verifyWindowObjectAvailability(mathjaxCDNLink: string): void

    /**
     * - verify that the MathJax object is not available in the window object
     *
     * @param {string} mathjaxCDNLink - The MathJax CDN link
     *
     * @example
     * cy.verifyWindowObjectNotAvailability('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML')
     * @param mathjaxCDNLink
     */
    verifyWindowObjectNotAvailability(mathjaxCDNLink: string): void
  }
}

Cypress.Commands.add('verifyJavascriptFileLoad', (mathjaxCDNLink) => {
  cy.request(mathjaxCDNLink).then((response) => {
    expect(response.status).to.eq(200)
  })
})

Cypress.Commands.add('verifyWindowObjectAvailability', (mathjaxCDNLink) => {
  cy.window().then(win => {
    expect(win.document.querySelector('script[src="' + mathjaxCDNLink + '"]')).to.exist;
  })
})

Cypress.Commands.add('verifyWindowObjectNotAvailability', (mathjaxCDNLink) => {
  cy.window().then(win => {
    expect(win.document.querySelector('script[src="' + mathjaxCDNLink + '"]')).to.not.exist;
  })
})

