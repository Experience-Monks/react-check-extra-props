'use strict';

function Mocks() {
  this.output = '';

  function storeLog(inputs) {
    this.output += inputs;
  }

  this.setFunctionMock = function(obj, fn) {
    this.output = '';
    obj[fn] = jest.fn(storeLog.bind(this));
  };
}

module.exports = new Mocks();
