/**
 * JavaScript构造函数示例
 */

// 传统构造函数
export function Person(this: any, name: string, age: number) {
  this.name = name;
  this.age = age;
  
  // 方法在每个实例中创建
  this.sayHello = function() {
    return `Hello, my name is ${this.name}`;
  };
}

// 原型方法
Person.prototype.greet = function(this: any) {
  return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
};

// ES6 类语法
export class Animal {
  name: string;
  species: string;
  
  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }
  
  // 类方法直接添加到原型
  makeSound() {
    return `${this.name} makes a sound`;
  }
  
  // 静态方法
  static isAnimal(obj: any) {
    return obj instanceof Animal;
  }
}

// 继承
export class Dog extends Animal {
  breed: string;
  
  constructor(name: string, breed: string) {
    super(name, 'canine');
    this.breed = breed;
  }
  
  // 覆盖父类方法
  makeSound() {
    return `${this.name} barks loudly!`;
  }
  
  // 新方法
  fetch() {
    return `${this.name} fetches the ball`;
  }
} 