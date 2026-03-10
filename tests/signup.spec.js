import { test, expect } from '@playwright/test';
import Signuppage from '../pages/Signuppage';

// CI Phone number generator (07 prefix, 10 digits)
function generateCIPhone07() {
  const prefix = '07';
  const remaining = Math.floor(10000000 + Math.random() * 90000000); 
  return `${prefix}${remaining}`;
}

test.describe('Sequential Signup Scenarios', () => {

  test('Run all signup scenarios sequentially with OTP', async ({ page }) => {
    const signup = new Signuppage(page);

   
    // TEST CASE 1: Valid signup with OTP 1111
    await test.step('Valid signup with OTP 1111', async () => {
      const phoneNumber = generateCIPhone07();
      console.log('Using phone for valid signup:', phoneNumber);
      await signup.navigate();
      await signup.signup_validotp(
        phoneNumber,
        'Miracle99@',
        'Miracle99@',
        '1111'
      );
    });

    
    // TEST CASE 2: Signup with invalid OTP 1121
    // await test.step('Signup with invalid OTP 1121', async () => {
    //   await signup.navigate(); 
    //   await signup.signup_invalidotp(
    //     '0701234800', 
    //     'Miracle99@',
    //     'Miracle99@',
    //     '1121'
    //   );
    // });

    
    // TEST CASE 3: Phone number exists
    await test.step('Phone number exists', async () => {
      await signup.navigate();
      await signup.phonenumber_exist(
        '0707283948', 
        'Miracle99@',
        'Miracle99@'
      );
    });

    
    // TEST CASE 4: Invalid phone number
    await test.step('Invalid phone number', async () => {
      await signup.navigate();
      await signup.invalid_phonenumber(
        '07078', 
        'Miracle99@',
        'Miracle99@'
      );
    });

    
    // TEST CASE 5: Invalid password
    await test.step('Invalid password', async () => {
      await signup.navigate();
      await signup.invalid_password(
        '0707877389', 
        'Mie', 
        'Mie'
      );
    });

  });

});
