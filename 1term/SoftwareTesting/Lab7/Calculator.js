
class Calculator {
    add(a, b) {
      this.validateNumbers(a, b);
      return a + b;
    }
  
    subtract(a, b) {
      this.validateNumbers(a, b);
      return a - b;
    }
  
    multiply(a, b) {
      this.validateNumbers(a, b);
      return a * b;
    }
  
    divide(a, b) {
      this.validateNumbers(a, b);
      this.validateNonZero(b);
      return a / b;
    }
  
    validateNumbers(a, b) {
      if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
        throw new Error('Invalid input: Both operands must be valid numbers');
      }
    }
  
    validateNonZero(b) {
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
    }
  }
  
  module.exports = Calculator;
  