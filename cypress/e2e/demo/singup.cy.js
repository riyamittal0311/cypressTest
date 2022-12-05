import {setValue} from './helper'

describe("sign up form test cases", () => {
  it("check for url", () => {
    cy.visit("https://demo.realworld.io/#/register");
    cy.url().should("contain", "register");
  });

  it("logo should be visible and should contain conduct", () => {
    cy.get(".container")
      .children('a[ui-sref="app.home"]')
      .should("be.visible")
      .and("contain", "conduit");
  });

  it("navigation link", () => {
    cy.get(".container").children().eq(1).children().as("navLink");
    cy.get("@navLink").should("have.length", 3);
    cy.get("@navLink").each((li, idx) => {
      cy.get(li).children("a").should("have.class", "nav-link");
    });
  });

  it("check for sign up and have a account text", () => {
    cy.get(".container.page>.row").children("div").children().as("children");
    cy.get("@children")
      .first()
      .should("be.visible")
      .contains("sign up", { matchCase: false });
    cy.get("@children")
      .eq(1)
      .should("be.visible")
      .contains("have an account?", { matchCase: false });
  });

  it("get the form elements and enter value", () => {
    setValue(0, "Username", "test Cypress111");
    setValue(1, "Email", "testcypress03@test.com");
    setValue(2, "Password", "1234");
  });

  it("check from submit button", () => {
    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("contain", "Sign up")
      .and("have.css", "border-color", "rgb(92, 184, 92)")
      .click();

    cy.url().should("not.contain", "register");
  });
});
