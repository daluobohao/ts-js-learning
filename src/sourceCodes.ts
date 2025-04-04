/**
 * 存储源代码内容的文件
 * 这是一个替代方案，因为浏览器环境中直接读取文件可能受限
 */

export const sourceCodeMap: Record<string, string> = {
  // LRU缓存源码
  'LRUCache': `/**
 * LRU (Least Recently Used) 缓存实现
 * 使用Map来保持插入顺序，实现O(1)的get和put操作
 */
export class LRUCache {
    private cache: Map<number, number>;
    private capacity: number;
    
    /**
     * 初始化LRU缓存
     * @param capacity 缓存容量
     */
    constructor(capacity: number) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    
    /**
     * 获取缓存中的值
     * @param key 键
     * @returns 如果存在返回值，否则返回-1
     */
    get(key: number): number {
        if(this.cache.has(key)) {
            const value = this.cache.get(key);
            // 更新访问顺序（移动到最近使用）
            this.cache.delete(key);
            this.cache.set(key, value!);
            return value!;
        }
        return -1;
    }
    
    /**
     * 放入或更新缓存
     * @param key 键
     * @param value 值
     */
    put(key: number, value: number): void {
        if(this.cache.has(key)) {
            // 键已存在，删除旧值
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            // 缓存已满，删除最久未使用的项（Map.keys().next()返回最早插入的键）
            this.cache.delete(this.cache.keys().next().value!);
        }
        // 插入新值
        this.cache.set(key, value);
    }

    /**
     * 获取缓存当前状态的字符串表示
     */
    toString(): string {
        return JSON.stringify(Object.fromEntries(this.cache));
    }
}`,

  // 二叉树实现源码
  'TreeNode': `/**
 * 二叉树节点定义
 */
export class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    
    constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

/**
 * 二叉树层序遍历（广度优先）
 * @param root 根节点
 * @returns 按层返回的节点值数组
 */
export function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    const result: number[][] = [];
    const queue: TreeNode[] = [root];

    while(queue.length) {
        const level: number[] = [];
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}`,

  // 最长递增子序列算法源码
  'LIS': `/**
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
}`,

  // 构造函数测试源码
  'Constructor': `/**
 * 测试JavaScript构造函数特性
 * @param output DOM输出容器
 */
export function testConstructors(output: HTMLElement): void {
    console.log('测试JavaScript构造函数...');
    
    // 使用闭包的构造函数
    function WidgetF(this: { getName: () => string, appName?: string }) {
        var appName = "天气应用";
        this.getName = function() {
            return appName;
        }
    }
    
    // 使用this的构造函数
    interface Widget {
        appName: string;
        getName: () => string;
    }
    
    function WidgetC(this: Widget) {
        this.appName = "天气应用"; 
        this.getName = function() { 
            return this.appName; 
        };
    }
    
    // 实例化对象
    const widget1 = new WidgetF();
    const widget2 = new WidgetC();
    
    // ... 测试代码 ...
}`,

  // 柯里化函数源码
  'Curry': `/**
 * 柯里化函数类型定义
 */
type CurryFunction<T extends any[], R> = T extends [any, ...infer U]
    ? (arg: T[0]) => U extends []
        ? R
        : CurryFunction<U, R>
    : R;

/**
 * 柯里化函数实现
 * 将接受多个参数的函数转换为一系列接受单个参数的函数
 */
function curry<T extends any[], R>(fn: (...args: T) => R, arity = fn.length): CurryFunction<T, R> {
    return (function nextCurried(prevArgs: any[]) {
        return function curried(nextArg: any) {
            const args = [...prevArgs, nextArg];
            if (args.length >= arity) {
                return fn(...(args as T));
            }
            return nextCurried(args);
        };
    })([]) as CurryFunction<T, R>;
}

/**
 * 测试柯里化函数
 */
export function testCurry(output: HTMLElement): void {
    // 定义测试函数
    function add(a: number, b: number, c: number, d: number): number {
        return a + b + c + d;
    }
    
    // 创建柯里化版本
    const curriedAdd = curry(add);
    
    // 测试结果
    const normalResult = add(1, 2, 3, 4);
    const curriedResult = curriedAdd(1)(2)(3)(4);
    
    // ... 测试代码 ...
}`
}; 