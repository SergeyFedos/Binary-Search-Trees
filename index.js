import { Tree } from "./BST.js";


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];


const tree = new Tree(arr);
console.log(tree.insert(255))

tree.print();
