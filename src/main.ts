// 导入首页样式
import './style.css';
import { getIndexInitializer, getNavActionListener } from './pages/index';

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
        case '':
            // 首页逻辑 - 使用函数库中的方法
            console.log('初始化首页...');
            
            // 获取并执行首页初始化函数
            const indexInitializer = getIndexInitializer();
            indexInitializer();
            
            // 获取并添加导航事件监听器
            const navActionListener = getNavActionListener();
            document.addEventListener('navAction', navActionListener);
            
            break;
        default:
            // 默认逻辑不做任何事情
            // 其他页面应该有各自的入口文件
            console.log(`主入口文件: 不处理页面 ${pageName}`);
            break;
    }
}); 