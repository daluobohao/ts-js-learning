/**
 * 一个简单的示例函数，对数字进行平方
 * @param num 要平方的数字
 * @returns 平方后的结果
 */
export function example(num: number): number {
    return num * num;
}

/**
 * 计算两个数字的和
 */
export function add(a: number, b: number): number {
    return a + b;
}

/**
 * 一个类的示例
 */
export class Calculator {
    private value: number = 0;
    
    constructor(initialValue: number = 0) {
        this.value = initialValue;
    }
    
    add(num: number): this {
        this.value += num;
        return this;
    }
    
    subtract(num: number): this {
        this.value -= num;
        return this;
    }
    
    multiply(num: number): this {
        this.value *= num;
        return this;
    }
    
    divide(num: number): this {
        if (num === 0) {
            throw new Error("不能除以零");
        }
        this.value /= num;
        return this;
    }
    
    getValue(): number {
        return this.value;
    }
}