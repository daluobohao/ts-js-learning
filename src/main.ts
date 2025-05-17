// 导入首页样式
import './style.css';
import { initIndexPage } from './pages/index';

// 获取当前页面的路径
const currentPath = window.location.pathname;
// 去掉 .html 后缀
const pageName = currentPath === '/' ? 'index' : currentPath.replace(/\.html$/, '').slice(1);

console.log(`当前页面: ${pageName}`);

// 页面加载后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('主入口文件: DOM完全加载，开始初始化页面...');
    console.log('当前页面:', pageName);
    
    // 根据页面名称执行不同的逻辑
    switch (pageName) {
        case 'index':
            // 首页逻辑
            console.log('初始化首页...');
            initIndexPage();
            break;
        case '':
            // 根路径也初始化首页
            console.log('初始化首页 (根路径)...');
            initIndexPage();
            break;
        default:
            // 默认逻辑不做任何事情
            // 其他页面应该有各自的入口文件
            console.log(`主入口文件: 不处理页面 ${pageName}`);
            break;
    }
}); 