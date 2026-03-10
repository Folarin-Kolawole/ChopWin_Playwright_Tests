const { test, expect } = require('@playwright/test');

test.describe('Recently Played', () => {

  test('User can open a recently played game', async ({ page }) => {

    // Go to login page
    await page.goto('https://dev.chopbet.ci/login?next=/casino');

    // Fill login form
    await page.locator('.phone-input').fill('0584043553');
    await page.locator('input[type="password"]:visible').fill('Tessy2');

    // Click login and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: 'Connexion' }).click()
    ]);

    // Ensure login completed
    await expect(page).not.toHaveURL(/login/);

    // Navigate to recently played
    await page.goto('https://dev.chopbet.ci/games/recent');

    await expect(page).toHaveURL(/games\/recent/);

    // Click Chicken X game
    const chickenxGame = page.getByRole('button', { name: 'Chicken X', exact: true }).first();


    await chickenxGame.click(); 
    


    // Verify game modal opened
    //await expect(page.getByRole('heading', { name: /Chicken-X/i })).toBeVisible();

  });

});