### 前端适配

#### Meta标签

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
```

* width = device-width：宽度等于当前设备的宽度
* initial-scale：初始的缩放比例(默认设置为1.0)
* minimum-scale：允许用户缩放到的最小比例(默认设置为1.0)
* maximum-scale：允许用户缩放到的最大比例(默认设置为1.0)
* user-scalable：用户是否可以手动缩放(默认设置为no，因为我们不希望用户放大缩小页面)

#### 设备像素(物理像素)

设备屏幕的物理像素，对于任何设备来讲物理像素的数量是固定的。

#### CSS像素

写代码使用的长度单位是px，属于CSS像素。CSS像素是抽象的，抽象意味着它没有物理属性的实体依据，它可以收缩放大。

简单的理解为CSS像素点是有面积的，一个个CSS像素点铺起来盖在设备的显示屏上，其面积随着浏览器的缩放比例而同步缩放。例如在PC上的浏览器中，定义100 x 100 的红色方块，缩放比例为100%的情况下，一个CSS像素是与一个设备像素完全重叠的。当缩放比设置为50%即缩小一半，CSS像素会等比缩放一半，那一个CSS像素的面积就只占100%情况下的四分之一了，所以视觉上看到方块变成了50x50的大小(即占了50x50的设备像素)。

注意：此时浏览器中检查元素大小会发现红色方块的大小仍旧为100x100，只是CSS像素的面积缩小了！

#### 设备像素比(dpr)

设备像素比=物理像素/css像素

当缩放比是100%的时候，一个CSS像素占的面积是4个设备像素的面积，即一个CSS像素横向宽度覆盖了2个设备像素的宽度。缩放比为100%时一个CSS像素占多少个设备像素是由设备像素比(dpr)决定的，dpr为2，则占两个，dpr为3则占三个。

```javascript
//dpr取值
window.devicePixelRatio
```
#### 屏幕像素密度(PPI,每英尺展示的像素块数)

PPI = 屏幕对角线的像素数/屏幕对角线的长度

#### 布局视口的宽度和高度

```javascript
document.documentElement.clientWidth
document.documentElement.clientHeight
```
#### 视觉视口

视觉视口就是用户能够看到的窗口，单纯的用视觉去描述它就是浏览器屏幕的大小。

用CSS像素去描述就是：视觉视口的大小就是屏幕大小范围内CSS像素堆积的总面积，不管CSS像素是否缩放。

参考：

amfe-flexible：[https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

[https://github.com/amfe/article/issues/17](https://github.com/amfe/article/issues/17)

[https://github.com/Godiswill/blog/issues/13](https://github.com/Godiswill/blog/issues/13)

关于HTML5移动页面适配：[https://www.jianshu.com/p/e98d4becbe21](https://www.jianshu.com/p/e98d4becbe21)

ant-design-mobile 高清方案：[https://github.com/ant-design/ant-design-mobile/wiki/HD](https://github.com/ant-design/ant-design-mobile/wiki/HD)

移动端适配与antd-mobile高清适配方案：[https://segmentfault.com/a/1190000016779099](https://segmentfault.com/a/1190000016779099)