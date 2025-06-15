const request = require('supertest');
const mongoose = require('mongoose');
const axios = require('axios');

jest.mock('axios');

let app;
let axiosInstance;

beforeAll(() => {
  axiosInstance = { get: jest.fn() };
  axios.create.mockReturnValue(axiosInstance);
  app = require('../app');
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Authentication', () => {
  test('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: 'pass' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('logs in an existing user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Login', email: 'login@example.com', password: 'pass' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'pass' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});

describe('Movie operations', () => {
  test('searches movies', async () => {
    axiosInstance.get.mockResolvedValue({ data: { results: [{ id: 1, title: 'Mock' }] } });
    const res = await request(app).get('/api/movies/search').query({ title: 'Mock' });

    expect(res.statusCode).toBe(200);
    expect(res.body.results[0].title).toBe('Mock');
  });

  test('searches movies with filters', async () => {
    axiosInstance.get.mockResolvedValue({ data: { results: [{ id: 2, title: 'Filter' }] } });
    const res = await request(app)
      .get('/api/movies/search')
      .query({ genre: '28', rating: 7, sort: 'popularity.desc' });

    expect(res.statusCode).toBe(200);
    expect(res.body.results[0].title).toBe('Filter');
  });

  test('returns movie recommendations', async () => {
    axiosInstance.get.mockResolvedValue({ data: { results: [{ id: 3, title: 'Rec' }] } });
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Rec', email: 'rec@example.com', password: 'pass' });
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'rec@example.com', password: 'pass' });
    const token = login.body.token;

    const res = await request(app)
      .get('/api/movies/recommendations')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.results[0].title).toBe('Rec');
  });

  test('handles watchlist operations', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Watcher', email: 'watch@example.com', password: 'pass' });

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'watch@example.com', password: 'pass' });
    const token = login.body.token;
    const movieId = 42;

    let res = await request(app)
      .post('/api/movies/watchlist')
      .set('Authorization', `Bearer ${token}`)
      .send({ movieId });
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain(movieId);

    res = await request(app)
      .get('/api/movies/watchlist')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain(movieId);

    res = await request(app)
      .delete(`/api/movies/watchlist/${movieId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).not.toContain(movieId);
  });
});

describe('User routes', () => {
  test('returns current user profile', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Prof', email: 'prof@example.com', password: 'pass' });

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'prof@example.com', password: 'pass' });
    const token = login.body.token;

    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('prof@example.com');
    expect(res.body.password).toBeUndefined();
  });
});
