/// <reference types="cypress"/>

context('Login functionality', () => {

    const site = 'http://lojaebac.ebaconline.art.br/minha-conta/'

    beforeEach(() => {
        cy.visit(site);
    });

    it('Successful login', () => {
        cy.get('#username').type('aluno_ebac@teste.com');
        cy.get('#password').type('teste@teste.com');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá')        
    })

    it('Incorrect email', () => {
        cy.get('#username').type('incorrectemail@email.com');
        cy.get('#password').type('teste@teste.com');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-error').should('exist');
    })

    it('Incorrect password', () => {
        cy.get('#username').type('aluno_ebac@ebac.com');
        cy.get('#password').type('incorrectpassword');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-error').should('exist');
    })    
});