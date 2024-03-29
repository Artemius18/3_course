function throwError(errorMsg) {
    throw new Error(errorMsg);
}
function keepProcessing() {
    while (true) {
        console.log('Бесконечный текст!');
    }
}
