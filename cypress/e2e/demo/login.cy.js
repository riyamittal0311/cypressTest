import { loginCred } from "./helper";


const cred = {
  email: "testcypress02@test.com",
  password: "1234",
  user: "test Cypress",
};

describe("login test Cases", () => {
  afterEach(() => {
    cy.wait(2000);
  });

  it("visit url", () => {
    loginCred.Login(cred.email, cred.password);
    cy.url().should("not.contain", "register");
  });

  it("user name should  display in header", () => {
    cy.get(".container")
      .children()
      .eq(2)
      .children()
      .eq(3)
      .should("be.visible")
      .and("contain", cred.user);
  });
});
