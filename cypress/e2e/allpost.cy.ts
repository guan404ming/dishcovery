describe("3. All Post Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/post/all");
  });

  context("3.1 header section", () => {
    it("contains the correct text", () => {
      cy.contains("Dishcovery").should("be.visible");
    });

    it("can back to home page", () => {
      cy.contains("Dishcovery").click();
      cy.location("pathname").should("eq", "/");
    });
  });

  context("3.2 post section", () => {
    it("contains the correct text", () => {
      cy.contains("All Posts").should("be.visible");
    });

    it("display post", () => {
      cy.get(".rounded-lg").should("have.length.gte", 1);
    });

    it("each post have correct information", () => {
      cy.get(".rounded-lg").each(($el) => {
        cy.wrap($el).find("img").should("exist");
        cy.wrap($el).find(".font-semibold").should("exist");
        cy.wrap($el).find(".font-light").should("exist");
      });
    });

    it("post direct to correct url", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .find(".font-semibold")
        .then(($post) => {
          const text = $post.text();
          cy.wrap($post).click();
          cy.wait(500);
          cy.contains(text).should("exist");
        });
    });
  });
});
