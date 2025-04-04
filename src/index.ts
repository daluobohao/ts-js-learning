import { example } from './example';
import { testLRUCache } from './tests/lruTest';
import { testTreeTraversal } from './tests/treeTest';
import { testLongestIncreasingSubsequence } from './tests/lisTest';
import { testConstructors } from './tests/constructorTest';
import { testCurry } from './tests/curryTest';

/**
 * 页面加载后执行
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面已加载');
    
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        outputDiv.innerHTML = '<p>应用已启动。点击按钮运行测试。</p>';
    }
    
    // 数据结构测试按钮
    const testLRUButton = document.getElementById('testLRUButton');
    if (testLRUButton) {
        testLRUButton.addEventListener('click', () => {
            clearOutput();
            const output = document.getElementById('output');
            if (output) {
                testLRUCache(output);
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