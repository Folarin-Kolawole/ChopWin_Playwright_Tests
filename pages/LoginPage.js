const { expect } = require('@playwright/test');

class Loginpage {
  constructor(page) {
    this.page = page;

    // LOCATORS
    this.phonenumberField = page.locator('.phone-input');
    this.passwordField = page.locator('input[type="password"]:visible');
  }

  // NAVIGATE
  async navigate() {
    await this.page.goto('https://dev.chopbet.ci/login?next=/casino');
  }

  // TEST CASE 1: valid login
  async valid_login(phoneNumber, password) {
    await this.phonenumberField.fill(phoneNumber);
    await this.passwordField.fill(password);
    await this.page.getByRole('button', { name: 'Connexion' }).click();
  }

  // TEST CASE 2: invalid login
  async invalid_login(phoneNumber, password) {
    await this.phonenumberField.fill(phoneNumber);
    await this.passwordField.fill(password);
    await this.page.getByRole('button', { name: 'Connexion' }).click();
    //await this.page.getByText("Nom d'utilisateur ou mot de").toBeVisible();
  }

  // TEST CASE 3: required field blank
  async requiredfield_blank(password) {
    await this.passwordField.fill(password);
    await this.page.getByRole('button', { name: 'Connexion' })
  }
}

module.exports = Loginpage;
