/// <reference types="cypress" />

describe('Lease Details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/leases/lease-a')
  })

  it('should contain a heading and a list of payments', () => {
    cy.get('h1').should('have.text', 'Payment Schedule')

    cy.get('tbody tr').then(els => expect(els).to.have.length.above(0))
  })
})
