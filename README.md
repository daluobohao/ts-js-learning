# TypeScript/JavaScript 学习项目

这是一个用于学习和实践 TypeScript 和 JavaScript 概念的交互式项目。项目包含了数据结构、算法和 JavaScript 核心概念的实现和测试。

## 项目特点

- 使用 TypeScript 实现各种数据结构和算法
- 交互式界面展示运行结果
- 显示每个算法和数据结构的源代码
- 使用 Webpack 进行构建和开发

## 数据结构和算法实现

项目实现了以下数据结构和算法：

- **数据结构**
  - LRU 缓存（Least Recently Used Cache）
  - 二叉树（Binary Tree）及其遍历方法

- **算法**
  - 快速排序（Quick Sort）
  - 最长递增子序列（Longest Increasing Subsequence）

- **JavaScript 概念**
  - 构造函数和类（Constructors and Classes）
  - 函数柯里化（Function Currying）

## 安装和使用

### 前提条件

- Node.js (推荐 v14 或更高版本)
- npm 或 yarn

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn
```

### 开发模式

启动开发服务器：

```bash
npm run start
```

这将在 http://localhost:9001 启动开发服务器，并自动打开浏览器。

### 构建项目

构建生产版本：

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

## 项目结构

```
src/
├── algorithms/            # 算法实现
│   ├── quickSort.ts       # 快速排序算法
│   └── longestIncreasingSubsequence.ts  # 最长递增子序列
├── dataStructures/        # 数据结构实现
│   ├── LRUCache.ts        # LRU 缓存实现
│   └── BinaryTree.ts      # 二叉树实现
├── concepts/              # JavaScript 概念示例
│   ├── constructors.ts    # 构造函数和类
│   └── currying.ts        # 函数柯里化
├── tests/                 # 交互式测试
│   ├── lruTest.ts         # LRU 缓存测试
│   ├── treeTest.ts        # 二叉树测试
│   ├── lisTest.ts         # 最长递增子序列测试
│   ├── constructorTest.ts # 构造函数测试
│   └── curryTest.ts       # 柯里化函数测试
├── style.css              # 样式表
├── index.html             # HTML 入口
└── index.ts               # TypeScript 入口
```

## 技术栈

- TypeScript
- Webpack
- HTML/CSS

## 许可证

MIT 