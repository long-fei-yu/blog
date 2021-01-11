### ESLint

#### 描述

统一编码风格, 检查代码语法规范

#### 安装

yarn add eslint --dev

#### 初始化配置文件

eslint --init 

#### 配置方式

1. 根目录创建eslintrc.js、 eslintrc.json、 eslintrc.yml任一文件配置
2. 文件内部以行内的形式来配置eslint规则
3. package.json使用eslintConfig字段进行配置

```javascript
//package.json
{
  ......
  "eslintConfig": {
    ......
  }
  ......
}
```
#### parserOptions

语法解析器选项

ecmaVersion：ECMAScript 版本，2014(5 默认值)，2015(6)，2016(7)，2017(8)，2018(9)，2019(10)

sourceType：script(默认)或module(代码是ECMAScript模块)

ecmaFeatures：额外的语言特性  

* globalReturn：允许在全局作用域下使用return语句  
* impliedStrict：启用全局strict mode(如果ecmaVersion是5或更高)  
* jsx：启用JSX  
* experimentalObjectRestSpread：启用实验性的object rest/spread properties支持

如果要支持React，需要安装eslint-plugin-react插件配置。

如果要支持新的ES6全局变量或类型，需要设置{ "env":{ "es6": true } }。

```javascript
{
  "extends": [
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    //解决eslint-plugin-react插件警告
    "settings": {
      "react": {
        "version": "detect"
      }
    }
}
```
#### parser

解析器

Espree(默认值) 

以下解析器与 ESLint 兼容  

* Esprima  

* Babel-ESLint：对Babel解析器的包装，使其能够与ESLint兼容  

* typescript-eslint/parser：将TypeScript转换成与estree兼容的形式，以便在ESLint中使用  
	
* Espree
	
	#### processor

	处理器
	插件可以提供处理器，由插件名/处理器名(a-plugin/a-processors)组成
	
	```javascript
	{
	  "plugins": ["a-plugin"],
	  "processor": "a-plugin/a-processor"
	}
	```
	
	```javascript
	//对*.md 文件使用处理器a-plugin/markdown*
	
	{
	  "plugins": ["a-plugin"],
	  "overrides": [
	    {
	      "files": ["*.md"],
	      "processor": "a-plugin/markdown"
	    }
	  ]
	}
	```
	
	#### env
	
	运行环境，可以同时定义多个
	运行环境定义了一组预定义的全局变量

	```javascript
	//js文件用注释指定全局变量
	
	/* eslint-env browser, node */
	
	"env": {
	  "browser": true,
	  "node": true,
	  "es6": true
	}
	```

	#### globals
	
	全局变量
	
	writable：允许重写变量，readonly：不允许重写变量，off：禁用全局变量

	旧值false和"readable"等同于"readonly"，旧值true和"writeable"等同于"writable"
	
	```javascript
	//js文件用注释指定全局变量
	
	/* global var1:writable, var2:writable */
	
	"globals": {
	  "var1": "writable",
	  "var2": "readonly"
	}
	```
	
	#### plugins
	
	插件
	
	插件名中的"eslint-plugin-"前缀可以省略
	
	```javascript
	"plugins": [
	  "react",
	]
	```
	
	#### rules
	
	规则
	
	校验规则组成  
	
* 规则名: [错误级别, 附加选项]  

* 规则名: 错误级别			

#### 错误级别  

* off或0：关闭规则  

* warn或1：开启规则，使用警告级别的错误，不会导致程序退出  

