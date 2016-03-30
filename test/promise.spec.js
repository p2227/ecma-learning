var sinon  = require('sinon');
var expect = require('chai').expect;

describe('Promise的基本用法',function(){
	it('前一个的返回值应该在后一个的then方法参数中',function(done){
		var q = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve('foo')
			},1);
		});

		q.then(function(args){
			expect(args).to.be.equal('foo');
			return 'bar';
		}).then(function(args){
			expect(args).to.be.equal('bar');
			done();
		})
	});

	it('如果返回值是Promise，参数会是resolve的值',function(done){
		var q = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve('foo')
			},1);
		});

		q.then(function(args){
			return new Promise(function(resolve,reject){
				setTimeout(function(){
					resolve('bar')
				},2);
			});
		}).then(function(args){
			expect(args).to.be.equal('bar');
			done();
		})
	})

	it('reject，将会跳过then的第一个函数的执行',function(done){
		var q = new Promise(function(resolve,reject){
			setTimeout(function(){
				reject()
			},1);
		});

		const callbackThen = sinon.spy();
        const callbackCatch = sinon.spy();
        q.then(callbackThen,callbackCatch).then(function(){
        	expect(callbackThen.called).to.not.be.ok;
        	expect(callbackCatch.calledOnce).to.be.ok;
        	done();
        });
	})

	it('抛出错误，将会跳过then的第一个函数的执行',function(done){
		var q = new Promise(function(resolve,reject){
			throw new Error();
		});

		const callbackThen = sinon.spy();
        const callbackCatch = sinon.spy();
        q.then(callbackThen,callbackCatch).then(function(){
        	expect(callbackThen.called).to.not.be.ok;
        	expect(callbackCatch.calledOnce).to.be.ok;
        	done();
        });
	});

	it('抛出错误之后仍然可以继续Promise链式操作',function(done){
		var q = new Promise(function(resolve,reject){
			throw new Error();
		});

		q.catch(function(){
			return new Promise(function(resolve){
				resolve('foo')
			});
		}).then(function(args){
			expect(args).to.be.equal('foo'); 
			done();
		})
	})

	it('reject或者抛出错误，忽略中间所有（只有一个参数）的then',function(done){
		var q = new Promise(function(resolve,reject){
			reject('foo');
		});

		const callback = sinon.spy();

		q.then(callback)
		 .then(callback)
		 .then(callback)
		 .then(callback)
		 .then(callback)
		 .then(callback)
		 .catch(function(args){
		 	callback();
			expect(callback.callCount).to.equal(1);
			expect(args).to.be.equal('foo');
			done();
		});
	})
})
