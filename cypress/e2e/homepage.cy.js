
describe('visit google  homepage', () => {
  beforeEach(()=>{
    cy.visit(' https://www.google.co.in/')
  })
    it('check the url', () => {
      cy.url().should('include', 'google')
    })

    it('check for Gmail and Image text',()=>{
        cy.get('[data-pid="23"]').contains('Gmail')
        cy.get('[data-pid="2"]').contains('Images')
    })
    
    it('check for google image height and width',()=>{
      cy.get('.lnXdpd').should('have.attr', 'height' , '92')
      .should('have.attr' , 'width' ,'272')
    })
     
     it('check for search icon',()=>{
      cy.get('.CcAdNb>span>svg').should('be.visible') 
     })
    
     it('check for input search is focused',()=>{
      cy.get('input.gLFyf').focused()
     })

     it('check for mic svg is visible',()=>{
      cy.get('.XDyW0e>svg').should('be.visible')
     })

     it('check for camera icon is visible',()=>{
      cy.get('.nDcEnd>img').should('be.visible')
     })

     it('check hover on search div',()=>{
      cy.get('.RNNXgb').realHover().should('have.css','box-shadow','rgba(32, 33, 36, 0.28) 0px 1px 6px 0px')
     })
  })