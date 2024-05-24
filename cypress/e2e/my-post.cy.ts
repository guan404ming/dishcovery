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

  context("8.1 post section", () => {
    it("post display correct information", () => {
      cy.get("button").contains("Post").click();
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).find(".font-light").should("exist");
          cy.wrap($el).find(".text-ellipsis").should("exist");
        });
    });

    it("post direct to correct post page", () => {
      cy.get("button").contains("Post").click();
      cy.get(".rounded-lg")
        .eq(0)
        .find(".font-semibold")
        .then(($post) => {
          const text = $post.text();
          cy.wrap($post).click();
          cy.wait(500);
          cy.get(".text-lg").should("have.text", text);
        });
    });

    it.only("can add new post", () => {
      cy.contains("My Posts").next("button").click();
      cy.contains("Add Post").should("exist");
      cy.get("input[name=title]").type("熱騰騰蘋果派");
      cy.get("input[name=description]").type("超好吃");
      cy.get("input[name=location]").type("台大正門");
      cy.get("input[name=dishName]").type("蘋果派");
      cy.get("input[name=quantity]").clear().type("3");
      cy.get("input[name=dishDescription]").type("餓了吧餓了吧餓了吧");
      cy.get("input[type=file]").selectFile("cypress/fixtures/pie.jpg", {
        force: true,
      });
      cy.wait(20000);
      cy.contains("Submit").click();
      cy.contains("Post dish has been created").should("exist");
    });
  });
});
