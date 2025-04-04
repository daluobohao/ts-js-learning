/**
 * 源代码映射文件
 * 用于展示各测试项目的源代码
 */

// 直接导入源文件作为字符串
// Webpack 5 原生支持将文件作为字符串导入，使用 ?raw 查询参数
import LRUCacheCode from './dataStructures/LRUCache.ts?raw';
import BinaryTreeCode from './dataStructures/BinaryTree.ts?raw';
import LISCode from './algorithms/longestIncreasingSubsequence.ts?raw';
import ConstructorCode from './concepts/constructors.ts?raw';
import CurryCode from './concepts/currying.ts?raw';
import QuickSortCode from './algorithms/quickSort.ts?raw';

export const sourceCodeMap: Record<string, string> = {
  'LRUCache': LRUCacheCode,
  'TreeNode': BinaryTreeCode,
  'LIS': LISCode,
  'Constructor': ConstructorCode,
  'Curry': CurryCode,
  'QuickSort': QuickSortCode
}; 