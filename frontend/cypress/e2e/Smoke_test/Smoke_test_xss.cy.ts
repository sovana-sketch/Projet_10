describe('Smoke test XSS - ajout au panier', () => {
    let token: string;
    let productId: number;
    const xssPayload = '<img src=x onerror=alert(1)>';

    beforeEach(() => {
        cy.apiLogin().then((t) => {
            token = t;

            cy.request('GET', 'http://localhost:8081/products/random').then((res) => {
                expect(res.status).to.eq(200);
                productId = res.body[0].id;
            });
        });
    });

    it('should not return the XSS payload intact when adding to cart', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8081/orders/add',
            headers: { Authorization: `Bearer ${token}` },
            body: { product: productId, quantity: xssPayload },
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(400);
            expect(JSON.stringify(res.body)).to.not.include(xssPayload);
        });
    });
});
