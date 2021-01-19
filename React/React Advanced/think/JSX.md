### JSX

JSX会被[Babel](https://babeljs.io/)编译为React.createElement(component, props, ...children)


```react
function createElement(type, config, children) {
  // propName 变量用于储存后面需要用到的元素属性
  var propName; // Reserved names are extracted
  
  var props = {};
  // key、ref、self、source 均为 React 元素的属性
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  
  // config 对象中存储的是元素的属性
  if (config != null) {
    // 进来之后做的第一件事，是依次对 ref、key、self 和 source 属性赋值
    if (hasValidRef(config)) {
      ref = config.ref;
      
      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }
    
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    
    self = config.__self === undefined ? null : config.__self;
    // Remaining properties are added to a new props object
    source = config.__source === undefined ? null : config.__source; 
    
    // 接着就是要把 config 里面的属性都一个一个挪到 props 这个之前声明好的对象里面
    for (propName in config) {
      // 筛选出可以提进 props 对象里的属性
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  
  // the newly allocated props object.
```


```react
  // childrenLength 指的是当前元素的子元素的个数，减去的 2 是 type 和 config 两个参数占用的长度
  var childrenLength = arguments.length - 2;

  // 如果抛去type和config，就只剩下一个参数，一般意味着文本节点出现了
  if (childrenLength === 1) {
    // 直接把这个参数的值赋给props.children
    props.children = children;
    // 处理嵌套多个子元素的情况
  } else if (childrenLength > 1) {
    // 声明一个子元素数组
    var childArray = Array(childrenLength);
    
    // 把子元素推进数组里
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    
    // 最后把这个数组赋值给props.children
    props.children = childArray;
  } // Resolve default props
```


```react
  // 处理 defaultProps
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
```

createElement()的流程  
1. 二次处理key ref self source四个属性值  

2. 遍历config，筛选可以添加到props里的属性  

3. 提取子元素，加入childArray数组  

4. 格式化defaultProps  

5. 将上面的数据作为入参，调用ReactElement()返回element对象
	
	```react
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    // REACT_ELEMENT_TYPE是一个常量，用来标识该对象是一个ReactElement
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    // 内置属性赋值
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };
	  
	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    
	    //修改element对象属性
	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.
	    
	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.
	    
	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });
	    
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }
	  
	  return element;
	};
	```
	
	