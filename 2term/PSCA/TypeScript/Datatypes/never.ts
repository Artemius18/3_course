function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

function keepProcessing(): never {
    while(true) {
        console.log('Бесконечный текст!');
    }
}

