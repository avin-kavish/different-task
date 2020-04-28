/// <reference types="cypress" />

describe('Home Page', () => {
  it('should contain a working "leases" link', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('leases').click()

    cy.url().should('include', '/leases')
  })
})
