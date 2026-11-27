import { test, expect } from '@playwright/test';
import { StorefrontPage } from '../pages/StoreFrontPage';

test('search returns results', async ({ page }) => {
  const storefront = new StorefrontPage(page);

  await storefront.goto();

  const productName = 'pliers';

  await storefront.searchFor(productName);

  await storefront.waitForSearchResults(productName);

  const searchResults = await storefront.getSearchResultsCount(productName);

  expect(searchResults).toBeGreaterThan(0);
});