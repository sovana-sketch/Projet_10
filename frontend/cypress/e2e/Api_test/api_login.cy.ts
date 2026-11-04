//login test
describe('API login', () => {

    it('should login with valid credentials', () => {
        cy.request('POST', 'http://localhost:8081/login', {
            username: 'test2@test.fr',
            password: 'testtest',
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body));
        });
    });
});



describe('API login half wrong credentials', () => {
    let token: string;

    it('should return a 401 status for half wrong credentials', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: { username: 'jambon', password: 'testtest' },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});


describe('API login full wrong credentials', () => {
    let token: string;

    it('should return a 401 status for full wrong credentials', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/login',
            body: { username: 'jambon', password: 'parme' },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});






