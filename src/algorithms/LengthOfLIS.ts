/**
 * 最长递增子序列 (Longest Increasing Subsequence)
 * 动态规划实现
 * @param nums 数字数组
 * @returns 最长递增子序列的长度
 */
export function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;
    
    // dp[i]表示以nums[i]结尾的最长递增子序列的长度
    const dp: number[] = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    // 返回dp数组中的最大值
    return Math.max(...dp);
} 