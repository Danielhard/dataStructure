// 堆通常是一个可以被看做一棵树的数组对象。

// 堆的实现通过构造二叉堆，实为二叉树的一种。这种数据结构具有以下性质。

// 任意节点小于（或大于）它的所有子节点
// 堆总是一棵完全树。即除了最底层，其他层的节点都被元素填满，且最底层从左到右填入。
// 将根节点最大的堆叫做最大堆或大根堆，根节点最小的堆叫做最小堆或小根堆。

// 优先队列也完全可以用堆来实现，操作是一模一样的。

// 实现大根堆
// 堆的每个节点的左边子节点索引是 i * 2 + 1，右边是 i * 2 + 2，父节点是 (i - 1) /2。

// 堆有两个核心的操作，分别是 shiftUp 和 shiftDown 。前者用于添加元素，后者用于删除根节点。

// shiftUp 的核心思路是一路将节点与父节点对比大小，如果比父节点大，就和父节点交换位置。

// shiftDown 的核心思路是先将根节点和末尾交换位置，然后移除末尾元素。接下来循环判断父节点和两个子节点的大小，如果子节点大，就把最大的子节点和父节点交换。
class MaxHeap {
    constructor() {
      this.heap = []
    }
    size() {
      return this.heap.length
    }
    empty() {
      return this.size() == 0
    }
    add(item) {
      this.heap.push(item)
      this._shiftUp(this.size() - 1)
    }
    removeMax() {
      this._shiftDown(0)
    }
    getParentIndex(k) {
      return parseInt((k - 1) / 2)
    }
    getLeftIndex(k) {
      return k * 2 + 1
    }
    _shiftUp(k) {
      // 如果当前节点比父节点大，就交换
      while (this.heap[k] > this.heap[this.getParentIndex(k)]) {
        this._swap(k, this.getParentIndex(k))
        // 将索引变成父节点
        k = this.getParentIndex(k)
      }
    }
    _shiftDown(k) {
      // 交换首位并删除末尾
      this._swap(k, this.size() - 1)
      this.heap.splice(this.size() - 1, 1)
      // 判断节点是否有左孩子，因为二叉堆的特性，有右必有左
      while (this.getLeftIndex(k) < this.size()) {
        let j = this.getLeftIndex(k)
        // 判断是否有右孩子，并且右孩子是否大于左孩子
        if (j + 1 < this.size() && this.heap[j + 1] > this.heap[j]) j++
        // 判断父节点是否已经比子节点都大
        if (this.heap[k] >= this.heap[j]) break
        this._swap(k, j)
        k = j
      }
    }
    _swap(left, right) {
      let rightValue = this.heap[right]
      this.heap[right] = this.heap[left]
      this.heap[left] = rightValue
    }
  }