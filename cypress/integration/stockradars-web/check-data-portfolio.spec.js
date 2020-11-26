/// <reference types="Cypress" />

describe("Check data in 'Portfolio' menu", () => {
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

  it("Should access 'Portfolio' menu", () => {
    // cy.intercept({
    //   method: "POST",
    //   url: "https://itrade.yuanta.co.th/ytapi/get_cust_account.aspx",
    // }).as("getYTUser");
    // cy.wait("@getYTUser", { timeout: 15000 });

    cy.wait(28000);
    cy.get('[class="md-list-item-text"]').contains("Portfolio").click();
    cy.url().should("eq", "https://stockradars.co/trade/#/portfolio");
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

  it("Should display 'Account Information' correctly", () => {
    cy.get(".col-md-12 > .col-xs-12").should("contain", "Account Number");
    // cy.get('.col-md-12').should('contain','12694101')
    cy.get(".col-xs-12 > .form-control").should("not.have.value", "null");

    cy.get(".col-md-3.col-xs-6").should("contain", "Name");
    cy.get(".col-md-3.col-xs-6 > .ng-binding").should("not.have.value", "null");
    cy.get(".col-md-3.col-xs-6 > .ng-binding").should(
      "contain",
      "ศุภกร เจียรรุ่งสิน"
    );

    cy.get(".col-md-12 > :nth-child(3)").should("contain", "Buying Limit");
    cy.get(".col-md-12 > :nth-child(3) > .ng-binding").should(
      "not.have.value",
      "null"
    );

    cy.get(".col-md-12 > :nth-child(4)").should("contain", "Credit Line");
    cy.get(".col-md-12 > :nth-child(4) > .ng-binding").should(
      "not.have.value",
      "null"
    );

    cy.get(".col-md-12 > :nth-child(5)").should("contain", "Cash Amount");
    cy.get(".col-md-12 > :nth-child(5) > .ng-binding").should(
      "not.have.value",
      "null"
    );
  });

  it("Should display 'Stock Column' completely", () => {
    cy.get("td").eq(0).should("contain", "Symbol");
    cy.get("td").eq(1).should("contain", " "); // This column for display 'Flag' in some stock
    cy.get("td").eq(2).should("contain", "Onhand");
    cy.get("td").eq(3).should("contain", "Sellable");
    cy.get("td").eq(4).should("contain", "Avg");
    cy.get("td").eq(5).should("contain", "Last");
    cy.get("td").eq(6).should("contain", "Cost");
    cy.get("td").eq(7).should("contain", "Market Value");
    cy.get("td").eq(8).should("contain", "Unrealized P/L");
    cy.get("td").eq(9).should("contain", "%Unrealized P/L");
    cy.get("td").eq(10).should("contain", "Realized P/L");
  });

  // it("Should contain 'Last Executed' section", () => {
  //   cy.get(
  //     "[ng-include=\"'views/component/lastExecuted.html'\"] > .box > .headbar"
  //   ).should("contain", "Last Executed");
  // });
  it("Should display 'Stock Column' completely", () => {
    cy.get("td").eq(0).should("contain", "Symbol");
    cy.get("td").eq(1).should("contain", " "); // This column for display 'Flag' in some stock
    cy.get("td").eq(2).should("contain", "Onhand");
    cy.get("td").eq(3).should("contain", "Sellable");
    cy.get("td").eq(4).should("contain", "Avg");
    cy.get("td").eq(5).should("contain", "Last");
    cy.get("td").eq(6).should("contain", "Cost");
    cy.get("td").eq(7).should("contain", "Market Value");
    cy.get("td").eq(8).should("contain", "Unrealized P/L");
    cy.get("td").eq(9).should("contain", "%Unrealized P/L");
    cy.get("td").eq(10).should("contain", "Realized P/L");
  });

  // it("Should logout to landing page", () => {
  //   cy.get('[class="md-list-item-text"]').contains("Logout").click();
  //   cy.get('[class="_md md-default-theme md-transition-in"]')
  //     .contains("YES")
  //     .click();
  // });
});
