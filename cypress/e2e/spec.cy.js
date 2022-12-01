describe('visit login page', () => {
  before(()=>{
    cy.visit('https://staging.trinetx.com').wait(20000)
  })
  
  it('check the url', () => {
    cy.url().should('include', 'trinetx')
  })

  it('input and password should be visible',()=>{
    cy.get('#1-email').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
  })

  it('check for the forget password link',()=>{
    cy.get('.auth0-lock-alternative-link').should('contain','Need to reset your password?')
  })


  it('check for the login button title',()=>{
    cy.get('button[name=submit]').contains('Login')
  })

  // it('click login',()=>{
  //   cy.get('#1-email').type('swati.pandey@rsystems.com')
  //   cy.get('input[name="password"]').type('Password1')
  //   cy.get('button[name=submit]').click()
  // })
  
  
})