* error或2：开启规则，使用错误级别的错误，当被触发的时候，程序会退出  

  ```javascript
  //js文件用注释指定全局变量
  
  /* eslint eqeqeq: "off", quotes: ["error", "double"], "plugin1/rule1": "error" */	
  "rules": {
    "eqeqeq": "off",
    "quotes": ["error", "double"],
    "plugin1/rule1": "error"  //插件(删除"eslint-plugin-"前缀)plugin1的rule1规则
  }
  ```

  #### settings

  共享设置

  ```javascript
  "settings": {
    "sharedData": "Hello"
  }
  ```

  #### extends

  基础配置

  ESLint内置规则集的一个子集：eslint:recommended

  一些插件(eslint-config-react)也可以输出一个或多个命名的配置，extends属性值可以由以下组成：plugin:包名(省略"eslint-plugin-"前缀，react)/配置名称(recommended)

#### 扩展(或覆盖)规则

* 启用额外的规则  

* 改变继承的规则级别而不改变它的选项

  - [ ] 基础配置："eqeqeq": ["error", "allow-null"]
  - [ ]  派生的配置："eqeqeq": "warn"
  - [ ]  最后生成的配置："eqeqeq": ["warn", "allow-null"]  

* 覆盖基础配置中的规则的选项

  - [ ] 基础配置："quotes": ["error", "single", "avoid-escape"]
  - [ ] 派生的配置："quotes": ["error", "single"]
  - [ ] 最后生成的配置："quotes": ["error", "single"]
	
	```javascript
	{
	  "plugins": [
	    "react"
	  ],
	  "extends": [
	    "eslint:recommended",
	    "plugin:react/recommended"
      ]
    }
	```
	
	#### overrides
	
	禁用一组文件的配置文件中的规则
	
	```javascript
	"overrides": [
	  {
	    "files": ["*-test.js","*.spec.js"],
	    "rules": {
	      "no-unused-expressions": "off"
	    }
	  }
	]
	```

	```javascript
	//bin目录下的js文件和lib目录下的js文件的规则是"quotes": ["error", "single"]
	//任何以.test.js后缀的文件的规则是"quotes": ["error", "double"]
	//**表示任何目录，*表示任何文件
	
	{
	  "rules": {
	    "quotes": ["error", "double"]
	  },
	}
	```
	
	```javascript
    "overrides": [
      {
        //应用的文件
        "files": ["bin/*.js", "lib/*.js"],
        //排除的文件
        "excludedFiles": "*.test.js",
        //规则
        "rules": {
          "quotes": ["error", "single"]
        }
      }
    ]
  ```
	#### root
  
	为true时，停止在父级目录中寻找
  
	your-project
	├── .eslintrc
	├── package.json
	├── lib
	│ └── source.js
	└─┬ tests
	├── .eslintrc
	└── test.js  
	
* 离要检测的文件最近的.eslintrc文件作为最高优先级，然后才是父目录里的配置文件  

* 同一目录下.eslintrc和package.json同时存在，.eslintrc优先级比package.json，package.json不会被使用   

* 在文件所在目录开始，在目录树中依次向上搜索配置文件，直到根目录，或者直到找到一个包含root: true参数的配置文件，最终得到一个配置文件列表  

* lib目录下的所有文件将使用根目录里的.eslintrc文件作为它的配置文件  

* test目录，your-project/.eslintrc之外，它还会用到your-project/tests/.eslintrc。是基于这两个.eslintrc 文件的组合，并且离的最近的一个优先级最高

疑问：tests/.eslintrc的"root": true时，test.js有错误好像没法提示

#### .eslintignore

忽略文件和目录

根目录创建一个.eslintignore去忽略特定的文件和目录，或者package.json文件中配置eslintIgnore字段来指定忽略文件。

.eslintignore文件特性  
* 以#开头的行被当作注释，不影响忽略模式  

* 忽略模式同.gitignore规范

