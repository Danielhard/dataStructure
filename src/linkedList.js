//；链表 
// 链表是一个线性结构，同时也是一个天然的递归结构。链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。
// 但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。
class Node {
    constructor(v, next) {
        this.value = v
        this.next = next
    }
}
class LinkList {
    constructor() {
        //链表长度
        this.size = 0
        //虚拟头部
        this.dummyNode = new Node(null, null)
    }
    find(header, index, currentIndex) {
        if (index === currentIndex) return header
        return this.find(header.next, index, currentIndex + 1)
    }
    addNode(v, index) {
        this.checkIndex(index)
        // 当往链表末尾插入式，prev.next 为空
        // 当其他情况时.要插入节点。插入的节点
        // 
        let prev = this.find(this.dummyNode, index, 0)
        prev.next = new Node(v, prev.next)
        this.size++
        return prev.next
    }
    insertNode(v, index) {
        return this.addNode(v, index)
    }
    addToFirst(v) {
        return this.addNode(v, 0)
    }
    addToLast(v) {
        return this.addNode(v, this.size)
    }
    removeNode(index, isLast) {
        this.checkIndex(index)
        index = isLast?index - 1:index
        let prev = this.find(this.dummyNode,index,0)
        let node = prev.next
        prev.next = null
        this.size -- 
        return node 
    }
    removeFirstNode() {
        return this.removeNode(0)
      }
      removeLastNode() {
        return this.removeNode(this.size, true)
      }
      checkIndex(index) {
        if (index < 0 || index > this.size) throw Error('Index error')
      }
      getNode(index) {
        this.checkIndex(index)
        if (this.isEmpty()) return
        return this.find(this.dummyNode, index, 0).next
      }
      isEmpty() {
        return this.size === 0
      }
      getSize() {
        return this.size
      }
}