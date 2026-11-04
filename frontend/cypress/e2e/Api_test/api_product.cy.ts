describe('API Tests', () => {
  it('should fetch data from the API', () => {
    cy.request('GET', 'http://localhost:8081/products')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
  });
});

describe('API Tests', () => {
  it('should fetch data from the API', () => {
    cy.request('GET', 'http://localhost:8081/products/random')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.length(3);
      });
  });
});

describe('API Tests product id', () => {
  it('should fetch data from the API', () => {
    cy.request('GET', 'http://localhost:8081/products/')
      .then((response) => {
        const productId = response.body[0].id;
        cy.request('GET', `http://localhost:8081/products/${productId}`)
          .then((productResponse) => {
            expect(productResponse.status).to.eq(200);
            expect(productResponse.body).to.be.an('object');
            expect(productResponse.body).to.have.property('id', productId);
          });
      });
  });
});

describe('API Tests health', () => {
  it('should fetch data from the API', () => {
    cy.request('GET', 'http://localhost:8081/api/health')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('status', 'ok');
      });
  });
});
