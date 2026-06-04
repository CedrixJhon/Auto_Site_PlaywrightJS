const{test,expect}=require('../../fixtures/baseTest');

test('Test Case 5: Register User with existing email',async({gotoURL,homePage,signupORloginPage})=>{
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.verifynewUserSignupText();
    await signupORloginPage.registerExistingUser();
    await signupORloginPage.verifyExistingUserErrorPrompt();


})