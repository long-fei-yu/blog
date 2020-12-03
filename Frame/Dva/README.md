### 介绍 Dva

dva是基于redux和redux-saga的数据流方案，dva还额外内置了 react-router和fetch，可以理解为一个轻量级的应用框架。

### Dva 创建项目

npm install dva-cli -g
dva new 项目名

### Dva的Model

```javascript
import key from 'keymaster';
......

export default {
namespace: 'products',
  state: [],
    reducers: {
      ......
    },
      effects: {
        ......
      },
        subscriptions: {
          //订阅keyboard输入
          keyEvent({dispatch}) {
            key('⌘+up, ctrl+up', () => {
              dispatch({type: 'add'});
            });
          },
            //订阅history路由变化
            setup({dispatch, history}) {
              history.listen(({pathname}) => {
                if (pathname === '/users') {
                  dispatch({type: 'users/fetch'});
                }
              });
            },
        };
      }
```

注：
Subscription(订阅)用于订阅一个数据源，然后根据条件dispatch需要的action。数据源可以是当前的时间、服务器的websocket连接、keyboard输入、geolocation变化、history路由变化等等。

dva-demo：dva的一些基本使用

DvaJS官网：[https://dvajs.com](https://dvajs.com/)