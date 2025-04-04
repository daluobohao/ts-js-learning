import { domUtils } from '../jsUtils';

/**
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
 * @param output DOM输出容器
 */
export function testCurry(output: HTMLElement): void {
    console.log('测试柯里化函数...');
    
    const curryTestDiv = document.createElement('div');
    curryTestDiv.innerHTML = '<h3>柯里化函数测试</h3>';
    output.appendChild(curryTestDiv);
    
    // 定义测试函数
    function add(a: number, b: number, c: number, d: number): number {
        return a + b + c + d;
    }
    
    // 创建柯里化版本
    const curriedAdd = curry(add);
    
    // 测试结果
    const normalResult = add(1, 2, 3, 4);
    const curriedResult1 = curriedAdd(1)(2)(3)(4);
    
    // 部分应用
    const add1 = curriedAdd(1);
    const add1And2 = add1(2);
    const add1And2And3 = add1And2(3);
    const curriedResult2 = add1And2And3(4);
    
    // 显示结果
    const results = document.createElement('div');
    results.innerHTML = `
        <div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
            <p><strong>原始函数调用:</strong> add(1, 2, 3, 4) = ${normalResult}</p>
            <p><strong>柯里化调用:</strong> curriedAdd(1)(2)(3)(4) = ${curriedResult1}</p>
            <p><strong>部分应用:</strong> add1And2And3(4) = ${curriedResult2}</p>
        </div>
    `;
    curryTestDiv.appendChild(results);
    
    // 解释说明
    const explanation = document.createElement('div');
    explanation.innerHTML = `
        <h4>柯里化函数说明</h4>
        <p>柯里化是一种将接受多个参数的函数转换为一系列接受单个参数的函数的技术。</p>
        <p>主要好处:</p>
        <ul>
            <li>参数复用: 可以固定部分参数</li>
            <li>延迟执行: 只有当所有参数都提供后，函数才执行</li>
            <li>函数组合: 更容易与其他函数组合</li>
        </ul>
        <p>柯里化在函数式编程中非常有用，特别是处理高阶函数时。</p>
    `;
    curryTestDiv.appendChild(explanation);
    
    // 添加代码实现
    const codeImpl = document.createElement('div');
    codeImpl.innerHTML = `
        <h4>TypeScript实现</h4>
        <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto;">
type CurryFunction&lt;T extends any[], R&gt; = T extends [any, ...infer U]
    ? (arg: T[0]) => U extends []
        ? R
        : CurryFunction&lt;U, R&gt;
    : R;

function curry&lt;T extends any[], R&gt;(fn: (...args: T) => R, arity = fn.length): CurryFunction&lt;T, R&gt; {
    return (function nextCurried(prevArgs: any[]) {
        return function curried(nextArg: any) {
            const args = [...prevArgs, nextArg];
            if (args.length >= arity) {
                return fn(...(args as T));
            }
            return nextCurried(args);
        };
    })([]) as CurryFunction&lt;T, R&gt;;
}
        </pre>
    `;
    curryTestDiv.appendChild(codeImpl);
    
    console.log('柯里化函数测试完成');
} 