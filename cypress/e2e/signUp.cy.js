/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const url = '/minha-conta/'
const name = faker.person.firstName();
const email = faker.internet.email(name);
const password = faker.internet.password(true);
const existingEmail = 'aluno_ebac@teste.com'


context('Sign Up Functionality', () => {

    beforeEach(() => {
        cy.visit(url)
    })

    it('Successful sign up', () =>{

        cy.get('#reg_email').type(email);
        cy.get('#reg_password').type(password);
        cy.get(':nth-child(4) > .button').click();

        cy.get('a > .hidden-xs').should('contain' , `Welcome ${name.toLowerCase()}`);

    })

    it('Existing email', () => {

        cy.get('#reg_email').type(existingEmail);
        cy.get('#reg_password').type(password);
        cy.get(':nth-child(4) > .button').click();

        cy.get('.woocommerce-error').should('contain' , 'Erro');

    })

    it('Weak password', () => {
        
        cy.get('#reg_email').type(email);
        cy.get('#reg_password').type('123');
        cy.get('.woocommerce-password-strength').should('exist');

    })    
});