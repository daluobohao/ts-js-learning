const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// 自动扫描 src/html 目录下的 HTML 文件
function getHtmlFiles() {
  const htmlDir = path.resolve(__dirname, 'src/html');
  
  // 确保目录存在
  if (!fs.existsSync(htmlDir)) {
    console.warn('HTML目录不存在:', htmlDir);
    return [];
  }
  
  const files = fs.readdirSync(htmlDir);
  return files
    .filter(file => file.endsWith('.html'))
    .map(file => ({
      name: path.basename(file, '.html'),
      path: path.join(htmlDir, file)
    }));
}

// 生成入口配置
const htmlFiles = getHtmlFiles();
const entries = {};
const htmlPlugins = [];

// 主入口文件 - 用于index.html
entries.main = './src/main.ts';

// 为每个页面配置对应的入口文件（除了index之外的其他页面）
htmlFiles.forEach(({ name, path: filePath }) => {
  // 跳过index页面，因为它将使用main作为入口
  if (name === 'index') {
    // 为index.html创建插件，但使用main作为唯一chunks
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: filePath,
        filename: `${name}.html`,
        chunks: ['main'],
        inject: true,
        minify: false,
        hash: true
      })
    );
    return; // 跳过下面的代码，继续处理下一个文件
  }
  
  // 对于其他页面，尝试查找对应的 TypeScript 入口文件
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
      chunks: hasSpecificEntry ? [name] : [],
      inject: hasSpecificEntry,
      minify: false,
      hash: true
    })
  );
});

console.log('入口配置:', entries);
console.log('HTML 插件数量:', htmlPlugins.length);

// 如果没有找到HTML文件，添加默认的index.html
if (htmlPlugins.length === 0) {
  console.warn('未找到任何HTML文件，添加默认index.html');
  const defaultIndexPath = path.resolve(__dirname, 'src/html/index.html');
  
  if (fs.existsSync(defaultIndexPath)) {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: defaultIndexPath,
        filename: 'index.html',
        chunks: ['main'],
        inject: true,
        minify: false,
        hash: true
      })
    );
  } else {
    console.error('默认的index.html不存在:', defaultIndexPath);
  }
}

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