* 以 ! 开头的行是否定模式，它将会重新包含一个之前被忽略的模式

  ```javascript
  //package.json
  {
    ......
    "eslintIgnore": ["hello.js", "world.js"]
      ......
  }
  ```

  ```javascript
  //.eslintignore
  **/*.js		//忽略所有的js文件
  
  //忽略build目录下除了build/index.js的所有文件
  build/*			
  !build/index.js	
  
  node_modules/*		//忽略node_modules目录(默认情况下不会忽略)
  ```

  #### git commit 集成

  安装插件：yarn add husky --dev 

  ```javascript
  //package.json
  {
    "husky": {
      "hooks": {
        "pre-commit": "ESLint运行的命令"
      }
    },
  }
  ```

  #### Prettier

  ##### 描述

  代码格式化工具

  ##### 安装

  yarn add prettier --dev

  ##### 配置方式

  - [ ] 根目录创建.prettierrc.js、 .prettierrc.json、 .prettierrc.yml任一文件配置
  - [ ] package.json使用prettier字段进行配置

##### Prettier 所有配置项

|	配置项	|	默认值	|	建议取值	|	意义   |
|	----	|	----	|	----		|	---- |
|printWidth|80|120|超过最大值换行|
|tabWidth|2|4|指定每个缩进的空格数量|
|useTabs|false|false|行的缩进是否使用 Tab 而不是空格|
|semi|true|true|语句行尾是否添加分号|
|singleQuote|false|true|字符串是否使用单引号而不是双引号|
|quoteProps|"as-needed"|"as-needed"|对象的属性是否要加引号|
|jsxSingleQuote|false|false|JSX 里是否使用单引号而不是双引号|
|trailingComma|"none"|"es5"|多行时任何可能的地方是否添加尾逗号|
|bracketSpacing|true|true|对象字面量的大括号内部是否添加空格|
|jsxBracketSameLine|true|false|是否将>放置在多行 JSX 元素最后一行的结尾，而不是放在下一行|
|arrowParens|"avoid"|"avoid"|箭头函数只有一个参数时，参数是否使用圆括号|
|rangeStart|0|0|被格式化文件的行起点|
|rangeEnd|Infinity|Infinity|被格式化文件的行终点|
|parser|-|-|指定使用的解析器|
|filepath|-|-|指定使用哪个文件来指明使用哪个解析器|
|requirePragma|false|false|是否在文件顶部包含@prettier或@format的注释时才格式化|
|insertPragma|false|false|是否在文件顶部添加@format标记来指明该文件已经被格式化|
|proseWrap|"preserve"|"preserve"|指定如何处理 Markdown 文本的换行|
|htmlWhitespaceSensitivity|"css"|"strict"|指定如何 HTML 文件里的全局空白敏感的行为|
|endOfLine|"auto"|"lf"|采用哪一种行尾换行符|

#### ESLint和Prettier结合

##### 安装

yarn add eslint-plugin-prettier eslint-config-prettier --dev 

eslint-plugin-prettier：使用Prettier进行格式化的ESLint插件，它会将Pretter作为ESLint的一条规则来运行并进行格式化，然后与格式化之前的代码进行对比，如果出现了不一致，这个地方就会被Prettier进行标记并报告出来

eslint-config-prettier：SLint的配置库，用于关闭那些不需要或与Prettier冲突的ESLint规则。这可以让你在使用Prettier时，可以使用你最喜欢的ESLint共享配置而不使用该共享配置里有关样式。

```javascript
//.eslintrc.json	
"extends": [
  ......
  "plugin:prettier/recommended"
],

//.prettierrc.json
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "es5",
  "jsxBracketSameLine": false,
  "htmlWhitespaceSensitivity": "strict",
  "endOfLine": "lf"
}

//package.json  
//安装lint-staged：yarn add lint-staged --dev
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "./src/*.js": [
    "eslint --fix",
    "prettier --write",
    "git add"
  ]
}
```

ESLint：[https://eslint.cn](https://eslint.cn)

eslint-demo：eslint简单使用

eslint-react-demo：eslint的React使用standard模式

eslint-react-cli-demo：eslint的React脚手架使用airbnb模式

eslint-prettier-react-demo：eslint和prettier结合的React使用standard模式

eslint-prettier-react-cli-demo：eslint和prettier结合的React脚手架使用airbnb模式  