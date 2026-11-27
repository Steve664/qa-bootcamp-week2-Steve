
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.practicesoftwaretesting.com';

test.describe('Cart API Tests', () => {

  test.beforeAll(() => {
    if (!BASE_URL) {
      throw new Error('TOOLSHOP_API_URL environment variable is not set');
    }
  });

  test('creates a cart, adds a product, verifies response fields and deletes the cart', async ({ request }) => {
    let cartId: string | undefined;

    try {
      // 1. Get products
      const productsRes = await request.get(`${BASE_URL}/products`);
      expect(productsRes.ok()).toBeTruthy();

      const productsBody = await productsRes.json();
      expect(Array.isArray(productsBody.data)).toBe(true);
      expect(productsBody.data.length).toBeGreaterThan(0);

      const productId = productsBody.data[0].id;
      expect(typeof productId).toBe('string');

      // 2. Create cart
      const createCartRes = await request.post(`${BASE_URL}/carts`);
      const createCartBody = await createCartRes.json();

      cartId = createCartBody.id;

      expect(createCartRes.status()).toBe(201);
      expect(typeof cartId).toBe('string');

      // 3. Add product
      const addItemRes = await request.post(`${BASE_URL}/carts/${cartId}`, {
        data: { product_id: productId, quantity: 1 },
      });

      expect(addItemRes.ok()).toBeTruthy();

      // 4. Verify cart
      const getCartRes = await request.get(`${BASE_URL}/carts/${cartId}`);
      expect(getCartRes.status()).toBe(200);

      const cart = await getCartRes.json();

      expect(cart.id).toBe(cartId);
      expect(cart.cart_items).toHaveLength(1);
      expect(cart.cart_items[0].quantity).toBe(1);
      expect(cart.cart_items[0].product_id ?? cart.cart_items[0].product?.id).toBe(productId);

      // 5. Delete cart
      const deleteRes = await request.delete(`${BASE_URL}/carts/${cartId}`);
      expect([200, 204]).toContain(deleteRes.status());

      const afterDeleteRes = await request.get(`${BASE_URL}/carts/${cartId}`);
      expect(afterDeleteRes.status()).toBe(404);

      cartId = undefined;

    } finally {
      // Clean up if the test fails before deletion
      if (cartId) {
        await request.delete(`${BASE_URL}/carts/${cartId}`).catch(() => {});
      }
    }
  });
});
