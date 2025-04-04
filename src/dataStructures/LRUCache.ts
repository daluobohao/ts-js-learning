/**
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
} 