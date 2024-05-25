describe("2. All Store Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/store/all");
  });

  context("2.1 header section", () => {
    it("contains the correct text", () => {
      cy.contains("Dishcovery").should("be.visible");
    });

    it("can back to home page", () => {
      cy.contains("Dishcovery").click();
      cy.location("pathname").should("eq", "/");
    });
  });

  context("2.2 store section", () => {
    it("contains the correct text", () => {
      cy.contains("All Stores").should("be.visible");
    });

    it("display store", () => {
      cy.get(".rounded-lg").should("have.length.gte", 1);
    });

    it("each store have correct information", () => {
      cy.get(".rounded-lg").each(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find(".font-semibold").should("exist");
        cy.wrap($el).find(".font-light").should("contain", "@");
        cy.wrap($el).find(".text-xs").should("exist");
      });
    });

    it("store direct to correct url", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .find(".font-semibold")
        .then(($store) => {
          const text = $store.text();
          cy.wrap($store).click();
          cy.wait(500);
          cy.contains(text).should("exist");
        });
    });
  });
});
