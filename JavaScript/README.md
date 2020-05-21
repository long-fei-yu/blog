### var变量提升

JavaScript引擎的工作方式是：先解析代码，获取所有被var声明的变量，然后再一行一行地运行。这造成的结果，就是所有用var变量的声明语句，都会被提升到代码的头部，这就叫做变量提升。

```javascript
console.log(a);
var a = 1;

//结果:undefined
```

### typeof 运算符

数值，字符串，布尔值，undefined分别返回number，string，boolean，undefined。
函数返回function。
null和其余对象(数组等)都返回object。

### 类型转换

undefined，null，false，0，NaN，空字符串('&emsp;'或"&emsp;")转换布尔值为false。
null转换为数值为0，undefined转换为数值为NaN。

### 数值

0除以0会得到NaN。非0数值除以0，会返回Infinity。

```javascript
console.log(0/0);
console.log(1/0);

//结果:NaN
//结果:Infinity
```

### parseInt

用于将字符串转为整数，如果字符串头部有空格，空格会被自动去除。如果参数不是字符串，则会先转为字符串再转换。如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。如果字符串的第一个字符不能转化为数字(后面跟着数字的正负号除外)，返回NaN。如果字符串以0x或0X开头，会将其按照十六进制数解析。

parseInt还可以接受第二个参数(2到36之间)，表示被解析的值的进制，返回该值对应的十进制数。默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制。

```javascript
console.log(parseInt('   81'));
console.log(parseInt('8a'));
console.log(parseInt('12**'));
console.log(parseInt('abc'));
console.log(parseInt('0x10'));

console.log(parseInt('1000', 2));
console.log(parseInt('1000', 6));
console.log(parseInt('1000', 8));

//结果:81
//结果:8
//结果:12
//结果:NaN
//结果:16

//结果:8
//结果:216
//结果:512
```

### parseFloat

用于将一个字符串转为浮点数。如果字符串符合科学计数法，则会进行相应的转换。如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分。自动过滤字符串前导的空格。如果参数不是字符串，或者字符串的第一个字符不能转化为浮点数，则返回NaN。

```javascript
console.log(parseFloat('314e-2'));
console.log(parseFloat('3.14more non-digit'));
console.log(parseFloat('\t\v\r12.34\n '));

console.log(parseFloat([]));
console.log(parseFloat('FF2'));
console.log(parseFloat(''));

//结果:3.14
//结果:3.14
//结果:12.34

//结果:NaN
//结果:NaN
//结果:NaN
```

### isNaN

用来判断一个值是否为NaN，但是，isNaN只对数值有效，如果传入其他值，会被先转成数值。

```javascript
console.log(isNaN('Hello'));

//结果: true
//相当于
console.log(isNaN(Number('Hello')));
```

#### string类型的数据是不可改变的，可以看成是类数组

### Base64转码

Base64是一种编码方法，可以将任意值转成0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。

btoa()：任意值转为Base64编码
atob()：Base64编码转为原来的值

注意：这两个方法不适合非ASCII码的字符，会报错。必须中间插入一个转码环节，再使用这两个方法。

```javascript
console.log(btoa('Hello World!'));
console.log(atob('SGVsbG8gV29ybGQh'));

//结果: SGVsbG8gV29ybGQh
//结果: Hello World!
```

```javascript
console.log(btoa(encodeURIComponent('你好')));
console.log(decodeURIComponent(atob('JUU0JUJEJUEwJUU1JUE1JUJE')));

//结果: JUU0JUJEJUEwJUU1JUE1JUJE
//结果: 你好
```

### 对象的相加

相加的是对象，必须先转成原始类型的值，然后再相加。

对象转成原始类型的值:  

1. 先调用对象的valueOf()，一般来说，valueOf()总是返回对象自身。  
2. 再调用对象的toString()，将其转为字符串。toString()默认返回[object Object]。

注意：  

1. 如果valueOf()直接返回一个原始类型的值，就不再调用toString()。  
2. 如果是Date对象，那么会优先执行toString()。

```javascript
var obj = { p: 1 };
console.log(obj.valueOf());
console.log(obj.valueOf().toString());
console.log(obj+2);

//结果: {p: 1}
//结果: [object Object]
//结果: [object Object]2
```


