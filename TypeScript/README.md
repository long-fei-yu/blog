### TypeScript基于脚手架创建React项目

npx create-react-app 项目名 --template typescript

### 基础类型

#### 数组

定义数组的方式：可以在元素类型后面接上[]，表示由此类型元素组成的一个数组

```typescript
let list: number[] = [1, 2, 3]
```
定义数组的方式：使用数组泛型，Array<元素类型>
```typescript
let list: Array<number> = [1, 2, 3]
```
#### 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组(可以调用方法来增加元素)，各元素的类型不必相同。

```typescript
//定义一对值分别是string和number类型的元组
let x: [string, number];
x = ['hello', 10];	//ok
x = [10, 'hello'];	//Error

//当访问一个已知索引的元素，会得到正确的类型，不需要强转
x[0].substr(1);	//OK
x[1].substr(1);	//Error, 'number' does not have 'substr'
```
#### 任意值

使用any来标记任意值

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; 
```
#### 空值

使用void来标记空值，只能为它赋予undefined

```typescript
let unusable: void = undefined;	//OK
unusable = null;	//Error
```
#### Never

never类型表示的是那些永不存在的值的类型，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；没有类型是never的子类型或可以赋值给never类型(除了never本身之外)。 即使any也不可以赋值给never。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}
```
#### 类型断言--强转

类型断言形式一："尖括号"，JSX不支持

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```
类型断言形式一：as语法

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
### 接口

#### 可选属性

可选属性名字定义的后面加一个"?"

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```
#### 只读属性

属性名前用readonly来指定只读属性

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```
#### 额外的属性检查

当将对象赋值给变量或作为参数传递的时候。 如果一个对象存在任何"目标类型"不包含的属性时，会出错误

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}
//参数为colour而不是color
createSquare({ colour: "red", width: 100 });		//Error

//解决方案一：类型断言
createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//解决方案二：字符串索引签名，前提是能够确定这个对象可能具有某些做为特殊用途使用的额外属性
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
//解决方案三：对象赋值给一个另一个变量
let squareOptions = { colour: "red", width: 100 };
createSquare(squareOptions);	
```
#### 函数类型

接口也可以描述函数类型。需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```typescript
interface SearchFunc {
  //调用签名
  (source: string, subString: string): boolean;	
}

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```
#### 可索引的类型

可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型

```typescript
interface StringArray {
  [index: number]: string;
}
```
#### 实现接口

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```
### 类静态部分与实例部分的区别

类是具有两个类型的：静态部分的类型和实例的类型。

类实现接口时，只对其实例部分进行类型检查，constructor存在类的静态部分，所以不再检查的范围内。

泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

### 继承接口

一个接口可以继承多个接口

```typescript
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}
```
### 混合类型

```typescript
//一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
### 接口继承类

接口继承类时，它会继承类的成员但不包括其实现。接口同样会继承到类的private和protected成员。

### 类

#### 公共，私有与受保护的修饰符

比较两种不同的类型时，只要所有的成员的类型时兼容的，那就认为他们的类型是兼容的。但是比较带有private或protected成员的类型时，两个类型都包含private成员，并且他们都是来自同一处声明，才认为他们的类型时兼容的。

- private：只能在类的内部访问
- protected：在子类和本身中访问
- readonly：只读属性

#### 构造函数

```typescript
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    }else {
      return Greeter.standardGreeting;
    }
  }
}
```

```typescript
let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

//typeof Greeter：Greeter类的类型，而不是实例的类型。准确的说是"告诉我Greeter标识符的类型"，
//也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());
```
### 函数

#### 可选参数和默认参数

可选参数：参数名旁使用?实现，可选参数必须跟在必须参数后面

#### this

疑问：显式的this参数需要特别声明吗

#### 重载

疑问：感觉前面两个定义的方法没什么意义

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string, card: number }[]): number;
function pickCard(x: number): { suit: string, card: number };
function pickCard(x: any): any {
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return {suit: suits[pickedSuit], card: x % 13};
  }
}

let myDeck = [{suit: "diamonds", card: 2}, {suit: "spades", card: 10}, {suit: "hearts", card: 4}];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
### 泛型

#### 泛型约束

定义接口来描述约束条件，使用接口和extends关键字还实现约束。

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```
#### 泛型约束中使用类型参数

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");	//ok
getProperty(x, "m");	//error
```
### 枚举

#### 常数枚举

常数枚举只能使用常数枚举表达式并且不同于常规的枚举的是它们在编译阶段会被删除

```typescript
const enum Enum {
  A = 1,
  B = A * 2
}
```
### 高级类型

#### 联合类型

联合类型表示一个值可以是几种类型之一。 我们用竖线"|"分隔每个类型。

比如：number | string | boolean表示一个值可以是number，string，或boolean。

```typescript
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function padLeft(value: string, padding: string | number): Fish | Bird {
  ...
}

let pet = padLeft("Hello world", 4);
```
#### 用户自定义的类型保护

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```
#### 类型保护和类型断言

添加!后缀：name!从name的类型里去除了null和undefined

```typescript
function fixed(name: string | null): string {
  name = name || "Bob";
  return name!.charAt(0) + '.  the great';
}
```
#### 类型别名

type关键字创建别名

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```
#### 字符串字面量类型

