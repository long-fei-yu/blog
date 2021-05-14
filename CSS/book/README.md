### CSS

#### CSS经验

1. 三无准则：无宽度 无图片 无浮动。
2. 宽度分离原则：width属性不与影响宽度的padding border margin属性共存。

#### 流 元素与基本尺寸

##### 块级元素

常见的块级元素有div li table，但是块级元素和display是block不是一个概念，例如li默认的display是list-item，table默认的display是table，但是它们都是块级元素。因为它们都符合块级元素的基本特征，都是一个水平流上单独显示一个元素，多个块级元素则换行显示。

display的理解：元素既有外在盒子和容器盒子，外在盒子负责元素是一行还是多行显示，容器盒子负责宽高 内容呈现什么的。inline-block可以理解为外在盒子为内联盒子，容器盒子是块级容器盒子(所以inline-block是多行显示，也能设置宽高)。block脑补为block-block，可以理解为外在盒子为块级盒子，容器盒子是块级容器盒子。

display：list-item解释：会额外增加一个"标记盒子"，专门用来放圆点 数字这些项目符号。

##### width height

height：百分比高度值要有效果，其父级别必须有一个可以生效的高度值，
可以采用下列的方式：

1. 设置一个显式的高度值
2. 使用绝对定位，绝对定位的宽高百分比是相对于padding-box计算的，会把padding大小值计算在内。非绝对定位的宽高百分比是相对于content-box计算的。

##### min-width max-width min-height max-height

width和height的默认值是auto，max-width和max-height的默认值是none，min-width和min-height的默认值是auto。

max-width的优先级比行内样式高，max-width的优先级比!important高，min-width的优先级比max-width高，

#### 内联元素

常见的内联元素有button img，但是内联元素和display是inline不是一个概念，都是一个水平流上可以一行显示多个元素。

#### 盒尺寸

#### 内联元素与流

* 基线：字母x的下边缘线
* x-height：小写字母x的高度
* vertical-align的middle值：并不是绝对的垂直居中对齐，而是基线往上1/2*x-height，可以近似理解为字母x交叉点的位置

##### line-height

* 行距=(line-height)-(font-size)
* 1em=font-size
* 对于块级元素，line-height对其本身没有任何作用
* line-height也不能影响替换元素(图片元素)，其实是"幽灵空白节点"的效果把高度拉伸
* 设置line-height和height一样高度就能垂直居中，其实只需要设置line-height即可
* 使用数值作为属性值，子元素继承的是这个值。使用百分比或者长度作为属性值，子元素继承的是计算后的值

##### vertical-align

* vertical-align默认值是baseline，是基于字母x的下边缘对齐的，负值会往下偏移，正值会往上偏
* vertical-align只能作用于内联元素以及displa为table-cell
* vertical-align的百分比是基于line-height计算的

#### 层叠规则

##### z-index

准则：对于非浮层元素，避免使用z-index值，z-index值没有任何道理需要超过2

* z-index和定位元素(position不为static)或者flex盒子在一起才有作用  
* 层叠顺序：层叠上下文 background/border-->负z-index-->block盒子-->float盒子-->inline盒子-->z-index是auto或者z-index是0-->正z-index  
* 层叠顺序还可以这样理解：装饰属性-->布局-->内容  

##### 层叠准则

1. 谁大谁上：当具有明显的层叠水平标识的时候，如生效的z-index属性值，在同一个层叠上下文领域，层叠水平值大的覆盖值小的一个
2. 后居上：当元素的层叠水平一致 层叠顺序相同的时候，在DOM流中处于后面的元素覆盖前面的元素

##### 层叠上下文创建

1. 天生派：页面根元素
2. 正统派：z-index值为数值的定位元素(position为absolute或者relative和fixed)
3. 扩招派：其他css3属性

##### CSS3新的层叠上下文

1. 元素为flex布局元素，同时z-index值不是auto
2. 元素opacity值不为1
3. 元素transform值不为none
4. 元素mix-blend-mode不为normal
5. 元素filter值不为none
6. 元素isolation值是isolate

##### 层叠上下文与层叠顺序

1. 如果层叠上下文元素不依赖z-index数值，则其层叠顺序是z-index：auto可看成是z-index：0
2. 如果层叠上下文元素依赖z-index数值，则其层叠顺序由z-index决定

#### 文本处理

##### ex em rem

* ex:字符X的高度 
* em:相对于当前元素font-size计算，字符M的高度  
* rem:相对于根元素font-size计算，字符M的高度 

Chrome的font-size计算值不能小于12px

#### 元素的装饰与美化

##### background

1. 元素display设置为none，设置背景图片。IE依然会发送图片请求。但是Firefox不会。Chrome会发送图片请求。如果父元素display设置为none。则背景图片不会请求
2. base64图片的渲染性不高，只适用尺寸比较小的图片。大尺寸图片慎用
3. background-position 百分比计算方式： 
positionX=(容器宽度-图片宽度)\*百分比
positionY=(容器高度-图片高度)\*百分比
4. background-color是在最底下的位置

#### 元素的显示与隐藏

##### display

1. display设置为none，则该元素以及后代元素都隐藏  
2. display设置为none，不会影响animation动画的实现，但是会影响transition过渡效果 
3. 无法点击，无法使用屏幕阅读器等辅助设备访问，占据的空间消失 
4. img元素设置display为none在所有的浏览器依旧都会请求图片资源 
5. 对于计数器列表元素，如果display设置为none，则该元素不加入计数列表 
6. display设置为none元素的尺寸和位置都是0

##### visibility

1. visibility设置为hidden隐藏的元素空间依旧保留
2. 继承性，父元素visibility设置hidden，子元素也会看不见。但是子元素设置为visible，则子元素又会显示
3. 对于计数器列表元素，如果visibility设置为hidden，则该元素依然加入计数列表 
4. visibility设置为hidden可以和transition过渡效果配合使用 
5. visibility设置为hidden可以计算元素的尺寸和位置

#### 用户界面样式 

##### outline    

#### 流向的改变

##### direction

改变水平流向，默认值是ltr(left-to-right)，也可以是rtl(right-to-left)

##### unicode-bidi

指定字符的呈现顺序，需要和direction配合使用

* normal(默认值)：按照direction属性排列
* embed：只能作用在内联元素上，与normal表现是一样。但是会开启一个看不见的嵌入层，在里面重新排列
* bidi-override：按照direction属性反向排列

##### writing-mode

指定文字的排列方向

* horizontal-tb(水平方向-top-bottom)：文本流的方向是水平方向，元素从上到下堆叠
* vertical-lr(垂直方向-left-right)：文本流的方向是垂直方向，元素从左到右堆叠
* vertical-rl(垂直方向-right-left)：文本流的方向是垂直方向，元素从右到左堆叠
