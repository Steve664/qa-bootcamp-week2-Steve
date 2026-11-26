import {test, expect} from '@playwright/test';

test('Api returns products', async ({request}) =>{

    const response = await request.get('https://api.practicesoftwaretesting.com/products');
    await expect(response).toBeOK();
    await expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('data');
})