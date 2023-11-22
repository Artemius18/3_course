// Calculator.test.js

const Calculator = require('./Calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  // Тесты для базовых арифметических операций
  test('adds 1 + 2 to equal 3', () => {
    expect(calculator.add(1, 2)).toBe(3);
  });

  test('subtracts 2 from 5 to equal 3', () => {
    expect(calculator.subtract(5, 2)).toBe(3);
  });

  test('multiplies 4 by 3 to equal 12', () => {
    expect(calculator.multiply(4, 3)).toBe(12);
  });

  test('divides 8 by 2 to equal 4', () => {
    expect(calculator.divide(8, 2)).toBe(4);
  });

  test('returns 0 when dividing by Infinity', () => {
    expect(calculator.divide(10, Infinity)).toBe(0);
  });

  test('throws an error when dividing by zero', () => {
    expect(() => calculator.divide(8, 0)).toThrow('Cannot divide by zero');
  });

  test('throws an error when adding non-numeric values', () => {
    expect(() => calculator.add('a', 'b')).toThrow('Invalid input');
  });

  test('throws an error when dividing by NaN', () => {
    expect(() => calculator.divide(8, NaN)).toThrow('Invalid input');
  });

  test('returns -Infinity when subtracting Infinity', () => {
    expect(calculator.subtract(10, Infinity)).toBe(-Infinity);
  });

  test('throws an error when substracting non-numeric value', () => {
    expect(() => calculator.subtract(10, 'ooops')).toThrow('Invalid input');
  });

  

  // Тесты для тригонометрических функций
  test('calculates sin', () => {
    expect(calculator.sin(Math.PI / 2)).toBe(1);
  });

  test('calculates cos', () => {
    expect(calculator.cos(Math.PI)).toBe(-1);
  });

  test('calculates tan', () => {
    expect(calculator.tan(0)).toBe(0);
  });

  test('calculates ctg', () => {
    expect(calculator.ctg(Math.PI/4)).toBe(1.0000000000000002);
  });


  // Тесты для логарифмов
  test('calculates log', () => {
    expect(calculator.log(10, 100)).toBe(2);
  });

  test('throws an error when calculating log with base 1', () => {
    expect(() => calculator.log(1, 100)).toThrow('Invalid input: Logarithm base must be greater than 1');
  });

  test('throws an error when calculating log with non-positive number', () => {
    expect(() => calculator.log(10, 0)).toThrow('Invalid input: Logarithm argument must be a positive number');
  });


  
});


