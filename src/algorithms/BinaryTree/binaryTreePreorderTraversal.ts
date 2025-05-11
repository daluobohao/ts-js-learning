import TreeNode from "../../dataStructures/TreeNode";

/**
 * 二叉树前序遍历
 * 
 * 
 * 
 */
export default function binaryTreePreorderTraversal(root: TreeNode | null) : number[] {
    const result: number[] = [];

    function traverse(node: TreeNode | null) {
        if (node === null) return;
        result.push(node.value);
        traverse(node.left);
        traverse(node.right);
    }

    traverse(root);
    return result;
}