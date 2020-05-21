自述里面有一些学习Redux的资源和教程

- 自述-->学习 Redux
- 介绍-->学习资源

### 安装

#### 安装 redux

yarn add redux  或者  npm install  --save redux

#### 安装 React 绑定库

yarn add react-redux  或者  npm install --save react-redux

#### 安装 开发者工具

yarn add redux-devtools  或者 npm install --save-dev redux-devtools

### Store

应用中所有的 state 都以一个对象树的形式储存在一个唯一的 store 中。 惟一改变 state 的办法是触发 action。一般会通过 store.dispatch() 将 action 传到 store。

reducer返回新的 state 时，所有订阅 store.subscribe(listener) 的监听器都将被调用；监听器里可以调用 store.getState() 获得当前 state 。

### Action

Action 是一个描述已发生事件的普通对象。 我们约定，Action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。除了 type 字段外，Action 对象的结构完全任意决定。

#### Action 创建函数 

就是生成 action 的方法。

```javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

发起 dispatch
```javascript
dispatch(addTodo(text))
//或者创建一个被绑定的 action 创建函数来自动 dispatch
const boundAddTodo = text => dispatch(addTodo(text))
//然后直接调用
boundAddTodo(text);
```

store 里能直接通过 store.dispatch() 调用。
bindActionCreators() 可以自动把多个 Action 创建函数 绑定到 dispatch() 上。

#### Action模板函数

```javascript
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[arg] = args[index]
    })
    return action
  }
}

const ADD_TODO = 'ADD_TODO'
const EDIT_TODO = 'EDIT_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

export const addTodo = makeActionCreator(ADD_TODO, 'text')
export const editTodo = makeActionCreator(EDIT_TODO, 'id', 'text')
export const removeTodo = makeActionCreator(REMOVE_TODO, 'id')

dispatch(addTodo('111'))
dispatch(editTodo('1','222'))
dispatch(removeTodo('1'))
```

也可以用 redux-act 和 redux-actions  工具库来生成 action creator

### Reducer

reducer 是描述 action 如何改变 state 树。

reducer 的形式为 (previousState, action) => newState 的纯函数。惟一的要点是当 state 变化时需要返回全新的对象，而不是修改传入的参数。

#### 永远不要在 reducer 里做这些操作

1. 修改传入参数；
2. 执行有副作用的操作，如 API 请求和路由跳转；(后续可以使用)
3. 调用非纯函数，如 Date.now() 或 Math.random()。

#### reducer 注意事项

1. 不要修改 state。 

   使用 Object.assign( {} , state , { ... } ) 必须把第一个参数设置为空对象。

   也可以使用对象展开运算符 { ...state, ...newState } 。

2. 在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。

#### reducer 合成

```javascript
function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action),
  }
}

等价于

const todoApp = combineReducers({
  visibilityFilter,
  todos,
})

const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
})
	
等价于

function reducer(state = {}, action) { 
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
  }
}
```

#### reducer模板函数

```javascript
// reducer模板函数
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

// 调用
export const todos = createReducer([], {
  [ActionTypes.ADD_TODO]: (state, action) => {
    const text = action.text.trim()
    return [...state, text]
  }
})
```

### 异步Action

#### 异步 action 创建函数

使用 redux-thunk 中间件后 action 创建函数除了返回 action 对象(同步 action 创建函数)，还可以返回函数(异步 action 创建函数)。这时，这个 action 创建函数就成为了 thunk。

当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。

```javascript
function fetchPosts(subreddit) {
  // Thunk middleware 知道如何处理返回函数的情况
  // 把 dispatch 作为参数传递给函数 以便在函数内部也能 dispatch action
  // 还接受 getState 方法参数
  return (dispatch, getState) => {
    
    // API 开始发起请求 发起同步action 更新应用的 state
    dispatch(requestPosts(subreddit))
    
    // Thunk middleware 函数的返回值会被 dispatch 方法的返回值传递
    return fetch(' ')
      .then(response => response.json())
    
    // API 请求返回结果 发起同步action 更新应用的 state
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

// 引人 Redux Thunk middleware
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,  // 允许我们 dispatch() 函数
    loggerMiddleware  // 一个很便捷的 middleware，用来打印 action 日志
  )
)

// store 发起异步action 
store.dispatch(fetchPosts('reactjs'))
// 异步action创建函数的返回函数的返回值作为 dispatch 方法的返回值
.then(() => console.log(store.getState()))
```

Thunk middleware 并不是 Redux 处理异步 action 的唯一方式，还可以

redux-thunk 来 dispatch 函数。

redux-promise 或者 redux-promise-middleware 来 dispatch Promise。

redux-observable 来 dispatch Observable。

redux-saga 中间件来创建更加复杂的异步 action。

redux-pack 中间件 dispatch 基于 Promise 的异步 Action。  

#### 异步数据流

当 middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象。(需要使用普通对象作为最后一个被 dispatch 的 action ，来将处理流程带回同步方式)

#### 中间件(Middleware)

中间件提供的是位于 action 被发起之后，到达 reducer 之前做的事情。

```javascript
//自定义中间件
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
```

#### API

##### bindActionCreators(actionCreators, dispatch)

actionCreators参数：一个 action creator，或者一个 value 是 action creator 的对象

dispatch参数：一个由 Store 对象提供的 dispatch 函数

返回值： 一个与原对象类似的对象，只不过这个对象的 value 都是会直接 dispatch 原 action creator 返回的结果的函数。如果传入一个单独的函数作为 actionCreators，那么返回的结果也是一个单独的函数。

使用场合：

1.需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它  

```javascript
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }	
}
		
import { bindActionCreators } from 'redux'
import * as actions from './actions'
console.log(actions)
// { addTodo: Function }

class TodoListContainer extends Component {
  constructor(props) {
    super(props)
    this.actions = bindActionCreators(actions, this.props.dispatch)
    console.log(this.actions)
    // { addTodo: Function }
  }
  
  componentDidMount() {
    // 发起 addTodo 的 Action
    this.actions.addTodo('Use Redux')
  }
  
  render() {
    let { todos } = this.props
    // 1.把 bindActionCreators 返回值传递给子组件，子组件察觉不到 Redux的存在
    return <TodoList todos={todos} {...this.actions} />
    // 2.把 dispatch 传递给子组件，子组件还需要引入 action creator
    // return <TodoList todos={todos} dispatch={dispatch} />
  }
}

export default connect(state => ({ todos: state.todos }))(TodoListContainer)
```

2.可以在 connect 中的 mapDispatchToProps 参数中使用

```javascript
export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }	
}

import * as actions from './actions'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  // 发起 Action 只需要 this.props.actions.addTodo('Use Redux') 
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp)
```
todo-list:区分容器组件和展示组件(同步 action 创建函数)

todo-list2:不区分容器组件和展示组件(同步 action 创建函数)

todo-list3:网络请求 (redux-thunk 异步 action 创建函数) 

todo-list4:自定义中间件  

Redux 源码的一些示例：[https://github.com/reduxjs/redux/tree/master/examples](https://github.com/reduxjs/redux/tree/master/examples)
