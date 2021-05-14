### CSS

#### 层叠与继承

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)

##### 层叠

不会覆盖所有规则，只有相同的属性

一个选择器的优先级可以说是由四个部分相加，可以认为是个十百千四位数的四个位数

千位： 如果声明在style的属性(内联样式)则该位得一分

百位： 选择器中包含ID选择器则该位得一分

十位： 选择器中包含类选择器、属性选择器或者伪类则该位得一分

个位：选择器中包含元素、伪元素选择器则该位得一分

注：

通用选择器(*)，组合符(+, >, ~, ' ')，和否定伪类(:not)不会影响优先级

在进行计算时不允许进行进位，例如，20个类选择器仅仅意味着20个十位，而不能视2个百位，也就是说，无论多少个类选择器的权重叠加，都不会超过一个ID选择器

| 选择器                                  | 千位 | 百位 | 十位 | 个位 | 优先级 |
| --------------------------------------- | ---- | ---- | ---- | ---- | ------ |
| !important                              |      |      |      |      | 最高   |
| h1                                      | 0    | 0    | 0    | 1    | 0001   |
| h1 + p::first-letter                    | 0    | 0    | 0    | 3    | 0003   |
| li > a[href*="en-US"] > .inline-warning | 0    | 0    | 2    | 2    | 0022   |
| #identifier                             | 0    | 1    | 0    | 0    | 0100   |
| 内联样式                                | 1    | 0    | 0    | 0    | 1000   |

如果你有超过一条规则，而且都是相同的权重，那么最后面的规则会应用(后面的规则覆盖前面的规则)

覆盖!important唯一的办法就是另一个!important具有相同优先级而且顺序靠后，或者更高优先级

##### 继承

属性color font-family font-size可以被后代继承，属性width margins padding borders不能被后代继承

| 控制继承属性值 | 描述                                                         |                                                              |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| inherit        | 子元素属性和父元素相同，开启继承                             | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit) |
| initial        | 属性的初始(或默认)值应用于元素                               | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial) |
| revert         | 元素属性值重置为浏览器的默认样式                             | [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) |
| revert-layer   |                                                              | [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/revert-layer) |
| unset          | 如果这个属性本来有从父级继承的值(这个属性默认可以继承，且父级有定义)，则将该属性重新设置为继承的值，类似于inherit。如果没有继承父级样式，则将该属性重新设置为初始值，类似于initial | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset) |

重设所有属性值

all可以用于同时将这些继承值中的一个应用于(几乎)所有属性。它的值可以是其中任意一个(inherit, initial, unset, or revert)，**这四个值好像没感觉有什么不一样**

#### 盒模型

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)

##### 块级盒子和内联盒子

块级(block)盒子：

盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽，高度与其内容高度一致

每个盒子都会换行

width和height属性可以发挥作用

内边距(padding), 外边距(margin)和边框(border)会将其他元素从当前盒子周围推开

常见的块盒子：h1 p div



内联(inline)盒子：

盒子不会产生换行

width和height属性将不起作用

垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于inline状态的盒子推开，会出现重叠的情况

水平方向的内边距、外边距以及边框会被应用且会把其他处于inline状态的盒子推开

常见的内联盒子：a span em strong

##### 盒模型

标准盒模型(box-sizing属性设置为content-box(默认值))

盒子高度=内容高度(height值)+内距(padding值)+边框(border值)

盒子宽度=内容宽度(width值)+内距(padding值)+边距(border值)



替代(IE)盒模型(box-sizing属性设置为border-box)

盒子高度=height值(包含元素内容高度 边框 内距)

盒子宽度=width值(包含元素内容宽度 边框 内距)  

外边距(margin)可以设置为负值，内边距(padding)只能设置为正数



外边距(margin)折叠-——块级(block)的上外边距(margin-top)和下外边距(margin-bottom)有时合并(折叠)为单个边距，其大小为单个边距的最大值(或如果它们相等，则仅为其中一个)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

有三种情况会形成外边距重叠：同一层相邻元素之间，没有内容将父元素和后代元素分开，空的块级元素、

注：

如果参与折叠的外边距中包含负值，折叠后的外边距的值为最大的正边距与最小的负边距(即绝对值最大的负边距)的和，也就是说如果有-13px  100px叠在一起，边界范围的技术就是100px -13px的87px

如果所有参与折叠的外边距都为负，折叠后的外边距的值为最小的负边距的值。这一规则适用于相邻元素和嵌套元素



display: inline-block——实现我们需要的块级的部分效果

