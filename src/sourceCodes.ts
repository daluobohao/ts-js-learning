/**
 * 源代码映射文件
 * 用于展示各测试项目的源代码
 */

export const sourceCodeMap: Record<string, string> = {
  // LRU缓存实现源码
  'LRUCache': `class LRUNode {
  key: number;
  value: number;
  prev: LRUNode | null = null;
  next: LRUNode | null = null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
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
}`,

  // 二叉树节点及遍历源码
  'TreeNode': `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 前序遍历：根-左-右
function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    
    // 先访问根节点
    result.push(node.val);
    // 然后遍历左子树
    traverse(node.left);
    // 最后遍历右子树
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

// 中序遍历：左-根-右
function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    
    // 先遍历左子树
    traverse(node.left);
    // 然后访问根节点
    result.push(node.val);
    // 最后遍历右子树
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}

// 后序遍历：左-右-根
function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  
  function traverse(node: TreeNode | null) {
    if (node === null) return;
    
    // 先遍历左子树
    traverse(node.left);
    // 然后遍历右子树
    traverse(node.right);
    // 最后访问根节点
    result.push(node.val);
  }
  
  traverse(root);
  return result;
}

// 层序遍历(BFS)
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}`,

  // 最长递增子序列算法源码
  'LIS': `/**
 * 求最长递增子序列的长度
 * @param nums 输入数组
 * @returns 最长递增子序列的长度
 */
function lengthOfLIS(nums: number[]): number {
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
 * 求最长递增子序列（二分查找优化）
 * 时间复杂度：O(n log n)
 * @param nums 输入数组
 * @returns 最长递增子序列长度
 */
function lengthOfLISOptimized(nums: number[]): number {
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
}`,

  // JS构造函数测试源码
  'Constructor': `// 传统构造函数方式
function Person(name, age) {
  this.name = name;
  this.age = age;
  
  // 缺点：每次实例化都会创建一个新的方法
  this.sayHello = function() {
    return \`Hello, my name is \${this.name}\`;
  };
}

// 原型方法 - 解决方法复用问题
Person.prototype.greet = function() {
  return \`Hi, I'm \${this.name} and I'm \${this.age} years old\`;
};

// ES6 类语法
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }
  
  // 类方法直接添加到原型
  makeSound() {
    return \`\${this.name} makes a sound\`;
  }
  
  // 静态方法
  static isAnimal(obj) {
    return obj instanceof Animal;
  }
}

// 继承
class Dog extends Animal {
  constructor(name, breed) {
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
 * 简单的柯里化函数实现
 * @param fn 要柯里化的函数
 * @returns 柯里化后的函数
 */
function curry(fn) {
  const arity = fn.length;
  
  return function curried(...args) {
    // 如果传入的参数数量足够，直接调用原函数
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    
    // 否则返回一个新函数，等待更多参数
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

/**
 * 高级柯里化函数，支持占位符
 * @param fn 要柯里化的函数
 * @param placeholder 占位符
 * @returns 柯里化后的函数
 */
function advancedCurry(fn, placeholder = '_') {
  const arity = fn.length;
  
  return function curried(...args) {
    // 检查是否有足够的非占位符参数
    const hasPlaceholder = args.some(arg => arg === placeholder);
    const nonPlaceholders = args.filter(arg => arg !== placeholder).length;
    
    if (!hasPlaceholder && nonPlaceholders >= arity) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      // 将新参数填充到占位符位置
      const mergedArgs = args.map(arg => 
        arg === placeholder && moreArgs.length ? moreArgs.shift() : arg
      );
      
      // 添加剩余的新参数
      return curried.apply(this, [...mergedArgs, ...moreArgs]);
    };
  };
}

/**
 * 偏函数应用 - 柯里化的近亲
 * @param fn 要部分应用的函数
 * @param ...partialArgs 部分参数
 * @returns 新函数，等待剩余参数
 */
function partial(fn, ...partialArgs) {
  return function(...args) {
    return fn.apply(this, [...partialArgs, ...args]);
  };
}`
}; 