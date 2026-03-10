const { test, expect } = require('@playwright/test');

test.describe('Deposit', () => {

  test('Can complete a deposit successfully', async ({ page }) => {
    await page.goto('https://dev.chopbet.ci/login?next=/casino');
    await page.getByRole('textbox', { name: 'Numéro de téléphone' }).click();
    await page.getByRole('textbox', { name: 'Numéro de téléphone' }).fill('0584043553');
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Tessy2');
    await page.getByRole('button', { name: 'Connexion' }).click();
    await page.getByRole('button', { name: 'Toggle wallet dropdown' }).click();
    await page.getByRole('link', { name: 'Mon espace perso' }).nth(1).click();
    await page.getByRole('button', { name: 'Dépôt' }).click();
    await page.getByRole('textbox', { name: 'Entre le montant que Tu' }).click();
    await page.getByRole('textbox', { name: 'Entre le montant que Tu' }).fill('500');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('1234');
    await page.getByRole('button', { name: 'Finaliser le paiement' }).click();
    await expect(page.getByText('Ton dépôt de 500.00 FCFA est')).toBeVisible({ timeout: 20000 });
    await page.getByRole('button', { name: 'continuePlaying' }).click();
  });

  
});