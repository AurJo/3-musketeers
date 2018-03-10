'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning then default ifself', () => {
  expect(convert(2, 'BTC', 'BTC')).toEqual(2);
});

test('should return a number', () => {
  expect(typeof convert(2, 'BTC', 'BTC', 'Number')).toEqual('number');
});

test('should return a Big number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Big')).toBeInstanceOf(Big)  ;
});

test('should return a string', () => {
  expect( typeof convert(2100, 'mBTC', 'BTC', 'String')).toEqual('string');
});

test('should convert a number from interger', () => {
  var input = 123456789012345
  expect((input) => { return input % 1 === 0}).toBeTruthy();   // === 0 alors int
  var result = convert(input, 'Satoshi', 'BTC', 'Number');
  expect(typeof result).toEqual('number')
});

test('should convert a number from float', () => {
  var input = 123456789012345
  expect((input) => { return input % 1 !== 0}).toBeTruthy();  // !== 0 alors float
  var result = convert(input, 'Satoshi', 'BTC', 'Number');
  expect(typeof result).toEqual('number')

});

test('should convert a string', () => {
  var input = '2'
  expect(typeof input).toEqual('string')
  expect(() => {convert(input, 'BTC', 'BTC', 'Number')}).not.toThrow();

});

test('should convert a Big number', () => {
  var input = new Big(2)
  expect(input).toBeInstanceOf(Big); 
  expect( () => {convert(input, 'BTC', 'BTC', 'Number')}).not.toThrow();
  
});

test('should convert a NaN to a number', () => {
  var input = NaN; 
  expect(typeof convert(input, 'BTC', 'BTC', 'Number')).toEqual('number');
  expect(typeof convert(input, 'BTC', 'mBTC', 'Number')).toEqual('number'); 
  
});

test('should convert a NaN to a string', () => {
  var input = NaN; 
  expect(typeof convert(input, 'BTC', 'BTC', 'String')).toEqual('string');
  expect(typeof convert(input, 'BTC', 'mBTC', 'String')).toEqual('string');
  
});

test('should not convert a NaN to a Big', () => {
  var input = NaN; 
  expect(() => {convert(input, 'BTC', 'BTC', 'Big')}).toThrow();
  expect(() => { convert(input, 'BTC', 'mBTC', 'Big')}).toThrow();
});

test('should handle rounding errors', () => {
  var input1 = 4.6; 
  var input2 = 0.000000046  
  var result1 = convert(input1, 'Satoshi', 'BTC', 'Number');
  var result2 = convert(input2, 'BTC', 'Satoshi', 'Number');
  expect(result1).toEqual(input2); 
  expect(result2).toEqual(input1); 
  
});

test('should throw when untest is undefined', () => {
  expect(() => {convert(new Big(2), 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(new Big(2), 'BTC', 'x', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'x', 'BTC', 'Number')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'x', 'Number')}).toThrow();
});

test('should throw when representaion is undefined', () => {
  expect(() => {convert(2, 'BTC', 'mBTC', 'x')}).toThrow();
  expect(() => {convert(NaN, 'BTC', 'mBTC', 'x')}).toThrow();
  
});

test('should allow untest aliases', () => {
  expect(() => {convert(4.6, 'Satoshi', 'sat')}).not.toThrow();
  expect(() => {convert(4.6, 'μBTC', 'bit')}).not.toThrow();

});

test('should return an array of units', () => {
  var unitArray = ['BTC','mBTC','μBTC','bit','Satoshi','sat']
  expect(convert.units()).toEqual(unitArray); 
})

test('Adds a new unit for conversion in the array', () => {
  var newUnit = 'finney'; 
  var newFactor =  new Big(0.0000001); 
  convert.addUnit(newUnit, newFactor); 
  var newArray = ['BTC','mBTC','μBTC','bit','Satoshi','sat','finney']; 
  expect(convert.units()).toEqual(newArray); 
})

test('Should throws when unit already exists and the factors are different', () => {
  var newUnit = 'BTC'; 
  var newFactor =  new Big(3); 
  expect( () => {convert.addUnit(newUnit, newFactor)}).toThrow();
})

test('Should removes the unit from conversion', () => {
  var newUnit = 'finney'; 
  var newFactor =  new Big(0.0000001); 
  convert.addUnit(newUnit, newFactor); 
  var newArray = ['BTC','mBTC','μBTC','bit','Satoshi','sat','finney']; 
  expect(convert.units()).toEqual(newArray); 
  convert.removeUnit(newUnit); 
  var unitArray = ['BTC','mBTC','μBTC','bit','Satoshi','sat']; 
  expect(convert.units()).toEqual(unitArray);
})

test('Should throws when unit is pre-defined', () => {
  var unitRemove = 'mBTC'; 
  expect (() => {convert.removeUnit(unitRemove)}).toThrow(); 
})