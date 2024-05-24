describe("6. Info Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");

    // avoid repeated login
    cy.session("login", () => {
      cy.login();
    });
    cy.visit("/my");
  });

  context("6.1 header section", () => {
    it("contains the correct text", () => {
      cy.contains("Dishcovery").should("be.visible");
    });
  });

  context("6.2 main section", () => {
    it("display corrrect user info", () => {
      cy.get("main").find("img").should("be.visible");
      cy.get("main").find("p").should("have.class", "text-lg");
      cy.get("main").find(".font-normal").should("contain", "user");
    });

    it("have correct button", () => {
      cy.get("button").contains("Account").should("exist");
      cy.get("button").contains("Reservations").should("exist");
      cy.get("button").contains("Posts").should("exist");
      cy.get("button").contains("Stores").should("exist");
      cy.get("button").contains("Cart").should("exist");
      cy.get("button").contains("Collections").should("exist");
      // cy.get("[role=tablist]")
      //   .find("button")
      //   .then(($bar) => {
      //     cy.wrap($bar).eq(0).should("contain", "Account");
      //     cy.wrap($bar).eq(1).should("contain", "Reservations");
      //     cy.wrap($bar).eq(2).should("contain", "Posts");
      //     cy.wrap($bar).eq(3).should("contain", "Stores");
      //     cy.wrap($bar).eq(4).should("contain", "Cart");
      //     cy.wrap($bar).eq(5).should("contain", "Collections");
      //   });
    });

    it("Account button direct to correct page", () => {
      cy.contains("Account").click({ force: true });
      cy.location("pathname").should("eq", "/my/account");
    });

    it("Reservations button direct to correct page", () => {
      cy.contains("Reservations").click({ force: true });
      cy.location("pathname").should("eq", "/my/reservations");
    });

    it("Posts button direct to correct page", () => {
      cy.contains("Posts").click({ force: true });
      cy.location("pathname").should("eq", "/my/posts");
    });

    it("Stores button direct to correct page", () => {
      cy.contains("Stores").click({ force: true });
      cy.location("pathname").should("eq", "/my/stores");
    });

    it("Cart button direct to correct page", () => {
      cy.contains("Cart").click({ force: true });
      cy.location("pathname").should("eq", "/my/carts");
    });

    it("Collections button direct to correct page", () => {
      cy.contains("Collections").click({ force: true });
      cy.location("pathname").should("eq", "/my/collections");
    });
  });
});
