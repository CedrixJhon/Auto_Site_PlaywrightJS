const { test: base, expect} = require('@playwright/test');
const {HomePage} = require('../pages/homePage');
const { SignupORLoginPage} = require('../pages/signupORlogin');

const test = base.extend({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
        gotoURL: async ({page}, use) => {
        const homePage = new HomePage(page);
        await homePage.gotoHomeURL();
        await use(homePage);
    },
    signupORloginPage: async ({page}, use) => {
        const signupORloginPage = new SignupORLoginPage(page);
        await use(signupORloginPage);
    }
});

module.exports = { test, expect };