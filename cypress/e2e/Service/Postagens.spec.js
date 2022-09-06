/// <reference types="cypress" />

describe('Teste de postagem', () => {
    
    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    });

    it('Criar uma postagem', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: {
                'text': 'Wil - teste cypress'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    });
 });

describe('Teste de consulta', () => {
    
    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    });

    it('Listar postagens', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.empty
        })
    });

    it('Consultar postagem por Id', () => {

        cy.criarPosts(token, "Teste Bootcamp - Wil").then(response => {
            
            const postId = response.body._id
            
            cy.request({
                method: 'GET',
                url: `/api/posts/${postId}`,
                headers: {
                    Cookie: token
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    });
});

describe('Testes de exclusão', () => {

    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    });

    it('Exluir um post', () => {
        cy.criarPosts(token, "Teste Bootcamp - Wil").then(response =>{
            
            const postId = response.body._id
            
            cy.request({
                method: 'DELETE',
                url: `/api/posts/${postId}`,
                headers: {
                    Cookie: token
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            })
        }) 
    });
});

describe('Testes de alteração', () => {

    let token

    beforeEach(() => {
        cy.tokenJwt().then((auth) => {
            token = auth;
        })
    });

    it('Curtir um post', () => {
        cy.criarPosts(token, "Teste Bootcamp - Wil").then(response =>{
            
            const postId = response.body._id
            
            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${postId}`,
                headers: {
                    Cookie: token
                },
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        }) 
    });
});