import { test, expect } from '@playwright/test';

test('TC02 :Login with Valid registered Credentials', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Automation Exercise');

    await page.getByRole('link', { name: 'login' }).click();
    await expect (page.getByRole('heading', {'name':'Login to your account'})).toBeVisible();

    await page.getByPlaceholder('Email Address' ).first().fill('vikram123@gmail.com');
    await page.getByPlaceholder('Password' ).first().fill('12345');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('vikram')).toBeVisible();
});

test('TC03 : Login With Invalid email and password', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Automation Exercise');

    await page.getByRole('link', { name: 'login' }).click();
    await expect (page.getByRole('heading', {'name':'Login to your account'})).toBeVisible();

    await page.getByPlaceholder('Email Address' ).first().fill('testuser@gmail.com');
    await page.getByPlaceholder('Password' ).first().fill('testpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});


test('TC04 : Login With registered email and invalid password', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Automation Exercise');

    await page.getByRole('link', { name: 'login' }).click();
    await expect (page.getByRole('heading', {'name':'Login to your account'})).toBeVisible();

    await page.getByPlaceholder('Email Address' ).first().fill('jack&james@gmail.com');
    await page.getByPlaceholder('Password' ).first().fill('12345');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});

test('TC05 :Logout After successful Login', async ({ page }) => {
    await page.goto('https://automationexercise.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Automation Exercise');
    await page.getByRole('link', { name: 'login' }).click();
    await expect (page.getByRole('heading', {'name':'Login to your account'})).toBeVisible();
    await page.getByPlaceholder('Email Address' ).first().fill('vikram123@gmail.com');
    await page.getByPlaceholder('Password' ).first().fill('12345');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('vikram')).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/login');

});
