/**
 * 二叉树节点
 */
export class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  
  constructor(val: T) {
    this.val = val;
  }
}

/**
 * 二叉树实现
 */
export class BinaryTree<T> {
  root: TreeNode<T> | null = null;
  
  /**
   * 从数组创建二叉树
   * 按照层级顺序插入元素，null表示空节点
   * @param values 值数组
   */
  static fromArray<T>(values: (T | null)[]): BinaryTree<T> {
    if (!values.length) return new BinaryTree<T>();
    
    const tree = new BinaryTree<T>();
    tree.root = new TreeNode(values[0] as T);
    
    const queue: TreeNode<T>[] = [tree.root];
    let i = 1;
    
    while (i < values.length) {
      const node = queue.shift()!;
      
      // 处理左子节点
      if (i < values.length) {
        const leftVal = values[i++];
        if (leftVal !== null) {
          node.left = new TreeNode(leftVal);
          queue.push(node.left);
        }
      }
      
      // 处理右子节点
      if (i < values.length) {
        const rightVal = values[i++];
        if (rightVal !== null) {
          node.right = new TreeNode(rightVal);
          queue.push(node.right);
        }
      }
    }
    
    return tree;
  }
  
  /**
   * 前序遍历 (根-左-右)
   */
  preOrder(): T[] {
    const result: T[] = [];
    
    function traverse(node: TreeNode<T> | null): void {
      if (!node) return;
      
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    
    traverse(this.root);
    return result;
  }
  
  /**
   * 中序遍历 (左-根-右)
   */
  inOrder(): T[] {
    const result: T[] = [];
    
    function traverse(node: TreeNode<T> | null): void {
      if (!node) return;
      
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    
    traverse(this.root);
    return result;
  }
  
  /**
   * 后序遍历 (左-右-根)
   */
  postOrder(): T[] {
    const result: T[] = [];
    
    function traverse(node: TreeNode<T> | null): void {
      if (!node) return;
      
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    
    traverse(this.root);
    return result;
  }
  
  /**
   * 层序遍历
   */
  levelOrder(): T[] {
    if (!this.root) return [];
    
    const result: T[] = [];
    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }
  
  /**
   * 计算树的高度
   */
  height(): number {
    function getHeight(node: TreeNode<T> | null): number {
      if (!node) return 0;
      
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      
      return Math.max(leftHeight, rightHeight) + 1;
    }
    
    return getHeight(this.root);
  }
  
  /**
   * 获取树中的节点数量
   */
  size(): number {
    function countNodes(node: TreeNode<T> | null): number {
      if (!node) return 0;
      return countNodes(node.left) + countNodes(node.right) + 1;
    }
    
    return countNodes(this.root);
  }
} 