describe('Panier', () => {
beforeEach(() => {
cy.login();
cy.get('[data-cy="nav-link-logout"]', { timeout: 10000 }).should('be.visible');

cy.intercept('GET', /\/products\/\d+$/).as('getProduct');
cy.intercept('PUT', '**/orders/add').as('addToCart');

cy.visit('http://localhost:4200/#/products');
cy.get('[data-cy="product-link"]').its('length').then((length) => {
const index = Math.floor(Math.random() * length);
cy.get('[data-cy="product-link"]').eq(index).click();
});
cy.wait('@getProduct');
cy.get('[data-cy="detail-product-add"]').click();
cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
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