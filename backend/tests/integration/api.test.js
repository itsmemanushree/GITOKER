const request = require('supertest');
const { app, sequelize } = require('../../server');

// Close the DB connection after all tests are done
afterAll(async () => {
  await sequelize.close();
});

// Wait for database to be ready
beforeAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
});

describe('SkinGlow API Integration Tests', () => {

  test('GET /api/health should return OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Server is running');
  });

  test('GET /api/products should return array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
  });

  test('GET /api/products/1 should return a specific product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name');
  });

  test('POST /api/contact should save contact message', async () => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Hello World'
    };
    const res = await request(app)
      .post('/api/contact')
      .send(contactData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('contactId');
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/cart should add item to cart', async () => {
    const cartItem = {
      productId: 1,
      quantity: 2
    };
    const res = await request(app)
      .post('/api/cart')
      .send(cartItem);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('item');
    expect(res.body.item.productId).toBe(cartItem.productId);
  });

  test('GET /api/cart should return all cart items', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
