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
    cy.wait("@getPull", { timeout: 15000 });
  });

  it("Should access 'Radars' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Radars").click();
    cy.server();
    cy.route("**/trade/#/radars").as("gotoRadars");
  });

  it("Should access 'Favorite' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Favorite").click();
    cy.server();
    cy.route("**/trade/#/favorite").as("gotoFavorite");
  });

  it("Should access 'Trade' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Trade").click();
    cy.server();
    cy.route("**/trade/#/trade").as("gotoTrade");
  });

  it("Should access 'Portfolio' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Portfolio").click();
    cy.server();
    cy.route("**/trade/#/portfolio").as("gotoPortfolio");
  });

  it("Should access 'Ticker' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Ticker").click();
    cy.server();
    cy.route("**/trade/#/ticker").as("gotoTicker");
  });

  it("Should access 'Alerts' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Alerts").click();
    cy.server();
    cy.route("**/trade/#/alerts").as("gotoAlerts");
  });

  it("Should access 'Chart' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Chart").click();
    cy.server();
    cy.route("**/trade/#/chart").as("gotoAlerts");
  });

  it("Should access 'Yuanta Service' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Yuanta Service").click();
  });

  it("Should logout to landing page", () => {
    cy.get('[class="md-list-item-text"]').contains("Logout").click();
    cy.get('[class="_md md-default-theme md-transition-in"]')
      .contains("YES")
      .click();
  });
});