设置width和height属性会生效

padding, margin, 以及border会推开其他元素(默认inline元素在垂直方向不会把其他处于inline状态的盒子推开，会出现重叠的情况)

#### 背景和边框

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Backgrounds_and_borders)

##### 背景

background属性：background-clip background-color background-image background-origin background-position background-repeat background-size background-attachment的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)



background-color属性：设置元素的背景色，背景色扩展到元素的内容和内边距的下面

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)



background-image属性：设置元素一个或者多个背景图像

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)

注：

元素的边框(border)会在background-image之上被绘制，而background-color会在background-image之下绘制

如果background-image设置多个图像，图像以Z方向堆叠的方式进行。先指定的图像会在之后指定的图像上面绘制。因此指定的第一个图像显示在最上面



background-repeat属性：设置背景图像的重复方式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)



background-size属性：设置背景图片大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)

注：

只设置一个数值，这个数值将作为宽度值大小，高度值将被设定为auto



background-origin属性：设置背景图片的原点位置的相对区域

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)



background-position属性：设置背景图片的初始位置，这个位置是相对于由background-origin定义的位置

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)



background-clip属性：设置元素的背景(背景图片或颜色)是否延伸到边框、内边距盒子、内容盒子下面

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)



background-attachment属性：设置背景图像的位置是在视口内固定，或者随着包含它的区块滚动

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)

##### 边框

| 属性          | 描述                   |                                                              |
| ------------- | ---------------------- | ------------------------------------------------------------ |
| border        | 设置盒子模型的边框     | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border) |
| border-width  | 设置盒子模型的边框宽度 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) |
| border-style  | 设定元素边框的样式     | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) |
| border-color  | 设置元素边框的颜色     | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color) |
| border-radius | 设置元素的外边框圆角   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius) |

注：

border-style默认值是none，如果只设置border-width和border-color是不会出现边框

即使元素没有设置border，border-radius也可以用到background上，把background弄成圆角

border-radius设置的百分比时，水平半轴百分比是相对于盒模型的宽度，垂直半轴百分比是相对于盒模型的高度

#### 处理不同方向的文本

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Handling_different_text_directions)

书写模式处于纵向书写模式，需要使用一些逻辑属性来映射到物理属性，使用一些逻辑值映射到物理值。比如：内联尺寸(inline-size)——内联维度的尺寸映射到width，块级尺寸(block-size)——块级维度的尺寸映射height等。top——映射到block-start

CSS逻辑属性与值：

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Logical_Properties)

writing-mode属性：设置书写模式(文本水平或垂直排布以及在块级元素中文本的行进方向)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode)

#### 溢出的内容

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Overflowing_content)

overflow属性：设置元素溢出的方式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)

注：

为使overflow有效果，块级容器必须有一个指定的高度(height或者max-height)或者将white-space设置为nowrap

overflow设置一个轴为visible(默认值)，同时设置另一个轴为不同的值，会导致设置visible的轴的行为会变成auto

#### CSS 的值与单位

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)

注：

em在font-size，line-height中使用是相对于父元素的字体大小，父元素的字体大小就是1em，在其他属性中使用是相对于自身的字体大小，如width，

百分比：元素的字体大小设置为百分比，它将是元素父元素字体大小的百分比。使用百分比作为宽度值，它将是父值宽度的百分比。使用百分比作为高度值，它将是父值高度的百分比。使用百分比作为外边距(margin)或填充(padding)，不论是上下还是左右，它都将是父值宽度的百分比

rem是相对于根元素的字体大小(浏览器默认是16px)

设置opacity属性会让元素和它里面的所有东西都不透明，设置RGBA的A只会让颜色不透明

位置值由两个值组成，第一个值设置水平位置，第二个值设置垂直位置。如果只指定一个轴的值，另一个轴将默认为center

#### 在CSS中调整大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS)

#### 图像、媒体和表单元素

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Images_media_form_elements)

object-fit属性(有些类似于background-size)：设置可替换元素(例如图像和视频)的内容应该如何适应到其使用的高度和宽度确定的框

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

object-position属性(类似于background-position)：设置可替换元素(例如图像和视频)的内容在其内容框中的位置

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)



outline属性：元素轮廓

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline)

border和outline的区别：

outline不影响盒子大小，border影响盒子的大小

outline在元素各边都一样，border可以设置元素各边不一样

outline不占据空间，是绘制于元素周围的一条线，位于border的外围，使元素突出

outline通常是矩形，但也可以是非矩形的

