const PENDING = 'pending'
const RESOVLED = 'resolved'
const REJECTED = 'rejected'




// 首先我们创建了三个常量用于表示状态，对于经常使用的一些值都应该通过常量来管理，便于开发及后期维护
// 在函数体内部首先创建了常量 that，因为代码可能会异步执行，用于获取正确的 this 对象
// 一开始 Promise 的状态应该是 pending
// value 变量用于保存 resolve 或者 reject 中传入的值
// resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完 Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用
function MyPromise(fn) {
    const _this = this;
    _this.state = PENDING;
    _this.value = null
    _this.resolvedCallbacks = []
    _this.rejectedCallbacks = []
    //待完善 resolve 和 reject 函数
    //待完善执行fn 函数



    // 首先两个函数都得判断当前状态是否为等待中，因为规范规定只有等待态才可以改变状态
    // 将当前状态更改为对应状态，并且将传入的值赋值给 value
    // 遍历回调数组并执行
    const resolve = function (value) {
        if (value instanceof MyPromise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (_this.state === PENDING) {
                _this.state = RESOVLED
                _this.value = value
                _this.resolvedCallbacks.map(cb => cb(_this.value))
            }
        }, 0)
    }
    const reject = function (value) {
        setTimeout(() => {
            if (_this.state === PENDING) {
                _this.state = REJECTED;
                _this.value = value
                _this.rejectedCallbacks.map(cb => cb(_this.value))
            }
        }, 0)
    }

    // 执行 Promise 中传入的函数实现很简单，执行传入的参数并且将之前两个函数当做参数传进去
    // 要注意的是，可能执行函数过程中会遇到错误，需要捕获错误并且执行 reject 函数
    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}
//实现then 函数
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const _this = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }
    if (_this.state === RENDING) {
        _this.resolvedCallbacks.push(onFulfilled)
        _this.rejectedCallbacks.push(onRejected)
    }
    if (_this.state === RESOVLED) {
        onFulfilled(_this.value)
    }
    if (_this.state === REJECTED) {
        onRejected(_this.value)
    }
}