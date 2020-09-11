### 安装 Sass 

yarn add sass-loader 和 yarn add node-sass
或者 npm install  --save sass-loader 和 npm install  --save node-sass

### 基本语法 

#### 变量 

声明和使用：

1. 使用\$符号开头来标识变量。
2. 在声明变量时，变量值也可以引用其他变量。
3. 用中划线或者下划线分隔多个单词，推荐采用中划线，用中划线声明的变量可以使用下划线的方式引用，反之亦然。
4. 任何css属性值都可以赋值给sass变量，可以是空格分割的多个属性值(数组类型数据)，还可以是逗号分割的多个属性值(数组类型数据)。 
5. 变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用(局部变量)，不在嵌套规则内定义的变量则可在任何地方使用(全局变量)。
6. 局部变量转换为全局变量可以添加!global声明

```scss
$nav-color: #FF0000;  //可以在整个样式表中使用
$highlight-border: 1px solid $nav-color;  //变量值引用其他变量
$basic-border: 1px solid black;  //空格分割的多个属性值
$plain-font: 'Myriad Pro', Myriad, 'Helvetica Neue';  //逗号分割的多个属性值
nav {
  $width: 100px;  //只能在这个规则块中使用
  width: $width;
  color: $nav-color;
  border-bottom: $basic_border;
  border-top: $highlight-border;
}
//编译后
nav {
  width: 100px;
  color: #F90;
  border-bottom: 1px solid black;
  border-top: 1px solid #FF0000;
}

#main {
  $width: 5em !global;
  width: $width;
}
#sidebar {
  width: $width;
}
//编译后
#main {
  width: 5em;
}
#sidebar {
  width: 5em;
}
```

#### 嵌套CSS 规则

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```

```scss
/* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

sass在解开嵌套规则时就会把父选择器(#content)通过一个空格连接到子选择器的前边(article和aside)形成(#content article和#content aside)。这种在CSS里边被称为后代选择器。

##### 父选择器的标识符&

```scss
给a标签增加hover伪类
article a {
  color: blue;
  :hover { color: red }
}
/* 编译后 */   article元素内a标签的所有子元素在被hover时都会变成红色  不正确
article a { color: blue }
article a :hover { color: red }

article a {
  color: blue;
  &:hover { color: red }
}
/* 编译后 */   article元素内的a标签在被hover时都会变成红色
article a { color: blue }
article a:hover { color: red }
```

```scss
父选择器之前添加选择器
#content aside {
  color: red;
  body.ie & { color: green }
}
/*编译后*/
#content aside {color: red};
body.ie #content aside { color: green }
```

##### 群组选择器的嵌套  

```scss
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
/*编译后*/
.container h1, .container h2, .container h3 {margin-bottom: .8em};

nav, aside {
  a {color: blue}
}
/*编译后*/
nav a, aside a {color: blue};
```

##### 嵌套属性

嵌套属性的规则：把属性名从中划线-的地方断开，在根属性后边添加一个冒号:，紧跟一个{ }块，把子属性部分写在这个{ }块中。sass会把你的子属性一一解开，把根属性和子属性部分通过中划线-连接起来。

```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}
/*编译后*/
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}

nav {
  border: 1px solid #ccc {
    left: 0px;
    right: 0px;
  }
}
/*编译后*/
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

#### 导入sass文件

@import规则在生成css文件时就把相关文件导入进来，被导入文件中定义的变量和混合器均可在导入文件中使用。
@import规则并不需要指明被导入文件的全名，可以省略文件后缀。

```scss
@import 'colors';
@import 'mixins';
/*等同于*/
@import 'colors.scss';
@import 'mixins.scss';
```

##### 使用sass局部文件

为@import命令而编写的sass文件，并不需要生成对应的独立css文件，这样的sass文件称为局部文件。
约定sass局部文件的文件名以下划线开头，这样，sass就不会在编译时单独编译这个文件输出css，而只把这个文件用作导入。
当你@import一个局部文件时，还可以不写文件的全名，即省略文件名开头的下划线。例如：导入themes/_night-sky.scss这个局部文件里的变量，只需要在样式表中写@import 'themes/night-sky'。

##### 默认变量值

!default用来声明变量默认值，如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。
变量是 null 空值时将视为未被 !default 赋值。

```scss
_blue-theme.scss局部文件

$fancybox-width: 400px !default;
.fancybox {
  width: $fancybox-width;
}
如果导入_blue-theme.scss局部文件之前声明了一个$fancybox-width变量，
那么局部文件中对$fancybox-width赋值400px的操作就无效。如果用户没有做这样的声明，
则$fancybox-width将默认为400px；

$content: null;
$content: "Non-null content" !default;
#main {
  content: $content;
}
/*编译后*/
#main {
  content: "Non-null content";
}
```

##### 嵌套导入