outline在元素的border外绘制并且可能与其他元素重叠，border不会出现这种现象(除非故意)



resize属性：设置元素的可调整大小性

[MND文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resize)

注：

textarea默认是可以进行缩放的

如果block元素的overflow属性被设置成了visible，那么resize属性对该元素无效

#### 选择器

##### 类型、类和 ID 选择器

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors)

1. 元素选择器

   [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors)

2. 通配选择器

     [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)

3. 类选择器

     [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors)

3. ID选择器
    [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors)

##### 关系选择器

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Combinators)

1. 后代选择器(E F)

   [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator)

   E元素的所有后代F，包括子元素，孙元素以及更深层的关系

2. 子选择器(E > F)

   [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator)

   E元素下的所有子元素F

3. 相邻兄弟选择器(E + F)

   [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator)

   E和F是同辈元素，选中E元素后面相邻的F元素，选中的仅是一个元素(F元素)

4. 通用兄弟选择器(E ~ F)

   [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator)

   E和F是同辈元素，选中E元素后面的所有F元素，选中的是一个或者多个(包括F元素)

##### 伪类和伪元素选择器

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements)

###### 伪类选择器

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

| 选择器         | 描述                                       |                                                              | 备注                                                         |
| -------------- | ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| :link          | 匹配未曾访问的链接                         | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link) |                                                              |
| :local-link    | 匹配指向和当前文档同一网站页面的链接       | [MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link) | 没太搞懂和link的区别                                         |
| :visited       | 匹配已访问链接                             | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited) | 只能设置部分CSS 属性                                         |
| :active        | 在用户激活元素的时候匹配                   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active) | 用鼠标交互时，代表的是用户按下按键和松开按键之间的时间，一般用在a和button元素 |
| :hover         | 当用户悬浮到一个元素之上的时候匹配         | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) |                                                              |
| :focus         | 当一个元素有焦点的时候匹配                 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus) |                                                              |
| :focus-visible | 当元素有焦点，且焦点对用户可见的时候匹配   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible) | 根据用户的输入方式(鼠标 vs 键盘)展示不同形式的焦点           |
| :focus-within  | 匹配有焦点的元素，以及子代元素有焦点的元素 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within) | 元素自身或者它的某个后代匹配 :focus 伪类                     |
| :target        | 一个唯一的目标元素，其id与当前URL片段匹配  | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target) | 如a元素的href与其任一元素的id相匹配，a被点击时匹配其任一元素 |

遵循LVHA的先后顺序，即:link—:visited—:hover—:active，:focus常伴随在:hover左右

| 选择器               | 描述                                                    |                                                              | 备注                                                         |
| -------------------- | ------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| :checked             | 匹配处于选中状态的radio，checkbox或者select选中的option | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked) |                                                              |
| :default             | 匹配一组相关元素中默认的一个或者更多的 UI 元素          | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default) | 在button checkbox radio以及option使用                        |
| :disabled            | 匹配处于禁用状态的用户界面元素                          | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled) | 元素不能被激活(如选择、点击或接受文本输入)或获取焦点，则元素处于被禁用状态 |
| :enabled             | 匹配处于启用状态的用户界面元素                          | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled) | 元素能够被激活(如选择、点击或接受文本输入)或能获取焦点，则元素是启用的 |
| :indeterminate       | 状态不确定的表单元素                                    | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate) | checkbox的indeterminate 属性被JavaScript设置为true。表单中拥有相同name值的所有radio都未被选中。处于不确定状态的progress |
| :in-range            | 用一个区间匹配元素，当值处于区间之内时匹配              | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range) | input 元素其当前值处于属性min和max限定的范围之内             |
| :out-of-range        | 按区间匹配元素，当值不在区间内的的时候匹配              | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range) | input元素其当前值处于属性min和max限定的范围外                |
| :invalid             | 任意内容未通过验证的input或其他form元素                 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) |                                                              |
| :valid               | 内容验证正确的input>或其他 form元素                     | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) |                                                              |
| :optional            | 匹配不是必填的form元素                                  | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional) | 任意没有required属性的input，select，textarea元素            |
| :required            | 匹配必填的form元素                                      | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required) | 任意设置了required属性的input，select，textarea元素，对于高亮显示在提交表单之前必须具有正确的数据非常有用 |
| :read-write          | 匹配用户可更改的元素                                    | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write) | 元素可以被用户编辑，不仅仅选择 input元素，也会选择所有可以被用户编辑的元素，例如设置contenteditable属性的p元素 |
| :read-only           | 匹配用户不可更改的元素                                  | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only) | 元素不可被用户编辑的状态，不仅仅选择具有 readonly属性的input元素，也会选择所有的不能被用户编辑的元素 |
| :placeholder-shown   | 匹配显示占位文字的input元素                             | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown) | input或textarea元素显示placeholder text时生效                |
| :lang(language-code) | 基于语言(HTML的lang属性值)匹配元素                      | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang) |                                                              |

