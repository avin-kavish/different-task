/// <reference types="cypress" />

describe('Leases Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/leases')
  })

  it('should contain a heading and a list of leases', () => {
    cy.get('h1').should('have.text', 'Leases')

    cy.get('a').then(els => expect(els).to.have.length(3))
  })

  it('should navigate to the details page upon clicking', () => {
    cy.get('a').first().click()

    cy.url().should('match', /\/leases\/.+$/)
  })
})
