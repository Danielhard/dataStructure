//树 
//二叉树
// 树拥有很多种结构，二叉树是树中最常用的结构，同时也是一个天然的递归结构。

// 二叉树拥有一个根节点，每个节点至多拥有两个子节点，分别为：左节点和右节点。树的最底部节点称之为叶节点，当一颗树的叶数量数量为满时，该树可以称之为满二叉树。


// 二分搜索树
// 二分搜索树也是二叉树，拥有二叉树的特性。但是区别在于二分搜索树每个节点的值都比他的左子树的值大，比右子树的值小。




//基本二分搜索树
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
class BST {
    constructor() {
        this.root = null
        this.size = 0
    }
    getSize() {
        return this.size
    }
    isEmpty() {
        return this.size === 0
    }
    addNode(v) {
        this.root = this._addChild(this.root, v)
    }
    // 添加节点时，需要比较添加的节点值和当前
    // 节点值的大小
    _addChild(node, v) {
        if (!node) {
            this.size++
            return new Node(v)
        }
        if (node.value > v) {
            node.left = this._addChild(node.left, v)
        } else if (node.value < v) {
            node.right = this._addChild(node.right, v)
        }
        return node
    }
    //树的遍历

    // 先序遍历可用于打印树的结构
    // 先序遍历先访问根节点，然后访问左节点，最后访问右节点。
    preTraversal() {
        this._pre(this.root)
    }
    _pre(node) {
        if (node) {
            console.log(node.value)
            this._pre(node.left)
            this._pre(node.right)
        }
    }
    // 中序遍历可用于排序
    // 对于 BST 来说，中序遍历可以实现一次遍历就
    // 得到有序的值
    // 中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
    midTraversal() {
        this._mid(this.root)
    }
    _mid(node) {
        if (node) {
            this._mid(node.left)
            console.log(node.value)
            this._mid(node.right)
        }
    }
    // 后序遍历可用于先操作子节点
    // 再操作父节点的场景
    // 后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
    backTraversal() {
        this._back(this.root)
    }
    _back(node) {
        if (node) {
            this._back(node.left)
            this._back(node.right)
            console.log(node.value)
        }
    }
    //以上为深度遍历

    //下面为广度遍历
    breadthTraversal() {
        if (!this.root) return null
        let q = new Queue()
        // 将根节点入队
        q.enQueue(this.root)
        // 循环判断队列是否为空，为空
        // 代表树遍历完毕
        while (!q.isEmpty()) {
            // 将队首出队，判断是否有左右子树
            // 有的话，就先左后右入队
            let n = q.deQueue()
            console.log(n.value)
            if (n.left) q.enQueue(n.left)
            if (n.right) q.enQueue(n.right)
        }
    }


    //在树中寻找最小值或最大数。因为二分搜索树的特性，所以最小值一定在根节点的最左边，最大值相反
    getMin() {
        return this._getMin(this.root).value
    }
    _getMin(node) {
        if (!node.left) return node
        return this._getMin(node.left)
    }
    getMax() {
        return this._getMax(this.root).value
    }
    _getMax(node) {
        if (!node.right) return node
        return this._getMin(node.right)
    }

    //   向上取整和向下取整，这两个操作是相反的，所以代码也是类似的，这里只介绍如何向下取整。
    //   既然是向下取整，那么根据二分搜索树的特性，值一定在根节点的左侧。只需要一直遍历左子树直到当前节点的值不再大于等于需要的值，然后判断节点是否还拥有右子树。
    //   如果有的话，继续上面的递归判断。

    floor(v) {
        let node = this._floor(this.root, v)
        return node ? node.value : null
    }
    _floor(node, v) {
        if (!node) return null
        if (node.value === v) return v
        // 如果当前节点值还比需要的值大，就继续递归
        if (node.value > v) {
            return this._floor(node.left, v)
        }
        // 判断当前节点是否拥有右子树
        let right = this._floor(node.right, v)
        if (right) return right
        return node
    }
}
//   排名，这是用于获取给定值的排名或者排名第几的节点的值，这两个操作也是相反的，所以这个只介绍如何获取排名第几的节点的值。
//   对于这个操作而言，我们需要略微的改造点代码，让每个节点拥有一个 size 属性。该属性表示该节点下有多少子节点（包含自身）

