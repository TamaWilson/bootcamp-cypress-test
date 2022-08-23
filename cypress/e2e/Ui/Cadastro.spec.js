/// <reference types="cypress" />
const faker = require('faker-br');

describe('US0002 - Funcionalidade: Cadastro', () => {
    beforeEach(() => {
        cy.visit('cadastrar');
    });

    it('Deve fazer cadastro com sucesso', () => {
        cy.cadastrar(faker.name.firstName(), faker.internet.email()) 
        
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-welcome"]').should('exist')


    });
});