字符串字面量类型允许你指定字符串必须的固定值

```typescript
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      //...
    } else if (easing === 'ease-out') {
      //...
    } else if (easing === 'ease-in-out') {
      //...
    }
  }
}

let button = new UIElement();
button.animate(0, 0, 'ease-in');	//ok
button.animate(0, 0, 'uneasy');	//error
```
#### 可辨识联合

```typescript
//kind属性称做可辨识的特征或标签
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```
#### 索引类型

keyof T：索引类型查询操作符，对于任何类型T，keyof T的结果为T上已知的公共属性名的联合。

T[K]：索引访问操作符

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}

let person: Person = {name: 'jack', age: 15}
let strings: string[] = pluck(person, ['name']);
```
#### 映射类型

### 模块

#### export = 和 import = require()

export = 语法以支持传统的CommonJS和AMD的工作流模型，但是直接在ts里面写会报错。

如果导出使用export = 的模块时，导入使用import module = require("module")

```typescript
//ZipCodeValidator.ts
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
export = ZipCodeValidator;

//Test.ts
import zip = require("./ZipCodeValidator");
let strings = ["Hello", "98052", "101"];
let validator = new zip();
```
#### 外部模块

### 命名空间

namespace关键字创建命名空间，不同的文件，它们仍是同一个命名空间时，需要使用引用标签来告诉编辑器文件之间的关联。也可以采用export导出命名空间。

```typescript
//Validation.ts
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}

//LettersOnlyValidator.ts
/// <reference path="Validation.ts" />	引用标签
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}

//ZipCodeValidator.ts
/// <reference path="Validation.ts" />	引用标签
namespace Validation {
  const numberRegexp = /^[0-9]+$/;
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

//Test.ts
/// <reference path="Validation.ts" />	引用标签
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

let strings = ["Hello", "98052", "101"];

let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```
### 别名

使用import q = x.y.z给常用的对象起一个短的名字。	

```typescript
namespace Shapes {
  export namespace Polygons {
    export class Triangle {
      
    }
    export class Square {
      
    }
  }
}
//别名
import polygons = Shapes.Polygons;
let sq = new polygons.Square();
```
### 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。 装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

使用装饰器功能需要在tsconfig.json里启用experimentalDecorators

```typescript
//tsconfig.json:
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

注意：装饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数	

#### 装饰器组合

```typescript
function f() {
  console.log("f(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("f(): called");
  }
}

function g() {
  console.log("g(): evaluated");
  return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("g(): called");
  }
}

class C {
  @f()
  @g()
  method() {}
}

//结果
f(): evaluated
g(): evaluated
g(): called
f(): called
```
当多个装饰器应用在一个声明上时会进行如下步骤的操作：

1. 由上至下依次对装饰器表达式求值。
2. 求值的结果会被当作函数，由下至上依次调用。

#### 装饰器执行顺序

属性装饰器->方法装饰器->方法参数装饰器->类装饰器

#### 装饰器工厂 

装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

```typescript
// 这是一个装饰器工厂
function color(value: string) {
  //  这是装饰器 
  return function (target) {
    ......
  }
}
```
#### 类装饰器

类装饰器在类声明之前被声明(紧靠着类声明)。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。

类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。

如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。

#### 属性装饰器

属性装饰器声明在一个属性声明之前(紧靠着属性声明)

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：  
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。  
2. 属性的名字

如果访问符装饰器返回一个值，它会被用作方法的属性描述符。

#### 方法装饰器

方法装饰器声明在一个方法的声明之前(紧靠着方法声明)。 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。  

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。  
2. 方法的名字。  
3. 方法的属性描述符。  

如果方法装饰器返回一个值，它会被用作方法的属性描述符。

#### 方法参数装饰器

参数装饰器声明在一个参数声明之前(紧靠着参数声明)。 参数装饰器应用于类构造函数或方法声明。

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 参数的名字。
3. 参数在函数参数列表中的索引。

参数装饰器只能用来监视一个方法的参数是否被传入。

参数装饰器的返回值会被忽略。

注意：在react项目使用方法参数装饰器，遇到下列错误，暂时还没有解决

```typescript
Uncaught Error: Module parse failed: Unexpected character '@' (110:8)
File was processed with these loaders:
* ./node_modules/@pmmmwh/react-refresh-webpack-plugin/loader/index.js
* ./node_modules/react-scripts/node_modules/babel-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
```
#### 访问器装饰器

访问器装饰器声明在一个访问器的声明之前(紧靠着访问器声明)。 访问器装饰器应用于访问器的属性描述符并且可以用来监视，修改或替换一个访问器的定义。

访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 成员的属性描述符。

如果访问器装饰器返回一个值，它会被用作方法的属性描述符。

注意：TypeScript不允许同时装饰一个成员的get和set访问器。取而代之的是，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。这是因为，在装饰器应用于一个属性描述符时，它联合了get和set访问器，而不是分开声明的。

TypeScript官网：[https://www.typescriptlang.org](https://www.typescriptlang.org)

TypeScript中文文档：[https://typescript.bootcss.com](https://typescript.bootcss.com)
