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

  context("5.1 header section", () => {
    it("display the banner", () => {
      cy.get("img[alt=banner]").should("be.visible");
    });

    it("contains the store name", () => {
      cy.get("h1.text-2xl.font-bold").should("be.visible");
    });

    it("can add store to collection", () => {
      cy.get("svg.stroke-white").then(($btn) => {
        if ($btn.hasClass("fill-white")) {
          // store has been saved, remove it first
          cy.wrap($btn).click();
          cy.contains("Saved Store has been removed").should("exist");
          cy.wait(1000);
        }

        cy.get("h1.text-2xl.font-bold").then(($el) => {
          const store_name = $el.text();
          cy.wrap($btn).click();
          cy.contains("Store has been saved").should("exist");

          cy.visit("/my/collections");
          cy.contains(`${store_name}`).should("exist");
        });
      });
    });

    it("can remove store from collection", () => {
      cy.get("svg.stroke-white").then(($btn) => {
        if (!$btn.hasClass("fill-white")) {
          // store has been removed, save it first
          cy.wrap($btn).click();
          cy.contains("Store has been saved").should("exist");
          cy.wait(1000);
        }

        cy.get("h1.text-2xl.font-bold").then(($el) => {
          const store_name = $el.text();
          cy.wrap($btn).click();
          cy.contains("Saved Store has been removed").should("exist");

          cy.visit("/my/collections");
          cy.contains(`${store_name}`).should("not.exist");
        });
      });
    });
  });

  context("5.2 dish section", () => {
    it("contains the correct text", () => {
      cy.contains("精選商品").should("be.visible");
    });

    it("dish have correct information", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .then(($el) => {
          cy.wrap($el).find("img").should("exist");
          cy.wrap($el).find(".font-semibold").should("exist");
          cy.wrap($el).find(".text-muted-foreground").should("exist");
        });
    });

    it("can add dish to cart with correct count", () => {
      cy.get(".rounded-lg")
        .eq(0)
        .find(".font-semibold")
        .then(($el) => {
          const dish = $el.text();
          const cnt = 3;

          cy.get(".rounded-lg").eq(0).find("button").click();
          cy.contains("Cart").should("exist");
          cy.get("input").type(`${cnt}`);
          cy.contains("confirm").click();
          cy.contains("Cart item has been added").should("exist");

          cy.visit("/my/carts");
          cy.contains(`${dish}`).should("exist");
          cy.get(".mr-4").should("contain", `${cnt}`);
        });
    });
  });
});