```javascript
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };

console.log(obj+2);

//结果: hello2
```

### 布尔运算符

&&：如果第一个运算子的布尔值为true，则返回第二个运算子的值(注意是值，不是布尔值)；如果第一个运算子的布尔值为false，则直接返回第一个运算子的值(注意是值，不是布尔值)，且不再对第二个运算子求值。

&&运算符可以多个连用，返回第一个布尔值为false的表达式的值。如果所有表达式的布尔值都为true，则返回最后一个表达式的值。

```javascript
console.log('t' && (1 + 2));
console.log('' && 'f');

console.log(true && 'foo' && '' && 4 && 'foo' && true);
console.log(1 && 2 && 3);

//结果: 3
//结果: ''

//结果: ''
//结果: 3
```

||：如果第一个运算子的布尔值为true，则返回第一个运算子的值(注意是值，不是布尔值)，且不再对第二个运算子求值；如果第一个运算子的布尔值为false，则返回第二个运算子的值(注意是值，不是布尔值)。

||运算符可以多个连用，返回第一个布尔值为true的表达式的值。如果所有表达式都为false，则返回最后一个表达式的值。	

```javascript
console.log('t' || 'f');
console.log('' && 'f');

console.log(false || 0 || '' || 4 || 'foo' || true);
console.log(false || 0 || '');

//结果: t
//结果: f

//结果: 4
//结果: ''
```

### void运算符

执行一个表达式，然后不返回任何值，或者说返回undefined。
作用：浏览器的书签工具(Bookmarklet)，以及在超级链接中插入代码防止网页跳转。

```javascript
console.log(void('f'));

var x = 3;
console.log(void (x = 5));	// x = 3

//结果: undefined
//结果: undefined

//点击超链接提交表单，但是不产生页面跳转
<a href="javascript: void(document.form.submit())">提交</a>
```

逗号运算符：用于对两个表达式求值，并返回最后一个表达式的值。
作用：在返回一个值之前，进行一些辅助操作。

```javascript
var x = 0;
var y = (x++, 10);
console.log(y);

var value = (console.log('Hi!'), true);
console.log(value); // 会输出 'Hi!'

//结果: 10
//结果: true
```

### Number()

将任意类型的值转化成数值，如果是对象时，将返回NaN，除非是包含单个数值的数组。

如果是对象转换为数值

1. 调用对象自身的valueOf()。如果返回原始类型的值，则直接对该值使用Number()。  
2. 如果valueOf()返回的还是对象，再调用原对象自身的toString()。如果toString()返回原始类型的值，则对该值使用Number()。  
3. 如果toString()返回的是对象，就报错。

```javascript
console.log(Number({a: 1}));
console.log(Number([1, 2, 3]));
console.log(Number([5]));

//结果: NaN
//结果: NaN
//结果: 5
```

注意：
可以重新定义对象的valueOf()和toString()。
null转为数值时为0，而undefined转为数值时为NaN。

### String()

将任意类型的值转化成字符串，如果是对象，返回一个类型字符串；如果是数组，返回该数组的字符串形式。

如果是对象转换为String

1. 调用对象自身的toString()。如果返回原始类型的值，则直接对该值使用String()。
2. 如果toString()返回的还是对象，再调用原对象自身的valueOf()。如果valueOf()返回原始类型的值，则对该值使用String()。
3. 如果valueOf()返回的是对象，就报错。

```javascript
console.log(String({a: 1}));
console.log(String([1, 2, 3]));
console.log(Number([5]));

//结果: [object Object]
//结果: 1,2,3
//结果: 5
```

注意：可以重新定义对象的valueOf()和toString()

### 错误处理机制

JavaScript语言标准只提到，Error实例对象必须有message属性，表示出错时的提示信息，没有提到其他属性。大多数JavaScript引擎，对Error实例还提供name和stack属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

message：错误提示信息
name：错误名称（非标准属性）
stack：错误的堆栈（非标准属性）

