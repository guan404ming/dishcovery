/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): Chainable<void>;
  }
}

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.contains("Login").click();
  cy.wait(1000);
  cy.get("button").click();
  cy.get("button").click();

  cy.origin("https://accounts.google.com", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    const username = Cypress.env("GOOGLE_USER");
    const password = Cypress.env("GOOGLE_PW");

    cy.get("#identifierId").type(`${username}{enter}`);
    cy.get("[type=password]").type(`${password}{enter}`);
    cy.contains("Continue").click();
  });
  cy.get("button").click();
  cy.get("button").click();
});
