/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
    
const site = 'https://practice.automationtesting.in/'

const randNum = faker.number.int({min: 1, max: 10});

function addProductToCart() {
    cy.get('.post-165 > .button').click();
    cy.get('.added_to_cart').click();
}


context('Shopping Cart Functionality', () => {

    beforeEach(() => {

        cy.visit(site);
        
        addProductToCart();    
    });


    it('Successful Product Addition', () => {

        //Verifica a listagem de itens do carrinho
        cy.get('.cart_item').should('exist');
    })

    it('Update product quantity', () => {

        //Altera quantidade de um item
        cy.get('.quantity > .input-text').clear().type(`${randNum}`);
        cy.get('[name="update_cart"]').click();

        //Verifica se a quantidade foi alterada corretamente
        cy.get('.quantity > .input-text').invoke('val').then(currentValue => {
            expect(currentValue).to.equal(`${randNum}`);
        });
    })

    it('Remove itens from cart', () => {

        //Clica no botão de remover item
        cy.get('.remove').click();

        //Verifica mensagem informando a remoção
        cy.get('.woocommerce-message').should('contain', 'removed');
    })
})