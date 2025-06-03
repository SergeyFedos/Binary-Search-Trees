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
