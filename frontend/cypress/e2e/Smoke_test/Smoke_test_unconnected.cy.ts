
describe('Smoke tests unconnected', () => {
    it('should show the login button when logged out', () => {
        cy.visit('http://localhost:4200/');
        cy.get('[data-cy="nav-link-login"]').should('be.visible');
    });
});
describe('Smoke tests login', () => {
 it('should show the login fields and button', () => {
        cy.visit('http://localhost:4200/');
        cy.get('[data-cy="nav-link-login"]').click();
        cy.url().should('include', '/login');
        cy.get('[data-cy="login-form"]').should('be.visible');
        cy.get('[data-cy="login-input-username"]').should('be.visible');
        cy.get('[data-cy="login-input-password"]').should('be.visible');
        cy.get('[data-cy="login-submit"]').should('be.visible');
    });
});