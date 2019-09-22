(function () {
    var selfMap = function (fn, context) {
        var arr = ([]).slice.call(this);
        var arrMap = [];
        for (var i = 0; i < arr.length; i++) {
            if (!arr.hasOwnProperty(i)) {
                continue;
            }
            arrMap.push(fn.call(context, arr[i], i, this))
        }
        return arrMap;
    }
    var selfReduce = function (fn, initialValue) {
        var arr = ([]).slice.call(this);
        if (arguments.length === 2) {
            arr.unshift(initialValue);
        }
        var result = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if(!arr.hasOwnProperty(i)){
                continue;
            }
            result = fn.call(null,result,arr[i],i,this);
        }
        return result
    }
    Object.prototype.selfMap = selfMap;
    Object.prototype.selfReduce = selfReduce;
})()