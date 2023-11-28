const assert = require('chai').assert;
const LanguagePage = require('../PageObjects/LanguagePage');

describe('Language Change Test', function () {
    this.timeout(50000);

    it('Verify language change button', async function () {
        const result = await LanguagePage.performLanguageChange();
        assert.isTrue(result, 'Test isn\'t completed: error when trying to change language');
    });

    after(async function () {
        await LanguagePage.closeBrowser();
    });
});
