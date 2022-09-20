/// <reference types="cypress" />
// import profiles from "../../fixtures/profile.json"

describe('Funcionalidade: Visualização dos perfis', () => {

    beforeEach(() => {
        cy.visit('perfis'),
        cy.intercept({
            method: 'GET',
            url: 'api/profile'
        }, 
        {
            statusCode: 200,
            fixture: "profile"
        });

        cy.reload()
    });

    it('Validar o primeiro item da lista', () => {
        
        cy.get('[data-test="profile-name').first().should('contain', "Wilson Teste")
        
    });

    it.only('Validar lista vazia', () => {
        cy.intercept({
            url: 'api/profile'
        }, 
        {
            statusCode: 500,
        });
        cy.reload()

        cy.get('[data-test="profiles-noProfiles').first().should('contain', "Nenhum perfil encontrado")

    });

    it('Validar o terceiro item da lista', () => {
        cy.get('[data-test="profile-name').eq(2).should('contain', "Bootcamp User")
        
    });

    it('Validar o ultimo item da lista', () => {
        cy.get('[data-test="profile-name').last().should('contain', "Roberto dos Santos")
    });
    
});