const BasePage = require('./BasePage');

class LanguageChangePage extends BasePage {
    async open() {
        await this.goToURL('https://www.mts.by');
    }

    async clickLanguageButton() {
        await this.clickByXPath('/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]');
    }

    async getEnglishButtonText() {
        const englishButton = await this.findByXPath('/html/body/div[6]/header/div[2]/div/div/div[2]/div/button');
        return await englishButton.getText();
    }
}

module.exports = new LanguageChangePage();
