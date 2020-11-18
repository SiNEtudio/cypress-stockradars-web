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

  it("Should access 'Yuanta Service' menu", () => {
    cy.get('[class="md-list-item-text"]').contains("Yuanta Service").click();
    cy.url().should('eq', 'https://stockradars.co/trade/#/marketmover','target', '_blank')
    //y.get(':nth-child(9) > .menu-list > .md-2-line').eq('a[href="https://itrade.yuanta.co.th/ytapi/login_eservice.aspx?txtParam=zvXFawGCze1A6EvA9vPsggq6hAy%2fcKagkHF09FEoMK6d8kbmb0bmwg%3d%3d"]').should('have.attr','target','_blank')


    //   cy.server();
    //   cy.route("https://sso1.yuanta.co.th/ssomobile/Default.aspx").as("gotoYuantaService");
    //   //cy.location('pathname').should('eq', 'https://sso1.yuanta.co.th/ssomobile/Default.aspx')
    //cy.get('a[href="https://itrade.yuanta.co.th/ytapi/login_eservice.aspx?txtParam=zvXFawGCze1A6EvA9vPsggq6hAy%2fcKagkHF09FEoMK6d8kbmb0bmwg%3d%3d"]').should('have.attr', 'target', '_blank')
    
    // cy.get("@redirect").should(
    //   "be.called",
    //   "_blank",
    //   'a[href="https://itrade.yuanta.co.th/ytapi/login_eservice.aspx?txtParam=zvXFawGCze1A6EvA9vPsggq6hAy%2fcKagkHF09FEoMK6d8kbmb0bmwg%3d%3d"]'
    // );
    // cy.window().then((win) => {
    //   cy.spy(win, "open").as("redirect");
    // });
    // cy.get("a").click();

    // cy.get('a[href="/foo"]').should('have.attr', 'target', '_blank')

    // cy.get(selector)
    //   .invoke('attr', 'href')
    //   .then(href => {
    //     cy.visit(href);
    //   });



  });

  it("Should logout to landing page", () => {
    cy.get('[class="md-list-item-text"]').contains("Logout").click();
    cy.get('[class="_md md-default-theme md-transition-in"]')
      .contains("YES")
      .click();
  });
});