| 选择器                  | 描述                                                         |                                                              | 备注                                                         |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| :empty                  | 匹配除了可能存在的空格外，没有子元素的元素                   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty) |                                                              |
| :root                   | 匹配文档的根元素                                             | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root) |                                                              |
| :scope                  | 匹配任何为参考点元素的的元素                                 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope) | 没太搞懂                                                     |
| :not()                  | 匹配不符合一组选择器的元素                                   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not) | 可以将一个或多个以逗号分隔的选择器列表作为其参数，不能被嵌套使用 |
| :first-child            | 匹配兄弟元素中的第一个元素                                   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) | 侧重点是第一个元素                                           |
| :first-of-type          | 匹配兄弟元素中第一个某种类型的元素                           | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type) | 侧重点是第一个指定类型的元素                                 |
| :last-child             | 匹配兄弟元素中最末的那个元素                                 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child) | 侧重点是最后元素                                             |
| :last-of-type           | 匹配兄弟元素中最后一个某种类型的元素                         | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type) | 侧重点是最后指定类型的元素                                   |
| :nth-child(an+b)        | 匹配一列兄弟元素中的元素——兄弟元素按照an+b形式的式子进行匹配(比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个) | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type) | 不是指定类型的也参与计数位置，兄弟节点的开头处计数           |
| :nth-of-type(an+b)      | 匹配某种类型的一列兄弟元素(比如，p元素)——兄弟元素按照an+b形式的式子进行匹配(比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个) | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type) | 不是指定类型的不参与计数位置，兄弟节点的开头处计数           |
| :nth-last-child(an+b)   | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照an+b形式的式子进行匹配(比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个) | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child) | 不是指定类型的也参与计数位置，兄弟节点的结尾处反序计数       |
| :nth-last-of-type(an+b) | 匹配某种类型的一列兄弟元素(比如，p元素)，从后往前倒数。兄弟元素按照an+b形式的式子进行匹配(比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个)。 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type) | 不是指定类型的不参与计数位置，兄弟节点的结尾处反序计数       |
| :only-child             | 匹配没有任何兄弟元素的元素                                   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child) |                                                              |
| :only-of-type           | 匹配没有其他相同类型的兄弟元素                               | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type) |                                                              |

1. E:first-child

   一组兄弟元素中的第一个元素E

2. E:first-of-type

   一组兄弟元素中指定类型的第一个元素E

3. E:last-child

   父元素的最后一个子元素E

4. E:last-of-type

   父元素指定类型的最后一个子元素E

5. :nth-child(an+b)

   找到所有当前元素的兄弟元素，然后按照位置先后顺序从1开始排序，选择的结果为CSS伪类:nth-child 括号中表达式(an+b)匹配到的元素集合(n=0，1，2，3...)

   0n+3：匹配第三个元素

   1n+0：匹配每一个元素(1，2，3...)

   2n+0：匹配位置为偶数(2，4，6...)的元素，或者用关键字even替换

   2n+1：匹配位置为奇数(1，3，5...)的元素，或者用关键字odd替换

   a 和b都必须为整数，并且元素的第一个子元素的下标为 1

   ```scss
   tr:nth-child(2n+1)：HTML表格中的奇数行
   
   tr:nth-child(odd)：HTML表格中的奇数行
   
   tr:nth-child(2n)：HTML表格中的偶数行
   
   tr:nth-child(even)：HTML表格中的偶数行
   
   span:nth-child(0n+1)：子元素中第一个且为span的元素，与:first-child选择器作用相同
   
   span:nth-child(1)：父元素中子元素为第一的并且名字为span的标签被选中
   
   span:nth-child(-n+3)：匹配前三个子元素中的span元素
   ```

6. :nth-of-type(an+b)

