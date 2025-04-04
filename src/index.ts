import { example } from './example';
import { arrayUtils, stringUtils, domUtils } from './jsUtils';

// 页面加载后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面已加载');
    
    const outputDiv = document.getElementById('output');
    if (outputDiv) {
        outputDiv.innerHTML = '<p>应用已启动。点击按钮运行测试。</p>';
    }
    
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.addEventListener('click', () => {
            runTests();
        });
    }
    const testJsButton = document.getElementById('testJsButton');
    if (testJsButton) {
        testJsButton.addEventListener('click', () => {
            runTestsJS();
        });
    }
});

// LRU 代码
class LRUCache {
    private cache: Map<number, number>;
    private capacity: number;
    constructor(capacity: number) {
        this.cache = new Map();
        this.capacity = capacity;
    }
    get(key: number):number{
        if(this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value!);
            return value!;
        }
        return -1;
    }
    put(key: number, value: number): void {
        if(this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value!);
        }
        this.cache.set(key, value);
    }
}
// 二叉树层序遍历

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}
// 层序遍历 结合了bfs
function levelOrder(root: TreeNode | null): number[][]{
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
}

// 最长递增子序列
function lengthOfLIS(nums:number[]): number {
    if (nums.length === 0) return 0;
    const dp: number[] = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Math.max(...dp);
}
// 运行测试函数
function runTests(): void {
    console.log('运行测试...');
    // 构建一个TreeNode 为 [3, 9, 20, null, null, 15, 7]
    const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    console.log('levelOrder(root)', levelOrder(root)); // [[3],[9,20],[15,7]]
    const nums = [10, 9, 2, 5, 3, 7, 101, 18];
    console.log('lengthOfLIS(nums)', lengthOfLIS(nums)); // 4
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = '';
        
        // 示例函数
        const result = example(5);
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `<p>示例函数返回: ${result}</p>`;
        output.appendChild(resultElement);
        
        // 可以在这里添加更多测试
        testTypesAndFeatures(output);
    }
    console.log(["1","2","3","4","5"].map(parseInt)); // [1,NAN,NAN,NaN,NaN]
    console.log('uncary:');
    function unary(fn: Function) {
        return function onlyOneArg(arg: any) {
            return fn(arg);
        }
    }
    const unaryParseInt = unary(parseInt);
    console.log(["1","2","3","4","5"].map(unaryParseInt)); // [1,2,3,4,5]
    type CurryFunction<T extends any[], R> = T extends [any, ...infer U] 
        ? (arg: T[0]) => U extends [] 
            ? R 
            : CurryFunction<U, R>
        : R;

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
    function add(a: number, b: number, c: number, d: number) {
        return a + b + c + d;
    }

}
function runTestsJS(): void {
    console.log('运行测试...');
    
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = '';
        
        // 示例函数
        const result = example(5);
        const resultElement = document.createElement('div');
        resultElement.innerHTML = `<p>示例函数返回: ${result}</p>`;
        output.appendChild(resultElement);
        
        // 测试JavaScript工具函数
        testJavaScriptUtils(output);
    }

    // 构造函数
    function WidgetF(this: { getName: () => string }) {
        var appName = "天气应用";
        this.getName = function(){
        return appName;
        }
    }
    var widget6 = new WidgetF();
    console.log('widget6.appName', widget6.appName); // 返回 undefined
    console.log('widget6.getName', widget6.getName()); // 返回 “天气应用”

    interface Widget {
        appName: string;
        getName: () => string;
    }
    
    function WidgetC(this: Widget){
        this.appName = "天气应用"; 
        this.getName = function (){ return "天气应用"; };
    }
    var widget3 = new WidgetC();
    console.log('widget3.appName', widget3.appName); 
    console.log('widget3.getName()', widget3.getName()); // 返回 “天气应用”

}
// 测试各种类型和特性
function testTypesAndFeatures(output: HTMLElement): void {
    
    // 对象和接口
    interface Person {
        name: string;
        age: number;
    }
    
    const person: Person = {
        name: "张三",
        age: 30
    };
    
    const interfaces = document.createElement('div');
    interfaces.innerHTML = `
        <h3>对象和接口</h3>
        <p>Person 对象: 名字 - ${person.name}, 年龄 - ${person.age}</p>
    `;
    
    output.appendChild(interfaces);
    
    // 异步操作
    const asyncDemo = document.createElement('div');
    asyncDemo.innerHTML = '<h3>异步操作</h3><p>查看控制台输出...</p>';
    output.appendChild(asyncDemo);
    
    // Promise 示例
    new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("异步操作完成");
        }, 1000);
    }).then(message => {
        console.log(message);
        asyncDemo.innerHTML += `<p>${message}</p>`;
    });
}


// 测试JavaScript工具函数
function testJavaScriptUtils(output: HTMLElement): void {
    const jsTestContainer = document.createElement('div');
    jsTestContainer.innerHTML = '<h3>JavaScript工具函数测试</h3>';
    output.appendChild(jsTestContainer);
    
    // 创建一个测试区域
    const jsTestArea = document.createElement('div');
    jsTestArea.className = 'js-test-area';
    jsTestContainer.appendChild(jsTestArea);
    
    // 测试数组工具
    const arrayTestDiv = document.createElement('div');
    arrayTestDiv.innerHTML = '<h4>数组工具测试</h4>';
    jsTestArea.appendChild(arrayTestDiv);
    
    const testArray = [5, 2, 8, 1, 9, 5, 3];
    domUtils.showResult(arrayTestDiv, "原始数组", testArray);
    domUtils.showResult(arrayTestDiv, "最大值", arrayUtils.max(testArray));
    domUtils.showResult(arrayTestDiv, "最小值", arrayUtils.min(testArray));
    domUtils.showResult(arrayTestDiv, "总和", arrayUtils.sum(testArray));
    domUtils.showResult(arrayTestDiv, "去重后", arrayUtils.unique(testArray));
    
    // 测试字符串工具
    const stringTestDiv = document.createElement('div');
    stringTestDiv.innerHTML = '<h4>字符串工具测试</h4>';
    jsTestArea.appendChild(stringTestDiv);
    
    const testString = "javascript是一种动态类型语言";
    domUtils.showResult(stringTestDiv, "原始字符串", testString);
    domUtils.showResult(stringTestDiv, "首字母大写", stringUtils.capitalize(testString));
    domUtils.showResult(stringTestDiv, "反转字符串", stringUtils.reverse(testString));
    domUtils.showResult(stringTestDiv, "字母'a'出现次数", stringUtils.countChar(testString, 'a'));
    
    // DOM操作示例
    const domTestDiv = document.createElement('div');
    domTestDiv.innerHTML = '<h4>DOM操作测试</h4>';
    jsTestArea.appendChild(domTestDiv);
    
    const demoContainer = document.createElement('div');
    demoContainer.className = 'demo-container';
    domTestDiv.appendChild(demoContainer);
    
    // 使用DOM工具创建元素
    domUtils.appendElement(demoContainer, 'p', '这是通过JavaScript DOM工具创建的段落', 'js-created');
    const list = domUtils.appendElement(demoContainer, 'ul', '', 'js-list');
    domUtils.appendElement(list, 'li', '列表项 1');
    domUtils.appendElement(list, 'li', '列表项 2');
    domUtils.appendElement(list, 'li', '列表项 3');
} 