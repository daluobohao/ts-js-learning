/**
 * 最长递增子序列测试文件
 */
import { lengthOfLIS, lengthOfLISOptimized, findLIS } from '../algorithms/longestIncreasingSubsequence';

/**
 * 测试最长递增子序列算法
 */
export function testLongestIncreasingSubsequence(outputElement: HTMLElement): void {
  const results = document.createElement('div');
  results.className = 'js-test-area';
  results.innerHTML = '<h3>最长递增子序列测试</h3>';
  
  // 创建测试容器
  function createTestResult(title: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'js-result';
    container.innerHTML = `<h4>${title}</h4>`;
    results.appendChild(container);
    return container;
  }
  
  // 测试用例
  const testCases = [
    {name: '用例1', array: [10, 9, 2, 5, 3, 7, 101, 18]},
    {name: '用例2', array: [0, 1, 0, 3, 2, 3]},
    {name: '用例3', array: [7, 7, 7, 7, 7, 7]},
    {name: '用例4', array: [4, 10, 4, 3, 8, 9]}
  ];
  
  // 测试1: 动态规划方法
  const test1 = createTestResult('动态规划方法 O(n²)');
  
  let output = "";
  testCases.forEach(tc => {
    const result = lengthOfLIS(tc.array);
    output += `${tc.name}: 数组 [${tc.array.join(', ')}] 的LIS长度为 ${result}<br>`;
  });
  
  test1.innerHTML += `
    <p>使用动态规划求解最长递增子序列:</p>
    <pre>${output}</pre>
    <p>解释: 对于每个位置i，我们考虑以nums[i]结尾的最长递增子序列长度</p>
  `;
  
  // 测试2: 二分查找优化方法
  const test2 = createTestResult('二分查找优化方法 O(n log n)');
  
  output = "";
  testCases.forEach(tc => {
    const result = lengthOfLISOptimized(tc.array);
    output += `${tc.name}: 数组 [${tc.array.join(', ')}] 的LIS长度为 ${result}<br>`;
  });
  
  test2.innerHTML += `
    <p>使用二分查找优化求解最长递增子序列:</p>
    <pre>${output}</pre>
    <p>解释: 使用贪心策略和二分查找，维护一个递增序列tails</p>
  `;
  
  // 测试3: 查找具体子序列
  const test3 = createTestResult('查找具体的最长递增子序列');
  
  output = "";
  testCases.forEach(tc => {
    const result = findLIS(tc.array);
    output += `${tc.name}: 数组 [${tc.array.join(', ')}] 的LIS为 [${result.join(', ')}]<br>`;
  });
  
  test3.innerHTML += `
    <p>查找最长递增子序列的具体序列:</p>
    <pre>${output}</pre>
    <p>解释: 使用动态规划和回溯构造出最长递增子序列</p>
  `;
  
  // 性能比较
  const test4 = createTestResult('性能比较');
  
  const largeArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 10000));
  
  // 测量动态规划方法的执行时间
  const dpStart = performance.now();
  const dpResult = lengthOfLIS(largeArray);
  const dpEnd = performance.now();
  
  // 测量二分查找优化方法的执行时间
  const binaryStart = performance.now();
  const binaryResult = lengthOfLISOptimized(largeArray);
  const binaryEnd = performance.now();
  
  test4.innerHTML += `
    <p>在1000个随机元素的数组上的性能比较:</p>
    <pre>
动态规划方法 (O(n²)):
  - 结果: ${dpResult}
  - 执行时间: ${(dpEnd - dpStart).toFixed(3)}ms

二分查找优化 (O(n log n)):
  - 结果: ${binaryResult}
  - 执行时间: ${(binaryEnd - binaryStart).toFixed(3)}ms
    </pre>
    <p>可以看到，在大型数组上二分查找方法的性能优势更加明显</p>
  `;
  
  outputElement.appendChild(results);
} 