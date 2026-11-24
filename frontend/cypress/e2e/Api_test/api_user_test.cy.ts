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
        cy.apiLogin().then((t) => {
            token = t;
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

describe('trying API user info without login', () => {
    it('should refuse access to user info when not logged in(anomalie connue)', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/me',
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(401);
        });
    });
});

describe('trying API  user info with wrong bearer token', () => {
    it('should refuse access to user info when using a wrong bearer token', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/me',
            headers: { Authorization: 'Bearer invalid_token' },
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(401);
        });
    });
});
