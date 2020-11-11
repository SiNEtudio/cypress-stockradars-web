/// <reference types="Cypress" />

describe("Login with 'Yuanta Securities'", () => {
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
      cy.server();
      cy.route({
        method: "POST",
        url: "https://realtime.stockradars.co/setmds/pull",
      }).as("getPull");
      cy.wait("@getPull", { timeout: 15000 });
      //cy.wait(5000);
      cy.get(".setindex-bar").contains("SET");
    });
  });

  it("Should access 'Market Mover' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Market Mover").click();
    cy.server();
    //cy.route("**/trade/#/marketmover").as("gotoMarketMover");
    cy.route({
      method: "POST",
      url: "https://realtime.stockradars.co/setmds/pull",
    }).as("getPull");
    //cy.wait("@getPull", { timeout: 15000 });
  });

  it("Should select 'Most Active Value' tab", () => {
    cy.get(".md-active").contains("Most Active Value").click();
    cy.get(":nth-child(2) > .text-left").should("have.length", 1);
  });

  it("Should select 'Most Active Volume' tab", () => {
    cy.get('md-pagination-wrapper > [md-tab-id="6"]')
      .contains("Most Active Volume")
      .click();
    cy.get(":nth-child(2) > .text-left").should("have.length", 1);
  });

  it("Should select 'Top Gainer' tab", () => {
    cy.get('md-pagination-wrapper > [md-tab-id="7"]')
      .contains("Top Gainer")
      .click();
    cy.get(":nth-child(2) > .text-left").should("have.length", 1);
  });

  it("Should select 'Top Loser' tab", () => {
    cy.get('md-pagination-wrapper > [md-tab-id="8"]')
      .contains("Top Loser")
      .click();
    cy.get(":nth-child(2) > .text-left").should("have.length", 1);
  });

  it("Should select 'Most Swing' tab", () => {
    cy.get('md-pagination-wrapper > [md-tab-id="9"]')
      .contains("Most Swing")
      .click();
    cy.get(":nth-child(2) > .text-left").should("have.length", 1);
  });

  it("Should select 'Favorite' tab", () => {
    cy.get('md-pagination-wrapper > [md-tab-id="10"]')
      .contains("Favorite")
      .click();
    cy.get(":nth-child(2) > .text-left").should("have.length", 1);
  });

  it("Should select 'Portfolio' tab", () => {
    cy.get('md-pagination-wrapper > [md-tab-id="11"]').contains("Portfolio").click();
    //cy.get(':nth-child(2) > .text-left').should('have.length', 1);
  });

  it("Should logout to landing page", () => {
    cy.get('[class="md-list-item-text"]').contains("Logout").click();
    cy.get('[class="_md md-default-theme md-transition-in"]')
      .contains("YES")
      .click();
  });
});