sass允许@import命令写在css规则内，这种导入方式下，生成对应的css文件时，局部文件会被直接插入到css规则内导入它的地方。局部文件中定义的所有变量和混合器，也会在这个规则范围内生效。这些变量和混合器不会全局有效。

```scss
_blue-theme.scss局部文件
aside {
  background: blue;
  color: white;
}

text.scss
.blue-theme {@import 'blue-theme'}  
//_blue-theme.scss局部文件的变量和混合器只在.blue-theme里面有效，不会在全局有效

/*等同于*/
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```

#### 静默注释

静默注释，其内容不会出现在生成的css文件中。以//开头，注释内容直到行末。

```scss
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```
#### 混合器

混合器使用@mixin标识符定义，通过@include来使用这个混合器，可以放在任何地方。

```scss
@mixin rounded-corners {
  border-radius: 5px;
}
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
/*编译后*/
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  border-radius: 5px;
}
```

##### 何时使用混合器

判断一组属性是否组合成混合器，一条经验法则就是能否为这个混合器想出一个好的名字。如果能找到很好的短名字来描述这些属性修饰的样式，比如rounded-corners fancy-font或者no-bullets，那么能够构造合适的混合器。如果没有，那么构造混合器可能并不合适。

##### 混合器中的CSS规则

混合器中不仅可以包含属性，也可以包含css规则，包含选择器和选择器中的属性，还可以使用sass的父选择器标识符&，

```scss
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
ul.plain {
  color: #444;
  @include no-bullets;
}
/*编译后*/
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```

##### 参数

```scss
//1.传递参数
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
a {
  @include link-colors(blue, red, green);
}

/*编译后*/
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }

//2.给指定参数传值
//通过$name: value的形式指定每个参数的值。这样参数顺序就不必再在乎
a {
  @include link-colors($normal: blue, $visited: green, $hover: red);
}

/*编译后*/
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }

//3.参数默认值
//使用$name: default-value的声明形式，默认值可以是任何有效的css属性值，甚至是其他参数的引用

@mixin link-colors($normal, $hover: $normal, $visited: $normal){
  color: $normal
    &:hover { color: $hover; }
    &:visited { color: $visited; }
}	
a {
  @include link-colors(red);
}

/*编译后*/
a { color: red; }
a:hover { color: red; }
a:visited { color: red; }

//4.参数不确定时，可以用...声明(放在最后)
@mixin box-shadow($shadows...) {
  -moz-box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}
/*编译后*/
.shadowed {
  -moz-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  -webkit-box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}

//5.传递的值有有多个时，也可以用...声明(放在最后)
@mixin colors($text, $background, $border) {
  color: $text;
  background-color: $background;
  border-color: $border;
}
$values: #ff0000, #00ff00, #0000ff;
.primary {
  @include colors($values...);
}
/*编译后*/
.primary {
  color: #ff0000;
  background-color: #00ff00;
  border-color: #0000ff;
}

//6.在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 @content 标志的地方
    
@mixin apply-to-ie6-only {
  * html {
    @content;
  }
}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}
/*编译后*/
* html #logo {
  background-image: url(/logo.gif);
}

//7. 上面的形式可以简写，@mixin 可以用 = 表示，而 @include 可以用 + 表示

=apply-to-ie6-only
  * html
  @content

+apply-to-ie6-only
  #logo
  background-image: url(/logo.gif)
/*编译后*/
* html #logo {
  background-image: url(/logo.gif);
}
```

#### 选择器继承

使用@extend来实现继承。

```scss
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
/*编译后*/
.error, .seriousError {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}

注意：
.seriousError不仅会继承.error自身的所有样式，
任何跟.error有关的组合选择器样式也会被.seriousError以组合选择器的形式继承。

.error {
  border: 1px solid red;
  background-color: #fdd;
}
.error a{
  color: red;
  font-weight: 100;
  &:hover {
    text-decoration: underline;
  }
}
h1.error {
  font-size: 1.2rem;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
/*编译后*/
.error, .seriousError {
  border: 1px solid red;
  background-color: #fdd;
}
.error a, .seriousError a {
  color: red;
  font-weight: 100;
}
.error a:hover, .seriousError a:hover {
  color: red;
  font-weight: 100;
}

h1.error, h1.seriousError {
  font-size: 1.2rem;
}
.seriousError {
  border-width: 3px;
}

//多重继承
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}
/*编译后*/
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; 
}
.attention, .seriousError {
  font-size: 3em;
  background-color: #ff0; 
}
.seriousError {
  border-width: 3px; 
}

//继承延伸
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
.criticalError {
  @extend .seriousError;
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%;
}
/*编译后*/
.error, .seriousError, .criticalError {
  border: 1px #f00;
  background-color: #fdd; 
}
.seriousError, .criticalError {
  border-width: 3px; 
}
.criticalError {
  position: fixed;
  top: 10%;
  bottom: 10%;
  left: 10%;
  right: 10%; 
}
```

