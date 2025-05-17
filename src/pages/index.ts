// 导入首页样式
import '../style.css';

import { testLRUCache } from '../tests/lruTest';
import { testTreeTraversal } from '../tests/treeTest';
import { testLongestIncreasingSubsequence } from '../tests/lisTest';
import { testConstructors } from '../tests/constructorTest';
import { testCurry } from '../tests/curryTest';
import { sourceCodeMap } from '../sourceCodes';

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
 * 初始化侧边栏功能
 */
function initSidebar(): void {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.remove('collapsed');
    localStorage.removeItem('sidebarCollapsed');
  }
}

/**
 * 清除输出区域
 */
function clearOutput(): void {
  const output = document.getElementById('output');
  if (output) {
    output.innerHTML = '';
  }
}

/**
 * 处理导航操作
 */
function handleNavAction(id: string): void {
  console.log('处理导航操作:', id);
  
  clearOutput();
  const output = document.getElementById('output');
  if (!output) return;
  
  // 根据ID执行不同的功能
  switch(id) {
    case 'testLRUButton':
      testLRUCache(output);
      showSourceCode(output, SOURCE_CODE_KEYS.LRUCache);
      break;
    case 'testTreeButton':
      testTreeTraversal(output);
      showSourceCode(output, SOURCE_CODE_KEYS.TreeNode);
      break;
    case 'testLISButton':
      testLongestIncreasingSubsequence(output);
      showSourceCode(output, SOURCE_CODE_KEYS.LIS);
      break;
    case 'testConstructorButton':
      testConstructors(output);
      showSourceCode(output, SOURCE_CODE_KEYS.Constructor);
      break;
    case 'testCurryButton':
      testCurry(output);
      showSourceCode(output, SOURCE_CODE_KEYS.Curry);
      break;
    case 'testDomAddButton':
      const newElement = document.createElement("div");
      newElement.id = "domContent";
      newElement.innerHTML = "<h3>新添加的DOM元素示例</h3><button id='domAdd'>点击新增dom</button>";
      output.appendChild(newElement);

      const domAdd = document.getElementById("domAdd");
      if (domAdd) {
        domAdd.addEventListener("click", () => {
          const newElement = document.createElement("div");
          newElement.innerHTML = "<h3>点击新添加的DOM元素</h3>";
          output.appendChild(newElement);
        });
      }
      break;
    case 'testDomModifyButton':
      output.innerHTML = '<p>DOM修改测试功能</p>';
      output.innerHTML += '<div id="modifyContent"><h3>DOM修改测试</h3><p>这是原始内容</p></div>';
      output.innerHTML += '<button id="modifyDomBtn">修改DOM内容</button>';
      
      // 添加修改DOM的按钮事件
      setTimeout(function() {
        const modifyBtn = document.getElementById('modifyDomBtn');
        if (modifyBtn) {
          modifyBtn.addEventListener('click', function() {
            const content = document.getElementById('modifyContent');
            if (content) {
              content.innerHTML = '<h3>DOM已被修改</h3><p>这是修改后的内容</p><p>修改时间: ' + new Date().toLocaleString() + '</p>';
            }
          });
        }
      }, 100);
      break;
    default:
      output.innerHTML = `<p>未知功能：${id}</p>`;
      break;
  }
}

/**
 * 初始化首页
 */
export function initIndexPage(): void {
    console.log('开始初始化首页...');
    
    const outputDiv = document.getElementById('output');
    console.log('输出区域元素:', outputDiv);
    if (outputDiv) {
        outputDiv.innerHTML = '<p>应用已启动。点击左侧菜单选择要运行的测试。</p>';
    }
    
    // 初始化侧边栏功能
    initSidebar();
    
    // 监听自定义事件
    document.addEventListener('navAction', (event: Event) => {
        // 将事件转换为CustomEvent以访问detail属性
        const customEvent = event as CustomEvent;
        if (customEvent.detail && customEvent.detail.id) {
            handleNavAction(customEvent.detail.id);
        }
    });
} 