describe('Smoke tests', () => {

    it('should show logout and add-to-cart buttons when logged in', () => {
        cy.login();
        cy.get('[data-cy="nav-link-logout"]').should('be.visible');
        cy.visit('http://localhost:4200/#/products');
        cy.get('[data-cy="product-link"]').its('length').then((length) => {
            const index = Math.floor(Math.random() * length);
            cy.get('[data-cy="product-link"]').eq(index).click();
        });
        cy.get('[data-cy="detail-product-add"]').should('be.visible')
    });
});

describe('Smoke tests product page', () => {
    
    it('should show add-to-cart button and quantity field on product page', () => {
        cy.login();
        cy.visit('http://localhost:4200/#/products');
        cy.get('[data-cy="product-link"]').first().click();
        cy.get('[data-cy="detail-product-add"]').should('be.visible');
        cy.get('[data-cy="detail-product-quantity"]').should('be.visible');
    });
});

