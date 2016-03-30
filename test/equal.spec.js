var sinon = require('sinon');
var expect = require('chai').expect;

describe('==的基本用法', function() {
  it('一样的基本类型会相等', function() {
    expect(1 == 1).to.be.ok;
    expect('a' == 'a').to.be.ok;
    expect(false == false).to.be.ok;
    expect(null == null).to.be.ok;
    expect(undefined == undefined).to.be.ok;
    var s = Symbol();
    expect(s == s).to.be.ok;
  });

  it('undefined 与 null非严格相等', function() {
    expect(undefined == null).to.be.ok;
  });

  it('字符串与数字比较，会先尝试将字符串转化为数字', function() {
    expect('1' == 1).to.be.ok;
    expect('' == 0).to.be.ok;
    expect('a' == 1).to.not.be.ok;
  });

  it('布尔与其他比较，会先尝试将布尔转化为数字', function() {
    expect(true == 1).to.be.ok;
    expect(true == '1').to.be.ok;
    expect(false == 0).to.be.ok;
    expect(false == '0').to.be.ok;
    expect(false == '').to.be.ok;
  });

  it('对象与基本类型进行比较，会先调用对象的valueOf方法，然后是toString方法', function() {
    expect({ valueOf: () => 1 } == 1).to.be.ok;
    expect({ valueOf: () => '1' } == 1).to.be.ok;

    const callbackValue = sinon.spy();
    const callbackString = sinon.spy();
    const result = {
      valueOf: () => {
        callbackValue();
        return {};
      },
      toString: () => {
        callbackString();
        return 2;
      }
    } == 2;

    expect(result).to.be.ok;
    expect(callbackValue.called).to.be.ok;
    expect(callbackString.called).to.be.ok;
    expect(callbackString.calledAfter(callbackValue)).to.be.ok;

  });

  it('Date类型，会优化先调用对象的toString方法，然后是valueOf方法', function() {
    var d = new Date();
    var dVal = d.valueOf();
    var dStr = d.toString();

    expect(d == dVal).to.not.be.ok;
    expect(d == dStr).to.be.ok;
  });

  it('NaN与所有值都不相等，包括自身', function() {
    expect(NaN == undefined).to.not.be.ok;
    expect(NaN == null).to.not.be.ok;
    expect(NaN == false).to.not.be.ok;
    expect(NaN == '').to.not.be.ok;
    expect(NaN == 0).to.not.be.ok;
    expect(NaN == {}).to.not.be.ok;
    expect(NaN == Symbol()).to.not.be.ok;
    expect(NaN == NaN).to.not.be.ok;
  });


})
