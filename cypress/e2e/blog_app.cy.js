describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'hellas',
      password: 'hellas',
      name: 'Arto Hellas',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Notes')
    cy.contains('login').click()

    cy.get('#username').type('hellas')
    cy.get('#password').type('hellas')
    cy.get('#login-button').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'hellas', password: 'hellas' })
      cy.contains('Arto Hellas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('hellas')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Arto Hellas logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'hellas', password: 'hellas' })
    })

    it('A blog can be created', function () {
      cy.contains('new Blog').click()
      cy.get('#title').type('new title1')
      cy.get('#author').type('cypress')
      cy.get('#url').type('new blog cypress url')
      cy.contains('create').click()

      cy.contains('new title1 cypress')
      cy.contains('show')
    })

    describe('some blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'cypress',
          url: 'fist blog url',
          likes: 0,
        })
        cy.createBlog({
          title: 'second blog',
          author: 'cypress',
          url: 'second blog url',
          likes: 0,
        })
        cy.createBlog({
          title: 'third blog',
          author: 'cypress',
          url: 'third blog url',
          likes: 0,
        })
      })

      it('add likes to a blog', function () {
        cy.get('.blog').eq(1).as('blog1')
        cy.get('@blog1').contains('show').click()
        cy.get('@blog1').contains('like').click()
        cy.get('@blog1').contains('likes: 1')
      })

      it('verify remove blog', function () {
        cy.get('.blog').eq(2).as('blog2')
        cy.get('@blog2').contains('show').click()
        cy.get('@blog2').contains('remove').click()
        cy.get('.blog').should('have.length', 2)
      })

      it('vefiry no remove button for different user', function () {
        const user = {
          username: 'demo1',
          password: 'demo1',
          name: 'demo 1',
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.login({ username: 'demo1', password: 'demo1' })

        cy.get('.blog').eq(0).as('blog0')
        cy.get('@blog0').contains('show').click()
        cy.get('@blog0').should('not.contain', 'remove')
      })

      it('blogs sort by likes desc', function () {
        cy.get('.blog').eq(1).as('blog1')
        cy.get('@blog1').contains('show').click()
        cy.get('@blog1').contains('like').click().then(()=>{
          cy.get('@blog1').contains('like').click()
        })

        cy.visit('http://localhost:3000')
        cy.get('.blog').eq(0).contains('second blog cypress')

      })
    })
  })
})
