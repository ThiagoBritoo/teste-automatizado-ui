/// <reference types= "cypress" />

describe('Address Functionality - Billing and Shipping', () => {

    const url = '/minha-conta'

    beforeEach(() => {
        cy.visit(url);

        cy.fixture('profile').then( data => {
            cy.login(data.username, data.password);
        });
    })

    it('Successful billing sign-up', () => {      



        
    });
});