7. :nth-last-child(an+b)

   ```scss
   tr:nth-last-child(odd) or tr:nth-last-child(2n+1)：HTML表的倒数的奇数行(1、3、5等)
   
   tr:nth-last-child(even) or tr:nth-last-child(2n)：HTML表的倒数的偶数行(2、4、6等)
   
   :nth-last-child(7)：倒数第7个元素
   
   :nth-last-child(5n)：倒数的第5、10、15等元素
   
   :nth-last-child(3n+4)：倒数的第4、7、10、13等元素
   
   :nth-last-child(-n+3)：一组兄弟节点中的最后三个元素
   
   p:nth-last-child(n) or p:nth-last-child(n+1)：一组兄弟节点中的每个p元素。这与一个简单的p选择器相同。(由于n从0开始，而最后一个元素从1开始，n和n+1都会选择相同的元素)
   
   p:nth-last-child(1) or p:nth-last-child(0n+1)：所有处于兄弟节点中倒数第一位的元素p。这与:last-child选择器相同
   ```

8. :nth-last-of-type(an+b)

first表示第一个元素，last表示最后的元素。type表示指定类型，没有type的表示不指定类型


###### 伪元素

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)

| 选择器         | 描述                                               |                                                              | 备注                                                         |
| -------------- | -------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ::after        | 匹配出现在原有元素的实际内容之后的一个可样式化元素 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after) | 配合content属性来添加装饰内容。这个虚拟元素默认是行内元素    |
| ::before       | 匹配出现在原有元素的实际内容之前的一个可样式化元素 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) | 配合content属性来添加装饰内容。这个虚拟元素默认是行内元素    |
| ::first-letter | 匹配元素的第一个字母                               | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter) | 只在display值为block, inline-block, table-cell, list-item 或者 table-caption的元素上才起作用。只能设置部分CSS 属性 |
| ::first-line   | 匹配包含此伪元素的元素的第一行                     | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) | 只在display值为block, inline-block, table-cell 或者 table-caption中有用。只能设置部分CSS 属性 |
| ::selection    | 匹配文档中被选择的那部分                           | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection) | 只能设置部分CSS 属性                                         |
| ::slotted()    | 选定那些被放在 HTML 模板中的元素                   | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::slotted) |                                                              |

##### 属性选择器

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors)

| 选择器                  | 描述                                                         |                                                              | 备注 |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---- |
| [attr]                  | 带有以"attr"命名的属性的元素                                 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr=value]            | 带有以"attr"命名的属性，且属性值为"value"的元素              | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr~=value]           | 带有以"attr"命名的属性的元素，其值为"value"，或是以空格作为分隔的值列表，其中至少有一个值为"value" | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr=value]            | 带有以"attr"命名的属性的元素，其值为"value"，或是以"value-"为前缀 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr^=value]           | 带有以"attr"命名的属性，且属性值是以"value"开头的元素        | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr$=value]           | 带有以"attr"命名的属性，且属性值是以"value"结尾的元素        | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr*=value]           | 带有以"attr"命名的属性，且属性值至少包含一个"value"值的元素  | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |
| [attr operator value i] | 属性选择器的右方括号前添加一个用空格隔开的字母"i"(或"I")，可以在匹配属性值时忽略大小写 | [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) |      |

#### 基础文本与字体样式化

color属性：设置选中元素的前景内容的颜色(通常指文本)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)



text-decoration属性：设置文本的修饰线外观(下划线、上划线、贯穿线/删除线)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)

注：

文本修饰属性会延伸到子元素。如果祖先元素指定了文本修饰属性，子元素则不能将其删除



text-decoration-line属性：设置元素中的文本的修饰类型

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-line)



text-decoration-color属性：设置文本修饰线的颜色

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-color)



text-decoration-style属性：设置文本修饰线的样式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-style)



text-decoration-thickness属性：设置文本修饰线的厚度

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-thickness)



font-family属性：设置元素字体

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family)



font-size属性：设置字体的大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size)



font-style属性：设置打开和关闭文本斜体

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-style)



font-weight属性：设置文字的粗体大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight)



text-transform属性：设置要转换的字体

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform)



text-shadow属性：设置文本阴影

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)



text-align属性： 设置行内内容(例如文字)如何相对它的块父元素的水平对齐方式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align)



line-height属性：设置文本每行的高度

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)

注：推荐设置成无单位的数字，最终的计算大小=数字*元素的字体大小



letter-spacing属性：设置文本中的字母与字母之间的间距

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing)



word-spacing属性：设置文本中的单词与单词之间的间距

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-spacing)



text-overflow属性：设置如何提示用户存在隐藏的溢出内容

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow)

注：

需要在元素上添加几个额外的属性——overflow: hidden和white-space: nowrap

只对那些在块级元素溢出的内容有效，但是必须要与块级元素内联(inline)方向一致



