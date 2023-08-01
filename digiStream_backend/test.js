const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const app = require('./server');

describe('Login API', () => {
  it('should return success true and message "Login successful" for valid credentials', (done) => {
    const validEmail = 'valid@example.com';
    const validPassword = 'valid_password';

    chai.request(app)
      .get('/api/login')
      .query({ email: validEmail, password: validPassword })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          success: true,
          message: 'Login successful'
        });
        done();
      });
  });

  it('should return success false and message "Invalid username or password" for invalid credentials', (done) => {
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'invalid_password';

    chai.request(app)
      .get('/api/login')
      .query({ email: invalidEmail, password: invalidPassword })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          success: false,
          message: 'Invalid username or password'
        });
        done();
      });
  });
});
