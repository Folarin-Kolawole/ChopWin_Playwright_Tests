import { expect } from '@playwright/test';

class Signuppage {
  constructor(page) {
    this.page = page;

    // Signup locators
    this.phonenumberField = page.getByRole('textbox', { name: 'Entre ton numéro de téléphone' });
    this.passwordField = page.locator('input[name="password"]');
    this.confirmpasswordField = page.locator('input[name="confirmPassword"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.smsButton = page.getByRole('button', { name: /SMS/i }); 

    // OTP locators
    this.otpDigit1 = page.getByRole('textbox', { name: 'OTP digit 1' });
    this.otpDigit2 = page.getByRole('textbox', { name: 'OTP digit 2' });
    this.otpDigit3 = page.getByRole('textbox', { name: 'OTP digit 3' });
    this.otpDigit4 = page.getByRole('textbox', { name: 'OTP digit 4' });
    this.confirmButton = page.getByRole('button', { name: /confirmer/i });
    this.alertMessage = page.getByRole('alert');
  }

  // Navigate to signup page
  async navigate() {
    await this.page.goto('https://dev.chopbet.ci/join', { timeout: 30000 });
  }

  // Fill OTP
  async fillOTP(otp) {
    const digits = otp.split('');
    await this.otpDigit1.fill(digits[0]);
    await this.otpDigit2.fill(digits[1]);
    await this.otpDigit3.fill(digits[2]);
    await this.otpDigit4.fill(digits[3]);
    await this.confirmButton.click();
  }

  
  // TEST CASE 1: Valid signup
  async signup_validotp(phone, password, confirmPassword, otp = '1111') {
    await this.phonenumberField.fill(phone);
    await this.passwordField.fill(password);
    await this.confirmpasswordField.fill(confirmPassword);

    // Continue
    await this.continueButton.click();

    // Wait for SMS button
    await expect(this.smsButton).toBeVisible({ timeout: 20000 });
    await expect(this.smsButton).toBeEnabled();
    await this.smsButton.click();

    // OTP page
    await this.fillOTP(otp);
  }

 
  // TEST CASE 2: Invalid OTP
  async signup_invalidotp(phone, password, confirmPassword, otp = '1121') {
    await this.phonenumberField.fill(phone);
    await this.passwordField.fill(password);
    await this.confirmpasswordField.fill(confirmPassword);
    await this.page.waitForTimeout(3000);
    await this.continueButton.click();

   // Wait for SMS button
    await this.smsButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.smsButton.click();

    // OTP page
    await this.fillOTP(otp);

    //ERROR MESSAGE
    await expect(this.page.getByText('Code invalide ressaie!', { exact: true })).toBeVisible();
  }

 
  // TEST CASE 3: Phone number already exists
  async phonenumber_exist(phone, password, confirmPassword) {
    await this.phonenumberField.fill(phone);
    await this.passwordField.fill(password);
    await this.confirmpasswordField.fill(confirmPassword);

    //CONTINUE BUTTON
    await this.continueButton.click();

    //ERROR MESSAGE
    await expect(this.alertMessage).toBeVisible();
  }

  
  // TEST CASE 4: Invalid phone number
  async invalid_phonenumber(phone, password, confirmPassword) {

    await this.phonenumberField.fill(phone);
    await this.passwordField.fill(password);
    await this.confirmpasswordField.fill(confirmPassword);

    //ERROR MESSAGE
    await expect(this.page.getByText('Numéro de téléphone invalide', { exact: true })).toBeVisible();
  }

 
  // TEST CASE 5: Invalid password
  async invalid_password(phone, password) {
    await this.phonenumberField.fill(phone);
    await this.passwordField.fill(password);
    
//ERROR MESSAGE
//await expect(this.page.getByText('Les mots de passe ne correspondent pas.', { exact: true })).toBeVisible();
  }
}

export default Signuppage;