```javascript
function idle(x) {
  try {
    console.log(x);
    return 'result';
  } finally {
    console.log('FINALLY');
  }
}

idle('hello')

//结果: hello
//结果: FINALLY

var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}
console.log(countUp());
console.log(count);

//结果: 0
//结果: 1	

function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会运行
  }
  console.log(5); // 不会运行
}

var result = f();
console.log(result);

//结果: 0
//结果: 1
//结果: 3
//结果: false

//进入catch代码块之后，一遇到throw语句，就会去执行finally代码块
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误'); 
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
  
try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//结果: 捕捉到内部错误  
```

### 对象

#### 属性特性

数据属性的4个特性：值(value)，可写性(writable)，可枚举性(enumerable)，可配置性(configurable)

存取器属性的4个特性：读取(get)，写入(set)，可枚举性(enumerable)，可配置性(configurable)

可写性：是否可以设置该属性的值

可枚举性：是否可以通过for/in循环循环返回该属性

可配置性：是否可以删除或修改该属性

#### 方法和属性

delete运算符只能删除自有属性，不能删除继承属性。不能删除可配置性为false的属性。

in运算符检测对象的自有属性或继承属性中是否包含该属性，如果包含返回true，反之返回false。

对象的hasOwnProperty()检测是否是对象的自有属性(继承属性返回false)，如果是返回true，反之返回false。

对象的propertyIsEnumerable()检测是否是自有属性并且是可枚举性，如果是返回true，反之返回false。

for/in循环遍历对象中所有可枚举的属性。

Object.keys()返回对象中可枚举的自有属性的名称的数组。

Object.getOwnPropertyNames()返回对象中自有属性的名称的数组。

Object.getOwnPropertyDescriptor()获取对象自有属性的属性描述符。

Object.defineProperty()修改对象的属性描述符。

Object.defineProperties()修改对象多个属性描述符。

JSON.stringify()序列化对象可枚举的自有属性。

#### 对象的特性

##### 原型属性

Object.getPrototypeOf()获取对象原型。

obj对象.constructor.prototype获取对象原型。

浏览器的\_\_proto\_\_属性可以查询对象原型。

##### 类属性

获取对象的类，调用对象的toString()，提取返回字符串的第8个到倒数第二个位置之间的字符。

```javascript
classof(o) {
  if (o === null) return 'NULL';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
};
```

##### 可扩展性

可扩展性表示是否可以给对象添加新的属性，

Object.isExtensible()判断对象是否是可扩展的。

Object.preventExtensions()将对象设置为不可扩展的，该操作不可逆。

Object.isSealed()判断对象是否封闭。

Object.seal()将对象设置为不可扩展，并且把对象的所有自有属性设置为不可配置。将对象封闭。

Object.isFrozen()判断对象是否冻结

Object.freeze()将对象设置为不可扩展，并且把对象的所有自有属性设置为不可配置。还将对象的数据属性设置为只读(存取器属性不受影响)，将对象冻结。

### 数组

调用构造函数Array()创建数组，传递一个数值参数。这个数值指定数组的长度，但是，数组中没有存储值，甚至数组的索引属性(0,1等)还未定义。

```javascript
var a = new Array(10);
```

设置length属性为一个小于当前长度的非负整数n时，当前数组中索引值大于或者等于n的元素将从中删除。

```javascript
var a = [1, 2, 3, 4, 5];
a.length = 3;
console.log(a);

//结果: [1, 2, 3]
```

循环数组最常用的方法是forEach()

#### 类数组对象

如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，称为"类似数组的对象"。可以间接调用数组的方法。

类数组对象：函数的arguments对象，String对象

### 函数

#### 函数名的提升

函数名等同var声明的变量名，所以采用function命令声明函数时，整个函数会像var变量声明一样，被提升到代码头部。

```javascript
f();	//不会报错
function f() {}

f();	//会报错
var f = function (){};

等同于
var f;
f();	//因为f为undefined，所以会报错
f = function () {};
```

#### 函数本身的作用域

函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。

```javascript
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f()		

// 1
```


```javascript
var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x)	

// ReferenceError: a is not defined
```

```javascript
function foo() {
  var x = 1;
  function bar() {
    console.log(x);
  }
  return bar;
}

var x = 2;
var f = foo();
f()		

// 1
```

