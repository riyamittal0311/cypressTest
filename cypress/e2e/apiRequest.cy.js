describe('api test',()=>{

    it('get all  post of length 100',()=>{
        cy.request('https://jsonplaceholder.typicode.com/posts').should((resp)=>{
            expect(resp.status).to.eq(200)
            expect(resp.body).to.have.property('length').to.eq(100)
        })
    })
    it('get 1st post',()=>{
        cy.request('https://jsonplaceholder.typicode.com/posts/1').should((res)=>{
            expect(res.body.userId).to.eq(1)
        })
    })

    it('add a new post and check the added post data',()=>{
        cy.request("POST",'https://jsonplaceholder.typicode.com/posts/',{
            title :'this is a test title',
            body :'test body'
        }).then((res)=>{
            expect(res.status).to.eq(201)
            expect(res.body.title).to.eq('this is a test title')
            expect(res.body).to.have.property('id')
            expect(res.body).property('id').to.be.a('number')
        })
    })

    it('delete a post',()=>{
        cy.request('DELETE','https://jsonplaceholder.typicode.com/posts/1')
        .then((res)=>{
            console.log(res.body)
            expect(res.status).to.eq(200)
            assert.isObject(res.body)
        })
    })
})

const addUSer = () => {
    cy.get('a[href="#/contact/add"]').click()
    cy.get('input[placeholder="Enter Name"]').type('tb')
    cy.get('input[placeholder="Enter Email"]').type('test@gmail.com')
    cy.get('input[placeholder="Enter Phone"]').type('1234543212')
}

describe('contact app test cases',()=>{

    beforeEach(()=>{
        cy.wait(2000)
    })

    it('fetch all users',()=>{
        cy.intercept('GET','https://jsonplaceholder.typicode.com/users').as('fetchUser')
        cy.visit('https://devmahmud.github.io/ContactManager/')
        cy.wait('@fetchUser').its('response.statusCode').should('eq', 200)
        cy.get('@fetchUser').its('response.body').should('have.length',10)
    })

    it('add new contact ',()=>{
          addUSer()
          cy.intercept('POST','https://jsonplaceholder.typicode.com/users/').as('addUser')
          cy.get('input[value="Add Contact"]').click()
         cy.wait('@addUser').its('response.statusCode').should('eq',201)
         cy.get('@addUser').its('response.body.email').should('eq',"test@gmail.com")
    })

    it('added user should be at the top of list',()=>{
        cy.get('.card-header>h4').first().contains('tb') 
    })

    it('edit a user',()=>{
        cy.get('.card-header>h4>a>i').last().click()
        cy.get('input[value="Clementina DuBuque"]').clear().type('test 1')
        cy.intercept('PUT','https://jsonplaceholder.typicode.com/users/10').as('addUser')
        cy.get('input[value="Update Contact"]').click()
        cy.wait('@addUser').its('response.statusCode').should('eq',200)
        cy.get('@addUser').its('response.body.name').should('eq',"test 1")
    })

    it('delete the 1st user on  the list',()=>{
        cy.intercept('DELETE','https://jsonplaceholder.typicode.com/users/1').as('delete')
        cy.get('.card-header>h4>i.fa.fa-times').first().click()
        cy.wait('@delete').its('response.statusCode').should('eq',200)
    })

    it('stab a response and throw error while adding a user',()=>{
        addUSer()
        cy.intercept({
            method :"POST",
            url:'https://jsonplaceholder.typicode.com/users'
        },{
            statusCode:201,
            body :{error : 'error message',test:'name'},
            headers: { 'access-control-allow-origin': '*' ,
           'access-control-allow-credentials':"true"}
        }).as('addUser'),
        //   },[]).as('addUser')
        // cy.wait('@addUser').then((inter)=>{
        //     console.log(inter.response)
        //    })

        cy.get('input[value="Add Contact"]').click()
       cy.wait('@addUser').its('response.statusCode').should('eq',201)
       cy.get('@addUser').its('response.body').should('have.property','error')
      
    })
})