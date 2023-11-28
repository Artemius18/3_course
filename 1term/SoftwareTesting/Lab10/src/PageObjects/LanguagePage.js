const BasePage = require('./BasePage');

class LanguagePage extends BasePage {
    async performLanguageChange() {
        try {
            await this.goToUrl('https://www.mts.by');
            const langButton = await this.findElementByXPath('/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]');
            await langButton.click();
            const englishButton = await this.findElementByXPath('/html/body/div[6]/header/div[2]/div/div/div[2]/div/button');
            const buttonText = await englishButton.getText();
            return buttonText === 'Sign In';
        } catch (error) {
            return false;
        }
    }
}

module.exports = new LanguagePage();
