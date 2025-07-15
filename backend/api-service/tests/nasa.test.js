// Example test using supertest (install supertest and jest for real tests)
const request = require('supertest');
const app = require('../src/app');

describe('NASA API Endpoints', () => {
  it('GET /api/nasa/apod should return APOD data', async () => {
    const res = await request(app).get('/api/nasa/apod');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('url');
  });

  it('GET /api/nasa/mars-photos should return Mars Rover photos', async () => {
    const res = await request(app).get('/api/nasa/mars-photos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('photos');
    expect(Array.isArray(res.body.photos)).toBe(true);
  });

  it('GET /api/nasa/epic should return EPIC metadata', async () => {
    const res = await request(app).get('/api/nasa/epic');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/nasa/neo-feed should return NeoWs feed', async () => {
    const res = await request(app).get('/api/nasa/neo-feed');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('near_earth_objects');
  });

  it('GET /api/nasa/search-images?q=moon should return image search results', async () => {
    const res = await request(app).get('/api/nasa/search-images?q=moon');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('collection');
  });
});

describe('Stats API Endpoints', () => {
  it('GET /api/stats/mars-photo should return Mars photo stats', async () => {
    const res = await request(app).get('/api/stats/mars-photo');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('stats');
    expect(typeof res.body.stats).toBe('object');
  });

  it('GET /api/stats/neo should return Neo asteroid stats', async () => {
    const res = await request(app).get('/api/stats/neo');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('stats');
    expect(typeof res.body.stats).toBe('object');