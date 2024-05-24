describe("8. My Store Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");

    // avoid repeated login
    cy.session("login", () => {
      cy.login();
    });
    cy.visit("/my/stores");
  });

  context("8.1 info section", () => {
    it("post display correct information", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).find(".text-sm").should("exist");
          cy.wrap($el).find(".text-muted-foreground").should("exist");
        });
    });
  });

  context("8.2 store dish management", () => {
    it("can increase dish count", () => {
      cy.get(".rounded-lg").eq(0).find("button").click();
      cy.wait(1000);
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          const text = $el.find("p").text();
          const cnt = parseInt(text, 10);
          cy.wrap($el).find("svg").eq(2).click({ force: true });
          cy.contains("Store dish has been updated.").should("be.visible");
          cy.wrap($el)
            .find("p")
            .should("contain", `${cnt + 1}`);
        });
    });

    it("can decrease dish count", () => {
      cy.get(".rounded-lg").eq(0).find("button").click();
      cy.wait(1000);
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          const text = $el.find("p").text();
          const cnt = parseInt(text, 10);
          cy.wrap($el).find("svg").eq(1).click({ force: true });
          cy.contains("Store dish has been updated.").should("be.visible");
          cy.wrap($el)
            .find("p")
            .should("contain", `${cnt - 1}`);
        });
    });

    it("can finish reservation", () => {
      cy.get(".rounded-lg").eq(0).find("button").click();
      cy.wait(1000);
      cy.get(".rounded-lg.cursor-pointer").eq(0).find("button").eq(0).click();
      cy.contains("confirm").click();
      cy.contains("Reservation has been finished").should("exist");
    });

    it.only("can cancel reservation", () => {
      cy.get(".rounded-lg").eq(0).find("button").click();
      cy.wait(1000);
      cy.get(".rounded-lg.cursor-pointer").eq(0).find("button").eq(1).click();
      cy.contains("confirm").click();
      cy.contains("Store reservation has been deleted").should("exist");
    });
  });
});
