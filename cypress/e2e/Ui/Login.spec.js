/// <reference types="cypress" />
import usuarios from '../../fixtures/usuarios.json';

describe('US0001 - Funcionalidade: Login', () => {
    

    it('Deve fazer login com sucesso', () => {
        cy.login('wilson@bootcampvia.email', '123456')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha invalidos', () => {
        cy.login('wilson@bootcampvia.email', '654321')
        cy.get('[data-test="alert"]').should('exist').should('contain', 'Credenciais inválidas')
    });

    it('Deve fazer login com sucesso - Usando importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
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