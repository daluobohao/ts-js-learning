import { lengthOfLIS } from '../algorithms/LengthOfLIS';
import { domUtils } from '../jsUtils';

/**
 * 测试最长递增子序列算法
 * @param output DOM输出容器
 */
export function testLongestIncreasingSubsequence(output: HTMLElement): void {
    console.log('测试最长递增子序列...');
    
    const lisTestDiv = document.createElement('div');
    lisTestDiv.innerHTML = '<h3>最长递增子序列测试</h3>';
    output.appendChild(lisTestDiv);
    
    // 准备测试用例
    const testCases = [
        { array: [10, 9, 2, 5, 3, 7, 101, 18], expected: 4 },
        { array: [0, 1, 0, 3, 2, 3], expected: 4 },
        { array: [7, 7, 7, 7, 7, 7, 7], expected: 1 },
        { array: [], expected: 0 },
        { array: [1, 3, 6, 7, 9, 4, 10, 5, 6], expected: 6 }
    ];
    
    // 执行测试并显示结果
    for (const { array, expected } of testCases) {
        const result = lengthOfLIS(array);
        const isCorrect = result === expected;
        
        const testResult = document.createElement('div');
        testResult.style.margin = '10px 0';
        testResult.style.padding = '10px';
        testResult.style.border = '1px solid #ddd';
        testResult.style.borderRadius = '4px';
        testResult.style.backgroundColor = isCorrect ? '#dff0d8' : '#f2dede';
        
        testResult.innerHTML = `
            <div><strong>输入数组:</strong> [${array.join(', ')}]</div>
            <div><strong>预期长度:</strong> ${expected}</div>
            <div><strong>实际结果:</strong> ${result}</div>
            <div><strong>验证结果:</strong> ${isCorrect ? '✅ 正确' : '❌ 错误'}</div>
        `;
        
        lisTestDiv.appendChild(testResult);
    }
    
    // 为了更好地理解，添加一个可视化说明
    const explanation = document.createElement('div');
    explanation.innerHTML = `
        <h4>说明</h4>
        <p>对于数组 [10, 9, 2, 5, 3, 7, 101, 18]，最长递增子序列为 [2, 5, 7, 101] 或 [2, 3, 7, 101]，长度为4。</p>
        <p>动态规划算法使用一个dp数组，其中dp[i]表示以第i个元素结尾的最长递增子序列的长度。</p>
    `;
    lisTestDiv.appendChild(explanation);
    
    console.log('最长递增子序列测试完成');
} 