class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        // 修改代码
        this.size = 1
    }

    // 新增代码
    _getSize(node) {
        return node ? node.size : 0
    }
    _addChild(node, v) {
        if (!node) {
            return new Node(v)
        }
        if (node.value > v) {
            // 修改代码
            node.size++
            node.left = this._addChild(node.left, v)
        } else if (node.value < v) {
            // 修改代码
            node.size++
            node.right = this._addChild(node.right, v)
        }
        return node
    }
    select(k) {
        let node = this._select(this.root, k)
        return node ? node.value : null
    }
    _select(node, k) {
        if (!node) return null
        // 先获取左子树下有几个节点
        let size = node.left ? node.left.size : 0
        // 判断 size 是否大于 k
        // 如果大于 k，代表所需要的节点在左节点
        if (size > k) return this._select(node.left, k)
        // 如果小于 k，代表所需要的节点在右节点
        // 注意这里需要重新计算 k，减去根节点除了右子树的节点数量
        if (size < k) return this._select(node.right, k - size - 1)
        return node
    }

    // 接下来讲解的是二分搜索树中最难实现的部分：删除节点。因为对于删除节点来说，会存在以下几种情况

    // 需要删除的节点没有子树
    // 需要删除的节点只有一条子树
    // 需要删除的节点有左右两条树
    // 对于前两种情况很好解决，但是第三种情况就有难度了，所以先来实现相对简单的操作：删除最小节点，对于删除最小节点来说，
    // 是不存在第三种情况的，删除最大节点操作是和删除最小节点相反的，所以这里也就不再赘述。
    delectMin() {
        this.root = this._delectMin(this.root)
        console.log(this.root)
    }
    _delectMin(node) {
        // 一直递归左子树
        // 如果左子树为空，就判断节点是否拥有右子树
        // 有右子树的话就把需要删除的节点替换为右子树
        if ((node != null) & !node.left) return node.right
        node.left = this._delectMin(node.left)
        // 最后需要重新维护下节点的 `size`
        node.size = this._getSize(node.left) + this._getSize(node.right) + 1
        return node
    }

    // 最后讲解的就是如何删除任意节点了。
    // 当遇到这种情况时，需要取出当前节点的后继节点（也就是当前节点右子树的最小节点）来替换需要删除的节点。
    // 然后将需要删除节点的左子树赋值给后继结点，右子树删除后继结点后赋值给他。
    // 你如果对于这个解决办法有疑问的话，可以这样考虑。因为二分搜索树的特性，父节点一定比所有左子节点大，比所有右子节点小。
    // 那么当需要删除父节点时，势必需要拿出一个比父节点大的节点来替换父节点。这个节点肯定不存在于左子树，必然存在于右子树。
    // 然后又需要保持父节点都是比右子节点小的，那么就可以取出右子树中最小的那个节点来替换父节点。


    delect(v) {
        this.root = this._delect(this.root, v)
    }
    _delect(node, v) {
        if (!node) return null
        // 寻找的节点比当前节点小，去左子树找
        if (node.value < v) {
            node.right = this._delect(node.right, v)
        } else if (node.value > v) {
            // 寻找的节点比当前节点大，去右子树找
            node.left = this._delect(node.left, v)
        } else {
            // 进入这个条件说明已经找到节点
            // 先判断节点是否拥有拥有左右子树中的一个
            // 是的话，将子树返回出去，这里和 `_delectMin` 的操作一样
            if (!node.left) return node.right
            if (!node.right) return node.left
            // 进入这里，代表节点拥有左右子树
            // 先取出当前节点的后继结点，也就是取当前节点右子树的最小值
            let min = this._getMin(node.right)
            // 取出最小值后，删除最小值
            // 然后把删除节点后的子树赋值给最小值节点
            min.right = this._delectMin(node.right)
            // 左子树不动
            min.left = node.left
            node = min
        }
        // 维护 size
        node.size = this._getSize(node.left) + this._getSize(node.right) + 1
        return node
    }
}