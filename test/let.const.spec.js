var sinon = require('sinon');
var expect = require('chai').expect;

var noop = function() {};

describe('var的基本用法', function() {
  it('var有变量提升', function() {
    const callback = sinon.spy();
    try {
      noop(a);
    } catch (e) {
      callback();
    }
    var a = 1;
    expect(a).to.equal(1);
    expect(callback.called).to.not.be.ok;
  });
})

describe('let的基本用法', function() {
  'use strict';
  it('let定义的是块状作用域', function() {
    let a = 1; {
      let a = 2;
      expect(a).to.equal(2);
    }
    expect(a).to.equal(1);
  });

  it('let没有变量提升', function() {
    try {
      noop(a);
    } catch (e) {
      expect(e).to.be.an('error');
    }
    let a = 1;
    expect(a).to.equal(1);
  });

  it('let 定义的变量可以改变', function() {
    let a = 1;
    a = 2;
    expect(a).to.equal(2);
  });
})

describe('const的基本用法', function() {
  'use strict';
  it('const定义的是块状作用域', function() {
    const a = 1; {
      const a = 2;
      expect(a).to.equal(2);
    }
    expect(a).to.equal(1);
  });

  it('const没有变量提升', function() {
    try {
      noop(a);
    } catch (e) {
      expect(e).to.be.an('error');
    }
    const a = 1;
    expect(a).to.equal(1);
  });

  it('const 定义的变量不可改变，尝试改变会抛错', function() {
    const a = 1;
    try {
      a = 2;
    } catch (e) {
      expect(e).to.be.an('error');
    }

    expect(a).to.equal(1);
  });
})
