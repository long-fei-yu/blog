### React性能优化

#### 使用shouldComponentUpdate规避冗余的更新逻辑

父组件重新渲染，如果没有特殊处理，子组件都会重新渲染。

使用shouldComponentUpdate来调停不必要的更新，避免无意义的re-render发生。

#### PureComponent+Immutable.js

PureComponent与Component的区别点，就在于它内置了对shouldComponentUpdate的实现：PureComponent将会在shouldComponentUpdate中对组件更新前后的props和state进行浅比较，并根据浅比较的结果，决定是否需要继续更新流程。

"浅比较"将针对值类型数据对比其值是否相等，而针对数组、对象等引用类型的数据则对比其引用是否相等。

Immutable.js是"实现持久性数据结构的库"。"持久性数据"指的是这个数据只要被创建出来了，就不能被更改。我们对当前数据的任何修改动作，都会导致一个新的对象的返回。这就将数据内容的变化和数据的引用严格地关联了起来，使得"变化"无处遁形。

#### React.memo与useMemo

React.memo控制是否需要重渲染一个组件，而useMemo控制的则是是否需要重复执行某一段逻辑。

### React设计模式

#### 高阶组件(HOC)

高阶组件指的就是参数为组件，返回值为新组件的函数。高阶组件本质上是一个函数。

高阶组件强调的是用"函数"包裹"组件"。

#### Render Props

Render Props强调的是用"组件"包裹"函数"。 