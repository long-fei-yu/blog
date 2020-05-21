### 安装

#### 安装 Toolkit

yarn add @reduxjs/toolkit  或者  npm install  --save @reduxjs/toolkit

### API

#### configureStore

创建一个 Redux store 来以存放应用中所有的 state，参数为一个对象，参数对象主要包括以下属性：

reducer属性：reducer 对象

middleware属性：  Redux 中间件的数组，如果不提供默认由 getDefaultMiddleware() 返回的中间件集合 

devTools属性：是否启用 Redux DevTools 集成。默认为 true

preloadedState属性：默认值

enhancers属性：  ???

#### getDefaultMiddleware

返回默认中间件数组，默认包含 redux-thunk 中间件

#### createReducer

返回Reducer对象，默认情况下使用Immer库

```javascript
// Redux 的 Reducer 写法
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + action.payload
    case 'decrement':
      return state - action.payload
    default:
      return state
  }
}

// Redux Toolkit 的 Reducer 写法，第一个参数为默认值，第二个参数为对象
const increment = createAction('increment')
const decrement = createAction('decrement')

const counterReducer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement.type]: (state, action) => state - action.payload
})

// Redux Toolkit 的 Reducer 写法，第一个参数为默认值，第二个参数还可以为一个回调函数，
// 这种写法主要是兼容 TypeScript
createReducer(0, builder => builder.addCase(increment, (state, action) => {=})
	builder.addCase(decrementBy, (state, action) => {})
)
```

#### createAction

返回Action对象

```javascript
// action 传递字符串
const increment = createAction('counter/increment')

let action = increment()
// { type: 'counter/increment' }

action = increment(3)
// { type: 'counter/increment', payload: 3 }

console.log(increment.toString())
// 'counter/increment'

// action 传递对象
import { nanoid } from '@reduxjs/toolkit'
const addTodo = createAction('todos/add', function prepare(text) {
  return {
    payload: {
      text,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    }
  }
})

console.log(addTodo('Write more docs'))

//结果
{
  type: 'todos/add',
    payload: {
      text: 'Write more docs',
      id: '4AJvwMSWEHCchcWYga3dj',
      createdAt: '2019-10-03T07:53:36.581Z'
    }
}

```

#### createSlice

返回包含 reducer 和 action 创建函数对象。参数为一个对象，参数对象主要包括以下属性：

reducers属性：等同于 createReducer ，还可以自定义 Action Creators

```javascript
// 自定义 Action Creators 时，Reducer 是一个包含 reducer 和 prepare 属性的函数
addTodo: {
  reducer(state, action){
    const {id, text} = action.payload;
    state.push({id, text, completed: false});
  },
    prepare(text){
      return {payload: {text, id: nextTodoId++}}
    }
}
```
initialState属性： 默认State值

name属性：名称

extraReducers属性：其它reducers，等同于 createReducer，和 reducers 的唯一区别是 ？？？

#### createSelector

个人简单的感觉是用来计算由state得出来的值 ？？？

#### createAsyncThunk

返回一个thunk操作创建器。接受三个参数:

type参数：代表一个异步请求的生命周期，有三种动作类型 pending fulfilled rejected

```javascript
// 比如 users/requestStatus 将生成以下 type Action
pending: 'users/requestStatus/pending'
fulfilled: 'users/requestStatus/fulfilled'
rejected: 'users/requestStatus/rejected'
```
payloadCreator参数：回调函数，回调函数必须返回 Promise， 回调参数有两个参数，

arg参数：传递 thunk action creator的参数值，如果要传入多个值，将其包装在对象中，例如：dispatch(fetchUsers({status: 'active', sortBy: 'name'}))。

thunkAPI参数：一个对象，包含通常传递给Redux thunk函数的所有参数，主要有dispatch getState extra requestId signal rejectWithValue

Options参数：？？？

个人理解会根据 Promise 的状态发出Action ，分别是 pending fulfilled 和 rejected，这样可以在extraReducers处理state

```javascript
// 也可以在 createAsyncThunk 直接 dispatch()
const fetchPosts = createAsyncThunk('r/subreddit', async (subreddit, {dispatch, getState}) => {
  let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  let json = await response.json();
  let data = json.data.children.map(child => child.data);
  return data;
});

const postsBySubredditSlice = createSlice({
  ...
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      let {payload, meta} = action;
      let arg = meta.arg;
      
      state[arg] = state[arg] || {};
      state[arg].isFetching = false;
      state[arg].didInvalidate = false;
      state[arg].items = payload;
      state[arg].lastUpdated = Date.now();
    },
    [fetchPosts.pending]: (state, action) => {
      let arg = action.meta.arg;
      
      state[arg] = state[arg] || {};
      state[arg].isFetching = true;
      state[arg].didInvalidate = false;
    }, 
});
```
#### createEntityAdapter：？？？

counter-vanilla：计数器

todo-list：同步 action 创建函数

todo-list2：网络请求(异步 action 创建函数)

reduxjs/toolkit 示例：npx create-react-app my-app --template redux
	

