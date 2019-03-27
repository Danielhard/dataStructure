Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not a function')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeErrpr('Error')
    }
    const _this = this
    const args = [...arguments].slice(1)

    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}

//new 
// 创建一个空对象
// 获取构造函数
// 设置空对象的原型
// 绑定 this 并执行构造函数
// 确保返回值为对象
function create() {
    let obj = {}
    let Con = [].shoft.call(arguments)
    obj._proto_ = Con.prototype
    let result = Con.apply(obj, arguments)
    return result instanceof Object ? result : obj
}
//instanceof 
function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left._proto_
    while (true) {
        if (left === null || left === undefined) {
            return false
        }
        if (prototype === left) {
            return true
        }
        left = left._proto_
    }
}
