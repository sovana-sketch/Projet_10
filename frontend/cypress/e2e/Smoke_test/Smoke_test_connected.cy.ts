describe('Smoke tests', () => {
    it('should show the login button when logged out', () => {
        cy.visit('http://localhost:4200/');
        cy.get('[data-cy="nav-link-login"]').should('be.visible');
    });

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