// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
const faker = require('faker-br');

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => { 
    cy.visit('login')
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="login-submit"]').click()
 })

 Cypress.Commands.add("cadastrar", (nome, email) => {
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123456')
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123456')
    cy.get('[data-test="register-submit"]').click()
 })

Cypress.Commands.add("selectStatus", () => {
    cy.get('#mui-component-select-status').click()
    cy.get('.MuiList-root').should("be.visible")
    cy.get('.MuiMenuItem-root').then(options => {
        cy.get(Cypress._.sample(options)).click()
    });
})

 Cypress.Commands.add("formCadastroOpcionais",  () => {
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.company.companyName())
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(`${faker.address.city()}, ${faker.address.stateAbbr()}`)
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.userName())
    cy.get('[data-test="profile-bio"] > .MuiInputBase-root').type(faker.lorem.paragraphs(2, " "))
    cy.get('[data-test="profile-socials"]').click()
    cy.get('[class="my-1 social-input"]').each(input => { 
        cy.get(input).type(faker.internet.url())
    })
 })