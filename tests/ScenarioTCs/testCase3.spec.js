const {test, expect} = require('../../fixtures/baseTest');

test('Test Case 3: Login User with incorrect email and password', async ({gotoURL,homePage, signupORloginPage}) => {
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.verifyLoginURL();
    await signupORloginPage.verifyLoginTOYourAccText();
    await signupORloginPage.proceedToInvalidLogin();
    await signupORloginPage.verifyIncorrectCredsDisplayed();
});