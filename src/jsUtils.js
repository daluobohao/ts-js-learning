/**
 * JavaScript工具函数集合
 */

// 数组操作
export const arrayUtils = {
    /**
     * 获取数组中的最大值
     */
    max: function(arr) {
      return Math.max(...arr);
    },
    
    /**
     * 获取数组中的最小值
     */
    min: function(arr) {
      return Math.min(...arr);
    },
    
    /**
     * 计算数组元素总和
     */
    sum: function(arr) {
      return arr.reduce((sum, current) => sum + current, 0);
    },
    
    /**
     * 数组去重
     */
    unique: function(arr) {
      return [...new Set(arr)];
    }
  };
  
  // 字符串操作
  export const stringUtils = {
    /**
     * 首字母大写
     */
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    /**
     * 反转字符串
     */
    reverse: function(str) {
      return str.split('').reverse().join('');
    },
    
    /**
     * 计算字符串中某个字符出现的次数
     */
    countChar: function(str, char) {
      return str.split(char).length - 1;
    }
  };
  
  // DOM 操作示例
  export const domUtils = {
    /**
     * 添加元素到指定容器
     */
    appendElement: function(container, tag, text, className) {
      const element = document.createElement(tag);
      if (text) element.textContent = text;
      if (className) element.className = className;
      container.appendChild(element);
      return element;
    },
    
    /**
     * 显示JS函数测试结果
     */
    showResult: function(container, title, result) {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'js-result';
      
      const titleEl = document.createElement('h4');
      titleEl.textContent = title;
      
      const resultEl = document.createElement('pre');
      resultEl.textContent = typeof result === 'object' ? 
        JSON.stringify(result, null, 2) : result.toString();
      
      resultDiv.appendChild(titleEl);
      resultDiv.appendChild(resultEl);
      container.appendChild(resultDiv);
    }
  };