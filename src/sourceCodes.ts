/**
 * 源代码映射文件
 * 用于展示各测试项目的源代码
 */

export const sourceCodeMap: Record<string, string> = {
  // LRU缓存实现源码
  'LRUCache': `/**
 * LRU缓存节点
 */
export class LRUNode {
  key: number;
  value: number;
  prev: LRUNode | null = null;
  next: LRUNode | null = null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

/**
 * LRU缓存实现
 * 使用哈希表 + 双向链表
 */
export class LRUCache {
  private capacity: number;
  private cache: Map<number, LRUNode>;
  private head: LRUNode;
  private tail: LRUNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<number, LRUNode>();
    
    // 初始化双向链表的头尾节点
    this.head = new LRUNode(0, 0);
    this.tail = new LRUNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.cache.get(key);
    if (!node) return -1;
    
    // 将访问的节点移到链表头部
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.cache.get(key);
    
    if (node) {
      // 键已存在，更新值并移到链表头部
      node.value = value;
      this.moveToHead(node);
    } else {
      // 创建新节点
      const newNode = new LRUNode(key, value);
      this.cache.set(key, newNode);
      this.addToHead(newNode);
      
      // 如果超出容量，删除链表尾部节点
      if (this.cache.size > this.capacity) {
        const tail = this.removeTail();
        this.cache.delete(tail.key);
      }
    }
  }

  private addToHead(node: LRUNode): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: LRUNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToHead(node: LRUNode): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  private removeTail(): LRUNode {
    const res = this.tail.prev!;
    this.removeNode(res);
    return res;
  }
  
  toString(): string {
    const elements: string[] = [];
    let current = this.head.next;
    
    while (current !== this.tail) {
      elements.push(\`\${current!.key}:\${current!.value}\`);
      current = current!.next;
    }
    
    return \`[\${elements.join(', ')}]\`;
  }
}`,
  
  // 二叉树节点及遍历源码
  'TreeNode': `/**
 * 二叉树节点
 */
export class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
  
  constructor(val: T) {
    this.val = val;
  }
}

/**
 * 二叉树实现
 */
export class BinaryTree<T> {
  root: TreeNode<T> | null = null;
  
  /**
   * 从数组创建二叉树
   * 按照层级顺序插入元素，null表示空节点
   * @param values 值数组
   */
  static fromArray<T>(values: (T | null)[]): BinaryTree<T> {
    if (!values.length) return new BinaryTree<T>();
    
    const tree = new BinaryTree<T>();
    tree.root = new TreeNode(values[0] as T);
    
    const queue: TreeNode<T>[] = [tree.root];
    let i = 1;
    
    while (i < values.length) {
      const node = queue.shift()!;
      
      // 处理左子节点
      if (i < values.length) {
        const leftVal = values[i++];
        if (leftVal !== null) {
          node.left = new TreeNode(leftVal);
          queue.push(node.left);
        }
      }
      
      // 处理右子节点
      if (i < values.length) {
        const rightVal = values[i++];
        if (rightVal !== null) {
          node.right = new TreeNode(rightVal);
          queue.push(node.right);
        }
      }
    }
    
    return tree;
  }
  
  /**
   * 前序遍历 (根-左-右)
   */
  preOrder(): T[] {
    const result: T[] = [];
    
    function traverse(node: TreeNode<T> | null): void {
      if (!node) return;
      
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    
    traverse(this.root);
    return result;
  }
  
  /**
   * 中序遍历 (左-根-右)
   */
  inOrder(): T[] {
    const result: T[] = [];
    
    function traverse(node: TreeNode<T> | null): void {
      if (!node) return;
      
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    
    traverse(this.root);
    return result;
  }
  
  /**
   * 后序遍历 (左-右-根)
   */
  postOrder(): T[] {
    const result: T[] = [];
    
    function traverse(node: TreeNode<T> | null): void {
      if (!node) return;
      
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    
    traverse(this.root);
    return result;
  }
  
  /**
   * 层序遍历
   */
  levelOrder(): T[] {
    if (!this.root) return [];
    
    const result: T[] = [];
    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }
  
  /**
   * 计算树的高度
   */
  height(): number {
    function getHeight(node: TreeNode<T> | null): number {
      if (!node) return 0;
      
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      
      return Math.max(leftHeight, rightHeight) + 1;
    }
    
    return getHeight(this.root);
  }
  
  /**
   * 获取树中的节点数量
   */
  size(): number {
    function countNodes(node: TreeNode<T> | null): number {
      if (!node) return 0;
      return countNodes(node.left) + countNodes(node.right) + 1;
    }
    
    return countNodes(this.root);
  }
}`,
  
  // 最长递增子序列算法源码
  'LIS': `/**
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
}`,
  
  // JS构造函数测试源码
  'Constructor': `/**
 * JavaScript构造函数示例
 */

// 传统构造函数
export function Person(this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
  
  // 方法在每个实例中创建
  this.sayHello = function() {
    return \`Hello, my name is \${this.name}\`;
  };
}

// 原型方法
Person.prototype.greet = function(this: any) {
  return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
};

// ES6 类语法
export class Animal {
  name: string;
  species: string;
  
  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }
  
  // 类方法直接添加到原型
  makeSound() {
    return \`\${this.name} makes a sound\`;
  }
  
  // 静态方法
  static isAnimal(obj: any) {
    return obj instanceof Animal;
  }
}

// 继承
export class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name, 'canine');
    this.breed = breed;
  }
  
  // 覆盖父类方法
  makeSound() {
    return \`\${this.name} barks loudly!\`;
  }
  
  // 新方法
  fetch() {
    return \`\${this.name} fetches the ball\`;
  }
}`,
  
  // 柯里化函数源码
  'Curry': `/**
 * 柯里化函数实现
 */

/**
 * 柯里化函数类型定义
 */
export type CurryFunction<T extends any[], R> = T extends [any, ...infer U]
    ? (arg: T[0]) => U extends []
        ? R
        : CurryFunction<U, R>
    : R;

/**
 * 柯里化函数实现
 * 将接受多个参数的函数转换为一系列接受单个参数的函数
 */
export function curry<T extends any[], R>(fn: (...args: T) => R, arity = fn.length): CurryFunction<T, R> {
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
 * 简单的柯里化函数实现
 * @param fn 要柯里化的函数
 * @returns 柯里化后的函数
 */
export function simpleCurry<T extends (...args: any[]) => any>(fn: T): any {
    const arity = fn.length;
    
    return function curried(this: unknown, ...args: any[]): any {
        // 如果传入的参数数量足够，直接调用原函数
        if (args.length >= arity) {
            return fn(...args);
        }
        
        // 否则返回一个新函数，等待更多参数
        return function(this: unknown, ...moreArgs: any[]): any {
            return curried(...[...args, ...moreArgs]);
        };
    };
}

/**
 * 高级柯里化函数，支持占位符
 * @param fn 要柯里化的函数
 * @param placeholder 占位符
 * @returns 柯里化后的函数
 */
export function advancedCurry<T extends (...args: any[]) => any>(fn: T, placeholder = '_'): any {
    const arity = fn.length;
    
    return function curried(this: unknown, ...args: any[]): any {
        // 检查是否有足够的非占位符参数
        const hasPlaceholder = args.some(arg => arg === placeholder);
        const nonPlaceholders = args.filter(arg => arg !== placeholder).length;
        
        if (!hasPlaceholder && nonPlaceholders >= arity) {
            return fn(...args);
        }
        
        return function(this: unknown, ...moreArgs: any[]): any {
            // 将新参数填充到占位符位置
            const mergedArgs = [...args];
            let filledArgs: any[] = [];
            
            for (let i = 0; i < mergedArgs.length; i++) {
                if (mergedArgs[i] === placeholder && moreArgs.length > 0) {
                    filledArgs.push(moreArgs.shift());
                } else {
                    filledArgs.push(mergedArgs[i]);
                }
            }
            
            // 添加剩余的新参数
            return curried(...[...filledArgs, ...moreArgs]);
        };
    };
}

/**
 * 偏函数应用 - 柯里化的近亲
 * @param fn 要部分应用的函数
 * @param partialArgs 部分参数
 * @returns 新函数，等待剩余参数
 */
export function partial<T extends (...args: any[]) => any>(fn: T, ...partialArgs: any[]): any {
    return function(this: unknown, ...args: any[]): any {
        return fn(...[...partialArgs, ...args]);
    };
}`
}; 