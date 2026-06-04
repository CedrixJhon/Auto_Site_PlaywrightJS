const { hostname } = require('node:os');
const { test, expect } = require('../../fixtures/baseTest');

test.describe('Signup and Login', () => {

test.describe.configure({ mode: 'serial' });

    test('SignUp User',async({gotoURL,homePage,signupORloginPage})=>{ 
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.newUserSignUp_Process();
    await signupORloginPage.enterAccountInfo_Process();
    await signupORloginPage.enterAddressInformation();
    await signupORloginPage.clickContinueButton();
    });

    test('Test Case 2: Login User with correct email and password',async({gotoURL,homePage,signupORloginPage})=>{ 
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.verifyLoginURL();
    await signupORloginPage.proceedToLogin();
    //await homePage.verifyLoggedinAsText();
    await homePage.clickDeleteAccountButton();
    await homePage.verifyAccountDeletedText();
    await homePage.clickContinueButton_AccountDeleted();

    
    });

});