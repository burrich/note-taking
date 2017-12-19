const request = require('supertest');
const app     = require('../app');

/*
 * Test API requests with db mocking.
 */

jest.mock('../db/models/note');

test('GET request (all notes) runs correctly', () => {
  return request(app)
    .get('/api/notes')
    .then(res => {
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });
});

test('GET request (one note) runs correctly', () => {
  return request(app)
    .get('/api/notes/123')
    .then(res => {
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });
});

test('POST request runs correctly', () => {
  const jsonNote = JSON.stringify({ name: 'new note' });

  return request(app)
    .post('/api/notes')
    .set('Content-Type', 'application/json')
    .send(jsonNote)
    .then(res => {
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });
});

test('PATCH request runs correctly', () => {
  const jsonName = JSON.stringify({ name: 'updated note' });

  return request(app)
    .patch('/api/notes/123')
    .set('Content-Type', 'application/json')
    .send(jsonName)
    .then(res => {
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });
});

test('DELETE request runs correctly', () => {
  return request(app)
    .delete('/api/notes/123')
    .then(res => {
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });
});

