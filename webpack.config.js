const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// 自动扫描 src 目录下的 HTML 文件
function getHtmlFiles() {
  const srcDir = path.resolve(__dirname, 'src');
  const files = fs.readdirSync(srcDir);
  return files
    .filter(file => file.endsWith('.html'))
    .map(file => ({
      name: path.basename(file, '.html'),
      path: path.join(srcDir, file)
    }));
}

// 生成入口配置
const htmlFiles = getHtmlFiles();
const entries = {};
const htmlPlugins = [];

// 首先添加主入口文件
entries.main = './src/main.ts';

// 为每个页面配置对应的入口文件
htmlFiles.forEach(({ name, path: filePath }) => {
  // 尝试查找对应的 TypeScript 入口文件
  const specificEntry = `./src/pages/${name}.ts`;
  
  // 检查特定入口文件是否存在
  const hasSpecificEntry = fs.existsSync(path.resolve(__dirname, specificEntry));
  
  console.log(`页面: ${name} - 入口文件存在: ${hasSpecificEntry} - 路径: ${specificEntry}`);
  
  // 添加特定页面的入口文件（如果存在）
  if (hasSpecificEntry) {
    entries[name] = specificEntry;
  }
  
  // 创建对应的 HTML 插件
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: filePath,
      filename: `${name}.html`,
      // 为index.html添加main入口，其他页面使用各自的入口
      chunks: name === 'index' ? ['main'] : (hasSpecificEntry ? [name] : []),
      inject: name === 'index' || hasSpecificEntry, // 如果是index或有特定入口文件，则注入JS
      minify: false, // 不压缩 HTML，便于调试
      hash: true // 添加 hash 以防止缓存问题
    })
  );
});

console.log('入口配置:', entries);
console.log('HTML 插件数量:', htmlPlugins.length);

module.exports = {
  mode: 'development',
  entry: entries,
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'styleTag' }
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
              importLoaders: 1
            }
          }
        ],
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      }
    ],
  },
  plugins: htmlPlugins,
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9001,
    // 启用 historyApiFallback，但配置重写规则
    historyApiFallback: {
      rewrites: [
        // 优先匹配确切的 HTML 文件
        ...htmlFiles.map(({ name }) => ({
          from: new RegExp(`^\\/${name}$`),
          to: `/${name}.html`
        })),
        // 默认回退到 index.html
        { from: /./, to: '/index.html' }
      ]
    },
    // 添加详细日志输出
    client: {
      logging: 'info',
      overlay: true
    },
    // 总是从磁盘读取文件，不使用内存缓存
    devMiddleware: {
      writeToDisk: true
    }
  },
};