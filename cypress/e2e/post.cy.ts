describe("6. Post Page", () => {
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

  context("6.1 header section", () => {
    it("contains the correct text", () => {
      cy.get("h1.font-bold").should("be.visible");
      cy.get("h1.font-bold").siblings("div").should("contain", "2024");
    });
  });

  context("6.2 main section", () => {
    it("have correct information", () => {
      cy.get(".rounded-lg").then(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find(".font-semibold").should("exist");
        cy.wrap($el).contains("free").should("exist");
        cy.wrap($el).find(".text-muted-foreground").should("exist");
      });

      cy.get("p").should("be.visible");
    });

    it("can create post reservation with correct count", () => {
      cy.contains("台大管院").should("exist");
      cy.get(".rounded-lg")
        .find(".font-semibold")
        .then(($el) => {
          const dish = $el.text();
          const cnt = 2;

          cy.get(".rounded-lg").find("button").click();
          cy.contains("Reservation").should("exist");
          cy.get("input").type(`${cnt}`);
          cy.contains("confirm").click();

          cy.visit("/my/reservations");
          cy.contains(`${dish}`).should("exist");
          cy.contains(`${dish}`)
            .closest("div")
            .next()
            .should("contain", `${cnt}`);
        });
    });
  });
});
