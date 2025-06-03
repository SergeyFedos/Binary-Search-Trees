class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr = []) {
    this.root = this.buildTree(arr)
  }

  buildTree(arr) {
    if (!arr.length) return null;
    const sorted = Array.from(new Set(arr)).sort((a, b) => a - b);
    const build = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2)
      const node = new Node(sorted[mid])
      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);
      return node;
    }
    return build(0, sorted.length - 1);
  }


  print() {
    prettyPrint(this.root)
  }
  insert(value) {
    const node = this.root
    if (node === null) {
      this.root = new Node(value);
      return;
    }
    function searchTree(node) {
      if (value < node.data) {
        if (node.left === null) {
          node.left = new Node(value);
          return
        } else if (node.left !== null) {
          return searchTree(node.left);
        }
      } else if (value > node.data) {
        if (node.right === null) {
          node.right = new Node(value);
          return;
        } else if (node.right !== null) {
          return searchTree(node.right);
        }
      } else {
        return null;
      }
    }
    return searchTree(node);
  }
  deleteItem(value) {
    function removeNode(node, value) {
      if (node === null) return null;
      if (value === node.data) {
        if (node.left === null && node.right === null) return null;
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    }
    this.root = removeNode(this.root, value);
  }
  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) current = current.left;
      else current = current.right;
      if (current === null) return null;
    }
    return current;
  }
  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is Required');
    }

    const result = [];
    if (!this.root) return result;

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    result.forEach(data => callback(data));
    return result;
  }
  preOrder(node = this.root, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is Required');
    }

    if (!node) return;
    callback(node.data);
    this.preOrder(node.left, callback)
    this.preOrder(node.right, callback)

  }
  inOrder(node = this.root, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is Required');
    }
    if (!node) return;
    this.inOrder(node.left, callback)
    callback(node.data);
    this.inOrder(node.right, callback)

  }
  postOrder(node = this.root, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback is Required');
    }
    if (!node) return;
    this.postOrder(node.left, callback)
    this.postOrder(node.right, callback)
    callback(node.data);

  }
  height(value) {
    function computeHeight(node) {
      if (!node) return -1;
      const leftheight = computeHeight(node.left);
      const rightheight = computeHeight(node.right);
      return 1 + Math.max(leftheight, rightheight);
    }
    const finded = this.find(value);
    if (!finded) return null;
    return computeHeight(finded);

  }
  depth(value) {
    function computeDepth(value, node, currDepth) {
      if (!node) return null;
      if (node.data === value) return currDepth;

      const left = computeDepth(value, node.left, currDepth + 1);
      if (left !== null) return left;
      const right = computeDepth(value, node.right, currDepth + 1)
      if (right !== null) return right;
      return null;
    }
    return computeDepth(value, this.root, 0);
  }
  isBalanced() {
    function checkBalanced(node) {
      if (!node) return { height: -1, balanced: true };

      const left = checkBalanced(node.left);
      if (!left.balanced) return { height: 0, balanced: false };

      const right = checkBalanced(node.right);
      if (!right.balanced) return { height: 0, balanced: false };

      const height = 1 + Math.max(left.height, right.height);
      const balanced = Math.abs(left.height - right.height) <= 1;

      return { height, balanced };
    }

    return checkBalanced(this.root).balanced;
  }
  rebalance() {
    const values = [];
    this.inOrder(this.root, (data) => values.push(data));
    this.root = this.buildTree(values);
  }


}




const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
