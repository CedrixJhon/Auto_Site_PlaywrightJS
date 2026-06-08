const { sign } = require('node:crypto');
const { test, expect } = require('../../fixtures/baseTest');

test('Test Case 1: Register User',async({gotoURL,homePage,signupORloginPage})=>{ 
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.verifynewUserSignupText();
    await signupORloginPage.verifyLoginURL();
    await signupORloginPage.newUserSignUp_Process();
    await signupORloginPage.verifyEnterAccountInformationHeader();
    await signupORloginPage.verifyOtherSectionTexts();
    await signupORloginPage.enterAccountInfo_Process();
    await signupORloginPage.verifyAddressInformationSection();
    await signupORloginPage.enterAddressInformation();
    await signupORloginPage.verifyAccountCreatedText();
    await signupORloginPage.clickContinueButton();
    //await homePage.verifyLoggedinAsText();  ---FOR FIX
    await homePage.clickDeleteAccountButton();
    await homePage.verifyAccountDeletedText();
    await homePage.clickContinueButton_AccountDeleted();   
    
});