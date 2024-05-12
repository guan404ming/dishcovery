xdescribe("1. Home Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");
  });

  context("1.1 header section", () => {
    it("contains the correct text", () => {
      cy.contains("Dishcovery").should("be.visible");
    });

    it("menu bar can be opened", () => {
      cy.get("[type=button]")
        .click({ force: true })
        .should("have.attr", "data-state", "open");
    });

    it("menu bar has correct options", () => {
      cy.get("[type=button]").click({ force: true });

      cy.contains("My Account").should("be.visible");
      cy.get("[role=menuitem]").eq(0).should("contain", "Info");
      cy.get("[role=menuitem]").eq(1).should("contain", "Cart");
      cy.get("[role=menuitem]").eq(2).should("contain", "Collection");
      cy.get("[role=menuitem]").eq(3).should("contain", "Logout");
    });

    it("menu bar can be closed", () => {
      cy.get("[type=button]")
        .click({ force: true })
        .click({ force: true })
        .should("have.attr", "data-state", "closed");

      cy.contains("My Account").should("not.exist");
    });
  });

  context("1.2 banner section", () => {
    it("display the banner", () => {
      cy.get("[aria-roledescription=carousel]").should("be.visible");
    });

    it("contains correct images", () => {
      cy.get('[aria-roledescription="carousel"]').find("img").should("exist");
    });
  });

  context("1.3 search section", () => {
    it("contains the correct text", () => {
      cy.contains("What are you looking for?").should("be.visible");
    });

    it("See All button contains text and icon", () => {
      cy.contains("What are you looking for?").next().as("btn");

      cy.get("@btn").should("contain", "See All");
      cy.get("@btn").find("svg").should("exist");
    });

    it("display map", () => {
      cy.get(".aspect-square").should("be.visible");
    });
  });

  context("1.4 popular section", () => {
    it("contains the correct text", () => {
      cy.contains("Popular").should("be.visible");
    });

    it("See All button contains text and icon", () => {
      cy.contains("Popular").next().as("btn");

      cy.get("@btn").should("contain", "See All");
      cy.get("@btn").find("svg").should("exist");
    });

    it("display dish", () => {
      cy.get(".cursor-pointer.flex-col").should("have.length.gte", 5);

      cy.get(".cursor-pointer.flex-col").each(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find(".font-semibold").should("exist");
        cy.wrap($el)
          .find(".font-normal")
          .should("contain", "$")
          .and("contain", "left");
      });
    });
  });

  context("1.5 post section", () => {
    it("contains the correct text", () => {
      cy.contains("Post").should("be.visible");
    });

    it("See All button contains text and icon", () => {
      cy.contains("Post").next().as("btn");

      cy.get("@btn").should("contain", "See All");
      cy.get("@btn").find("svg").should("exist");
    });

    it("display dish", () => {
      cy.get(".cursor-pointer.flex-row").should("have.length.gte", 5);

      cy.get(".cursor-pointer.flex-row").each(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find(".mb-1").should("exist");
        cy.wrap($el).find(".font-light").should("contain", "Remaining");
        cy.wrap($el).find(".font-normal").should("exist");
      });
    });
  });
});
