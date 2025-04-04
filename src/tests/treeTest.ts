/**
 * 二叉树遍历测试文件
 */
import { TreeNode, BinaryTree } from '../dataStructures/BinaryTree';

/**
 * 测试二叉树遍历
 */
export function testTreeTraversal(outputElement: HTMLElement): void {
  const results = document.createElement('div');
  results.className = 'js-test-area';
  results.innerHTML = '<h3>二叉树遍历测试</h3>';
  
  // 创建测试容器
  function createTestResult(title: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'js-result';
    container.innerHTML = `<h4>${title}</h4>`;
    results.appendChild(container);
    return container;
  }
  
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
  
  const tree = new BinaryTree<number>();
  tree.root = root;
  
  // 测试1: 层序遍历
  const test1 = createTestResult('遍历测试');
  
  let output = "";
  output += `前序遍历: [${tree.preOrder().join(', ')}]<br>`;
  output += `中序遍历: [${tree.inOrder().join(', ')}]<br>`;
  output += `后序遍历: [${tree.postOrder().join(', ')}]<br>`;
  output += `层序遍历: [${tree.levelOrder().join(', ')}]<br>`;
  output += `树高度: ${tree.height()}<br>`;
  output += `节点数量: ${tree.size()}<br>`;
  
  // 创建树的可视化
  test1.innerHTML += `
    <div style="text-align: center; margin: 15px 0;">
      <code style="font-size: 16px; line-height: 1.5; display: block;">
        &nbsp;&nbsp;&nbsp;3<br>
        &nbsp;/&nbsp;\\<br>
        9&nbsp;&nbsp;20<br>
        &nbsp;&nbsp;/&nbsp;\\<br>
        &nbsp;15&nbsp;7
      </code>
    </div>
    <p>遍历结果:</p>
    <pre>${output}</pre>
  `;
  
  // 测试2: 从数组创建树
  const test2 = createTestResult('从数组创建树');
  
  const values = [3, 9, 20, null, null, 15, 7];
  const treeFromArray = BinaryTree.fromArray(values);
  
  output = "";
  output += `输入数组: [${values.map(v => v === null ? 'null' : v).join(', ')}]<br>`;
  output += `前序遍历: [${treeFromArray.preOrder().join(', ')}]<br>`;
  output += `中序遍历: [${treeFromArray.inOrder().join(', ')}]<br>`;
  output += `后序遍历: [${treeFromArray.postOrder().join(', ')}]<br>`;
  output += `层序遍历: [${treeFromArray.levelOrder().join(', ')}]<br>`;
  
  test2.innerHTML += `
    <p>从数组创建树:</p>
    <pre>${output}</pre>
  `;
  
  outputElement.appendChild(results);
} 