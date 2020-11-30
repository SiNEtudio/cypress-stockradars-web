/// <reference types="Cypress" />

describe("Check data in 'Alerts' menu", () => {
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

  it("Should select 'Yuanta Securities' broker", () => {
    cy.get('[class="blue md-button md-ink-ripple flex"]')
      .contains("เลือกบริษัทหลักทรัพย์ที่นี่")
      .click();
    cy.get('[class="_md"]').contains("YUANTA").click();
    cy.get('[class="img-broker img-responsive"]').should(
      "have.attr",
      "src",
      "https://storage-th-xbkk.stockradars.co/images/broker/YUANTA.png"
    );
  });

  it("Should login when 'username and password are correct'", () => {
    cy.fixture("user/user-yuanta.json").then((user) => {
      cy.get("#input_1").clear().type(user.username); // Get data from {fixturesFolder}/users/user.json
      cy.get("#input_2").clear().type(user.password); // Get data from {fixturesFolder}/users/user.json
      cy.get('[class="blue md-button md-ink-ripple flex"]')
        .contains("เข้าสู่ระบบ")
        .click();
      cy.intercept({
        method: "POST",
        url: "https://realtime.stockradars.co/setmds/pull",
      }).as("getPull");
      cy.wait("@getPull", { timeout: 15000 });

      cy.get(".setindex-bar").should("contain", "SET");
    });
  });

  it("Should access 'Alerts' menu", () => {
    cy.wait(21000);
    cy.get('[class="md-list-item-text"]').contains("Alerts").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/alerts");
  });

  it("SET Index shouldn't equal to 0.00", () => {
    cy.get(".setindex-bar > :nth-child(1) > .layout-align-center-end").should(
      "not.have.value",
      "0.00"
    );
  });

  it("SET Volume shouldn't equal to 0.00", () => {
    cy.get(".txt-padding-right").should("not.have.value", "0.00");
  });

  it("SET Value shouldn't equal to 0.00", () => {
    cy.get(".layout-wrap > :nth-child(4)").should("not.have.value", "0.00");
  });

  it("Should contain 'Alerts Box' completely", () => {
    cy.get(".txt-pricebar").should("contain", "Alerts");

    cy.get(".txt-add-list").should("contain", "Add a new Alert");

    cy.get(".col-xs-12 > :nth-child(1) > .text-center").should(
      "contain",
      "Delete Alert"
    );
  });

  it("Should add new Radars (BDMS)", () => {
    cy.get(".txt-add-list").contains("Add a new Alert").click();
    cy.get("#input-12").type("BDMS{enter}");
    cy.get(".pull-right").click();
    cy.get(
      ":nth-child(1) > .alert-box > :nth-child(2) > .col-xs-8 > .form-control"
    ).type("0.1");
    cy.get(
      ":nth-child(2) > .alert-box > :nth-child(2) > .col-xs-8 > .form-control"
    ).type("1");
    cy.get(
      ":nth-child(3) > .alert-box > :nth-child(2) > .col-xs-8 > .form-control"
    ).type("1");
    cy.get(":nth-child(2) > .btn").should("contain", "Done").click();
    cy.get(".add-list").should("contain","BDMS");
  });

  // it("Should logout to landing page", () => {
  //   cy.get('[class="md-list-item-text"]').contains("Logout").click();
  //   cy.get('[class="_md md-default-theme md-transition-in"]')
  //     .contains("YES")
  //     .click();
  // });
});
