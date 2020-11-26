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

  it("Should access 'Market Mover' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Market Mover").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/marketmover");
    // cy.intercept({
    //   method: "POST",
    //   url: "https://realtime.stockradars.co/setmds/pull",
    // }).as("getPull");
    // cy.wait("@getPull", { timeout: 15000 });
  });

  it("Should access 'Radars' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Radars").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/radars");
  });

  it("Should access 'Favorite' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Favorite").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/favorite");
  });

  it("Should access 'Trade' menu", () => {
    // Wait for the route aliased as 'getAccount' to respond
    // without changing or stubbing its response
    cy.intercept({
      method: "POST",
      url: "https://realtime.stockradars.co/setmds/pull",
    }).as("getTrade");

    cy.wait("@getTrade", { timeout: 15000 }).then((xhr) => {
      // we can now access the low level xhr
      // that contains the request body,
      // response body, status, etc
      return cy.get(".pg-loading-logo").should("not.exist");
    });

    cy.get('[class="md-list-item-text"]').contains("Trade").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/trade");
  });

  it("Should access 'Portfolio' menu", () => {
    // Wait for the route aliased as 'getAccount' to respond
    // without changing or stubbing its response
    cy.intercept({
      method: "POST",
      url: "https://realtime.stockradars.co/setmds/pull",
    }).as("getPortfolio");

    cy.wait("@getPortfolio", { timeout: 15000 }).then((xhr) => {
      // we can now access the low level xhr
      // that contains the request body,
      // response body, status, etc
      return cy.get(".pg-loading-logo").should("not.exist");
    });

    cy.get('[class="md-list-item-text"]').contains("Portfolio").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/portfolio");
  });

  it("Should access 'Ticker' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Ticker").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/ticker");
  });

  it("Should access 'Alerts' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Alerts").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/alerts");
  });

  it("Should access 'Chart' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Chart").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/chart");
  });

  it("Should access 'Yuanta Service' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Yuanta Service").click();
    cy.intercept({
      url: "https://sso1.yuanta.co.th/ssomobile/Default.aspx",
    }).as("gotoYuantaService");
    //cy.location('pathname').should('eq', 'https://sso1.yuanta.co.th/ssomobile/Default.aspx')
    cy.get(
      'a[href="https://itrade.yuanta.co.th/ytapi/login_eservice.aspx?txtParam=zvXFawGCze1A6EvA9vPsggq6hAy%2fcKagkHF09FEoMK6d8kbmb0bmwg%3d%3d"]'
    ).should("have.attr", "target", "_blank");
  });

  cy.intercept({
    method: "POST",
    url: "https://realtime.stockradars.co/setmds/pull",
  }).as("getPortfolio");

  it("Should logout to landing page", () => {
    cy.get('[class="md-list-item-text"]').contains("Logout").click();
    cy.get('[class="_md md-default-theme md-transition-in"]')
      .contains("YES")
      .click();
  });
});
