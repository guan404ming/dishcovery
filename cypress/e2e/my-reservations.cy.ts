describe("7. My Reservations Page", () => {
    beforeEach(() => {
      cy.viewport(375, 464);
      cy.visit("/");
  
      // avoid repeated login
      cy.session("login", () => {
        cy.login();
      });
      cy.visit("/my/reservations");
    });
  
    context("7.1 reservations", () => {
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
            cy.wrap($el).find(".text-muted-foreground").should("contain", "$")
          });
      });

      it("can increase reservation count", () => {

        cy.contains("Post Reservations").next("div").find(".rounded-lg").eq(0).then(($el) => {
          const text = $el.find('p').text();
          const cnt = parseInt(text, 10);
          cy.wrap($el).get("svg").eq(1).click({ force: true });
          cy.contains("Post reservation has been updated.").should("be.visible");
          cy.wrap($el).find('p').should("contain", `${cnt+1}`);
        });
      });
  
      it("can reduce reservation count", () => {

        cy.contains("Post Reservations").next("div").find(".rounded-lg").eq(0).then(($el) => {
          const text = $el.find('p').text();
          const cnt = parseInt(text, 10);
          cy.wrap($el).get("svg").eq(0).click({ force: true });
          cy.contains("Post reservation has been updated.").should("be.visible");
          cy.wrap($el).find('p').should("contain", `${cnt-1}`);
        });
      });
    });
  });
  