总之，函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。

#### new 命令的原理

使用new命令时，它后面的函数依次执行下面的步骤

1. 创建一个空对象，作为将要返回的对象实例。  

2. 将这个空对象的原型，指向构造函数的prototype属性。  
3. 将这个空对象赋值给函数内部的this关键字。  
4. 开始执行构造函数内部的代码  

注：如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

```javascript
var Vehicle = function () {
  this.price = 1000;
  return 1000;
};

(new Vehicle()) === 1000

//结果: false
```

嵌套函数不会从外部函数继承this，如果嵌套函数作为方法调用，其this指向调用它的对象。如果嵌套函数作为函数调用，其this指向全局对象window。如果想要访问外部函数的this，需要将this保存在一个变量里self。

函数也是特殊的对象，可以给函数设置属性。

### 闭包

可以简单理解为定义在一个函数内部的函数。

用处：一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。还可以封装对象的私有属性和私有方法。

缺点：外层函数每次运行，都会生成一个新的闭包，而这个闭包又会保留外层函数的内部变量，所以内存消耗很大。

闭包无法直接访问外部函数的this，需要将外部函数的this赋值给一个变量。

闭包无法直接访问外部函数的arguments，需要将外部函数的arguments赋值给一个变量。

```javascript
// 闭包封装对象私有属性和私有方法
function Person(name) {
  var _age;
  function setAge(n) {
    _age = n;
  }
  function getAge() {
    return _age;
  }
  
  return {
    name: name,
    etAge: getAge,
    setAge: setAge
  };
}

var p1 = Person('张三');
p1.setAge(25);
p1.getAge() 

//结果: 25

function constfunc(v) {
  return function () {
    return v;
  }
}

var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs[i] = constfunc(i);
}

funcs[5]();

//创建10个闭包，但是每个闭包之间不共享变量v。外层函数每次运行，都会生成一个新的闭包
//结果: 5

function constfunc() {
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs[i] = function () {
      return i;
    };
  }
  return funcs;
}

var funcs = constfunc();
funcs[5]();

//创建10个闭包，闭包都是在同一个函数中调用的，因此它们可以共享变量i。当constfunc()返回时，变量i的值是10，所有的闭包都共享这个一个值，
//结果: 10
```

### 高阶函数

接受一个或者多个函数作为参数，并返回一个新函数。


```javascript
function not(f) {
  return function () {
    var result = f.apply(this, arguments);
    return !result;
  }
}

var event = function (x) {
  return x % 2 === 0;
};

var odd = not(event);
[1, 1, 3, 5, 5].every(odd);

//结果: true
```

记忆：将上次的计算结果缓存起来，特别是递归函数，可以将每次递归的结果都缓存起来，便于查看每次递归结果。

```javascript
function memorize(f) {
  var cache = {}; //缓存保存在闭包中
  
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    if (key in cache) return cache[key];
    else return cache[key] = f.apply(this, arguments);
  }
}

var factorial = memorize(function (n) {
  return (n <= 1 ? 1 : n * factorial(n - 1));
});

factorial(5)

//结果: 120
```

### this关键字

this设计目的就是在函数体内部，指代函数当前的运行环境。

#### 使用场合

##### 全局环境  

全局环境使用this，它指的就是顶层对象window  

```javascript
console.log(this === window);

function f() {
  console.log(this === window);
}
f(); 

//结果: true
//结果: true
```

##### 构造函数  

构造函数中的this，指的是实例对象。每个类只能有一个构造函数(但不一定)，如果需要重载，可以以参数的情况来实现重载。

##### 对象的方法  

如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。

如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层。

```javascript
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};

a.b.m() 

//结果: undefined
```

```javascript
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()

类似于

var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}

//结果: Object
//结果: Window
```

```javascript
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()

//结果: Object
//结果: Object
```

数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部的this指向window对象。

```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}

o.f()

//结果: undefined a1
//结果: undefined a2
```

如果需要让this指向当前对象可以采用下列方法

```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v+' '+item);
    });
  }
}

o.f()

//结果: hello a1
//结果: hello a2

var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}

o.f()

//结果: hello a1
//结果: hello a2
```

