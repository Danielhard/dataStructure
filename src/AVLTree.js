// 二分搜索树实际在业务中是受到限制的，因为并不是严格的 O(logN)，在极端情况下会退化成链表，比如加入一组升序的数字就会造成这种情况。

// AVL 树改进了二分搜索树，在 AVL 树中任意节点的左右子树的高度差都不大于 1，这样保证了时间复杂度是严格的 O(logN)。基于此，对 AVL 树增加或删除节点时可能需要旋转树来达到高度的平衡。
class Node {
    constructor(value) {
      this.value = value
      this.left = null
      this.right = null
      this.height = 1
    }
  }
  
  class AVL {
    constructor() {
      this.root = null
    }
    addNode(v) {
      this.root = this._addChild(this.root, v)
    }
    _addChild(node, v) {
      if (!node) {
        return new Node(v)
      }
      if (node.value > v) {
        node.left = this._addChild(node.left, v)
      } else if (node.value < v) {
        node.right = this._addChild(node.right, v)
      } else {
        node.value = v
      }
      node.height =
        1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
      let factor = this._getBalanceFactor(node)
      // 当需要右旋时，根节点的左树一定比右树高度高
      if (factor > 1 && this._getBalanceFactor(node.left) >= 0) {
        return this._rightRotate(node)
      }
      // 当需要左旋时，根节点的左树一定比右树高度矮
      if (factor < -1 && this._getBalanceFactor(node.right) <= 0) {
        return this._leftRotate(node)
      }
      // 左右情况
      // 节点的左树比右树高，且节点的左树的右树比节点的左树的左树高
      if (factor > 1 && this._getBalanceFactor(node.left) < 0) {
        node.left = this._leftRotate(node.left)
        return this._rightRotate(node)
      }
      // 右左情况
      // 节点的左树比右树矮，且节点的右树的右树比节点的右树的左树矮
      if (factor < -1 && this._getBalanceFactor(node.right) > 0) {
        node.right = this._rightRotate(node.right)
        return this._leftRotate(node)
      }
  
      return node
    }
    _getHeight(node) {
      if (!node) return 0
      return node.height
    }
    _getBalanceFactor(node) {
      return this._getHeight(node.left) - this._getHeight(node.right)
    }
    // 节点右旋
    //           5                    2
    //         /   \                /   \
    //        2     6   ==>       1      5
    //       /  \               /       /  \
    //      1    3             new     3    6
    //     /
    //    new
    _rightRotate(node) {
      // 旋转后新根节点
      let newRoot = node.left
      // 需要移动的节点
      let moveNode = newRoot.right
      // 节点 2 的右节点改为节点 5
      newRoot.right = node
      // 节点 5 左节点改为节点 3
      node.left = moveNode
      // 更新树的高度
      node.height =
        1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
      newRoot.height =
        1 +
        Math.max(this._getHeight(newRoot.left), this._getHeight(newRoot.right))
  
      return newRoot
    }
    // 节点左旋
    //           4                    6
    //         /   \                /   \
    //        2     6   ==>       4      7
    //             /  \         /   \      \
    //            5     7      2     5      new
    //                   \
    //                    new
    _leftRotate(node) {
      // 旋转后新根节点
      let newRoot = node.right
      // 需要移动的节点
      let moveNode = newRoot.left
      // 节点 6 的左节点改为节点 4
      newRoot.left = node
      // 节点 4 右节点改为节点 5
      node.right = moveNode
      // 更新树的高度
      node.height =
        1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))
      newRoot.height =
        1 +
        Math.max(this._getHeight(newRoot.left), this._getHeight(newRoot.right))
  
      return newRoot
    }
  }