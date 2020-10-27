/// <reference types="Cypress" />

/**Yuanta**/
describe("Login with 'Yuanta Securities'", () => {
  //beforeEach(() => {
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
    cy.fixture("user/user-yuanta.json").then((user) => {
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
    cy.fixture("user/user-yuanta.json").then((user) => {
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
    cy.fixture("user/user-yuanta.json").then((user) => {
      cy.get("#input_1").clear().type(user.username); // Get data from {fixturesFolder}/users/user.json
      cy.get("#input_2").clear().type(user.password); // Get data from {fixturesFolder}/users/user.json
      cy.get('[class="blue md-button md-ink-ripple flex"]')
        .contains("เข้าสู่ระบบ")
        .click();
      cy.get(".setindex-bar").contains("SET");
    });
  });

  it("Should logout to landing page", () => {
    cy.get('[class="md-list-item-text"]').contains("Logout").click();
    cy.get('[class="_md md-default-theme md-transition-in"]')
      .contains("YES")
      .click();
  });
});

/**Globlex**/
describe(
  "Login with 'Globlex Securities'",
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    //beforeEach(() => {
    it("Should visit StockRadars Website (Broker Login)", () => {
      cy.visit("https://stockradars.co/trade");
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
        cy.get(".setindex-bar").contains("SET");
      });
    });

    it("Should logout to landing page", () => {
      cy.get('[class="md-list-item-text"]').contains("Logout").click();
      cy.get('[class="_md md-default-theme md-transition-in"]')
        .contains("YES")
        .click();
    });
  }
);

/**Krungsri**/
describe(
  "Login with 'Krungsri Securities'",
  {
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  () => {
    //beforeEach(() => {
    it("Should visit StockRadars Website (Broker Login)", () => {
      cy.visit("https://stockradars.co/trade");
    });

    it("Should appear select broker dropdown", () => {
      cy.get('[class="blue md-button md-ink-ripple flex"]').should(
        "contain",
        "เลือกบริษัทหลักทรัพย์ที่นี่"
      );
    });

    it("Should select 'Krungsri Securities' broker", () => {
      cy.get('[class="blue md-button md-ink-ripple flex"]')
        .contains("เลือกบริษัทหลักทรัพย์ที่นี่")
        .click();
      cy.get('[class="_md"]').contains("KSS").click();
      cy.get('[class="img-broker img-responsive"]').should(
        "have.attr",
        "src",
        "https://storage-th-xbkk.stockradars.co/images/broker/KSS.png"
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
      cy.fixture("user/user-krungsri.json").then((user) => {
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
      cy.fixture("user/user-krungsri.json").then((user) => {
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
      cy.fixture("user/user-krungsri.json").then((user) => {
        cy.get("#input_1").clear().type(user.username); // Get data from {fixturesFolder}/users/user.json
        cy.get("#input_2").clear().type(user.password); // Get data from {fixturesFolder}/users/user.json
        cy.get('[class="blue md-button md-ink-ripple flex"]')
          .contains("เข้าสู่ระบบ")
          .click();
        cy.get(".setindex-bar").contains("SET");
      });
    });

    it("Should logout to landing page", () => {
      cy.get('[class="md-list-item-text"]').contains("Logout").click();
      cy.get('[class="_md md-default-theme md-transition-in"]')
        .contains("YES")
        .click();
    });
  }
);
