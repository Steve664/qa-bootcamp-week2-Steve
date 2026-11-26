import { expect, test } from '@playwright/test';
import { StorefrontPage } from '../pages/StoreFrontPage';

test.describe('Category Filter', () => {
  test('filters products when selecting a Hand Tools category checkbox', async ({ page }) => {
    const storefront = new StorefrontPage(page);

    await storefront.goto();

    await expect(storefront.productCards.first()).toBeVisible();

    await storefront.selectCategory('Pliers');
    await storefront.expectProductsMatchCategory('Pliers', 4);
  });
});