#### 绑定this

##### Function.prototype.call()  

call()第一个参数应该是对象。如果为空、null和undefined，则默认传入全局对象(window对象)。如果是一个原始值，那么这个原始值会自动转成对应的包装对象。

```javascript
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call()  
a.call(null)  
a.call(undefined)
a.call(window)
a.call(obj)

//结果: 123
//结果: 123
//结果: 123
//结果: 123
//结果: 456

var f = function () {
  return this;
};

f.call(5)

//结果: Number {5}
```

##### Function.prototype.apply()  

与call唯一的区别是：apply接受一个数组作为函数执行时的参数，call中必须一个个添加。

##### Function.prototype.bind()  

bind用于将函数体内的this绑定到某个对象，然后返回一个新函数。

```javascript
var counter = {
  count: 0,
  inc: function () {
    this.count++; 
};

var func = counter.inc.bind(counter);
func();
console.log(counter.count)

//结果: 1

var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function () {
      console.log(this.name);
    }.bind(this));
  }
};
    
obj.print()

//结果: 张三 张三 张三
```

bind方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样。

```javascript
element.addEventListener('click', o.m.bind(o));
element.removeEventListener('click', o.m.bind(o));
```

正确的方法是写成下面这样：

```javascript
var listener = o.m.bind(o);
element.addEventListener('click', listener);
  ...
element.removeEventListener('click', listener);
```

### 类和模块

#### constructor 属性

prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。  

```javascript
function P() {}
var p = new P();

P.prototype.constructor === P // true
p.constructor === P // true
p.constructor === P.prototype.constructor // true
p.hasOwnProperty('constructor') // false
```

p是构造函数P的实例对象，但是p自身没有constructor属性，该属性其实是读取原型链上面的P.prototype.constructor属性。

constructor属性的作用：可以得知某个实例对象，到底是哪一个构造函数产生的。

```javascript
function F() {};
var f = new F();

f.constructor === F // true
f.constructor === RegExp // false
```

constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错。

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.constructor === Person // true

Person.prototype = {
  method: function () {}
};

Person.prototype.constructor === Person // false
Person.prototype.constructor === Object // true
```

构造函数Person的原型对象改掉了，但是没有修改constructor属性，导致这个属性不再指向Person。由于Person的新原型是一个普通对象，而普通对象的constructor属性指向Object构造函数，导致Person.prototype.constructor变成了Object。

修改原型对象时，一般要同时修改constructor属性的指向。要么将constructor属性重新指向原来的构造函数，要么只在原型对象上添加方法。

```javascript
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
    // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
    // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };
```

#### instanceof 运算符

instanceof运算符的左边是实例对象，右边是构造函数。检查右边构建函数的原型对象（prototype），是否在左边对象的原型链上。有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真。但是，只要一个对象的原型不是null，instanceof运算符的判断就不会失真。

```javascript
var obj = Object.create(null);
typeof obj // "object"
Object.create(null) instanceof Object // false

var x = [1, 2, 3];
var y = {};
x instanceof Array // true
y instanceof Object // true
```

instanceof运算符只能用于对象，不适用原始类型的值。
```javascript
var s = 'hello';
s instanceof String // false
```

此外，对于undefined和null，instanceof运算符总是返回false。

```javascript
undefined instanceof Object // false
null instanceof Object // false
```

原型对象是类的唯一标识，构造函数是类的公共标识。

![原型对象](https://images0.cnblogs.com/blog/138012/201409/181637013624694.png)

每个函数都有一个prototype属性，指向一个对象。

```javascript
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true
```

实例对象的\_\_proto\_\_属性（前后各两个下划线），返回该对象的原型。但是根据语言标准，\_\_proto\_\_属性只有浏览器才需要部署，其他环境可以没有这个属性。

```javascript
var obj = {};
var p = {};

obj.__proto__ = p;
Object.getPrototypeOf(obj) === p // true
```

获取实例对象obj的原型对象，有三种方法

1. obj.\_\_proto\_\_
2. obj.constructor.prototype
3. Object.getPrototypeOf(obj) 

但是前两种都不是很可靠。\_\_proto\_\_属性只有浏览器才需要部署，其他环境可以不部署。而obj.constructor.prototype在手动改变原型对象时，可能会失效。 

```javascript
var obj = new Object();

