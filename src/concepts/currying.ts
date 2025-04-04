/**
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
} 