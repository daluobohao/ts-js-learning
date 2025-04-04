/**
 * 二叉树遍历测试文件
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 层序遍历(BFS)
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}

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
  const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
  
  // 测试1: 层序遍历
  const test1 = createTestResult('层序遍历结果');
  const levels = levelOrder(root);
  
  let output = "";
  for (let i = 0; i < levels.length; i++) {
    output += `第 ${i+1} 层: [${levels[i].join(', ')}]<br>`;
  }
  
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
    <p>层序遍历结果:</p>
    <pre>${output}</pre>
    <p>完整结果: ${JSON.stringify(levels)}</p>
  `;
  
  outputElement.appendChild(results);
} 