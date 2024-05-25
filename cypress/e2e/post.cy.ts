describe("5. Post Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");

    // avoid repeated login
    cy.session("login", () => {
      cy.login();
    });

    cy.visit("/");
    cy.get(".cursor-pointer.flex-nowrap").eq(0).click({ force: true });
    cy.wait(1000);
  });

  context("5.1 header section", () => {
    it("contains the correct text", () => {
      cy.get("h1.font-bold").should("be.visible");
      cy.get("h1.font-bold").siblings("div").should("contain", "2024");
    });
  });

  context("5.2 dish section", () => {
    it("have correct information", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).contains("free").should("exist");
        });
    });

    it.only("can create post reservation with correct count", () => {
      cy.get("h1.font-bold").then(($post) => {
        const post_name = $post.text();

        cy.get(".rounded-lg")
          .eq(0)
          .find(".font-semibold")
          .then(($dish) => {
            const dish_name = $dish.text();
            const cnt = 1;
            cy.get(".rounded-lg").find("button").click();
            cy.contains("Reservation").should("exist");
            cy.get("input").type(`${cnt}`);
            cy.contains("confirm").click();

            cy.visit("/my/reservations");
            cy.contains(`${post_name}`).should("exist");
            cy.contains(`${post_name}`)
              .parent("div")
              .find(".rounded-lg")
              .should("contain", `${dish_name}`)
              .and("contain", `${cnt}`);
            cy.contains(`${post_name}`)
              .parent("div")
              .find(".rounded-lg")
              .find("svg")
              .eq(0)
              .click();
            cy.contains("Reservation has been deleted").should("exist");
          });
      });
    });
  });
});
