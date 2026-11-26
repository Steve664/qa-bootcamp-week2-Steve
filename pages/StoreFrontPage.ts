import { expect, type Locator, type Page } from '@playwright/test';

export class StorefrontPage {
  readonly page: Page;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('.card[href*="#/product/"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  }

  categoryCheckbox(categoryName: string): Locator {
    return this.page.getByRole('checkbox', { name: new RegExp(categoryName, 'i') });
  }

  async selectCategory(categoryName: string): Promise<void> {
    const checkbox = this.categoryCheckbox(categoryName);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  async getProductNames(): Promise<string[]> {
    const headings = this.productCards.getByRole('heading');
    const names = await headings.allInnerTexts();
    return names.map((name) => name.trim());
  }

  async expectProductsMatchCategory(categoryName: string, expectedCount?: number): Promise<void> {
    const matchingLinks = this.page.getByRole('link', { name: new RegExp(categoryName, 'i') });

    if (expectedCount !== undefined) {
      await expect(matchingLinks).toHaveCount(expectedCount);
    }

    const headings = matchingLinks.getByRole('heading');
    const names = (await headings.allInnerTexts()).map((name) => name.trim());

    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.toLowerCase()).toContain(categoryName.toLowerCase());
    }
  }
}