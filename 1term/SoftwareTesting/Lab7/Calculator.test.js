const Calculator = require("./Calculator");

describe('Calculator', () => {
    let calculator;
  
    beforeEach(() => {
      calculator = new Calculator();
    });
  
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

    test('returns -Infinity when subtracting Infinity', () => {
        expect(calculator.subtract(10, Infinity)).toBe(-Infinity);
    });

    test('throws an error when adding non-numeric values', () => {
      expect(() => calculator.add('a', 'b')).toThrow('Invalid input');
    });
  
    test('throws an error when adding one non-numeric value', () => {
      expect(() => calculator.add('a', 2)).toThrow('Invalid input');
    });
  
    test('throws an error when substracting non-numeric value', () => {
        expect(() => calculator.subtract(10, 'ooops')).toThrow('Invalid input');
    });

    test('throws an error when dividing by NaN', () => {
      expect(() => calculator.divide(8, NaN)).toThrow('Invalid input');
    });
  
  });
  