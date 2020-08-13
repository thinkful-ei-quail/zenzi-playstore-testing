const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

describe('GET /apps', () => {
  it('should return a message from GET /', ()=> {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express');
  });

  it('should thow an error if genre string does not match predetermeined options', () => {
    return supertest(app)
      .get('/app')
      .query({genre:'Comedy'})
      .expect(400, `genre must be one of ${validGenres}`)
  });
});