describe('Login with valid credentials', () => {
 
    it('should show logout and add-to-cart buttons when logged in', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get('[data-cy="login-input-password"]').type('testtest');
        cy.get('[data-cy="login-submit"]').click();
  });
});

describe('Login with invalid credentials', () => {
    it('should show an error message when logging in with invalid credentials', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('invalid@test.fr');
        cy.get('[data-cy="login-input-password"]').type('invalidpassword');
        cy.get('[data-cy="login-submit"]').click();

        cy.contains('Identifiants incorrects').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with empty credentials', () => {
    it('should show an error message when logging in with empty credentials', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-submit"]').click();
        cy.contains('Merci de remplir correctement tous les champs').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with invalid email format', () => {
    it('should show an error message when logging in with invalid email format', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('invalidemailformat');
        cy.get('[data-cy="login-input-password"]').type('testtest');
        cy.get('[data-cy="login-submit"]').click();
        
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with valid email and invalid password', () => {
    it('should show an error message when logging in with valid email and invalid password', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get('[data-cy="login-input-password"]').type('invalidpassword');
        cy.get('[data-cy="login-submit"]').click();

        cy.contains('Identifiants incorrects').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with valid email and empty password', () => {
    it('should show an error message when logging in with valid email and empty password', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get('[data-cy="login-submit"]').click();

        cy.contains('Merci de remplir correctement tous les champs').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with empty email and valid password', () => {
    it('should show an error message when logging in with empty email and valid password', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-password"]').type('testtest');
        cy.get('[data-cy="login-submit"]').click();
        cy.contains('Merci de remplir correctement tous les champs').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with caps email and caps password', () => {
    it('should show an error message when logging in with caps email and caps password', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('TEST2@TEST.FR');
        cy.get('[data-cy="login-input-password"]').type('TESTTEST');
        cy.get('[data-cy="login-submit"]').click();

        cy.contains('Identifiants incorrects').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with space valid email and space password', () => {
    it('should show an error message when logging in with space valid email and space password', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type(' test2@test.fr ');
        cy.get('[data-cy="login-input-password"]').type(' testtest ');
        cy.get('[data-cy="login-submit"]').click();

        cy.contains('Merci de remplir correctement tous les champs').should('be.visible');
        cy.get('[data-cy="login-errors"]').should('be.visible');
    });
});

describe('Login with hidden password', () => {
    it('should show an error message when logging in with hidden password', () => {
        cy.visit('http://localhost:4200/#/login');
        cy.get('[data-cy="login-input-username"]').type('test2@test.fr');
        cy.get('[data-cy="login-input-password"]').type('testtest');
        cy.get('[data-cy="login-input-password"]').should('have.attr', 'type', 'password');
    });
});
