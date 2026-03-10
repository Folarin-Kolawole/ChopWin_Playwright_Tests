const { test, expect } = require('@playwright/test');

test.describe('Withdrawal', () => {

  test('Can complete a withdrawal successfully', async ({ page }) => {
    await page.goto('https://dev.chopbet.ci/login?next=/casino');
    await page.getByRole('textbox', { name: 'Numéro de téléphone' }).click();
    await page.getByRole('textbox', { name: 'Numéro de téléphone' }).fill('0584043553');
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Tessy2');
    await page.getByRole('button', { name: 'Connexion' }).click();
    await page.getByRole('button', { name: 'Toggle wallet dropdown' }).click();
    await page.getByRole('link', { name: 'Mon espace perso' }).nth(1).click();
    await page.getByRole('button', { name: 'Retrait' }).click();
    await page.getByRole('textbox', { name: 'Sélectionne un montant' }).click();
    await page.getByRole('textbox', { name: 'Sélectionne un montant' }).fill('500');
    await page.getByRole('button', { name: 'Continue' }).click();
    //await expect(page.getByRole('button', { name: 'Retour au jeu' })).toBeVisible({ timeout: 30000 });
  });


  

});