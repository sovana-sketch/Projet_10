// Review get API tests 
describe('API get review', () => {
    let token: string;

    beforeEach(() => {
        cy.apiLogin().then((t) => {
            token = t;
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
        cy.apiLogin().then((t) => {
            token = t;
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
    it('should not return the XSS payload intact in the comment (anomalie connue)', () => {
        const xssPayload = '<img src=x onerror=alert("XSS")>';

        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                title: 'Super produit XSS',
                comment: xssPayload,
                rating: 5
            }
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('comment');

            // On vérifie le champ lui-même : JSON.stringify échappe les guillemets,
            // un test sur le corps sérialisé passerait à tort.
            const comment: string = res.body.comment;
            expect(comment).to.not.eq(xssPayload);
            expect(comment).to.not.include('<img');
        });
    });
});