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

  it("[BDMS] Should search stock and display stock data correctly", () => {
    cy.wait(15000);
    cy.get(".md-toolbar-tools > .md-fab").click({ force: true }); //Force click - You can also force the action to be performed on the element regardless of whether the element is visible or not.
    cy.get("#input-4").type("BDMS{enter}");
    cy.url().should(
      "eq",
      "https://stockradars.co/trade/#/realtime?symbol=BDMS"
    );

    cy.get(".layout-align-center-start > .ng-binding").should(
      "contain",
      "BDMS"
    );

    cy.get(":nth-child(3) > .layout-align-start-stretch > .ng-binding").should(
      "contain",
      "BANGKOK DUSIT MEDICAL SERVICES"
    );

    cy.get(
      "[ng-include=\"'views/component/stockPrice.html'\"] > div.ng-scope > .md-padding > :nth-child(1) > .layout-align-center-end"
    ).should("not.have.value", "0.00");
    cy.get(
      "[ng-include=\"'views/component/stockPrice.html'\"] > div.ng-scope > .md-padding > :nth-child(1) > .layout-align-center-end"
    ).should("not.have.value", "null");
    cy.get(
      "[ng-include=\"'views/component/stockPrice.html'\"] > div.ng-scope > .md-padding > :nth-child(1) > .layout-align-center-end"
    ).should("not.have.value", "null");

    cy.get(".col-md-8 > :nth-child(1) > .box > .headbar").should(
      "contain",
      "Candlestick Chart"
    );
    cy.get("#highcharts-0 > svg > .highcharts-background").should(
      "not.have.value",
      "null"
    );

    cy.get(".col-md-6.ng-scope > .box > .headbar").should(
      "contain",
      "Intraday Chart"
    );
    cy.get("#highcharts-5 > svg > .highcharts-background").should(
      "not.have.value",
      "null"
    );

    cy.get(
      "[ng-include=\"'views/component/lastExecuted.html'\"] > .box > .headbar"
    ).should("contain", "Last Executed");
    cy.get(".box > :nth-child(2) > .ng-binding").should(
      "not.have.value",
      "null"
    );
    cy.get(":nth-child(2) > .layout-align-center-center").should(
      "not.have.value",
      "null"
    );
    cy.get(
      "[ng-include=\"'views/component/lastExecuted.html'\"] > .box > :nth-child(2) > :nth-child(3)"
    ).should("not.have.value", "null");
    cy.get(":nth-child(2) > .blue_text.layout-align-end-center").should(
      "not.have.value",
      "null"
    );
    cy.get(":nth-child(2) > .red1_text.layout-align-end-center").should(
      "not.have.value",
      "null"
    );

    cy.get(
      "[ng-include=\"'views/component/intraday.html'\"] > .box > .headbar"
    ).should("contain", "Intraday Information");
    cy.get("td").eq(0).should("contain", "High");
    cy.get("td").eq(1).should("not.have.value", "null");
    cy.get("td").eq(2).should("contain", "Open1");
    cy.get("td").eq(3).should("not.have.value", "null");
    cy.get("td").eq(4).should("contain", "Low");
    cy.get("td").eq(5).should("not.have.value", "null");
    cy.get("td").eq(6).should("contain", "Open2");
    cy.get("td").eq(7).should("not.have.value", "null");
    cy.get("td").eq(8).should("contain", "Avg");
    cy.get("td").eq(9).should("not.have.value", "null");
    cy.get("td").eq(10).should("contain", "Prj.Price");
    cy.get("td").eq(11).should("not.have.value", "null");
    cy.get("td").eq(12).should("contain", "Prior");
    cy.get("td").eq(13).should("not.have.value", "null");
    cy.get("td").eq(14).should("contain", "Prj.Vol");
    cy.get("td").eq(15).should("not.have.value", "null");
    cy.get("td").eq(16).should("contain", "Ceiling");
    cy.get("td").eq(17).should("not.have.value", "null");
    cy.get("td").eq(18).should("contain", "Value");
    cy.get("td").eq(19).should("not.have.value", "null");
    cy.get("td").eq(20).should("contain", "Floor");
    cy.get("td").eq(21).should("not.have.value", "null");
    cy.get("td").eq(22).should("contain", "Vol");
    cy.get("td").eq(23).should("not.have.value", "null");
  

    cy.get(
      "[ng-include=\"'views/component/bidoffer.html'\"] > .ng-scope > .box > .headbar"
    ).should("contain", "Bid / Offer");
    cy.get("td").eq(24).should("contain", "Vol");
    cy.get("td").eq(25).should("contain", "Bid");
    cy.get("td").eq(26).should("contain", "Offer");
    cy.get("td").eq(27).should("contain", "Vol");
    cy.get("td").eq(28).should("not.have.value", "null");
    cy.get("td").eq(29).should("not.have.value", "null");
    cy.get("td").eq(30).should("not.have.value", "null");
    cy.get("td").eq(31).should("not.have.value", "null");
    cy.get("td").eq(32).should("not.have.value", "null");
    cy.get("td").eq(33).should("not.have.value", "null");
    cy.get("td").eq(34).should("not.have.value", "null");
    cy.get("td").eq(35).should("not.have.value", "null");
    cy.get("td").eq(36).should("not.have.value", "null");
    cy.get("td").eq(37).should("not.have.value", "null");
    cy.get("td").eq(38).should("not.have.value", "null");
    cy.get("td").eq(39).should("not.have.value", "null");
    cy.get("td").eq(40).should("not.have.value", "null");
    cy.get("td").eq(41).should("not.have.value", "null");
    cy.get("td").eq(42).should("not.have.value", "null");
    cy.get("td").eq(43).should("not.have.value", "null");
    cy.get("td").eq(44).should("not.have.value", "null");
    cy.get("td").eq(45).should("not.have.value", "null");
    cy.get("td").eq(46).should("not.have.value", "null");
    cy.get("td").eq(47).should("not.have.value", "null");
    
    cy.get(":nth-child(4) > :nth-child(1) > .box > .headbar").should(
      "contain",
      "Price by Volume"
    );
    cy.get("#highcharts-3 > svg > .highcharts-background").should(
      "not.have.value",
      "null"
    );
    
    cy.get(":nth-child(4) > :nth-child(2) > .box > .headbar").should(
      "contain",
      "Buy / Sell Volume"
    );
    cy.get("#x2y3").should(
      "not.have.value",
      "null"
    );
    
    cy.get(":nth-child(4) > :nth-child(3) > .box > .headbar").should(
      "contain",
      "Price Visualizer"
    );
    cy.get(":nth-child(3) > .box > .description").should(
      "not.have.value",
      "null"
    );
  });



  // it("Should logout to landing page", () => {
  //   cy.get('[class="md-list-item-text"]').contains("Logout").click();
  //   cy.get('[class="_md md-default-theme md-transition-in"]')
  //     .contains("YES")
  //     .click();
  // });
});