obj.__proto__ === Object.prototype  // true
obj.__proto__ === obj.constructor.prototype  // true	

var A = function () {};
var a = new A();

var C = function () {};
C.prototype = a;
var c = new C();

c.constructor.prototype === a  // false
// c.constructor查找C原型对象的constructor属性，C原型对象是a，
// 所以c.constructor = a.constructor
// 所以c.constructor = A 
// 所以c.constructor.prototype = A.prototype 
// 所以c.constructor.prototype === a为false，应该是Function.prototype
	  
//构造函数C的原型对象被改成了a，但是实例对象的c.constructor.prototype却没有指向c。
//所以，在改变原型对象时，一般要同时设置constructor属性

C.prototype = a;
C.prototype.constructor = C;

var c = new C();
c.constructor.prototype === a  // true
// c.constructor查找C原型对象的constructor属性，C原型对象是a，但是C.prototype.constructor = C，
// 所以c.constructor = C，
// 所以c.constructor.prototype = C.prototype，
// 所以c.constructor.prototype = a。
```

对象的原型对象等于对象构造函数的prototype属性，原型对象的constructor值等于实例对象的构造函数对象。

```javascript
var F = function () {
};

var p = F.prototype;	//原型对象
var c = p.constructor;	//原型对象的constructor值
console.log(c === F);

var o = new F();
console.log(o.constructor === F);

//结果: true
```

实例字段：实例对象的属性。
实例方法：类的所有实例共享的方法，由每个实例对象调用。原型对象的属性值为函数时，这个函数就是类的实例方法。 
类字段 类方法：属于类，不属于类的某个实例。构造函数对象的属性都是类字段和类方法。

```javascript
//实例字段(r和i):
function Complex(real, imaginary) {
  if (isNaN(real) || isNaN(imaginary)) {
    throw new TypeError();
  }
  
  this.r = real;
  this.i = imaginary;
}

//类实例方法:可以被所有实例继承，可以使用this来取得实例字段
Complex.prototype.add = function (that) {
  return new Complex(this.r + that.r, this.i + that.i);
};

//类字段和类方法为构造函数的属性，不能使用关键字this

//类字段:
Complex.ZERO = new Complex(0, 0);

//类方法:
Complex.pares = function (s) {
  try {
    var m = Complex._format.exec(s);
    return new Complex(parseFloat(m[1]), parseFloat(m[2]));
  } catch (x) {
    throw new TypeError();
  }
};

//类的"私有"字段:下划线前缀表明是类内部使用，不属于类的共有API，但是也可以使用闭包来实现
Complex._format = /^\{([^,]+),([^}]+)\}$/;  
```

java中可以使用final声明字段为常量，可以将字段和方法声明为private，表明是私有成员并且在类的外部不可见。JavaScript中没有这些关键字。

#### 利用闭包来实现私有状态

```javascript
function Range(from, to) {
  this.from = function () {
    return from;
  };
  
  this.to = function () {
    return to;}
}

Range.prototype = {
  constructor: Range,
  includes: function (x) {
    return this.from() <= x && x <= this.to();
  },
  forEach: function (f) {
    for (var x = Math.ceil(this.from()), max = this.to(); x <= max; x++) {
      f(x);
    }
  }
}
```

利用立即执行函数来实现私有状态：外部代码无法读取内部的_count变量
```javascript
var module1 = (function () {
  var _count = 0;
  var m1 = function () {
    //...
  };
  var m2 = function () {
    //...
  };
  return {
    m1 : m1,
    m2 : m2
  };
})();

console.info(module1._count); //undefined
```

#### 构造函数的重载和工厂方法

构造函数是类的公有标识，因此每个类只能有一个构造函数(不一定)，可以根据参数区分来实现构造函数重载，或者采用工厂方法来实现重载。

```javascript
//根据参数(arguments)来区分来实现重载
function Set() {
  this.value = {};
  this.n = 0;
  if (arguments.length == 1 && isArrayLike(arguments[0])) {
    this.add.apply(this, arguments[0]);
  } else if (arguments.length > 0) {
    this.add.apply(this, arguments);
  }
}