##### @extend原理

如果.seriousError @extend .error， 那么样式表中的任何一处.error都用.error .seriousError这一选择器组进行替换(可以查看编译后的css)。

#### SassScript

##### 数据类型  

* 数字：1，2，10px，带单位的也是数字，不是字符串。  
* 字符串：有引号字符串与无引号字符串，"foo", 'bar', baz。  
* 颜色：blue，#04a3f9，rgba(255,0,0,0.5)。  
* 布尔值：true，false。  
* 空值：null。  
* 数组(list)：用空格或逗号作分隔符，1.5em 1em 0 2em，Helvetica, Arial, sans-serif。  
* maps：类似于JS的object，(key1: value1, key2: value2)。

内外两层数组使用不同的分隔方式来表示二维数组，例如：1px 2px, 5px 6px，如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，例如： (1px 2px) (5px 6px)。  

用()表示不包含任何值的空数组。

基于逗号分隔的数组允许保留结尾的逗号，尤其是需要声明只包含单个值的数组时。例如：(1,)表示只包含 1 的数组，而(1 2 3,)表示包含 1 2 3 这个以空格分隔的数组的数组。

Maps可用于任何Lists可用的地方，在List函数中 Map会被自动转换为List ， 如 (key1: value1, key2: value2)会被List函数转换为 key1 value1, key2 value2 ，反之则不能。

##### 运算

+可用于连接字符串 
如果有引号字符串(位于 + 左侧)连接无引号字符串，运算结果是有引号的，相反，无引号字符串(位于 + 左侧)连接有引号字符串，运算结果则没有引号。

```scss
p:before {
  content: "Foo " + Bar;
  font-family: sans- + "serif";
}
/*编译后*/
p:before {
  ontent: "Foo Bar";
  font-family: sans-serif; 
}
```

除法运算：
以下三种情况 / 将被视为除法运算符号，其余作为分隔符使用。

1. 如果值，或值的一部分，是变量或者函数的返回值。
2. 如果值被圆括号包裹。
3. 如果值是算数表达式的一部分。

```scss
p {
  font: 10px/8px; 
  $width: 1000px;
  width: $width/2;
  height: (500px/2);
  margin-left: 5px + 8px/2px; 
}
/*编译后*/
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; 
}
```

##### 插值语句

通过插值语句(#{})可以在选择器或属性名以及属性值中中使用变量。还可以将有引号字符串将被编译为无引号字符串(便于在 mixin 中引用选择器名)。

```scss
$name: foo;
$attr: border;
$font-size: 12px;
$line-height: 30px;
p.#{$name} {
  #{$attr}-color: blue;
  font: #{$font-size}/#{$line-height};
}
/*编译后*/
p.foo {
  border-color: blue;
  font: 12px/30px; 
}

@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: "Hi, Firefox users!";
  }
}
@include firefox-message(".header");
/*编译后*/
body.firefox .header:before {
  content: "Hi, Firefox users!"; 
}
```

#### 控制指令 

##### @if 

@if 的表达式返回值不是false或者null时，条件成立，
@if 声明后面可以跟多个@else if声明，或者一个@else声明。

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
/*编译后*/
p {
  border: 1px solid; 
}

$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
/*编译后*/
p {
  color: green; 
}
```
##### @for

@for $var from \<start>through \<end>，条件范围包含\<start>与\<end>的值。
@for $var from \<start>to \<end>，条件范围只包含\<start>的值不包含\<end>的值。
\<start> 和 \<end> 必须是整数值。  

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
/*编译后*/
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
.item-3 {
  width: 6em; 
}
```

##### @each

@each 指令的格式是 @each $var in \<list>。

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png')
  }
}
/*编译后*/
.puma-icon {
  background-image: url('/images/puma.png'); 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); 
}
.egret-icon {
  background-image: url('/images/egret.png'); 
}
.salamander-icon {
  background-image: url('/images/salamander.png');
}  
```
##### @while 

@while 指令重复输出格式直到表达式返回结果为 false。

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
/*编译后*/
.item-6 {
  width: 12em; 
}
.item-4 {
  width: 8em; 
}
.item-2 {
  width: 4em; 
}
```
#### 函数

函数用@function声明，用@return返回值，通过函数名调用函数。函数也可以和@mixin一样给指定参数传值和参数默认值。建议在自定义函数前添加前缀避免命名冲突，便于其他人阅读代码时知道这不是 Sass 或者 CSS 的自带功能。

```scss
$grid-width: 40px;
$gutter-width: 10px;
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}
#sidebar { width: grid-width(5); }或者#sidebar { width: grid-width($n: 5); }
/*编译后*/
#sidebar { width: 240px; }
```
