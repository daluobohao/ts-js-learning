/**
 * 求最长递增子序列的长度 - 动态规划方法
 * 时间复杂度: O(n²)
 * 空间复杂度: O(n)
 * @param nums 输入数组
 * @returns 最长递增子序列的长度
 */
export function lengthOfLIS(nums: number[]): number {
  if (nums.length === 0) return 0;
  
  // dp[i]表示以nums[i]结尾的最长递增子序列的长度
  const dp: number[] = Array(nums.length).fill(1);
  
  // 计算每个位置的最长递增子序列长度
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  
  // 找到dp数组中的最大值
  return Math.max(...dp);
}

/**
 * 求最长递增子序列（二分查找优化方法）
 * 时间复杂度: O(n log n)
 * 空间复杂度: O(n)
 * @param nums 输入数组
 * @returns 最长递增子序列长度
 */
export function lengthOfLISOptimized(nums: number[]): number {
  if (nums.length === 0) return 0;
  
  // 用于存储当前找到的最长递增子序列
  const tails: number[] = [];
  
  for (const num of nums) {
    // 二分查找num应该插入的位置
    let left = 0;
    let right = tails.length;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    // 如果找到了合适的位置，更新tails数组
    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }
  
  // tails数组的长度就是最长递增子序列的长度
  return tails.length;
}

/**
 * 求最长递增子序列的具体序列
 * @param nums 输入数组
 * @returns 最长递增子序列
 */
export function findLIS(nums: number[]): number[] {
  if (nums.length === 0) return [];
  
  // dp[i]表示以nums[i]结尾的最长递增子序列的长度
  const dp: number[] = Array(nums.length).fill(1);
  // prev[i]表示nums[i]前面的那个元素的索引
  const prev: number[] = Array(nums.length).fill(-1);
  
  let maxLen = 1;
  let maxIndex = 0;
  
  // 计算每个位置的最长递增子序列长度
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      maxIndex = i;
    }
  }
  
  // 根据prev数组回溯构造最长递增子序列
  const result: number[] = [];
  while (maxIndex !== -1) {
    result.unshift(nums[maxIndex]);
    maxIndex = prev[maxIndex];
  }
  
  return result;
} 