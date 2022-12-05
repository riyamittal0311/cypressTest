import { loginCred } from "./helper";
import { setValue } from "./helper";

const cred = {
  email: "testcypress02@test.com",
  password: "1234",
  user: "test Cypress",
};
describe("new article test cases", () => {
  before(() => {
    loginCred.Login(cred.email, cred.password);
    cy.url().should("not.contain", "register");
  });
  it("click to new article", () => {
    cy.get('[ui-sref="app.editor"]')
      .should("be.visible")
      .and("contain", "New Article")
      .click();
    cy.url().should("contain", "editor");
  });

  it("enter article details", () => {
    setValue(0, "Article Title", "Article name");
    setValue(1, "What's this article about?", "testing the 1st article");
    setValue(2, "Write your article (in markdown)", "test test test");
    setValue(3, "Enter tags", "test first article");
  });

  it("publish an article", () => {
    cy.get('button[type="button"]')
      .should("be.visible")
      .and("contain", "Publish Article")
      .click();
  });
});
