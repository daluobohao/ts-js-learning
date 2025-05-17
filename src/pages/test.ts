// 测试页面专用的入口文件 v2.1
console.log('[TEST PAGE] 测试页面 TypeScript 入口文件已加载');

// 不要导入全局样式，测试页面应该只使用其自己的内联样式
// import '../style.css'; ← 这会导致侧边栏等组件的样式被加载

// 打印当前页面的 URL 和路径名
console.log('[TEST PAGE] 当前页面 URL:', window.location.href);
console.log('[TEST PAGE] 当前页面路径:', window.location.pathname);

// 检查是否需要重定向到完整的 HTML 文件
if (!window.location.pathname.endsWith('.html') && window.location.pathname !== '/test/') {
    console.log('[TEST PAGE] 检测到不带 .html 后缀的路径，可能需要处理重定向');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('[TEST PAGE] DOM 已完全加载');
    
    // 确认当前页面是否正确加载
    const pageTitle = document.title;
    console.log('[TEST PAGE] 页面标题:', pageTitle);
    
    if (pageTitle.includes('全新的测试页面3')) {
        console.log('[TEST PAGE] ✅ 已正确加载测试页面 HTML');
    } else {
        console.log('[TEST PAGE] ❌ 未正确加载测试页面 HTML，当前标题:', pageTitle);
    }
    
    // 调试页面结构
    console.log('[TEST PAGE] 页面结构:');
    Array.from(document.body.children).forEach((child, index) => {
        console.log(`[TEST PAGE] - 子元素 ${index + 1}:`, child.tagName, child.className);
    });
    
    // 强制移除任何可能被错误加载的全局组件
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        console.log('[TEST PAGE] 发现错误加载的侧边栏，正在移除...');
        sidebar.remove();
    }
    
    const pageWrapper = document.querySelector('.page-wrapper');
    if (pageWrapper) {
        console.log('[TEST PAGE] 发现错误加载的页面包装器，正在移除...');
        pageWrapper.remove();
    }
    
    // 获取输出元素
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML += '<p style="color: #3498db; font-weight: bold;">测试页面 v2.1 - JavaScript 已成功加载</p>';
        output.innerHTML += '<p>加载时间: ' + new Date().toLocaleString() + '</p>';
        
        // 添加一个按钮
        const btn = document.createElement('button');
        btn.textContent = '点击我';
        btn.style.margin = '10px 0';
        btn.style.padding = '5px 10px';
        btn.style.backgroundColor = '#3498db';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        
        btn.addEventListener('click', () => {
            output.innerHTML += '<p>按钮被点击了！时间: ' + new Date().toLocaleTimeString() + '</p>';
        });
        
        output.appendChild(btn);
    }
    
    // 添加返回首页按钮的事件
    const homeLink = document.querySelector('a[href="/"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            console.log('[TEST PAGE] 点击了返回首页链接');
            // 不要阻止默认行为
        });
    }
    
    // 添加版本信息
    const version = document.querySelector('.version');
    if (version) {
        version.textContent += ' - JS加载成功';
    }
}); 