import { domUtils } from '../jsUtils';

/**
 * 测试JavaScript构造函数特性
 * @param output DOM输出容器
 */
export function testConstructors(output: HTMLElement): void {
    console.log('测试JavaScript构造函数...');
    
    const constructorTestDiv = document.createElement('div');
    constructorTestDiv.innerHTML = '<h3>JavaScript构造函数测试</h3>';
    output.appendChild(constructorTestDiv);
    
    // 使用闭包的构造函数
    function WidgetF(this: { getName: () => string, appName?: string }) {
        var appName = "天气应用";
        this.getName = function() {
            return appName;
        }
    }
    
    // 使用this的构造函数
    interface Widget {
        appName: string;
        getName: () => string;
    }
    
    function WidgetC(this: Widget) {
        this.appName = "天气应用"; 
        this.getName = function() { 
            return this.appName; 
        };
    }
    
    // 实例化对象
    const widget1 = new WidgetF();
    const widget2 = new WidgetC();
    
    // 运行测试
    const closureTest = document.createElement('div');
    closureTest.innerHTML = `
        <h4>闭包构造函数</h4>
        <p>WidgetF 使用了闭包来存储私有变量 appName</p>
        <p>widget1.appName = ${widget1.appName === undefined ? 'undefined (私有变量)' : widget1.appName}</p>
        <p>widget1.getName() = ${widget1.getName()}</p>
    `;
    constructorTestDiv.appendChild(closureTest);
    
    const thisTest = document.createElement('div');
    thisTest.innerHTML = `
        <h4>this构造函数</h4>
        <p>WidgetC 使用了this直接设置属性</p>
        <p>widget2.appName = ${widget2.appName}</p>
        <p>widget2.getName() = ${widget2.getName()}</p>
    `;
    constructorTestDiv.appendChild(thisTest);
    
    // 演示修改属性的不同
    const modificationTest = document.createElement('div');
    modificationTest.innerHTML = `<h4>修改属性测试</h4>`;
    constructorTestDiv.appendChild(modificationTest);
    
    // 尝试修改widget1的属性
    widget1.appName = "修改后的应用";
    
    domUtils.showResult(modificationTest, "修改widget1.appName后", {
        appName: widget1.appName,
        getName: widget1.getName()
    });
    
    // 尝试修改widget2的属性
    widget2.appName = "修改后的应用";
    
    domUtils.showResult(modificationTest, "修改widget2.appName后", {
        appName: widget2.appName,
        getName: widget2.getName()
    });
    
    console.log('JavaScript构造函数测试完成');
} 