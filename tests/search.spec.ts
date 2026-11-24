import { test, expect } from '@playwright/test';

test('search returns results', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com');
    const searchInput = page.getByRole('textbox')
    await searchInput.fill('pliers');
await page.getByRole('button', { name: /search/i }).click();
const searchResults = await page.getByRole('link', { name: /pliers/i }).count();
expect(searchResults).toBeGreaterThan(0);
});