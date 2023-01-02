describe('blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  describe('login and join forms', function () {
    it('login form is shown by default', function () {
      cy.visit('http://localhost:3000')
      cy.get('h2').should('contain', 'log in to application')
      cy.get('#username-input')
      cy.get('#password-input')
      cy.get('#login-button')
    })

    it('join and login forms are toggleable', function () {
      cy.get('#login-join-toggle').click()
      cy.get('h2').should('contain', 'create user account')
      cy.get('#login-join-toggle').click()
      cy.get('h2').should('contain', 'log in to application')
    })
  })

  describe('join and new account creation', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.get('#login-join-toggle').click()
    })
    it('new account form is present', function () {
      cy.get('#display-name-input')
      cy.get('#new-username-input')
      cy.get('#new-password-input')
      cy.get('#confirm-password-input')
      cy.get('#create-user-account-button')
    })

    it('new account can be created', function () {
      cy.get('#display-name-input').type('cypress-new-display-name')
      cy.get('#new-username-input').type('cypress-new-username')
      cy.get('#new-password-input').type('cypress-new-password')
      cy.get('#confirm-password-input').type('cypress-new-password')
      cy.get('#create-user-account-button').click()
      cy.checkNotification('cypress-new-display-name created!')
    })

    it('username must be unique', function() {
      cy.get('#display-name-input').type('cypress-new-display-name')
      cy.get('#new-username-input').type('cypress-new-username')
      cy.get('#new-password-input').type('cypress-new-password')
      cy.get('#confirm-password-input').type('cypress-new-password')
      cy.get('#create-user-account-button').click()
      cy.checkNotification('cypress-new-display-name created!')

      cy.get('#login-join-toggle').click()
      cy.get('#display-name-input').type('cypress-new-display-name')
      cy.get('#new-username-input').type('cypress-new-username')
      cy.get('#new-password-input').type('cypress-new-password')
      cy.get('#confirm-password-input').type('cypress-new-password')
      cy.get('#create-user-account-button').click()
      cy.checkNotification('invalid submission, no account created', true)
    })

    it('displayName must be three or more characters', function () {
      cy.get('#display-name-input').type('12')
      cy.get('#new-username-input').type('cypress-new-username')
      cy.get('#new-password-input').type('cypress-new-password')
      cy.get('#confirm-password-input').type('cypress-new-password')
      cy.get('#create-user-account-button').click()
      cy.checkNotification('invalid submission, no account created', true)
    })

    it('password fields must match', function () {
      cy.get('#display-name-input').type('cypress-new-display-name')
      cy.get('#new-username-input').type('cypress-new-username')
      cy.get('#new-password-input').type('cypress-new-password')
      cy.get('#confirm-password-input').type('does-not-match')
      cy.get('#create-user-account-button').click()
      cy.checkNotification('invalid submission, no account created', true)
    })
  })

  describe('login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'test',
        username: 'test-user',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('test-user')
      cy.get('#password-input').type('secret')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.checkNotification('welcome back test')
    })

    it('fails with incorrect password', function () {
      cy.get('#username-input').type('test-user')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.checkNotification('wrong username or password', true)
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test-user', password: 'secret' })
    })

    it('blogform can be opened', function () {
      cy.get('#toggle-open-button').click()
      cy.get('#title-input')
      cy.get('#author-input')
      cy.get('#url-input')
    })

    it('opened blogform can be closed', function () {
      cy.get('#toggle-open-button').click()
      cy.get('#toggle-close-button').click()
      cy.get('#toggle-open-button').should('contain', 'add blog')
    })

    it('a blog can be created', function () {
      cy.createBlog({
        title: 'cypress-title',
        author: 'cypress-author',
        url: 'cypress-url'
      })
      cy.checkNotification('cypress-title by cypress-author added')
    })

    it('a blog can be liked', function () {
      cy.contains('cypress-title by cypress-author')
        .parent()
        .find('button')
        .contains('expand')
        .click()

      cy.contains('like').click()
      cy.checkNotification('cypress-title by cypress-author liked')
      cy.contains('likes').parent().contains(1)
    })

    it('a user can delete their own blog', function () {
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.on('window:confirm', () => true)

      cy.checkNotification('cypress-title by cypress-author removed')
    })

    it('a user cannot delete anothers blog', function () {
      cy.createBlog({
        title: 'cypress-title',
        author: 'cypress-author',
        url: 'cypress-url'
      })
      cy.visit('http://localhost:3000').wait(250)
      cy.get('#login-button').click()
      const user2 = {
        name: 'test2',
        username: 'test-user2',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.visit('http://localhost:3000')
      cy.get('#username-input').type('test-user2')
      cy.get('#password-input').type('secret')
      cy.get('#login-button').click()
      cy.get('#view-button').click()
      cy.get('#test-blog-title-author').should('not.contain', '#delete-button')
    })
  })

  describe('bloglist attributes', function () {
    it('blogs are ordered by decending like count', function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'test',
        username: 'test-user',
        password: 'secret'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
      cy.login({ username: 'test-user', password: 'secret' })

      cy.createBlog({
        title: 'cypress-title-high',
        author: 'cypress-author-high',
        url: 'cypress-url-high'
      })

      cy.createBlog({
        title: 'cypress-title-low',
        author: 'cypress-author-low',
        url: 'https://cypress-url-low'
      })

      cy.createBlog({
        title: 'cypress-title-mid',
        author: 'cypress-author-mid',
        url: 'https://cypress-url-mid'
      })

      cy.contains('cypress-title-high by cypress-author-high')
        .parent()
        .find('button')
        .contains('expand')
        .click()

      cy.contains('cypress-title-high by cypress-author-high')
        .parent()
        .find('button')
        .contains('like')
        .click()
        .wait(1000)
        .click()

      cy.contains('cypress-title-high by cypress-author-high')
        .parent()
        .find('button')
        .contains('close')
        .click()

      cy.contains('cypress-title-mid by cypress-author-mid')
        .parent()
        .find('button')
        .contains('expand')
        .click()

      cy.contains('cypress-title-mid by cypress-author-mid')
        .parent()
        .find('button')
        .contains('like')
        .click()
        .wait(250)

      cy.get('.blog')
        .eq(0)
        .should('contain', 'cypress-title-high by cypress-author-high')
      cy.get('.blog')
        .eq(2)
        .should('contain', 'cypress-title-low by cypress-author-low')
    })
  })
})
