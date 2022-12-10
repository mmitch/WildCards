/// <reference types="cypress" />

describe('workspace-project WildCards', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display title screen', () => {
    cy.get('app-root h1').should('have.text', 'Wild Cards')
  })
})
