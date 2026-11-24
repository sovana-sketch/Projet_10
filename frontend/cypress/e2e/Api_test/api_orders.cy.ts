describe('API put order by id', () => {
    let token: string;
    let productId: number;
    let orderLineId: number;

    beforeEach(() => {
        cy.apiLogin().then((t) => {
            token = t;
        });
        cy.request('GET', 'http://localhost:8081/products/random')
            .then((res) => {
                cy.log(JSON.stringify(res.body));
                expect(res.status).to.eq(200);
                expect(res.body).to.be.an('array');
                productId = res.body[0].id;
            });
    });

    it('should add a product to the cart', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:8081/orders/add',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                "product": productId,
                "quantity": 1
            },
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            expect(res.body.orderLines).to.be.an('array');
            const line = res.body.orderLines.find((l: any) => l.product.id === productId);
            orderLineId = line.id;

            cy.request({
                method: 'GET',
                url: 'http://localhost:8081/orders',
                headers: { Authorization: `Bearer ${token}` },
            }).then((resGet) => {
                expect(resGet.status).to.eq(200);
                expect(resGet.body.orderLines).to.be.an('array');
                expect(resGet.body.orderLines[0].product.id).to.eq(productId);
            });
        });
    });


    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:8081/orders/${orderLineId}/delete`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
        });
    });


});




//create order test create order
describe('API change quantity', () => {
    let token: string;
    let productId: number;
    let orderLineId: number;

    beforeEach(() => {
        cy.apiLogin().then((t) => {
            token = t;

            cy.request('GET', 'http://localhost:8081/products/random')
                .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.body).to.be.an('array');
                    productId = res.body[0].id;

                    cy.request({
                        method: 'PUT',
                        url: 'http://localhost:8081/orders/add',
                        headers: { Authorization: `Bearer ${token}` },
                        body: { product: productId, quantity: 1 },
                    }).then((resAdd) => {
                        expect(resAdd.status).to.eq(200);
                        const line = resAdd.body.orderLines.find(
                            (l: any) => l.product.id === productId
                        );
                        orderLineId = line.id;
                    });
                });
        });
    });

    it('should change the quantity of an existing order line', () => {
        cy.request({
            method: 'PUT',
            url: `http://localhost:8081/orders/${orderLineId}/change-quantity`,
            headers: { Authorization: `Bearer ${token}` },
            body: { quantity: 2 },
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            const line = res.body.orderLines.find(
                (l: any) => l.product.id === productId
            );
            expect(line.quantity).to.eq(2);
        });
    });

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:8081/orders/${orderLineId}/delete`,
            headers: { Authorization: `Bearer ${token}` },
        });
    });
});

describe('API get orders without login', () => {
    it('should refuse access to the cart when not logged in', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.eq(401);
        });
    });
});

describe('API create order', () => {
let token: string;
let productId: number;

beforeEach(() => {
cy.apiLogin().then((t) => {
token = t;

cy.request('GET', 'http://localhost:8081/products/random')
.then((res) => {
expect(res.status).to.eq(200);
expect(res.body).to.be.an('array');
productId = res.body[0].id;

cy.request({
method: 'PUT',
url: 'http://localhost:8081/orders/add',
headers: { Authorization: `Bearer ${token}` },
body: { product: productId, quantity: 1 },
}).then((resAdd) => {
expect(resAdd.status).to.eq(200);
});
});
});
});

it('should create a new order', () => {
cy.request({
method: 'POST',
url: 'http://localhost:8081/orders',
headers: { Authorization: `Bearer ${token}` },
body: {
firstname: 'Jane',
lastname: 'Doe',
address: '12 rue des Lilas',
zipCode: '33000',
city: 'Bordeaux',
},
}).then((res) => {
cy.log(JSON.stringify(res.body));
expect(res.status).to.eq(200);
expect(res.body.orderLines[0].product.id).to.eq(productId);
expect(res.body.orderLines[0].quantity).to.eq(1);
});
});
});


describe('API commande avec une quantité à zéro', () => {
    let token: string;
    let productId: number;

    beforeEach(() => {
        cy.apiLogin().then((t) => {
            token = t;

            cy.request('GET', 'http://localhost:8081/products/random').then((res) => {
                expect(res.status).to.eq(200);
                productId = res.body[0].id;

                cy.request({
                    method: 'PUT',
                    url: 'http://localhost:8081/orders/add',
                    headers: { Authorization: `Bearer ${token}` },
                    body: { product: productId, quantity: 0 },
                    failOnStatusCode: false,
                });
            });
        });
    });

    it('should refuse an order with no quantity(anomalie connue)', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                firstname: 'Jane',
                lastname: 'Doe',
                address: '12 rue des Lilas',
                zipCode: '33000',
                city: 'Bordeaux',
            },
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(res.status).to.not.eq(200);
        });
    });
});

describe('API commande avec injection XSS dans le prénom', () => {
    let token: string;
    const xssPayload = '<img src=x onerror=alert(1)>';

    beforeEach(() => {
        cy.apiLogin().then((t) => {
            token = t;

            cy.request('GET', 'http://localhost:8081/products/random').then((res) => {
                expect(res.status).to.eq(200);
                const productId = res.body[0].id;

                cy.request({
                    method: 'PUT',
                    url: 'http://localhost:8081/orders/add',
                    headers: { Authorization: `Bearer ${token}` },
                    body: { product: productId, quantity: 1 },
                }).then((resAdd) => {
                    expect(resAdd.status).to.eq(200);
                });
            });
        });
    });

    it('should not return the XSS payload intact in the firstname (anomalie connue)', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/orders',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                firstname: xssPayload,
                lastname: 'Doe',
                address: '12 rue des Lilas',
                zipCode: '33000',
                city: 'Bordeaux',
            },
            failOnStatusCode: false,
        }).then((res) => {
            cy.log(JSON.stringify(res.body));
            expect(JSON.stringify(res.body)).to.not.include(xssPayload);
        });
    });
});