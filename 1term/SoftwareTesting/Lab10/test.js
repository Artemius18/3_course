const assert = require('chai').assert;
const LanguageChangePage = require('./LanguageChangePage'); // Изменение пути

describe('Language Change Test', function() {
    this.timeout(120000);

    it('Verify language change button', async () => {
        await LanguageChangePage.open();
        await LanguageChangePage.clickLanguageButton();

        const buttonText = await LanguageChangePage.getEnglishButtonText();
        assert.strictEqual(buttonText, 'Sign In', 'Button text is not as expected');
    });
});
