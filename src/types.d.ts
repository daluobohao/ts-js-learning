// 为导入的原始文本文件定义类型
declare module '*.ts?raw' {
  const content: string;
  export default content;
}

declare module '*.js?raw' {
  const content: string;
  export default content;
}

// 如果需要其他文件类型，可以继续添加
declare module '*.css?raw' {
  const content: string;
  export default content;
}

declare module '*.html?raw' {
  const content: string;
  export default content;
} 