/// <reference types="cypress" />

describe('US0001 - Funcionalidade: Login', () => {
    
    beforeEach(() => {
        cy.visit('login')
    });

    it('deve fazer login com sucesso', () => {
        cy.login('wilson@bootcampvia.email', '123456')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha invalidos', () => {
        cy.login('wilson@bootcampvia.email', '654321')
        cy.get('[data-test="alert"]').should('exist').should('contain', 'Credenciais inválidas')
    });

});

/* 
    Funcionalidade: Login
    Eu como usuário das Conexão QA
    Quero fazer o login
    Para editar meu perfil

    Cenário: Login com sucesso
    Arrange - Dado   - Pré-Requisito -> Dado que eu esteja na tela de login
    Action  - Quando - Ação do Usuário - Quando eu inserir usuário e senha 
    Assert  - Então  - Resultador esperado - Então deve me direcionar para o Dashboard

    Cenário: Validar msg de erro

    Cenário Recuperar senha

*/