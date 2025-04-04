import { LRUCache } from '../dataStructures/LRUCache';
import { domUtils } from '../jsUtils';

/**
 * 测试LRU缓存功能
 * @param output DOM输出容器
 */
export function testLRUCache(output: HTMLElement): void {
    console.log('测试LRU缓存...');
    
    const lruTestDiv = document.createElement('div');
    lruTestDiv.innerHTML = '<h3>LRU缓存测试</h3>';
    output.appendChild(lruTestDiv);
    
    // 创建LRU缓存实例，容量为2
    const lruCache = new LRUCache(2);
    
    // 测试用例
    const operations = [
        { op: "put", args: [1, 1], result: "设置 key=1, value=1" },
        { op: "put", args: [2, 2], result: "设置 key=2, value=2" },
        { op: "get", args: [1], result: "获取 key=1" },
        { op: "put", args: [3, 3], result: "设置 key=3, value=3，将淘汰 key=2" },
        { op: "get", args: [2], result: "获取 key=2 (已被淘汰)" },
        { op: "put", args: [4, 4], result: "设置 key=4, value=4，将淘汰 key=1" },
        { op: "get", args: [1], result: "获取 key=1 (已被淘汰)" },
        { op: "get", args: [3], result: "获取 key=3" },
        { op: "get", args: [4], result: "获取 key=4" },
    ];
    
    const results: { operation: string, result: any, cache: string }[] = [];
    
    // 执行操作并记录结果
    for (const { op, args, result } of operations) {
        let returnValue;
        if (op === "put") {
            lruCache.put(args[0], args[1]);
            returnValue = undefined;
        } else {
            returnValue = lruCache.get(args[0]);
        }
        
        results.push({
            operation: result,
            result: returnValue,
            cache: lruCache.toString()
        });
    }
    
    // 显示结果
    const resultsTable = document.createElement('table');
    resultsTable.style.width = '100%';
    resultsTable.style.borderCollapse = 'collapse';
    resultsTable.innerHTML = `
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">操作</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">返回值</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">缓存状态</th>
            </tr>
        </thead>
        <tbody>
            ${results.map(r => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${r.operation}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${r.result === undefined ? '-' : r.result}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${r.cache}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    lruTestDiv.appendChild(resultsTable);
    
    console.log('LRU缓存测试完成');
} 