/// <reference types="Cypress" />

describe(
  "Visit stockradars.co Website and access 'Trade' menu",
  {
    //cy.viewport(1920, 1080)
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    beforeEach(() => {
      cy.visit("https://stockradars.co");
    });

    it("Should appear 'Login' Menu", () => {
      cy.get('[class="nav-item"]').should("contain", "Login");
    });

    it("Should click 'Login' Menu", () => {
      cy.get("#navbarNavDropdown > ul > li:nth-child(7)").click();
    });
  }
);
