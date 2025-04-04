import { TreeNode, levelOrder } from '../dataStructures/TreeNode';
import { domUtils } from '../jsUtils';

/**
 * 测试二叉树层序遍历
 * @param output DOM输出容器
 */
export function testTreeTraversal(output: HTMLElement): void {
    console.log('测试二叉树层序遍历...');
    
    const treeTestDiv = document.createElement('div');
    treeTestDiv.innerHTML = '<h3>二叉树层序遍历测试</h3>';
    output.appendChild(treeTestDiv);
    
    // 创建测试树: [3, 9, 20, null, null, 15, 7]
    //       3
    //      / \
    //     9  20
    //       /  \
    //      15   7
    const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    
    // 执行层序遍历
    const result = levelOrder(root);
    
    // 创建树的可视化
    const treeVisual = document.createElement('div');
    treeVisual.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <code style="font-size: 20px;">
                &nbsp;&nbsp;&nbsp;3<br>
                &nbsp;/&nbsp;\<br>
                9&nbsp;&nbsp;20<br>
                &nbsp;&nbsp;/&nbsp;\<br>
                &nbsp;15&nbsp;7
            </code>
        </div>
    `;
    treeTestDiv.appendChild(treeVisual);
    
    // 显示结果
    domUtils.showResult(treeTestDiv, "层序遍历结果", result);
    
    // 查看每一层
    for (let i = 0; i < result.length; i++) {
        domUtils.showResult(treeTestDiv, `第 ${i+1} 层`, result[i]);
    }
    
    console.log('二叉树层序遍历测试完成');
} 