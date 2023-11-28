const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome'); // For older versions (< v4)
// For newer versions (v4 and above), use the following import:
// const { Builder, By, Options, until } = require('selenium-webdriver');

const assert = require('chai').assert;

class MtsPage {
  constructor(driver) {
    this.driver = driver;
    this.langButtonXPath = '/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]';
    this.englishButtonXPath = '/html/body/div[6]/header/div[2]/div/div/div[2]/div/button';
  }

  async open() {
    await this.driver.get('https://www.mts.by');
  }

  async clickButton() {
    let langButton = await this.driver.findElement(By.xpath(this.langButtonXPath));
    await this.driver.wait(until.elementIsVisible(langButton), 20000);
    await this.driver.wait(until.elementIsEnabled(langButton), 20000);
    await langButton.click();
  }

  async getButtonText() {
    let englishButton = await this.driver.findElement(By.xpath(this.englishButtonXPath));
    return await englishButton.getText();
  }
}

describe('Language Change Test', function() {
  this.timeout(120000);

  it('Verify language change button', async () => {
    let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new Options().headless()) // For older versions (< v4)
      // For newer versions (v4 and above), use the following line:
      // .setChromeOptions(new Options().headless())
      .build();

    let mtsPage = new MtsPage(driver);

    try {
      await mtsPage.open();
      await mtsPage.clickButton();

      let buttonText = await mtsPage.getButtonText();
      assert.strictEqual(buttonText, 'Sign In', 'Button text is not as expected');
    } catch (error) {
      console.error(error);
      assert.fail('Test failed: error when trying to change language');
    } finally {
      await driver.quit();
    }
  });
});
