// const webDriver = require('selenium-webdriver');
// //const assert = require('assert');

// driver = new webDriver.Builder().forBrowser('chrome').build();
// const By = webDriver.By;
// const until = webDriver.until;


// async function testAddItemToCart() {
//     await driver.get('https://www.mts.by');
//     let shopButton = await driver.findElement(By.xpath('/html/body/div[6]/header/div[2]/div/div/div[1]/div[4]/a'));
//     await driver.sleep(1000);
//     await shopButton.click();

//     let smartphonesButton = await driver.findElement(By.xpath('/html/body/header/div[6]/nav/div[3]/div'));
//     await driver.sleep(1000);
//     await smartphonesButton.click();
//     await driver.sleep(3000);

//     let categoryButton = await driver.findElement(By.xpath('/html/body/main/div[3]/div[2]/div/div/div/div[1]/div[2]/div/div[1]'));
//     await driver.sleep(1000);
//     await categoryButton.click();
//     await driver.sleep(3000);
    
//     let iphoneItem = await driver.findElement(By.xpath('//*[@id="bx_3966226736_426574"]/div[2]/div[2]/div[1]'));
//     await driver.sleep(3000);
//     await iphoneItem.click();
//     await driver.sleep(3000);


//     let addToCart = await driver.findElement(By.xpath('/html/body/main/div[3]/div[2]/div/div[1]/div/div[1]/div[2]/div/div[1]/div[2]/div[1]/div/div[4]/div[3]/div/a[2]'));
//     //
//     ///html/body/main/div[3]/div[2]/div/div[1]/div/div[1]/div[2]/div/div[1]/div[2]/div[1]/div/div[4]/div[3]/div/a[2]
//     await driver.sleep(3000);
//     await addToCart.click();

//     await driver.sleep(3000);
//     let goToCart = await driver.findElement(By.xpath('/html/body/header/div[5]/div[1]/div/div[8]/a/div[2]')); 
//     await driver.sleep(4000);
//     await goToCart.click();
//     await driver.sleep(3000);

//     try {
//         let addedItem = await driver.findElement(By.xpath('/html/body/main/div[1]/div[2]/div/form/div[1]/div/div[1]/div/div'));
//         console.log('Товар успешно добавлен в корзину');
//     } catch (error) {
//         console.error('Ошибка: Товар не найден в корзине');
//         throw error;
//     }
// }

// testAddItemToCart();


const webDriver = require('selenium-webdriver');
const { Builder } = require('selenium-webdriver');
const By = webDriver.By;
const until = webDriver.until;
const assert = require('chai').assert;

async function LanguageChangeTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.mts.by');

    let langButton = await driver.findElement(By.xpath('/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]'));
    //await driver.wait(until.elementIsVisible(langButton), 20000);
    await langButton.click();

    let englishButton = await driver.findElement(By.xpath('/html/body/div[6]/header/div[2]/div/div/div[2]/div/button'));
    let buttonText = await englishButton.getText();

    assert.strictEqual(buttonText, 'Sign In', 'Button text is not as expected');
  } catch {
    return false;
  } finally {
    //await driver.quit();
    return true;
  }
}

describe('Language Change Test', function() {
  this.timeout(120000); //для локальной демонстрации 15000

  it('Verify language change button', async () => {
    let result = await LanguageChangeTest();
    assert.isTrue(result, 'Test isnt completed: error when trying to change language');
  });
});


