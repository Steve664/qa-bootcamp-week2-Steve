import { test, expect } from '@playwright/test';

test('Failed login with invalid credentials', async ({ page }) => {
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/auth/login');

  const emailInput = page.getByRole('textbox', { name: /your e-mail/i });
  await emailInput.fill('user@example.com');

const passwordInput = page.locator('input').and(page.getByPlaceholder(/your password/i));
  await passwordInput.fill('Password123!');

  await page.getByRole('button', { name: /^login$/i }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});