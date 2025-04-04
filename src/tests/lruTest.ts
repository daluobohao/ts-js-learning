/**
 * LRU缓存测试文件
 */

class LRUNode {
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
}

/**
 * 测试LRU缓存
 */
export function testLRUCache(outputElement: HTMLElement): void {
  const results = document.createElement('div');
  results.className = 'js-test-area';
  results.innerHTML = '<h3>LRU缓存测试</h3>';
  
  // 创建测试容器
  function createTestResult(title: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'js-result';
    container.innerHTML = `<h4>${title}</h4>`;
    results.appendChild(container);
    return container;
  }
  
  // 测试1: 基本操作
  const test1 = createTestResult('测试1: 基本操作');
  const cache1 = new LRUCache(2);
  
  let operations = [
    "put(1, 1)", 
    "put(2, 2)", 
    "get(1)", 
    "put(3, 3)", 
    "get(2)", 
    "put(4, 4)", 
    "get(1)", 
    "get(3)", 
    "get(4)"
  ];
  
  let output = "";
  cache1.put(1, 1);
  cache1.put(2, 2);
  output += `cache.get(1) = ${cache1.get(1)}<br>`;
  cache1.put(3, 3); // 驱逐key 2
  output += `cache.get(2) = ${cache1.get(2)}<br>`;
  cache1.put(4, 4); // 驱逐key 1
  output += `cache.get(1) = ${cache1.get(1)}<br>`;
  output += `cache.get(3) = ${cache1.get(3)}<br>`;
  output += `cache.get(4) = ${cache1.get(4)}<br>`;
  
  test1.innerHTML += `
    <p>操作序列: ${operations.join(', ')}</p>
    <p>输出结果:</p>
    <pre>${output}</pre>
    <p>解释: 容量为2的LRU缓存，当放入第3个项目时会驱逐最久未使用的项目</p>
  `;
  
  // 测试2: 重复键
  const test2 = createTestResult('测试2: 重复键更新');
  const cache2 = new LRUCache(2);
  operations = [
    "put(1, 1)",
    "put(2, 2)",
    "get(1)",
    "put(1, 3)",
    "get(1)",
    "get(2)"
  ];
  
  output = "";
  cache2.put(1, 1);
  cache2.put(2, 2);
  output += `cache.get(1) = ${cache2.get(1)}<br>`;
  cache2.put(1, 3); // 更新key 1
  output += `cache.get(1) = ${cache2.get(1)}<br>`;
  output += `cache.get(2) = ${cache2.get(2)}<br>`;
  
  test2.innerHTML += `
    <p>操作序列: ${operations.join(', ')}</p>
    <p>输出结果:</p>
    <pre>${output}</pre>
    <p>解释: 对已存在的键进行put操作会更新值并将其标记为最近使用</p>
  `;
  
  outputElement.appendChild(results);
} 