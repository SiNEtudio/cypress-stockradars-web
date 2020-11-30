/// <reference types="Cypress" />

describe("Check data in 'Search' menu", () => {
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

  it("Should search stock (BDMS)", () => {
    cy.wait(5000);
    cy.get(".md-toolbar-tools > .md-fab").click({ force: true }); //Force click - You can also force the action to be performed on the element regardless of whether the element is visible or not.
    cy.get("#input-4").type("BDMS{enter}");
  });

  // it("Should logout to landing page", () => {
  //   cy.get('[class="md-list-item-text"]').contains("Logout").click();
  //   cy.get('[class="_md md-default-theme md-transition-in"]')
  //     .contains("YES")
  //     .click();
  // });
});
