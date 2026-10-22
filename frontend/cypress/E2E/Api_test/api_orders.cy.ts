import { Product } from "src/app/entities/Product";



// get order test get order by id test

// describe('API get order', () => {
//     let token: string;

//     beforeEach(() => {
//         cy.request('POST', 'http://localhost:8081/login', {
//             username: 'test2@test.fr',
//             password: 'testtest',
//         }).then((response) => {
//             token = response.body.token;
//         });
//     });

//     it('should fetch the user profile', () => {
//         cy.request({
//             method: 'GET',
//             url: 'http://localhost:8081/orders',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             body: {
//                 "firstname": "string",
//                 "lastname": "string",
//             }
//         }).then((res) => {
//             cy.log(JSON.stringify(res.body))
//             expect(res.status).to.eq(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body.orderLines).to.be.an('array')

//         });
//     });
// });

//put order test put order  test

describe('API put order by id', () => {
    let token: string;
    let productId: number;
    let orderLineId: number;

    beforeEach(() => {
        cy.request('POST', 'http://localhost:8081/login', {
            username: 'test2@test.fr',
            password: 'testtest',
        }).then((response) => {
            token = response.body.token;
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
        cy.request('POST', 'http://localhost:8081/login', {
            username: 'test2@test.fr',
            password: 'testtest',
        }).then((response) => {
            token = response.body.token;

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