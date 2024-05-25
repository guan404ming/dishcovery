describe("1. Home Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");

    cy.session("login", () => {
      cy.login();
    });
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
      cy.get("[role=menuitem]").eq(2).should("contain", "Reservation");
      cy.get("[role=menuitem]").eq(3).should("contain", "Collection");
      cy.get("[role=menuitem]").eq(4).should("contain", "Logout");
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
    it("can search for stores and posts", () => {
      cy.contains("Search in Dishcovery").click();
      cy.get("[role=dialog]").should("have.attr", "data-state", "open");
      cy.get("input").type("pizza");
      cy.get(".cursor-pointer.items-center").should("have.length", 2);
    });
  });

  context("1.4 map section", () => {
    it("contains the correct text", () => {
      cy.contains("What are you looking for?").should("be.visible");
    });

    it("display map", () => {
      cy.get("div[aria-label=地圖]").should("be.visible");
    });
  });

  context("1.5 store section", () => {
    it("contains the correct text", () => {
      cy.contains("Popular Stores").should("be.visible");
    });

    it("See All button contains text and icon", () => {
      cy.contains("Popular Stores").next().as("btn");

      cy.get("@btn").should("contain", "See All");
      cy.get("@btn").find("svg").should("exist");
    });

    it("See All button direct to correct url", () => {
      cy.contains("Popular Stores").next().as("btn");

      cy.get("@btn").click();
      cy.location("pathname").should("eq", "/store/all");
    });

    it("display stores", () => {
      cy.get(".cursor-pointer.flex-col").should("have.length.gte", 1);

      cy.get(".cursor-pointer.flex-col")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-medium").should("exist");
          cy.wrap($el).find(".font-light").should("exist");
        });
    });
  });

  context("1.6 post section", () => {
    it("contains the correct text", () => {
      cy.contains("Posts").should("be.visible");
    });

    it("See All button contains text and icon", () => {
      cy.contains("Posts").next().as("btn");

      cy.get("@btn").should("contain", "See All");
      cy.get("@btn").find("svg").should("exist");
    });

    it("See All button direct to correct url", () => {
      cy.contains("Posts").next().as("btn");

      cy.get("@btn").click();
      cy.location("pathname").should("eq", "/post/all");
    });

    it("display post", () => {
      cy.get(".cursor-pointer.text-center").should("have.length.gte", 1);

      cy.get(".cursor-pointer.text-center")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).find(".font-light").should("exist");
          cy.wrap($el).find(".text-xs").should("exist");
        });
    });
  });
});