white-space属性：设置元素中的空白 

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)



word-break属性：设置怎样在单词间断行

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)



overflow-wrap(word-wrap)属性：当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)

#### 样式化列表

list-style属性：

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style)



list-style-type属性：设置列表元素的类型

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)

注：

list-style-type属性可以应用在任何display的值为list-item的元素上



list-style-position属性：设置列表元素的位置(项目符号是出现在列表项内，还是出现在其外)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-position)



list-style-image属性：设置列表元素自定义图片

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-image)

#### 样式化链接

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Styling_links)

#### Web字体

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Styling_text/Web_fonts)

@font-face属性：设置用于显示文本的自定义字体

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face)

#### 正常布局流

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Normal_Flow)

#### 弹性区块

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)



容器属性：

flex-direction属性：设置主轴的方向

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction)



flex-wrap属性：设置flex元素单行显示还是多行显示

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)



flex-flow属性：flex-direction和flex-wrap的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-flow)



justify-content属性：控制主轴上所有flex项目的对齐

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)

注：

主轴没有交叉轴单独控制flex项目的属性(align-self)，但是可以通过margin-...设置为auto来实现



align-items属性：设置项目在交叉轴上的对齐方式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)

注：

默认的值是stretch，其会使所有flex项沿着交叉轴的方向拉伸以填充父容器。如果父容器在交叉轴方向上没有固定宽度(即高度)，则所有flex项将变得与最长的flex项一样长(即高度保持一致)



align-content属性：控制多条主轴的flex项目在交叉轴的对齐

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content)

注：

对单行弹性盒子模型无效(带有flex-wrap: nowrap)



row-gap属性：设置行元素之间的间隙大小

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)



column-gap属性：设置元素列之间的间隔大小

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)



gap属性：设置网格行与列之间的间隙，是row-gap和column-gap的简写形式

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)



项目属性：

order属性：设置弹性容器中的可伸缩项目在布局时的顺序，可以为负数

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/order)



flex-grow属性： 设置flex项主尺寸的flex增长系数

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)

注：

主尺寸是项的宽度或高度，这取决于flex-direction值



flex-shrink属性：设置flex元素的收缩规则。flex元素仅在默认宽度之和大于容器的时候才会发生收缩

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)



注：

flex-grow和flex-shrink都是基于剩余空间来计算的，剩余空间是指容器的宽度或高度减项目总和的宽度或高度

flex-grow flex-shrink为0时，不参与增长和收缩



flex-basis属性： 设置flex元素在主轴方向上的初始大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)

注：

如果元素同时被设置了flex-basis(除值为auto外)和width(或者在flex-direction: column情况下设置了height) , flex-basis具有更高的优先级

如果元素flex-basis设置为auto和width(或者height)，在计算增长和收缩则以元素的width(或者height)为设定的值

如果元素flex-basis设置为auto没有设置width(或者height)，在计算增长和收缩则元素的width(或者height)为元素内容的值

如果元素flex-basis设置为0，在计算增长则元素的width(或者height)为0，容器的width(或者height)为可用空间



flex属性：设置弹性项目如何增大或缩小以适应其弹性容器中可用的空间，是flex-grow flex-shrink flex-basis的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

注：

flex值为1，表示每个元素占用空间都是相等的，占用的空间是在设置padding和margin之后剩余的空间

flex只设置一个无单位的数时，会当成flex:number 1 0



align-self属性：设置项目在其包含块中在交叉轴方向上的对齐方式，覆盖已有的align-items的值

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self)

#### 网格

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids)



容器属性：

grid-template-columns属性：基于网格列的维度，去定义网格线的名称(用方括号)和网格轨道的尺寸大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)



grid-template-rows属性：基于网格行的维度，去定义网格线的名称(用方括号)和网格轨道的尺寸大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows)



grid-template-areas属性：网格区域在CSS中的特定命名

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)

注：

区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为"区域名-start"，终止网格线自动命名为"区域名-end"。比如，区域名为"header"，则起始位置的水平网格线和垂直网格线叫做"header-start"，终止位置的水平网格线和垂直网格线叫做"header-end"



grid-template属性：grid-template-rows grid-template-columns grid-template-areas的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template)



grid-auto-columns属性：设置隐式创建的网格纵向轨道的宽度

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-columns)

注：

隐式创建：比如网格只有3行，但是某一个项目指定在第5行。这时会自动生成多余的网格，以便放置项目



grid-auto-rows属性：设置隐式创建的行轨道大小

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-rows)



