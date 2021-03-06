/// <reference types="Cypress" />

describe("Check data in 'Radars' menu", () => {
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

  it("Should login when 'username and password are correct'", () => {
    cy.fixture("user/user-globlex.json").then((user) => {
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

  it("Should access 'Radars' menu", () => {
    cy.wait(22000)
    cy.get('[class="md-list-item-text"]').contains("Radars").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/radars");
  });

  it("SET Index shouldn't equal to 0.00", () => {
    cy.get(":nth-child(1) > .layout-align-center-end").should(
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

  it("Should contain 'Radars' section", () => {
    cy.get(".breadcrumb").should("contain", "Radars");
  });

  it("Should show all lists of Radars", () => {
    cy.wait(20000);
    
    cy.get(".headbar").should("have.length.gte", 8);
  });
  
  // it('Popular Radars :: Should show the list of Signals (at least 1 Signal)', () => {
    //   //cy.wait(15000);
    
    //   cy.get(":nth-child(1) > .row > :nth-child(2) > .text-center > .col-md-2").should("have.length.gte", 1);
    
    // });
    
    // it("[Popular Radars] Should show correct Signals", () => {
    //   cy.wait(10000);
    //   cy.get(".radars-name").contains("5m Price Gainers").click();
    // });
    
  // it("Should logout to landing page", () => {
  //   cy.get('[class="md-list-item-text"]').contains("Logout").click();
  //   cy.get('[class="_md md-default-theme md-transition-in"]')
  //     .contains("YES")
  //     .click();
  // });
});
