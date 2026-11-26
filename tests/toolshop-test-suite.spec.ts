
import { test, expect } from '@playwright/test';
import { StorefrontPage } from '../pages/StoreFrontPage';

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

  test('returns 404 when requesting a cart ID that does not exist', async ({ request }) => {
    const nonExistentCartId = 'this-cart-id-does-not-exist';

    const res = await request.get(`${BASE_URL}/carts/${nonExistentCartId}`);

    expect(res.status()).toBe(404);
  });

});
test.describe('Toolshop UI Tests', () => {

  test('homepage has title', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop - v5.0/);
  });

  test('failed login with invalid credentials', async ({ page }) => {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/auth/login');

    const emailInput = page.getByRole('textbox', { name: /your e-mail/i });
    await emailInput.fill('user@example.com');

  const passwordInput = page.locator('[data-test="password"]');
      await passwordInput.fill('Password123!');

    await page.getByRole('button', { name: /^login$/i }).click();

    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });

  test('search returns results', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');

    const searchInput = page.getByRole('textbox');
    await searchInput.fill('pliers');

    await page.getByRole('button', { name: /search/i }).click();

    const searchResults = await page.getByRole('link', { name: /pliers/i }).count();
    expect(searchResults).toBeGreaterThan(0);
  });

  test('filters products by category', async ({ page }) => {
    const storefront = new StorefrontPage(page);

    await storefront.goto();

    await expect(storefront.productCards.first()).toBeVisible();

    await storefront.selectCategory('Pliers');
    await storefront.expectProductsMatchCategory('Pliers', 4);
  });

});