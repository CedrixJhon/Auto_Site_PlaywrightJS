const{test,expect}=require('../../fixtures/baseTest');

test('Test Case 4: Logout User', async ({gotoURL,homePage,signupORloginPage})=>{
    await expect(homePage.page).toHaveURL(homePage.homePageUrl);
    await signupORloginPage.clickSignupOrLoginButton();
    await signupORloginPage.verifyLoginTOYourAccText();
    await signupORloginPage.proceedtoLoginAcc();
    await homePage.logout();
    await signupORloginPage.verifyLoginURL();
    
});