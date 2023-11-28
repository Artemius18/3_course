const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

class BasePage {
    constructor() {
        this.driver = new webdriver.Builder().forBrowser('chrome').build();
        this.driver.manage().setTimeouts({ implicit: 10000 });
    }

    async goToUrl(url) {
        return await this.driver.get(url);
    }

    async findElementByXPath(path) {
        return await this.driver.findElement(By.xpath(path));
    }

    async closeBrowser() {
        return await this.driver.quit();
    }
}

module.exports = BasePage;
