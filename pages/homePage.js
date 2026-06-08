const {expect} = require('@playwright/test');
const signUpInputs = require('../dataInputs/signUpInputs');
class HomePage {
    constructor(page) {
        this.page = page;
        this.homePageUrl=process.env.homeURL;
        

        //After Acount Creation - Logged in as
        //this.loggedinAsText = page.getByText(`Logged in as ${signUpInputs.name}`);
        this.loggedinAsText = page.getByRole('link', { name: `Logged in as ${signUpInputs.name}` });
        //Delete Account Button
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
        //Verify Account Deleted Text
        this.accountDeletedText = page.getByText('Account Deleted!');
        //Continue Button after account deletion
        this.continueButton_AccountDeleted = page.getByRole('link', { name: 'Continue' });

        //logout button
        this.logoutButton = page.getByRole('link', { name: ' Logout' });


    }

    async gotoHomeURL() {
        await this.page.goto(this.homePageUrl);
    }

    async verifyLoggedinAsText() {
        await expect(this.loggedinAsText).toBeVisible();
    }
    async clickDeleteAccountButton() {
        await this.deleteAccountButton.click();
    }
    async verifyAccountDeletedText() {
        await expect(this.accountDeletedText).toBeVisible();
    }
    async clickContinueButton_AccountDeleted() {
        await this.continueButton_AccountDeleted.click();
    }
    async logout() {
        await this.logoutButton.click();
    }   
}   

module.exports = {HomePage};