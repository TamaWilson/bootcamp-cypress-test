/// <reference types="cypress" />
const experienciaPage = require("../../support/Experiencia/experiencia-pages")

describe('Funcionalidade: Adicionar experiência', () => {
    beforeEach(() => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit("adicionar-experiencia")
    });
    
    it('Deve adicionar uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('dev', 'via', 'remoto', '01/01/2021', '01/01/2022', 'fazia os programas')
        cy.get('[data-test="alert"]').should('exist').should('contain', 'Experiência Adicionada')
    });

    it('Deve deletar uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('dev', 'via', 'remoto', '01/01/2021', '01/01/2022', 'fazia os programas')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.get('[data-test="alert"]').should('exist').should('contain', 'Experiência Removida')
    });
});