grid-auto-flow属性：设置在网格中被自动布局的元素怎样排列

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow)



grid属性：grid-template-rows grid-template-columns grid-template-areas grid-auto-rows grid-auto-columns grid-auto-flow grid-column-gap grid-row-gap的简写 

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)



项目属性：

grid-row-start属性：设置网格项在网格行内的起始位置

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)



grid-column-start属性：设置网格项在网格行内的结束位置

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)



grid-row-end属性：设置网格项在网格列内的起始位置

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)



grid-column-end属性：设置网格项在网格列内的结束位置

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end)



grid-row属性：grid-row-start grid-row-end的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row)



grid-column属性：grid-column-start grid-column-end的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column)



grid-area属性：grid-row-start grid-column-start grid-row-end grid-column-end的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-area)



row-gap(grid-row-gap)属性：设置行元素之间的间隙大小

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)



column-gap(grid-column-gap)属性：设置元素列之间的间隔大小

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)



gap(grid-gap)属性：设置网格行与列之间的间隙，是row-gap和column-gap的简写形式

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)

#### 浮动

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Floats)

float属性：设置元素浮动，元素会被移出正常文档流

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)



clear属性：清除浮动

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)



#### 定位

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Positioning)

position属性：设置定位方式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

注：

relative：相对于其未添加定位时的位置进行定位，会在其未添加定位时所在位置留下空白

absolute：元素会被移出正常文档流，并不为元素预留空间，相对于最近的非static定位祖先元素进行定位

fixed：元素会被移出正常文档流，并不为元素预留空间，相对于浏览器窗口进行定位，元素的位置在屏幕滚动时不会改变

sticky：一个sticky元素会"固定"在离它最近的一个拥有"滚动机制"的祖先上



top属性：设置定位元素的上外边距边界与其包含块上边界之间的偏移

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)



bottom属性：设置定位元素下外边距边界与其包含块下边界之间的偏移

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom)



注：

当top和bottom同时指定时，并且height没有被指定或者指定为auto或100%的时候，top和bottom都会生效(试过relative只有top生效)，在其他情况下，如果height被限制，则top会优先设置，bottom则会被忽略



right属性：设置定位元素的右外边距边界与其包含块右边界之间的偏移

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right)



left属性：设置定位元素的左外边距边界与其包含块左边界之间的偏移

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left)

注：

当left和right同时指定时，元素的位置会被重复指定。当容器是从左到右时，left的值会被优先设定；当容器是从右到左时，right的值会被优先设定



z-index属性：设置定位元素及其后代元素或flex项目的堆叠顺序

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

注：

z-index 只对指定了position属性的元素有效

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index)

默认的排序规则：

根元素的背景与边框-->普通流元素(没有position或者position:static)按出现顺序-->浮动元素-->定位元素(position:relative absolute等)按出现顺序



层叠上下文

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)

#### 多栏式布局

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Multiple-column_Layout)



容器属性：

columns属性：设置列宽和列数，column-width column-count的简写

 [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/columns)



column-width属性：设置列宽度

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width)



column-count属性：设置列数

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count)

注：
如果column-width也设置为非零值，则column-count仅表示允许的最大列数



column-gap属性：设置列之间的间隔

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-gap)



column-rule属性：设置列之间的直线(规则)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-rule)



column-rule-width属性：设置列之间的直线(规则)的宽度

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-rule-width)



column-rule-style属性：设置列之间的直线(规则)的样式

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-rule-style)



column-rule-color属性：设置列之间的直线(规则)的颜色。

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-rule-color)



column-fill属性：设置为balance，表示列的高度相同

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-fill)



项目属性：

column-span属性：设置跨越列

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-span)

注：只能设置为all auto



break-inside属性：设置多列布局的内容盒子如何中断

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-inside)

#### 响应式布局

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design)

#### 媒体查询

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Media_queries)

@media属性：媒体查询

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media)

#### 关键字

max-content：网格轨道的网格项目所分配的最大内容区域的最大值



min-content：网格轨道的网格项目所分配的最小内容区域的最小值



auto：作为最大值，等同于max-content。作为最小值，它代表占据网格轨道的网格项目的最小尺寸的最大值(如同min-width/min-height所指定的)

例：

grid-template-columns: 100px auto 100px：第二列的宽度，基本上等于该列单元格的最大宽度，除非单元格内容设置了min-width，且这个值大于最大宽度



auto-fill：表示自动填充(单元格的大小是固定的，但是容器的大小不确定。并且希望每一行(或每一列)容纳尽可能多的单元格)

