describe('Example test file', () => {
  before(() => {
    cy.visit('/')
  })

  it('check text in body', () => {
    cy.get('#block-bel-encyklopedia .field--name-body',)
      .should('be.visible')
      .and('have.text', 'Slovenská všeobecná encyklopédia – viac o encyklopédii')
  })
})