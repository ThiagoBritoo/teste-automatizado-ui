/// <reference types="cypress"/>

const profile = require('../fixtures/profile.json')

context('Login functionality', () => {

    const url = '/minha-conta'; 

    beforeEach(() => {
        cy.visit(url);
    });

    it('Successful login', () => {
        cy.get('#username').type('aluno_ebac@teste.com');
        cy.get('#password').type('teste@teste.com');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá');       
    });

    it('Successful login - using data file', () => {
        
        cy.get('#username').type(profile.username);
        cy.get('#password').type(profile.password);
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá');
    });

    it.only('Successful login - using fixture', () => { 
        cy.fixture('profile').then(data => {
            cy.get('#username').type(data.username);
            cy.get('#password').type(data.password, {log: false});
            cy.get('.woocommerce-form > .button').click();

            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá');
        })
    })

    it('Incorrect email', () => {
        cy.get('#username').type('incorrectemail@email.com');
        cy.get('#password').type('teste@teste.com');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-error').should('exist');
    });

    it('Incorrect password', () => {
        cy.get('#username').type('aluno_ebac@ebac.com');
        cy.get('#password').type('incorrectpassword');
        cy.get('.woocommerce-form > .button').click();

        cy.get('.woocommerce-error').should('exist');
    });    
});