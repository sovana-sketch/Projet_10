// regiter api test
describe('API register user', () => {
    it('should register a new user', () => {
        const email = `jane.doe.${Date.now()}@test.fr`;
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/register',
            body: {
                "email": email,
                "firstname": "Jane",
                "lastname": "Doe",
                "plainPassword": {
                    first: 'password123',
                    second: 'password123',
                },
            }
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
        });
    });
});

//user info api test
describe('API get user info', () => {
    let token: string;

    beforeEach(() => {
        cy.request('POST', 'http://localhost:8081/login', {
            username: 'test2@test.fr',
            password: 'testtest',
        }).then((response) => {
            token = response.body.token;
        });
    });
    it('should fetch the user info', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/me',
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
        });
    });
});
