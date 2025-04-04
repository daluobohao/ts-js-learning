/**
 * 柯里化函数测试文件
 */

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
 * 简单的柯里化函数实现
 * @param fn 要柯里化的函数
 * @returns 柯里化后的函数
 */
function simpleCurry<T extends (...args: any[]) => any>(fn: T): any {
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
function advancedCurry<T extends (...args: any[]) => any>(fn: T, placeholder = '_'): any {
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
function partial<T extends (...args: any[]) => any>(fn: T, ...partialArgs: any[]): any {
    return function(this: unknown, ...args: any[]): any {
        return fn(...[...partialArgs, ...args]);
    };
}

/**
 * 测试柯里化函数
 */
export function testCurry(outputElement: HTMLElement): void {
    const results = document.createElement('div');
    results.className = 'js-test-area';
    results.innerHTML = '<h3>柯里化函数测试</h3>';
    
    // 创建测试容器
    function createTestResult(title: string): HTMLElement {
        const container = document.createElement('div');
        container.className = 'js-result';
        container.innerHTML = `<h4>${title}</h4>`;
        results.appendChild(container);
        return container;
    }
    
    // 测试用例的原始函数
    const add = (a: number, b: number, c: number) => a + b + c;
    const multiply = (a: number, b: number, c: number, d: number) => a * b * c * d;
    
    // 测试1: 简单柯里化
    const test1 = createTestResult('简单柯里化');
    
    const curriedAdd = simpleCurry(add);
    
    let output = "";
    output += `原始函数 add(1, 2, 3) = ${add(1, 2, 3)}<br>`;
    output += `柯里化后 curriedAdd(1)(2)(3) = ${curriedAdd(1)(2)(3)}<br>`;
    output += `柯里化后 curriedAdd(1, 2)(3) = ${curriedAdd(1, 2)(3)}<br>`;
    output += `柯里化后 curriedAdd(1)(2, 3) = ${curriedAdd(1)(2, 3)}<br>`;
    output += `柯里化后 curriedAdd(1, 2, 3) = ${curriedAdd(1, 2, 3)}<br>`;
    
    test1.innerHTML += `
        <p>简单柯里化允许按需分步传递参数:</p>
        <pre>${output}</pre>
        <p>解释: 柯里化将接受多个参数的函数转换为一系列接受单个参数的函数</p>
    `;
    
    // 测试2: 高级柯里化（支持占位符）
    const test2 = createTestResult('高级柯里化（支持占位符）');
    
    output = "";
    output += `原始函数 multiply(1, 2, 3, 4) = ${multiply(1, 2, 3, 4)}<br>`;
    output += `占位符版本 advancedCurry(multiply)(1, '_', 3, '_')(2, 4) = ${
        advancedCurry(multiply)(1, '_', 3, '_')(2, 4)
    }<br>`;
    output += `占位符版本 advancedCurry(multiply)('_', 2)('_', 4)(1)(3) = ${
        advancedCurry(multiply)('_', 2)('_', 4)(1)(3)
    }<br>`;
    
    test2.innerHTML += `
        <p>高级柯里化支持占位符，允许更灵活的参数传递:</p>
        <pre>${output}</pre>
        <p>解释: 占位符('_')允许跳过某些参数，稍后再填写</p>
    `;
    
    // 测试3: 偏函数应用
    const test3 = createTestResult('偏函数应用');
    
    const add5 = partial(add, 5);
    const add5and10 = partial(add, 5, 10);
    
    output = "";
    output += `原始函数 add(1, 2, 3) = ${add(1, 2, 3)}<br>`;
    output += `偏函数应用 add5(2, 3) = ${add5(2, 3)}<br>`;
    output += `偏函数应用 add5and10(3) = ${add5and10(3)}<br>`;
    
    test3.innerHTML += `
        <p>偏函数应用是预先应用部分参数:</p>
        <pre>${output}</pre>
        <p>解释: 偏函数与柯里化类似，但允许一次性固定任意数量的参数</p>
    `;
    
    // 测试4: 实际应用场景
    const test4 = createTestResult('实际应用场景');
    
    // 日志函数
    const log = (level: string, message: string, user: string) => 
        `[${level.toUpperCase()}] ${user}: ${message}`;
    
    // 创建特定用户的日志函数
    const logForAdmin = partial(log, 'info', 'Admin用户');
    
    // 创建特定级别的日志函数
    const errorLog = simpleCurry(log)('error');
    
    output = "";
    output += `原始日志: log('debug', '系统启动', '系统') = ${log('debug', '系统启动', '系统')}<br>`;
    output += `管理员日志: logForAdmin('登录成功') = ${logForAdmin('登录成功')}<br>`;
    output += `错误日志: errorLog('系统')('操作失败') = ${errorLog('系统')('操作失败')}<br>`;
    
    test4.innerHTML += `
        <p>实际应用场景 - 日志记录:</p>
        <pre>${output}</pre>
        <p>解释: 柯里化和偏函数可以用来创建更具体的函数，提高代码复用性和可读性</p>
    `;
    
    outputElement.appendChild(results);
} 