const {expect} = require('@playwright/test');
class HomePage {
    constructor(page) {
        this.page = page;
        this.homePageUrl = process.env.homeURL;
    }

    async gotoHomeURL() {
        await this.page.goto(this.homePageUrl);
    }
}

module.exports = {HomePage};