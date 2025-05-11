import TreeNode from "../../dataStructures/TreeNode";

/**
 * 二叉树的中序遍历
 * @param root - 二叉树的根节点
 * @returns 中序遍历的结果数组
 */
export default function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = [];
    const stack: TreeNode[] = [];
    let currentNode: TreeNode | null = root;

    while (currentNode !== null || stack.length > 0) {
        // 遍历到最左节点
        while (currentNode !== null) {
            stack.push(currentNode);
            currentNode = currentNode.left;
        }
        // 访问节点
        currentNode = stack.pop()!;
        result.push(currentNode.value);
        // 遍历右子树
        currentNode = currentNode.right;
    }

    return result;
}

/**
 * 递归的方法
 */
export function inorderTraversalRecursive(root: TreeNode | null): number[] {
    const result: number[] = [];

    function traverse(node: TreeNode | null) {
        if (node === null) return;
        traverse(node.left);
        result.push(node.value);
        traverse(node.right);
    }

    traverse(root);
    return result;
}