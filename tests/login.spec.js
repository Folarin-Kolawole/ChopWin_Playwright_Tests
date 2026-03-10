import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage'
 
test('Ensure user can log in with valid datails', async ({ page }) => {
 const logintest = new LoginPage(page);
 
 await logintest.navigate();
 await logintest.valid_login('07042275924', 'tboy1@');
  await logintest.invalid_login('07042275955', 'tboy91@');
 await logintest.requiredfield_blank('tboy91@');
});
