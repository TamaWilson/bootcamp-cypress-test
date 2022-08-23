/// <reference types="cypress" />
const faker = require('faker-br');

describe('US0003 - Funcionalidade: perfil', () => {

    beforeEach(() => {
        cy.visit('cadastrar');
        cy.cadastrar(faker.name.firstName(), faker.internet.email()) 
        cy.visit('criar-perfil')
    });

    it('Deve cadastrar as informações do perfil com sucesso', () => {
        cy.selectStatus()

        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.lorem.words(10).replaceAll(" ", ", "))

        cy.formCadastroOpcionais(faker)

        cy.get('[data-test="profile-submit"]').click()

        cy.get('[data-test="alert"]').should('exist').should('contain', 'Perfil Criado')
    });

    it('Deve dar erro ao não inserir um status', () => {

        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.lorem.words(2).replaceAll(" ", ", "))

        cy.formCadastroOpcionais()
    
        cy.get('[data-test="profile-submit"]').click()

        cy.get('#status').should('have.class', 'Mui-error')
    });

    it('Deve dar erro ao não inserir habilidades', () => {
        cy.selectStatus()

        cy.formCadastroOpcionais()
                
        cy.get('[data-test="profile-submit"]').click()

        cy.get('.MuiFormHelperText-root').should('exist').should('contain', 'Conhecimentos é obrigatório')
    });

    it('Deve dar erro ao não inserir url de perfil invalida', () => {
        cy.selectStatus()

        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.lorem.words(2).replaceAll(" ", ", "))

        cy.get('[data-test="profile-socials"]').click()
        cy.get('[data-test="profile-twitter"] > .MuiInputBase-root > .MuiInputBase-input').type("lorem")
                
        cy.get('[data-test="profile-submit"]').click()

        cy.get('.MuiFormHelperText-root').should('exist').should('contain', 'Digite uma url válida')
    });
});