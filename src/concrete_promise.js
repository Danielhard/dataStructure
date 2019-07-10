const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function Promise(excutor) {
    let _this = this;
    // 缓存当前promise实例对象
    _this.status = PENDING;
    // 初始状态
    _this.value = undefined;
    // fulfilled状态时 返回的信息
    _this.reason = undefined;
    // rejected状态时 拒绝的原因
    _this.onFulfilledCallbacks = [];
    // 存储fulfilled状态对应的onFulfilled函数
    _this.onRejectedCallbacks = [];
    // 存储rejected状态对应的onRejected函数

    function resolve(value) {
        // value成功态时接收的终值
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
        setTimeout(() => {
            // 调用resolve 回调对应onFulfilled函数
            if (_this.status === PENDING) {
                // 只能由pending状态 => fulfilled状态 (避免调用多次resolve reject)
                _this.status = FULFILLED;
                _this.value = value;
                _this.onFulfilledCallbacks.forEach(cb =>
                    cb(_this.value));
            }
        });
    }

    function reject(reason) {
        // reason失败态时接收的拒因
        setTimeout(() => {
            // 调用reject 回调对应onRejected函数
            if (_this.status === PENDING) {
                // 只能由pending状态 => rejected状态 (避免调用多次resolve reject)
                _this.status = REJECTED;
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach(cb =>
                    cb(_this.reason));
            }
        });
    }
    // 捕获在excutor执行器中抛出的异常
    // new Promise((resolve, reject) => {
    //     throw new Error('error in excutor')
    // })
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    const _this = this;
    let newPromise;
    // 处理参数默认值 保证参数后续能够继续执行
    onFulfilled =
        typeof onFulfilled === "function" ? onFulfilled : value => value;

    onRejected
        = typeof onRejected === "function" ? onRejected : reason => {
            throw reason;
        };
    if (_this.status === FULFILLED) {
        // 成功态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(newPromise, x, resolve, reject);
                    // 新的promise resolve 上一个onFulfilled的返回值
                } catch (e) {
                    reject(e);
                    // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                }
            });
        })
    }
    if (_this.status === REJECTED) {
        // 失败态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    if (_this.status === PENDING) {
        // 等待态
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new Promise((resolve, reject) => {
            _this.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            _this.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};