// 工厂方法来实现重载
Set.fromArray = function (a) {
  var s = new Set();
  s.add.apply(s, a);
  return s;
}
```

### 子类

#### 采用原型的方式来实现继承Sub继承Super

```javascript
function Sub(value) {
  //调用父类构造函数
  Super.call(this, arguments);
  this.prop = value;
}

//方式1:最好
Sub.prototype = Object.create(Super.prototype);
//方式2:子类会具有父类实例的方法。有时，这可能不是我们需要的，所以不推荐使用这种写法。
Sub.prototype = new Super();

Sub.prototype.constructor = Sub;
Sub.prototype.method = function () {
  ...
  //调用父类方法
  return Super.prototype.method.apply(this, arguments);
}	
```

Sub.prototype是子类的原型，要将它赋值为Object.create(Super.prototype)，而不是直接等于Super.prototype(注意)。否则后面两行对Sub.prototype的操作，会连父类的原型Super.prototype一起修改掉。

#### 采用组合的方式来实现继承  B继承A

多重继承：JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。

```javascript
function M1() {
  this.hello = 'hello';
}

function M2() {
  this.world = 'world';
}

function S() {
  M1.call(this);
  M2.call(this);
}

// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
s.hello // 'hello'
s.world // 'world'
```

### 抽象方法和抽象类

```javascript
function defineSubclass(superclass, constructor, methods, statics) {
  //子类继承父类
  constructor.prototype = Object.create(superclass.prototype);
  constructor.prototype.constructor = constructor;
  //复制方法和类属性
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  //返回这个类
  return constructor;
}

Function.prototype.extend = function (constructor, methods, statics) {
  return defineSubclass(this, constructor, methods, statics);
};

//抽象方法
function abstractmethod() {
  throw new Error('abstract method');
}

// AbstractSet 抽象类，定义抽象方法 contains
function AbstractSet() {
  throw new Error("Can't instantiate abstract classes");
}

AbstractSet.prototype.contains = abstractmethod;

// NotSet是AbstractSet的一个非抽象方法
var NotSet = AbstractSet.extends(
  function NotSet(set) {
    this.set = set;
  },
  {
    contains: function (x) {
      return !this.set.contains(x);
    },
    toString: function () {
      return "~" + this.set.toString();
    }
  }
);

// AbstractEnumerableSet是AbstractSet的一个抽象子类，抽象方法 size，foreach
var AbstractEnumerableSet = AbstractSet.extends(
  function () {
    throw new Error("Can't instantiate abstract classes");
  },
  {
    size: abstractmethod,
    foreach: abstractmethod,
    isEmpty: function () {
      return this.size() === 0;
    }
  }
);

// SingletonSet是AbstractEnumerableSet的非抽象子类
var SingletonSet = AbstractEnumerableSet.extends(
  function SingletonSet(member) {
    this.member = menber;
  },
  {
    contains: function (x) {
      return x === this.member;
    },
    size: function () {
      return 1;
    }
  }
);

// AbstractWritableSet是AbstractEnumerableSet的抽象子类，定义抽象方法 add，remove
var AbstractWritableSet = AbstractEnumerableSet.extends(
  function () {
    throw new Error("Can't instantiate abstract classes");
  },
  {
    add: abstractmethod,
    remove: abstractmethod,
    union: function (that) {
      var self = this;
      that.foreach(function (v) {
        self.add(v);
      });
      
      return this;
    }
  }
);

// ArraySet是AbstractWritableSet的非抽象子类
var ArraySet = AbstractWritableSet.extends(
  function ArraySet() {
    this.values = [];
    this.add.apply(this, arguments);
  },
  {
    contains: function (v) {
      return this.values.includes(v) != -1;
    },
    size: function () {
      return this.values.length;
    },
    foreach: function (f, c) {
      this.values.forEach(f, c);
    }
  }
)
```

定义不可变类：属性不可枚举，只读，不可配置

### 数组的解构赋值

只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
console.info(x, y, z);
//结果: a b c

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();

console.info(sixth);
//结果: 5
```