import { testLRUCache } from './tests/lruTest';
import { testTreeTraversal } from './tests/treeTest';
import { testLongestIncreasingSubsequence } from './tests/lisTest';
import { testConstructors } from './tests/constructorTest';
import { testCurry } from './tests/curryTest';
import { sourceCodeMap } from './sourceCodes';

// 直接导入相对路径的CSS
// import '../public/css/style.css'; // 删除CSS导入

// 源码文件类型映射
const SOURCE_CODE_KEYS = {
  'LRUCache': 'LRUCache',
  'TreeNode': 'TreeNode',
  'LIS': 'LIS',
  'Constructor': 'Constructor',
  'Curry': 'Curry'
};

/**
 * 显示源代码到输出区域
 * @param output 输出容器
 * @param sourceKey 源代码键名
 */
function showSourceCode(output: HTMLElement, sourceKey: string): void {
  try {
    const code = sourceCodeMap[sourceKey];
    if (!code) {
      throw new Error(`未找到源代码: ${sourceKey}`);
    }
    
    const codeBlock = document.createElement('div');
    codeBlock.className = 'source-code';
    codeBlock.innerHTML = `
      <h3>源代码</h3>
      <pre><code>${escapeHtml(code)}</code></pre>
    `;
    
    output.appendChild(codeBlock);
  } catch (error: any) {
    console.error('显示源代码出错:', error);
    const errorBlock = document.createElement('div');
    errorBlock.innerHTML = `<p style="color: red">无法显示源代码: ${error.message}</p>`;
    output.appendChild(errorBlock);
  }
}

/**
 * HTML转义，防止XSS
 */
function escapeHtml(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * 初始化侧边栏功能 - 移除折叠逻辑
 */
function initSidebar(): void {
  const sidebar = document.getElementById('sidebar');
  
  if (sidebar) {
    // 确保侧边栏始终展开
    sidebar.classList.remove('collapsed');
    
    // 清除之前保存的折叠状态
    localStorage.removeItem('sidebarCollapsed');
  }
}

/**
 * 初始化导航列表项交互
 */
function initNavItems(): void {
  const tabItems = document.querySelectorAll('.tab-item');
  
  tabItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // 阻止默认行为
      
      // 移除所有项目的active状态
      tabItems.forEach(i => i.classList.remove('active'));
      
      // 添加当前项目的active状态
      item.classList.add('active');
      
      // 确保侧边栏可见
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('collapsed');
      }
    });
  });
}

/**
 * 页面加载后执行
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面已加载');
    
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        outputDiv.innerHTML = '<p>应用已启动。点击左侧菜单选择要运行的测试。</p>';
    }
    
    // 初始化侧边栏功能
    initSidebar();
    // 初始化导航列表项交互
    initNavItems();
    
    // 数据结构测试按钮
    const testLRUButton = document.getElementById('testLRUButton');
    if (testLRUButton) {
        testLRUButton.addEventListener('click', () => {
            clearOutput();
            const output = document.getElementById('output');
            if (output) {
                testLRUCache(output);
                showSourceCode(output, SOURCE_CODE_KEYS.LRUCache);
            }
        });
    }
    
    const testTreeButton = document.getElementById('testTreeButton');
    if (testTreeButton) {
        testTreeButton.addEventListener('click', () => {
            clearOutput();
            const output = document.getElementById('output');
            if (output) {
                testTreeTraversal(output);
                showSourceCode(output, SOURCE_CODE_KEYS.TreeNode);
            }
        });
    }
    
    // 算法测试按钮
    const testLISButton = document.getElementById('testLISButton');
    if (testLISButton) {
        testLISButton.addEventListener('click', () => {
            clearOutput();
            const output = document.getElementById('output');
            if (output) {
                testLongestIncreasingSubsequence(output);
                showSourceCode(output, SOURCE_CODE_KEYS.LIS);
            }
        });
    }
    
    // JS构造函数测试按钮
    const testConstructorButton = document.getElementById('testConstructorButton');
    if (testConstructorButton) {
        testConstructorButton.addEventListener('click', () => {
            clearOutput();
            const output = document.getElementById('output');
            if (output) {
                testConstructors(output);
                showSourceCode(output, SOURCE_CODE_KEYS.Constructor);
            }
        });
    }
    
    // 柯里化函数测试按钮
    const testCurryButton = document.getElementById('testCurryButton');
    if (testCurryButton) {
        testCurryButton.addEventListener('click', () => {
            clearOutput();
            const output = document.getElementById('output');
            if (output) {
                testCurry(output);
                showSourceCode(output, SOURCE_CODE_KEYS.Curry);
            }
        });
    }
});

/**
 * 清空输出区域
 */
function clearOutput(): void {
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = '';
    }
}