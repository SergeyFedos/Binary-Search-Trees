import { Tree } from "./BST.js";


function getRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}
const arr = getRandomArray(100);
const tree = new Tree(arr);

console.log(tree.isBalanced())
tree.levelOrder(console.log)
tree.preOrder(tree.root, console.log)
tree.inOrder(tree.root, console.log)
tree.postOrder(tree.root, console.log);
tree.insert(105);
tree.insert(109);
tree.insert(212);
console.log(tree.isBalanced())
tree.rebalance();
console.log(tree.isBalanced())
tree.levelOrder(console.log)
tree.preOrder(tree.root, console.log)
tree.inOrder(tree.root, console.log)
tree.postOrder(tree.root, console.log);
