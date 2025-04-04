/**
 * JavaScript构造函数测试文件
 */
import { Person, Animal, Dog } from '../concepts/constructors';

/**
 * 测试JavaScript构造函数和类
 */
export function testConstructors(outputElement: HTMLElement): void {
  const results = document.createElement('div');
  results.className = 'js-test-area';
  results.innerHTML = '<h3>JavaScript构造函数测试</h3>';
  
  // 创建测试容器
  function createTestResult(title: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'js-result';
    container.innerHTML = `<h4>${title}</h4>`;
    results.appendChild(container);
    return container;
  }
  
  // 测试1: 传统构造函数
  const test1 = createTestResult('传统构造函数');
  
  const person1 = new (Person as any)('张三', 25);
  const person2 = new (Person as any)('李四', 30);
  
  let output = "";
  output += `person1.name = ${person1.name}<br>`;
  output += `person1.sayHello() = ${person1.sayHello()}<br>`;
  output += `person1.greet() = ${person1.greet()}<br>`;
  output += `person2.name = ${person2.name}<br>`;
  output += `person2.sayHello() = ${person2.sayHello()}<br>`;
  output += `person2.greet() = ${person2.greet()}<br>`;
  output += `person1.sayHello === person2.sayHello: ${person1.sayHello === person2.sayHello}<br>`;
  output += `person1.greet === person2.greet: ${person1.greet === person2.greet}<br>`;
  
  test1.innerHTML += `
    <p>构造函数创建对象:</p>
    <pre>${output}</pre>
    <p>解释: 每个实例都有自己的sayHello方法副本，但共享同一个greet原型方法</p>
  `;
  
  // 测试2: ES6类语法
  const test2 = createTestResult('ES6类语法');
  
  const cat = new Animal('Whiskers', 'feline');
  const dog = new Dog('Buddy', 'Golden Retriever');
  
  output = "";
  output += `cat.name = ${cat.name}<br>`;
  output += `cat.species = ${cat.species}<br>`;
  output += `cat.makeSound() = ${cat.makeSound()}<br>`;
  output += `Animal.isAnimal(cat) = ${Animal.isAnimal(cat)}<br>`;
  output += `dog.name = ${dog.name}<br>`;
  output += `dog.species = ${dog.species}<br>`;
  output += `dog.breed = ${dog.breed}<br>`;
  output += `dog.makeSound() = ${dog.makeSound()}<br>`;
  output += `dog.fetch() = ${dog.fetch()}<br>`;
  output += `Animal.isAnimal(dog) = ${Animal.isAnimal(dog)}<br>`;
  output += `cat instanceof Animal = ${cat instanceof Animal}<br>`;
  output += `dog instanceof Animal = ${dog instanceof Animal}<br>`;
  output += `dog instanceof Dog = ${dog instanceof Dog}<br>`;
  
  test2.innerHTML += `
    <p>ES6类创建对象:</p>
    <pre>${output}</pre>
    <p>解释: ES6类提供了更优雅的语法，支持继承、静态方法等特性</p>
  `;
  
  // 测试3: 构造函数原型链
  const test3 = createTestResult('原型链和继承');
  
  output = "";
  output += `Object.getPrototypeOf(person1) === Person.prototype: ${Object.getPrototypeOf(person1) === Person.prototype}<br>`;
  output += `Object.getPrototypeOf(cat) === Animal.prototype: ${Object.getPrototypeOf(cat) === Animal.prototype}<br>`;
  output += `Object.getPrototypeOf(dog) === Dog.prototype: ${Object.getPrototypeOf(dog) === Dog.prototype}<br>`;
  output += `Object.getPrototypeOf(Dog.prototype) === Animal.prototype: ${Object.getPrototypeOf(Dog.prototype) === Animal.prototype}<br>`;
  
  test3.innerHTML += `
    <p>检查原型链关系:</p>
    <pre>${output}</pre>
    <p>解释: 原型链是JavaScript实现继承的机制，每个对象都链接到一个原型对象</p>
  `;
  
  outputElement.appendChild(results);
}