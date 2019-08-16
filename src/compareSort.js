const serializeData = (a, b, c) => {
    const minVal = Math.min(a, b, c)
    if (minVal === a) {
      return [ b, a, c ]
    }
    if (minVal === c) {
      return [ a, c, b ]
    }
    if (minVal === b) {
      return [ a, b, c ]
    }
  }
  
  const filterArr = (arr, i = 0) => {
    if (arr.length === (i + 3)) return arr
    if (arr.length < (i + 3)) {
      const max = Math.max(arr[i], arr[i + 1])
      const min = Math.min(arr[i], arr[i + 1])
      arr[i] = max
      arr[i + 1] = min
      return arr
    }
    const tempArr = serializeData(arr[i], arr[i + 1], arr[i + 2])
    arr[i] = tempArr[0]
    arr[i + 1] = tempArr[1]
    arr[i + 2] = tempArr[2]
    return filterArr(arr, i + 2)
  }
  
  const arr = [1,2,3,4,5,6,7,8,9,23,100,2,32,4,6]
  
  console.log(filterArr(arr))