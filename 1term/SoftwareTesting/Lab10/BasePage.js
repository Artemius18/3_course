const webdriver = require('selenium-webdriver');
const { By, until } = require('selenium-webdriver');

class BasePage {
    constructor() {
        this.driver = new webdriver.Builder().forBrowser('chrome').build();
        this.driver.manage().setTimeouts({ implicit: 10000 });
    }

    async goToURL(theURL) {
        await this.driver.get(theURL);
    }

    async findByXPath(xpath) {
        return await this.driver.findElement(By.xpath(xpath));
    }

    async findByCss(css) {
        return await this.driver.findElement(By.css(css));
    }

    async enterTextByCss(css, searchText) {
        const element = await this.findByCss(css);
        await element.sendKeys(searchText);
    }

    async clickByXPath(xpath) {
        const element = await this.findByXPath(xpath);
        await this.driver.wait(until.elementIsVisible(element), 20000);
        await element.click();
    }

    async closeBrowser() {
        await this.driver.quit();
    }
}

module.exports = BasePage;
