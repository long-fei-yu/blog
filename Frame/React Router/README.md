### 底层原理

两种路由实现方式：hash-mode(锚点)、html5-mode

hash-mode：监听hashchange事件，当URL变化时，进行页面跳转，地址会有#。

html5-mode：为history添加了pushState()、replaceState()，以及onpopstate事件。地址没有#，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。避免出现这种情况，需要服务器把所有路由都重定向到根页面。

### 安装

#### 安装 react-router

yarn add react-router  或者  npm install  --save react-router

#### web应用需要安装 react-router-dom

yarn add react-router-dom  或者  npm install  --save react-router-dom

### API

#### Hooks

##### useRouteMatch

说明：接受一个path字符串作为参数。当参数的path与当前的路径相匹配时，useRouteMatch会返回match对象，否则返回null。

使用：组件自身的显隐和当前路径相关时。比如：后台管理系统时，网页的Header只会在登录页显示，登录完成后不需要显示。

#### \<Prompt>

说明：离开页面之前的提示，会以弹窗的形式展示

参数：

- message：提示内容

- when：是否始终提示

  使用：防止用户离开的状态时使用，比如：表单已被填写一半时，关闭网页

#### \<Redirect>

说明：重定向路由，新位置将覆盖历史记录堆栈中的当前位置

参数： 

- to：重定向的url地址
- push：为true时，把新地址加入到访问的历史记录里面，并不会替换掉当前的地址
- from：需要匹配的将要被重定向的路径
- exact：和Route的exact一样
- strict：和Route的strict一样
- sensitive：和Route的sensitive一样

使用：可以来指定默认页面

注意：\<Redirect>用from进行匹配，如果没有from，那么将匹配成功任何当前的访问地址

#### \<Route>

说明：路线，path与当前URL匹配时呈现一些UI

参数：

- component：当访问地址和路由匹配成功，component会被渲染
- render：当访问地址和路由匹配成功，返回React组件的方法
- children：返回一个React组件的方法，没匹配成功也会调用，根据match参数可以判断是否匹配成功
- path：可以被path-to-regexp解析的有效url路径
- exact：为true时，则要求路径与location.pathname必须完全匹配
- strict：为true时，有结尾斜线的路径只能匹配有斜线的location.pathname
- location：之前所在的位置
- sensitive：为true时，path与路径location.pathname区分大小写   

注意：

1. 渲染的三种方法：component，render，children。都有match、location、history参数。children优先级最高，component优先级次之，render优先级最低。
2. \<Route>用path进行匹配，如果没有path，那么将匹配成功任何当前的访问地址

#### \<Router>

说明：路由器，所有路由器组件的通用底层接口，通常应用将使用下列高级路由器之一代替：

- BrowserRouter：使用于现代浏览器，支持H5 history API
- HashRouter：常用于旧款浏览器。根据不同的hashType
- MemoryHistory：常用于非DOM环境，例如React Native或者测试
- NativeRouter：Native路由
- StaticRouter：静态路由
  	
  注意：\<Router>下只允许一个子元素，如存在多个则会报错。可以用\<div>\</div> 将其他元素包裹起来

#### \<BrowserRouter>

说明：使用HTML5提供的history API(pushState，replaceState和popstate事件)来保持UI和url的同步

参数：

- basename：当前位置的基准url。如果你的页面部署在服务器的二级(子)目录，你需要将  basename设置到此子目录。格式是以斜杠开头，但不能以斜杠结尾    

```javascript
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // 渲染为 <a href="/calendar/today">
```

- getUserConfirmation：导航需要确认时执行的函数，默认使用window.confirm()
- forceRefresh：为true时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持HTML5 的history API时，才设置为true
- keyLength：location.key的长度，默认为6
- children：要渲染的子元素，在React低于16，必须使用单个子元素，因为render()不能返回多个元素。如果需要多个元素，则可以将它们包装在extra中\<div>   

#### \<HashRouter>

说明：使用url的hash(例如：window.location.hash)来保持UI和url的同步。由于使用hash的方式记录导航历史不支持location.key和location.state，该技术仅用于支持传统的浏览器

参数：

- basename：同BrowserRouter的basename
- getUserConfirmation：同BrowserRouter的getUserConfirmation
- hashType：用于的编码类型window.location.hash
- children：同BrowserRouter的children  

#### \<Link>

说明：路由跳转

参数：

- to：跳转，可以是字符串 对象 函数
- replace：如果为true，单击链接将替换历史记录堆栈中的当前条目
- innerRef：访问组件的ref
- component：链接到组件  

#### \<NavLink>

说明：路由跳转

参数：

- activeClassName：导航选中时的样式名
- activeStyle：导航选中时的样式
- exact：和Route的exact一样
- strict：和Route的strict一样
- isActive： 是否处于活动状态的回调
- location：
- aria-current：  

#### \<Switch>

说明：开关，渲染与location匹配的第一个\<Route>或\<Redirect>

使用： 使得当前只有一个Route或Redirect渲染  

#### history

属性和方法：

- length：历史记录堆栈中的条目数
- action：当前动作(PUSH, REPLACE, or POP)
- location：当前位置。可能具有以下属性:

- [ ] pathname：URL的路径
- [ ]  search：URL查询字符串
- [ ] hash：URL哈希片段
- [ ]  state：特定于位置的状态，例如push(path,state)在将该位置推入堆栈时所提供的状态。仅在BrowserRouter和MemoryRouter中可用

- push(path,[state])：将新条目推入历史记录堆栈
- replace(path,[state])：替换历史记录堆栈上的当前条目
- go(n)：通过n条目在历史记录堆栈中移动指针
- goBack()：等同于go(-1)，后退
- goForward()：等同于go(1)，前进
- block(prompt)：阻止跳转

注意：history对象是可变的，不要从history.location直接获取，而是从\<Route>的prop来获取location 

#### withRouter

说明：withRouter将match, location, history传递给被包装的组件

#### match

属性： 

- params：路径参数，通过解析URL中动态的部分获得的键值对
- isExact：为true时，路径与location.pathname必须完全匹配
- path：用于匹配的路径模式
- url：URL的匹配部分  

#### generatePath

说明：生成路径

参数： 

- pattern：为路径属性提供给Route组件的模式

- params：要使用的模式的相应参数的对象

  使用：如果提供的参数和路径不匹配，将引发错误

  例如：  

```javascript
import { generatePath } from 'react-router';
generatePath('/user/:id/:entity(posts|comments)', {
  id: 1,
  entity: 'posts',
})
返回值为：'/user/1/posts'
```
react-router-demo：React Router的一些基本使用

react-router-custom：利用hash-mode原理结合Context自定义React Router，实现的功能：HashRouter Route Link Redirect Switch以及嵌套路由

react-router-dom 中文文档：https://react-guide.github.io/react-router-cn

react-router-dom 中文文档：https://segmentfault.com/a/1190000039190541

react-router-dom 中文文档：http://react-router.docschina.org

React Router 中文文档(v5)：https://juejin.cn/post/6844904093694033927

