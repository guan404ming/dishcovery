describe("1. Home Page", () => {
  it("visit home page", () => {
    cy.visit("/");
    cy.contains("Dishcovery").should("be.visible");
  });
});
