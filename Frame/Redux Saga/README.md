### 简介

redux-saga是一个管理应用程序Side Effect(副作用，例如异步获取数据，访问浏览器缓存等)的redux中间件。

一个saga就像是应用程序中一个单独的线程，它独自负责处理副作用。 这个线程可以通过正常的redux action从主应用程序启动，暂停和取消，它能访问完整的redux state，也可以dispatch redux action。

redux-saga本质是解决一步action的问题

### redux-saga特征

1. 集中处理redux副作用问题
2. 被实现为generator,让异步的流程更易于读取，写入和测试
3. 类redux-thunk中间件
4. watch/worker(监听->执行)的工作形式  

### redux-saga缺点

1. redux-saga不强迫我们捕获异常，这往往会造成异常发生时难以发现原因。如果错误没有被处理，也会一层一层往上抛
2. 和其它异步中间件兼容性差 

Effect:是一个纯JavaScript对象，包含一些将被saga middleware执行的指令。redux-saga提供的工厂函数来创建Effect。

例如：你可以使用call(myfunc, ...args)指示middleware调用myfunc(...args)并将结果返回给yield effect的那个Generator。

### 安装 redux-saga

yarn add redux-saga  或者  npm install  --save redux-saga

### API

delay(ms, [val]):返回一个effect描述信息，用于阻塞执行ms毫秒，并返回val值 

put(action):创建一个Effect描述信息，用来命令middleware向Store发起一个action。 这个 effect是非阻塞型的，并且所有向下游抛出的错误(例如在reducer中)，都不会冒泡回到saga当中  

takeEvery(pattern, saga, ...args):在发起(dispatch)到Store并且匹配pattern的每一个 action上派生一个saga。推向(push) action模式

takeLatest(pattern, saga, ...args):在发起到Store并且匹配pattern的每一个action上派生一个saga。并自动取消之前所有已经启动但仍在执行中的saga任务。 

call(fn, ...args):创建一个Effect描述信息，用来命令middleware以参数args调用函数fn

apply(context, fn, [args]):和call一样

all([...effects]):创建一个Effect描述信息，用来命令middleware并行地运行多个Effect，并等待它们全部完成。这是与标准的Promise#all相当对应的API

take(pattern):创建一个Effect描述信息，用来命令middleware在Store上等待指定的action。 在发起与pattern匹配的action之前，Generator将暂停。拉取(pull) action模式，类似于action = getNextAction()

select(selector, ...args):创建一个Effect，用来命令middleware在当前Store的state上调用指定的选择器(即返回selector(getState(), ...args)的结果)

fork(fn, ...args):创建一个Effect描述信息，用来命令middleware以非阻塞调用的形式执行fn 

cancel(task):创建一个Effect描述信息，用来命令middleware取消之前的一个分叉任务。取消正在执行的任务，也将同时取消被阻塞在当前Effect中的任务。如果加入的task被取消的话，task的joiner(那些被阻塞的yield join(task))也将会被取消。yield cancel(task)不会等待被取消的任务完成(即执行其 catch 区块)。cancel Effect的行为和fork有点类似。 一旦取消发起，它就会尽快返回。一旦取消，任务通常应尽快完成它的清理逻辑然后返回。

cancelled():创建一个Effect，用来命令middleware返回该generator是否已经被取消。通常你会在finally区块中使用这个Effect来运行取消时专用的代码

spawn(fn, ...args):与fork(fn, ...args)相同，但创建的是被分离的任务。被分离的任务与其父级任务保持独立，并像顶级任务般工作。父级任务不会在返回之前等待被分离的任务终止，并且所有可能影响父级或被分离的任务的事件都是完全独立的(错误、取消)

race([...effects]):创建一个Effect描述信息，用来命令middleware在多个Effect间运行竞赛(Race)。与Promise.race()类似

all([...effects]):创建一个Effect描述信息，用来命令middleware并行地运行多个Effect，并等待它们全部完成。与Promise.all类似

actionChannel(pattern, [buffer]):创建一个Effect，用来命令middleware通过一个事件 channel对匹配pattern的action进行排序

eventChannel(subscribe, [buffer], [matcher]):使用subscribe方法创建channel，该channel将订阅一个事件源。直到感兴趣的taker被注册之前，从事件源传入的事件都将在channel中排队

throttle(ms, pattern, saga, ...args):在发起到Store并且匹配pattern的一个action上派生一个saga。 它在派生一次任务之后，仍然将新传入的action接收到底层的buffer中，至多保留(最近的)一个。但与此同时，它在ms 毫秒内将暂停派生新的任务——这也就是它被命名为节流阀(throttle)的原因。其用途，是在处理任务时，无视给定的时长内新传入的action

### 节流

描述:高频事件触发在n秒内只会执行一次，如果n秒内高频事件再次被触发，只有第一次生效

实现方式:每次触发事件时，如果当前有等待执行的延时函数，则直接return

应用:页面是否滚动到底部

```javascript
function throttle(fn) {
  let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, 500);
  };
}

function sayHi() {
  console.log(Math.random());
}

throttle(sayHi)
```

### 防抖动

描述:触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

实现方式:每次触发事件时设置一个延迟调用方法，并且取消之前的延时调用方法

缺点:如果事件在规定的时间间隔内被不断的触发，则调用方法会被不断的延迟

应用:输入框接口验证 禁止重复点击按钮

```javascript
const debounce = (fn) => {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, 500);
  };
}

function handle() {
  console.log(Math.random());
}

debounce(handle)
```

### 总结

函数防抖:将多次操作合并为一次操作进行。原理是维护一个计时器，规定在delay时间后触发函数，但是在delay时间内再次触发的话，就会取消之前的计时器而重新设置。这样一来，只有最后一次操作能被触发。

函数节流:使得一定时间内只触发一次函数。原理是通过判断是否有延迟调用函数未执行。

区别:函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数，而函数防抖只是在最后一次事件后才触发一次函数。 

throttle(节流):在一定时间内(例30内)，不管方法被调动多少次，只会在30s后再调动第二次方法。
debounce(防抖):在一定时间内(例5s内)，不管调动多少次方法，也只执行一次方法。

从redux-thunk到redux-saga实践：[https://github.com/Pines-Cheng/blog/issues/9](https://github.com/Pines-Cheng/blog/issues/9)

Redux异步方案选型：[https://segmentfault.com/a/1190000007248878](https://segmentfault.com/a/1190000007248878)

不需要权限的api：[https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)

redux-saga-demo：redux-saga的简单使用

shopping-cart：模拟数据实现购物车，商品列表和Checkout点击事件使用redux-saga，state的数据设计特别有意思
async：redux-saga接口请求