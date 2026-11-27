 import{ test, expect } from '@playwright/test';
 import { StorefrontPage } from '../pages/StoreFrontPage';

 test('search returns results', async ({ page }) => {
    const storefront = new StorefrontPage(page);
    await storefront.goto();

    await storefront.searchFor('pliers');

    const searchResults = await storefront.getSearchResultsCount();
    expect(searchResults).toBeGreaterThan(0);
//        expect(searchResults).toBe(0);

  });