### Redux

#### createStore逻辑框架

![](./image/create-store.png)

#### createStore源码

```react
export default function createStore(reducer, preloadedState, enhancer) {
  if (
    (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
      'createStore(). This is not supported. Instead, compose them ' +
      'together to a single function.'
    )
  }
  
  // 这里处理的是没有设定初始状态的情况，也就是第一个参数和第二个参数都传 function 的情况
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    // 此时第二个参数会被认为是 enhancer（中间件）
    enhancer = preloadedState
    preloadedState = undefined
  }
  
  // 当 enhancer 不为空时，便会将原来的 createStore 作为参数传入到 enhancer 中
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    
    return enhancer(createStore)(reducer, preloadedState)
  }
  
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }
  
  // 记录当前的 reducer，因为 replaceReducer 会修改 reducer 的内容
  let currentReducer = reducer
  // 记录当前的 state
  let currentState = preloadedState
  // 声明 listeners 数组，这个数组用于记录在 subscribe 中订阅的事件
  let currentListeners = []
  // nextListeners 是 currentListeners 的快照
  let nextListeners = currentListeners
  // 该变量用于记录当前是否正在进行 dispatch
  let isDispatching = false
  
  // 该方法用于确认快照是 currentListeners 的副本，而不是 currentListeners 本身
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  // 我们通过调用 getState 来获取当前的状态
  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
        'The reducer has already received the state as an argument. ' +
        'Pass it down from the top reducer instead of reading it from the store.'
      )
    }
    
    return currentState
  }

  // subscribe 订阅方法，它将会定义 dispatch 最后执行的 listeners 数组的内容
  function subscribe(listener) {
    // 校验 listener 的类型
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }
    
    // 禁止在 reducer 中调用 subscribe
    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
        'If you would like to be notified after the store has been updated, subscribe from a ' +
        'component and invoke store.getState() in the callback to access the latest state. ' +
        'See https://redux.js.org/api-reference/store#subscribelistener for more details.'
      )
    }
    
    // 该变量用于防止调用多次 unsubscribe 函数
    let isSubscribed = true
    
    // 确保 nextListeners 与 currentListeners 不指向同一个引用
    ensureCanMutateNextListeners()
    // 注册监听函数
    nextListeners.push(listener)
    
    // 返回取消订阅当前 listener 的方法
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      
      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
          'See https://redux.js.org/api-reference/store#subscribelistener for more details.'
        )
      }
      
      isSubscribed = false
      
      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      // 将当前的 listener 从 nextListeners 数组中删除
      nextListeners.splice(index, 1)
      currentListeners = null
    }
  }
  
  // 定义 dispatch 方法，用于派发 action 
  function dispatch(action) {
    // 校验 action 的数据格式是否合法
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }
    
    // 约束 action 中必须有 type 属性作为 action 的唯一标识
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }
    
    // 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }
    
    try {
      // 执行 reducer 前，先"上锁"，标记当前已经存在 dispatch 执行流程
      isDispatching = true
      // 调用 reducer，计算新的 state
      currentState = currentReducer(currentState, action)
    } finally {
      // 执行结束后，把"锁"打开，允许再次进行 dispatch
      isDispatching = false
    }
    // 触发订阅
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    return action
  }
  
  // replaceReducer 可以更改当前的 reducer
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    
    currentReducer = nextReducer
    
    dispatch({ type: ActionTypes.REPLACE })
  }
```

```react
  function observable() {
    const outerSubscribe = subscribe
    return {
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }
        
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }
        
        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },
      
      [$$observable]() {
        return this
      }
    }
  }

  // 初始化 state，当派发一个 type 为 ActionTypes.INIT 的 action，每个 reducer 都会返回 
  // 它的初始值
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
```
#### Redux 中的"发布-订阅"模式

注册监听也是操作nextListeners，触发订阅也是读取nextListeners(实际上，细心的同学会注意到，取消监听操作的也是nextListeners数组)。既然如此，要currentListeners有何用？

currentListeners 在此处的作用，就是为了记录下当前正在工作中的 listeners 数组的引用，将它与可能发生改变的 nextListeners 区分开来，以确保监听函数在执行过程中的稳定性。

例如这种情况：

```react
// 定义监听函数 A
function listenerA() {}

// 订阅 A，并获取 A 的解绑函数
const unSubscribeA = store.subscribe(listenerA)

// 定义监听函数 B
function listenerB() {
  // 在 B 中解绑 A
  unSubscribeA()
}

// 定义监听函数 C
function listenerC() {}

// 订阅 B
store.subscribe(listenerB)

// 订阅 C
store.subscribe(listenerC)

执行完毕后，nextListeners数组的内容是A、B、C 3 个listener([listenerA,  listenerB, listenerC])，接着调用dispatch()，触发下列逻辑
// 触发订阅
const listeners = (currentListeners = nextListeners);
for (let i = 0; i < listeners.length; i++) {
  const listener = listeners[i];
  listener();
}

当 for循环执行到索引i = 1处，也就是对应的listener为listenerB时，问题就会出现：listenerB中执行了unSubscribeA这个动作。
而结合我们前面的分析，监听函数注册、解绑、触发这些动作实际影响的都是nextListeners。

return function unsubscribe() {
  // 避免多次解绑
  if (!isSubscribed) {
    return;
  }
  
  isSubscribed = false;
  
  // 熟悉的操作，调用 ensureCanMutateNextListeners 方法
  ensureCanMutateNextListeners();
  
  // 获取 listener 在 nextListeners 中的索引
  const index = nextListeners.indexOf(listener);
  
  // 将当前的 listener 从 nextListeners 数组中删除
  nextListeners.splice(index, 1);
}

假如说不存在currentListeners，那么也就意味着不需要ensureCanMutateNextListeners这个动作。
若没有ensureCanMutateNextListeners，unsubscribeA()执行完之后，
listenerA会同时从listeners数组和nextListeners数组中消失(因为两者指向的是同一个引用)，
那么listeners数组此时只剩下两个元素listenerB和listenerC，变成这样[listenerB, listenerC]，listeners数组的长度改变了，
当执行到i = 2处，但此时listeners[2]已经是 undefined了，原本应该出现在这个索引位上的listenerC，
此时因为数组长度的变化，被前置到了i = 1处！这样一来，undefined就会代替listenerC 被执行，进而引发函数异常。
```
