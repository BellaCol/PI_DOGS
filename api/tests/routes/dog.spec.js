/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const sinon = require('sinon');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  url: 'https://example.com',
  height: 30, // altura en centímetros
  weight: 10, // peso en kilogramos
  life_span: '10-15 years'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
      
    }));
  beforeEach(() => Dog.sync({ force: false })
    .then(() => Dog.create(dog)));

  describe('GET /dogs', () => {
    it('should get 200', (done) => {
      agent.get('/dogs').expect(200, done);
    });

    it('should respond with status 200, JSON content, and valid data', (done) => {
      const dropStub = sinon.stub(Dog, 'drop').throws();

      agent.get('/dogs').end((err, response) => {
        if (err) {
          dropStub.restore();
          return done(err);
        }

        expect(response.status).to.equal(200);
        expect(response.headers['content-type']).to.include('application/json');

        const data = response.body;
        expect(data).to.be.an('array');
        expect(data).to.have.lengthOf.above(0);
        expect(data[0]).to.have.property('id');
        expect(data[0]).to.have.property('name');
        expect(data[0]).to.have.property('height');
        expect(data[0]).to.have.property('weight');
        expect(data[0]).to.have.property('life_span');
        expect(data[0]).to.have.property('temperament');
        expect(data[0]).to.have.property('urlImage');
        expect(data[0]).to.have.property('origin');

        dropStub.restore();
        done();
      });
    });

    it('should respond with status 500 if an error occurs in the database or API', async (done) => {
      const dropStub = sinon.stub(Dog, 'drop').throws();
      const dog = null;
    
      try {
        const response = await agent.get('/dogs');
        expect(response.status).to.equal(500);
        done(); // Llamada a done() para indicar que la prueba ha finalizado
      } catch (error) {
        console.error('Test error:', error);
        done(error); // Llamada a done() con el error si ocurrió un error
      } finally {
        dropStub.restore();
      }
    });
    

    after(() => {
      conn.close();
    });
  });
});
