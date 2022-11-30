function select(ele){
    return cy.get(ele)
}


describe('form test cases',()=>{

     it('check for correct url',()=>{
        cy.visit('https://pawansattawan.github.io/profrea/').wait(2000)
        cy.url().should('include', 'pawansattawan')
     })

     it('select profile pic',()=>{
       select('.pp>input[type=file]').selectFile('cypress/downloads/flowerjpg.jpg', { force: true })
     })

     it('enter 1st page details',()=>{
       select('#fname').type('test user')
       select('#des').type('this is a test description by cypress')
       select('#mobile').type('1234567891')
       select('#email').type('tes@gmail.com')
     })
     it('after details press next button',()=>{
       select('fieldset>.next.sx.action-button').should('be.visible').click()
     })
     it('other details should be visible as text',()=>{
       select('#time').should('be.visible')
     })

     it('select services from option',()=>{
       select('#se').should('have.value','').select('Service 3').and('have.value','Service 3')
     })

     it('select education background ',()=>{
       select('#ed').select('higher').should('have.value','higher')
     })
     it('select available time slots',()=>{
       select('#time').type('12:12').should('have.value','12:12')
       select('#time1').type('22:12').should('have.value','22:12')
     })

     it('click on plus img',()=>{
       select('.add_field_button > img').click()
            cy.on('uncaught:exception', (err, runnable) => {
                return false
            })
     })

     it('select image after click',()=>{
       select('#files1').selectFile('cypress/downloads/flowerjpg.jpg', { force: true })
     })
     it('image description box should be visible',()=>{
       select('#des11').should('be.visible').and('have.attr','placeholder','Description')
        .type('this is a flower image')
     })

     it('click on next button and preview should be visible',()=>{
       select('.next.q.action-button').click().wait(2000)
       select('#time').should('not.be.visible')
     })

     it('click pervious page',()=>{
    select('.previous.qqq.action-button-previous').click().wait(2000)
    select('#time').should('be.visible')
     })

     it('back to starting page',()=>{
       select('.previous.qq.action-button-previous').click()
       select('#time').should('not.be.visible')
     })

     it('clear first name ',()=>{
       select('#fname').clear().focused()
     })

     it('click next should not go to next page',()=>{
       select('fieldset>.next.sx.action-button').click()
       select('#time').should('not.be.visible')
     })
     it('first name is there are other fields are empty should no proceed to next page',()=>{
       select('#fname').type('test name')
       select('#mobile').clear()
       select('#email').clear()
       select('fieldset>.next.sx.action-button').click()
       select('#time').should('not.be.visible')
     })

     it('entering all values it should move to next page',()=>{
       select('#mobile').type('1234321234')
       select('#email').type('test@gmail.com')
       select('fieldset>.next.sx.action-button').click().wait(2000)
       select('#time').should('be.visible')
     })

     it('remove service from dropdown and it should display same page',()=>{
       select('#se').select('').and('have.value','')
       select('.next.q.action-button').click().wait(2000)
       select('#time').should('be.visible')
     })

     it('should be on same  page',()=>{
       select('.offered>.offered1>a.remove_field').click()
       select('.next.q.action-button').click().wait(2000)
       select('#time').should('be.visible')
     })

     it('should move to last page',()=>{
       select('#se').select('Service 3').and('have.value','Service 3')
       select('.next.q.action-button').click().wait(2000)
       select('#time').should('not.be.visible')
     })
})