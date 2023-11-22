const webDriver = require('selenium-webdriver');
const assert = require('assert');

driver = new webDriver.Builder().forBrowser('chrome').build();
const By = webDriver.By;



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

//testAddItemToCart();


//Второй тест, но он пока ни к чему xd
let check_word = 'Sign In';
async function testLanguageChange() {
    await driver.get('https://www.mts.by');
    let langButton = await driver.findElement(By.xpath('/html/body/div[6]/header/div[1]/div/div/div[2]/div/div/a[2]'));
    await driver.sleep(1000);
    await langButton.click();

    let englishButton = await driver.findElement(By.xpath('/html/body/div[6]/header/div[2]/div/div/div[2]/div/button'));
    let buttonText = await englishButton.getText();
    assert.strictEqual(buttonText, check_word, `Текст кнопки "${String(buttonText)}" не соответствует "${check_word}"`);
    console.log(`Текст кнопки "${String(buttonText)}" переведен на английский и соответствует "${check_word}"`);

}

testLanguageChange();