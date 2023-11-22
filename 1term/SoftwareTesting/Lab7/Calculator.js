
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

  sin(angle) {
    return Math.sin(angle);
  }

  cos(angle) {
    return Math.cos(angle);
  }

  tan(angle) {
    return Math.tan(angle);
  }

  ctg(angle) {
    this.validateNonZero(this.sin(angle));
    return this.cos(angle)/this.sin(angle);   
  }

  log(base, number) {
    if (base <= 1) {
      throw new Error('Invalid input: Logarithm base must be greater than 1');
    }

    if (number <= 0) {
      throw new Error('Invalid input: Logarithm argument must be a positive number');
    }

    return Math.log(number) / Math.log(base);
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
