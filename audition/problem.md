###JS
由浅入深，66条JavaScript面试知识点：[https://mp.weixin.qq.com/s/Tdwr2fkb6SZJ3vHWtR2opg](https://mp.weixin.qq.com/s/Tdwr2fkb6SZJ3vHWtR2opg)

全面分析toString与valueOf，并随手解决掉几道大厂必备面试题：[https://mp.weixin.qq.com/s/59nQQHcY8VJ_f2hbhsKbog](https://mp.weixin.qq.com/s/59nQQHcY8VJ_f2hbhsKbog)
####闭包
JavaScript闭包应用介绍:[https://mp.weixin.qq.com/s/puZeIzQ6XCVNIFjrqSz7Tg](https://mp.weixin.qq.com/s/puZeIzQ6XCVNIFjrqSz7Tg)

大部分人都会做错的经典JS闭包面试题:[https://mp.weixin.qq.com/s/Pp_MwRK7xDWJ0OhmBwpOvg](https://mp.weixin.qq.com/s/Pp_MwRK7xDWJ0OhmBwpOvg)
####原型链
看完这篇文章，彻底了解"原型"&"this":[https://mp.weixin.qq.com/s/4IUq453eWN86eMyrbOg3Dw](https://mp.weixin.qq.com/s/4IUq453eWN86eMyrbOg3Dw)
####es6
es6新特性:[https://juejin.im/post/5dfa4363f265da33dd2f5d6f](https://juejin.im/post/5dfa4363f265da33dd2f5d6f) 

####防抖、节流函数
防抖应用：输入框当用户停止输入一段时间(比如500ms)后才执行发送请求

	function debounce (func, time) {
		let timer = 0
		return function (...args) {
			timer && clearTimeout(timer)
			timer = setTimeout(() => {
				timer = 0
				func.apply(this, args)
			}, time)
		}
	}

	input.onkeypress = debounce(function () {
		console.log(input.value) // 事件处理逻辑
	}, 500)

节流

	function throttle(func, time) {
		let timer = 0 // 定时器标记相当于一个锁标志
		return function (...args) {
			if (timer) return
			func.apply(this, args)
			timer = setTimeout(() => timer = 0, time)
		}
	}

###React

###webpack

###CSS

###性能优化

###协议