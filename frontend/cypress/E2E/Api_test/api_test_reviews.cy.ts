// Review get API tests 
describe('API get review', () => {
    let token: string;

    beforeEach(() => {
        cy.request('POST', 'http://localhost:8081/login', {
            username: 'test2@test.fr',
            password: 'testtest',
        }).then((response) => {
            token = response.body.token;
        });
    });
    it('should fetch the user reviews', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/reviews',
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array');
        });
    });
});

// api post review test
describe('API post review', () => {
    let token: string;
    beforeEach(() => {
        cy.request('POST', 'http://localhost:8081/login', {
            username: 'test2@test.fr',
            password: 'testtest',
        }).then((response) => {
            token = response.body.token;
        });
    });
    it('should create a new review', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                title: 'je suis une truite',
                comment: 'Très bon savon, je recommande.',
                rating: 5
            }
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
        });
    });
    it('should perform an XSS test', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                title: 'Super produit',
                comment: '<script>alert("XSS")</script>',
                rating: 5
            }
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
        });
    });
});