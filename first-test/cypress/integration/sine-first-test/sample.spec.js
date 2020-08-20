/// <reference types="Cypress" />

describe('Cypress Test', () => {
  beforeEach(() => {
    cy.visit('https://cypress.io');
  });

  it('should has text \'npm install cypress\'', () => {
    //cy.should('contain','npm install cypress')
    cy.get('[class="styled__Wrapper-ouqcsn-0 jdExZC"]').should(
      'contain',
      'npm install cypress'
    );
  });
});
