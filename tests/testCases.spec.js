const { sign } = require('node:crypto');
const { test, expect } = require('../fixtures/baseTest');

test('Test Case 1: Register User',async({homePage,signupORloginPage})=>{ 
    await homePage.gotoHomeURL();
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.verifynewUserSignupText();
    await signupORloginPage.verifyLoginURL();
    await signupORloginPage.newUserSignUp_Process();
    await signupORloginPage.verifyOtherSectionTexts();
    await signupORloginPage.enterAccountInfo_Process();
   // await signupORloginPage.verifyAddressInformationSection();
    await signupORloginPage.enterAddressInformation();
    

    
    
});