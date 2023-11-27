const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.langButtonLocator = By.xpath('/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]');
  }

  async navigateTo() {
    await this.driver.get('https://www.mts.by');
  }

  async clickLanguageButton() {
    let langButton = await this.driver.findElement(this.langButtonLocator);
    //await this.driver.wait(until.elementIsVisible(langButton), 20000);
    await langButton.click();
  }
}

class LanguageChangePage {
  constructor(driver) {
    this.driver = driver;
    this.englishButtonLocator = By.xpath('/html/body/div[6]/header/div[2]/div/div/div[2]/div/button');
  }

  async getButtonText() {
    let englishButton = await this.driver.wait(until.elementLocated(this.englishButtonLocator), 20000);
    return await englishButton.getText();
  }
}

describe('Language Change Test', function () {
  this.timeout(120000);

  it('Verify language change button', async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    let homePage = new HomePage(driver);
    let languageChangePage = new LanguageChangePage(driver);

    try {
      await homePage.navigateTo();
      await homePage.clickLanguageButton();

      let buttonText = await languageChangePage.getButtonText();
      assert.strictEqual(buttonText, 'Sign In', 'Button text is not as expected');
    } catch (error) {
      assert.fail('Test failed: ' + error);
    } finally {
      //await driver.quit();
    }
  });
});
