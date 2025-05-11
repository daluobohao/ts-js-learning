import TreeNode from "../../dataStructures/TreeNode";
import binaryTreePreorderTraversal from "./binaryTreePreorderTraversal";
// 创建测试树: [3, 9, 20, null, null, 15, 7]
//       3
//      / \
//     9  20
//       /  \
//      15   7
const root = new TreeNode(3);
root.left = new TreeNode(9);
root.right = new TreeNode(20);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(7);

// 测试1: 中序遍历-递归方法
const result1 = binaryTreePreorderTraversal(root);
console.log('前序遍历结果:', result1, result1.join(', '));
console.log('前序遍历结果2:', result1, result1.join(', '));



