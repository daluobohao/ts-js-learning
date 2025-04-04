/**
 * 快速排序算法实现
 */

/**
 * 快速排序 - 原地分区实现
 * @param arr 要排序的数组
 * @returns 排序后的数组（原数组被修改）
 */
export function quickSort<T>(arr: T[]): T[] {
  // 复制数组，以避免修改原数组
  const result = [...arr];
  
  // 内部递归函数
  function sort(arr: T[], low: number, high: number): void {
    if (low < high) {
      // 分区，获取分区点
      const pivotIndex = partition(arr, low, high);
      
      // 递归排序分区点左侧部分
      sort(arr, low, pivotIndex - 1);
      
      // 递归排序分区点右侧部分
      sort(arr, pivotIndex + 1, high);
    }
  }
  
  // 分区函数
  function partition(arr: T[], low: number, high: number): number {
    // 使用最后一个元素作为基准值
    const pivot = arr[high];
    
    // i 表示小于基准值的区域的边界
    let i = low - 1;
    
    // 遍历区域内的元素
    for (let j = low; j < high; j++) {
      // 如果当前元素小于基准值
      if (arr[j] < pivot) {
        // 扩展小于基准值的区域
        i++;
        // 交换元素
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // 将基准值放到正确位置
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    // 返回基准值的索引
    return i + 1;
  }
  
  // 开始排序
  sort(result, 0, result.length - 1);
  
  return result;
}

/**
 * 快速排序 - 函数式实现（创建新数组）
 * 这种实现更容易理解，但是空间复杂度较高
 * @param arr 要排序的数组
 * @returns 排序后的新数组
 */
export function quickSortFunctional<T>(arr: T[]): T[] {
  // 边界情况：空数组或只有一个元素的数组已经是排序好的
  if (arr.length <= 1) return arr;
  
  // 选择第一个元素作为基准值
  const pivot = arr[0];
  
  // 将数组分为小于、等于和大于基准值的三部分
  const less: T[] = [];
  const equal: T[] = [];
  const greater: T[] = [];
  
  // 遍历数组，将元素分类
  for (const element of arr) {
    if (element < pivot) {
      less.push(element);
    } else if (element > pivot) {
      greater.push(element);
    } else {
      equal.push(element);
    }
  }
  
  // 递归排序小于和大于部分，然后连接结果
  return [...quickSortFunctional(less), ...equal, ...quickSortFunctional(greater)];
} 