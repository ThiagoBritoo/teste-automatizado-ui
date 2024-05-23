/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
    
const url = 'produtos'

const quantity = faker.number.int({min: 1, max: 10});

const product = 'Ariel Roll Sleeve Sweatshirt'

context('Shopping Cart Functionality', () => {

    beforeEach(() => {

        cy.visit(url);
    });


    it('Successful Product Addition', () => {

        cy.get('[class="products products-grid"]')
            .contains('Ariel Roll Sleeve Sweatshirt').click();
        cy.get('.button-variable-item-S').click();
        cy.get('.button-variable-item-Purple').click();
        cy.get('.input-text').clear().type(quantity);
        cy.get('.single_add_to_cart_button').click();

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity);
    });

    it('Successful Product Addition - Using Custom Commands', () => {

        cy.addProduct('Ariel Roll Sleeve Sweatshirt', quantity, 'M', 'Green');

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity);
    })

    it('Successful Product Addition - Using Custom Commands', () => {

        cy.addProduct('Ajax Full-Zip Sweatshirt', quantity, 'XS', 'Red');

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity);
    })


    it('Update product quantity', () => {

        cy.addProduct(product, quantity, 'S', 'Purple' );

        //Verifica se a quantidade foi alterada corretamente
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantity);
        });

    it('Remove itens from cart', () => {

        cy.addProduct('Aether Gym Pant', quantity, 36, 'Blue');

        //acessa o carrinho
        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click();
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart').click({multiple: true});


        //Clica no botão de remover item
        cy.get('.remove > .fa').click();

        //Verifica mensagem informando a remoção
        cy.get('.woocommerce-message').should('contain', `removido`);
    });
});
