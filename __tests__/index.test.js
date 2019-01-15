'use strict';

const checkProps = require('../src');
const mocks = require('../utils/mocks');

const componentName = 'TestComponent';

describe('Calling checkProps with empty arguments', () => {
  const result = checkProps();

  test('Return object must have just one property, fn', () => {
    expect(Object.keys(result).length).toBe(1);
  });

  test('Return object must include the fn property', () => {
    expect(result).toHaveProperty('fn');
  });

  test("Checking function shouldn't return any warning if there is no new properties", () => {
    result.fn({}, this, componentName);
  });

  test('Checking function shouldn return a warning if there is new properties', () => {
    const newPropTypes = {
      number: 1,
      string: 'this is a test'
    };
    const consoleWarnReturn = `Component ${componentName} has unspecified props: ${Object.keys(newPropTypes).join(
      ', '
    )}`;

    mocks.setFunctionMock(console, 'warn');

    result.fn(newPropTypes, this, componentName);

    expect(mocks.output).toBe(consoleWarnReturn);
  });

  test('Checking function shouldn return a warning if there is new properties', () => {
    const newPropTypes = {
      number: 1,
      string: 'this is a test',
      test: 'new prop'
    };

    const validProps = {
      number: 'allow',
      obj: 'allow',
      rel: 'allow'
    };

    const ignoreProps = ['string'];
    const consoleWarnReturn = `Component ${componentName} has unspecified props: test`;

    const result = checkProps(validProps, ignoreProps);

    mocks.setFunctionMock(console, 'warn');

    result.fn(newPropTypes, this, componentName);

    expect(mocks.output).toBe(consoleWarnReturn);
  });
});
