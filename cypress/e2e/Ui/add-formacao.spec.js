/// <reference types="cypress" />
import formacao from '../../fixtures/formacao.json';
const experienciaPage = require("../../support/FormacaoAcademica/formacao-academica-pages")

describe('Funcionalidade: Adicionar formação acadêmica', () => {
    beforeEach(() => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit("adicionar-formacao")
    });

    it('Deve adicionar uma formação acadêmica com sucesso', () => {
        cy.fixture("formacao").then((formacoes) => {
            const formacao = formacoes[0];
            experienciaPage.addFormacao(formacao.escola, formacao.grau, formacao.curso, formacao.inicio, formacao.fim, formacao.descricao)
        })
        cy.get('[data-test="alert"]').should('exist').should('contain', 'Formação Acadêmica Adicionada')
    });

    it('Deve deletar uma formação acadêmica com sucesso', () => {
        cy.fixture("formacao").then((formacoes) => {
            const formacao = formacoes[0];
            experienciaPage.addFormacao(formacao.escola, formacao.grau, formacao.curso, formacao.inicio, formacao.fim, formacao.descricao)
        })
        cy.get('[data-test="education-delete"]').first().click()
        cy.get('[data-test="alert"]').should('exist').should('contain', 'Formação Acadêmica Removida')
    });
    
});