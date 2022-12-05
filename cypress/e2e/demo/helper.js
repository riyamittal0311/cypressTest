export const setValue = (arrIdx, placeholder, value) => {
    cy.get("form>fieldset").children().as("elements");
    cy.get("@elements")
      .children()
      .eq(arrIdx)
      .first()
      .should("be.visible")
      .and("have.attr", "placeholder", placeholder)
      .type(value)
      .and("have.value", value)
      .focused()
      .and("have.css", "border-color", "rgb(102, 175, 233)")
      .blur();
  };
  
  export const loginCred = {
    Login: (userName, password) => {
      cy.visit("https://demo.realworld.io/#/login");
      cy.get('input[type="email"]').type(userName).and("have.value", userName);
      cy.get('input[type="password"]').type(password).and("have.value", password);
      cy.get('button[type="submit"]').click();
      cy.wait(2000)
    },
  };
  