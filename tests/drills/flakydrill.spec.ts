import{test, expect} from '@playwright/test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const BASE_URL = pathToFileURL(
  path.resolve(__dirname, 'index.html')
).href;

test('Save button displays confirmation', async ({page}) =>{
    await page.goto(BASE_URL);
   await page.locator('button').click();
     await expect(page.locator('#status')   ).toHaveText('Saved');
    
})