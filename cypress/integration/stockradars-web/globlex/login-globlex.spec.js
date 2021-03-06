/// <reference types="Cypress" />

describe("Login with 'Globlex Securities'", () => {
  // beforeEach(() => {
  it("Should visit StockRadars Website (Broker Login)", () => {
    cy.visit("/trade/");
  });

  it("Should appear select broker dropdown", () => {
    cy.get('[class="blue md-button md-ink-ripple flex"]').should(
      "contain",
      "เลือกบริษัทหลักทรัพย์ที่นี่"
    );
  });

  it("Should select 'Globlex Securities' broker", () => {
    cy.get('[class="blue md-button md-ink-ripple flex"]')
      .contains("เลือกบริษัทหลักทรัพย์ที่นี่")
      .click();
    cy.get('[class="_md"]').contains("GLOBLEX").click();
    cy.get('[class="img-broker img-responsive"]').should(
      "have.attr",
      "src",
      "https://storage-th-xbkk.stockradars.co/images/broker/GLOBLEX.png"
    );
  });

  it("Should alert warning text when 'username and password are empty'", () => {
    cy.get('[class="blue md-button md-ink-ripple flex"]')
      .contains("เข้าสู่ระบบ")
      .click();
    cy.get('[class="swal2-content"]').should(
      "contain",
      "Please enter Username and Password"
    );
    cy.get('[class="swal2-confirm styled"]').contains("OK").click();
  });

  it("Should alert warning text when 'password is empty'", () => {
    cy.fixture("user/user-globlex.json").then((user) => {
      cy.get("#input_1").clear().type(user.username); // Get data from {fixturesFolder}/users/user.json
      cy.get('[class="blue md-button md-ink-ripple flex"]')
        .contains("เข้าสู่ระบบ")
        .click();
      cy.get('[class="swal2-content"]').should(
        "contain",
        "Please enter Username and Password"
      );
      cy.get('[class="swal2-confirm styled"]').contains("OK").click();
    });
  });

  it("Should alert warning text when 'username field is empty'", () => {
    cy.fixture("user/user-globlex.json").then((user) => {
      cy.get("#input_1").clear(); //clear data in username field
      cy.get("#input_2").clear().type(user.password); // Get data from {fixturesFolder}/users/user.json
      cy.get('[class="blue md-button md-ink-ripple flex"]')
        .contains("เข้าสู่ระบบ")
        .click();
      cy.get('[class="swal2-content"]').should(
        "contain",
        "Please enter Username and Password"
      );
      cy.get('[class="swal2-confirm styled"]').contains("OK").click();
    });
  });

  it("Should login when 'username and password are correct'", () => {
    cy.fixture("user/user-globlex.json").then((user) => {
      cy.get("#input_1").clear().type(user.username); // Get data from {fixturesFolder}/users/user.json
      cy.get("#input_2").clear().type(user.password); // Get data from {fixturesFolder}/users/user.json
      cy.get('[class="blue md-button md-ink-ripple flex"]')
        .contains("เข้าสู่ระบบ")
        .click();
      cy.get(".setindex-bar").should("contain", "SET");
    });
  });
});
