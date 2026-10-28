describe('Panier', () => {
beforeEach(() => {
cy.visit('http://localhost:4200/#/login');
cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
cy.get('[data-cy="login-input-password"]').type('testtest');
cy.get('[data-cy="login-submit"]').click();
cy.get('[data-cy="nav-link-logout"]').should('be.visible');

cy.visit('http://localhost:4200/#/products');
cy.get('[data-cy="product-link"]').its('length').then((length) => {
const index = Math.floor(Math.random() * length);
cy.get('[data-cy="product-link"]').eq(index).click();
});
cy.get('[data-cy="detail-product-add"]').click();
cy.get('[data-cy="nav-link-cart"]').click();
});

it('should show the product in the cart', () => {
cy.get('[data-cy="cart-line"]').should('have.length.greaterThan', 0);
});

it('should show all the order form fields', () => {
cy.get('[data-cy="cart-form"]').should('be.visible');
cy.get('[data-cy="cart-input-lastname"]').should('be.visible');
cy.get('[data-cy="cart-input-firstname"]').should('be.visible');
cy.get('[data-cy="cart-input-address"]').should('be.visible');
cy.get('[data-cy="cart-input-zipcode"]').should('be.visible');
cy.get('[data-cy="cart-input-city"]').should('be.visible');
cy.get('[data-cy="cart-submit"]').should('be.visible');
});

it('should place an order', () => {
cy.get('[data-cy="cart-input-lastname"]').type('Doe');
cy.get('[data-cy="cart-input-firstname"]').type('Jane');
cy.get('[data-cy="cart-input-address"]').type('12 rue des Lilas');
cy.get('[data-cy="cart-input-zipcode"]').type('33000');
cy.get('[data-cy="cart-input-city"]').type('Bordeaux');
cy.get('[data-cy="cart-submit"]').click();

cy.url().should('include', '#/confirmation');
cy.contains('Laisser un avis').should('be.visible');
});
});