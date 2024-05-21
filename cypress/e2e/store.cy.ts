describe("5. Store Page", () => {
    beforeEach(() => {
      cy.viewport(375, 464);
      cy.visit("/");

      // avoid repeated login
      cy.session("login", () => {
          cy.login();
      });
      
      cy.visit("/");
      cy.get(".cursor-pointer.flex-col").eq(1).click();
      cy.wait(1000);
    });

    context("5.1 popular section", () => {
        it("contains the correct text", () => {
          cy.contains("精選商品").should("be.visible");
        });
    });
});