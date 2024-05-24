describe("8. My Posts Page", () => {
  beforeEach(() => {
    cy.viewport(375, 464);
    cy.visit("/");

    // avoid repeated login
    cy.session("login", () => {
      cy.login();
    });
    cy.visit("/my/posts");
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

  context("8.2 create and delete post", () => {
    it("can create new post", () => {
      cy.contains("My Posts").next("button").click();
      cy.contains("Add Post").should("exist");

      // input post info
      cy.get("input[name=title]").type("熱騰騰蘋果派");
      cy.get("textarea[name=description]").type("超好吃");
      cy.get("input[name=dishName]").type("蘋果派");
      cy.get("textarea[name=dishDescription]").type("熱騰騰");
      cy.get("input[name=quantity]").clear().type("3");
      cy.get("input[type=file]").selectFile("cypress/fixtures/pie.jpg", {
        force: true,
      });
      cy.get("textarea[name=location]").type("台大正門");
      cy.wait(20000);
      cy.contains("Submit").click();

      cy.contains("Post has been created").should("exist");
      cy.contains("Post dish has been created").should("exist");
    });

    it("can delete post", () => {
      cy.get(".rounded-lg").eq(0).find("button").click();
      cy.wait(1000);
      cy.get("img").next("div").find("button").click();
      cy.get("button").contains("Delete").click({ force: true });
      cy.contains("Post has been deleted").should("exist");
    });
  });
});
