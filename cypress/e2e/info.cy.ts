describe("4. Info Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");

    // avoid repeated login
    cy.session("login", () => {
      cy.login();
    });
    cy.visit("/info");
  });

  context("4.1 header section", () => {
    it("contains the correct text", () => {
      cy.contains("Dishcovery").should("be.visible");
    });
  });

  context("4.2 main section", () => {
    it("display corrrect user info", () => {
      cy.get("main").find("img").should("be.visible");
      cy.get("main").find("p").should("have.class", "text-lg");
      cy.get("main").find(".font-normal").should("contain", "user");
    });

    it("have correct button", () => {
      cy.get("[role=tablist]")
        .find("button")
        .then(($bar) => {
          cy.wrap($bar).eq(0).should("contain", "Reservation");
          cy.wrap($bar).eq(1).should("contain", "Post");
          cy.wrap($bar).eq(2).should("contain", "Store");
        });
    });
  });

  context("4.3 reservation section", () => {
    it("contains the correct text", () => {
      cy.contains("Post Reservations").should("be.visible");
      cy.contains("Store Reservations").should("be.visible");
    });

    it("reservation display correct information", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).find(".font-light").should("contain", "$");
          cy.wrap($el).find(".text-ellipsis").should("exist");
        });
    });

    it("can modify reservation", () => {
      cy.get(".rounded-lg").then(($el) => {
        cy.wrap($el)
          .its("length")
          .then((len: number) => {
            cy.wrap($el).eq(0).click();
            cy.get("[role=dialog]")
              .eq(len - 1)
              .find("svg")
              .click({ force: true });
          });
      });
    });
  });

  context("4.4 post section", () => {
    it("post display correct information", () => {
      cy.get("button").contains("Post").click();
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).find(".font-light").should("exist");
          cy.wrap($el).find(".text-ellipsis").should("exist");
        });
    });

    it("post direct to correct post page", () => {
      cy.get("button").contains("Post").click();
      cy.get(".rounded-lg")
        .eq(0)
        .find(".font-semibold")
        .then(($post) => {
          const text = $post.text();
          cy.wrap($post).click();
          cy.wait(500);
          cy.get(".text-lg").should("have.text", text);
        });
    });

    it("can add new post", () => {
      cy.get("button").contains("Post").click();
      cy.get("svg").click();
      cy.contains("Add post").should("exist");
    });
  });
});
