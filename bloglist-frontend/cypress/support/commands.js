/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then((response) => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.get('#toggle-open-button').click()
  cy.get('#title-input').type(title)
  cy.get('#author-input').type(author)
  cy.get('#url-input').type(url)
  cy.get('#create-blog-button').click()
})

Cypress.Commands.add('checkNotification', (message, isError = false) => {
  if (isError) {
    cy.get('#notification')
      .should('contain', message)
      .and('have.css', 'color', 'rgb(185, 13, 13)')
      .and('have.css', 'border-style', 'dashed')
  }

  if (!isError) {
    cy.get('#notification')
      .should('contain', message)
      .and('have.css', 'color', 'rgb(13, 81, 13)')
      .and('have.css', 'border-style', 'dashed')
  }
})