例：

grid-template-columns:：repeat(auto-fill, 100px)表示每列100px，然后自动填充。直到容器不能放置更多的列



auto-fit：



span：跨越多少个网格

#### 函数

repeat()：网格轨道的重复，可使用flex类型数据和关键字max-content min-content auto auto-fill auto-fit

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat)



minmax(min, max)：定义大小范围，可使用flex类型数据和关键字max-content min-content auto

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/minmax)



fit-content()：相当于公式min(max-content, max(auto, argument))

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/fit-content)

#### 渐变

linear-gradient函数：线形渐变

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient)

注：

 to top，to bottom，to left，to right这些值会被转换成角度0度，180度，270度，90度

```css
linear-gradient(red, orange, yellow, green, blue)
linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%)
// 这两个是等同于的

linear-gradient(red 10%, 30%, blue 90%)
// 起始点到10%的位置标记红色，从90%到结束标记蓝色。在10%到90%之间，颜色从红色过渡到蓝色，然而过渡的中点是在30%(默认是50%)的标记上

linear-gradient(to left, lime 25%, red 25% 50%, cyan 50% 75%, yellow 75%)
// 颜色起止点可以有两个位置，这相当于两个连续颜色在不同位置具有相同的颜色起止点。颜色将在第一个颜色起止点时达到完全饱和，保持该饱和度到第二个颜色起止点，并通过相邻颜色起止点的第一个位置过渡到相邻颜色起止点的颜色
```



radial-gradient函数：径向渐变

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient)

注：

颜色从椭圆中心向各个方向向外过渡



conic-gradient函数：锥形渐变

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient)

注：

颜色会围绕圆心旋转，从顶部开始顺时针旋转

angle单位包括度的deg、梯度的grad、弧度的rad和圈的turn。在一个圆中有360度，400个梯度，2π弧度，1圈，默认值是向北(12:00方向)，顺时针方向



repeating-linear-gradient函数：重复线形渐变

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/repeating-linear-gradient)



repeating-radial-gradient函数：重复径向渐变

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/repeating-radial-gradient)



repeating-conic-gradient函数：重复锥形渐变

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-conic-gradient)

#### 计数器

counter-reset属性：重置计数器

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-reset)



counter-increment属性：计数器增加定值

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-increment)



counter函数：返回计数器的当前值的字符串

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter)



counters函数：返回计数器当前值的连接字符串(包含父级上下文和嵌套内容)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counters)

#### 条件规则

@supports：特性查询，检测浏览器中的一个或多个特定的CSS功能的支持声明

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports)

#### 形状



shape-outside属性：定义基本形状

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-outside)


shape-image-threshold属性：设定一个渗出阈值。如果一幅图像被用于定义形状，那么只有在大于等于渗出阈值的部分才会显示，其他部分不会显示出来

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-image-threshold)


shape-margin属性：形状外面加上边框

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/shape-margin)

#### 变换

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms)



transform属性：设置元素的变换(旋转 缩放 倾斜 平移)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)



transform-function函数：CSS变换函数，复合变换从右到左的顺序有效地应用

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function)



transform-origin属性：设置元素变换的原点

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)



perspective属性：透视值，设置观察者与元素的z=0平面的距离

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)



 perspective-origin属性：设置观察者的位置

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin)

#### 过渡

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)



transition-property属性：设置过渡动画属性的名称

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property)



transition-duration属性：设置过渡动画所需的时间

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration)



transition-timing-function属性：设置过渡动画属性速度函数

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)



timing-function：速度函数

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/easing-function)



transition-delay属性：设置过渡效果开始作用之前需要等待的时间

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay)



transition属性： transition-property transition-duration transition-timing-function transition-delay的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

#### 动画

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations)



animation-name属性：设置@keyframes描述的关键帧名称

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name)



animation-duration属性：设置动画周期的时长

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration)



animation-timing-function属性：设置动画速度(通过建立加速度曲线，设置动画在关键帧之间是如何变化)

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)



timing-function：速度函数

[MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function)



animation-delay属性：设置延时，从动画应用在元素上到动画开始的时间

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)



animation-iteration-count属性：设置动画重复次数

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count)



animation-direction属性：设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)



animation-fill-mode 属性：设置动画在执行之前和之后如何将样式应用于元素

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode)



animation-play-state属性：设置动画是否运行或者暂停

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state)



animation属性： animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction animation-fill-mode animation-play-state的简写

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)



@keyframes：设置动画序列中关键帧

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)