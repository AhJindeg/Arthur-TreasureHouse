<H1>图片格式</H1>

webp 谷歌开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有jpeg的2/3，并能节省大量的服务器宽带资源和数据空间

DPG 京东自主研发推出DPG图片压缩技术，经测试该技术，可直接节省用户近50%的浏览流量，极大的提升了用户的网页打开速度。能兼容jpeg，实现全平台，全部浏览器的兼容支撑，经过内部和外部上万张图片的人眼浏览测试后发现，压缩后的图片和webp的清晰度对比没有差距。

<mwta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0>
width 宽度设置的是viewport宽度，可以设置device-width 特殊值
initial-scale 初始缩放比，大于0的数字
maximum-scale 最大缩放比，大于0的数字
miximum-scale 最小缩放比，大于0的数字
user-scalable 用户是否可以缩放，yes或no（1或0）

<h1>css3盒子模型</h1>

box-sizing：border-box；
-webkit-box-sizing:border-box;
点击高亮我们需要清除 设置为transparent 完全透明
-webkit-tap-highlight-color:transparent ;
在移动端浏览器默认的外观在ios上加上这个属性才能给按钮和输入 框自定义样式
-webkit-appearance:none;
禁用长按页面时的弹出菜单
img,a{-webkit-touch-callout:none;}

<h1>
   布局原理 
</h1>

flex是flexible Box 的缩写，意为弹性布局，用来为盒装模型提供最大的灵活性，任何一个盒子都能称为

当我们为父盒子设为flex布局以后，子元素的float，clear和vertical-align属性将失效



伸缩布局=弹性布局=伸缩盒布局=弹性盒布局=flex布局

采用FLex布局的元素，称为Flex容器（flex container）， 它的所有子元素自动成为容器成员，称为Flex项目（flex item) 简称 项目

<strong>
   总结flex布局原理
</strong>

就是通过给父盒子添加flex属性，来控制子盒子的位置和排列方式

<h1>
    flex布局父项常见属性
</h1>

<h2>
    flex-direction设置主轴的方向
</h2>

<strong>1，主轴与侧轴</strong>

在flex布局中，是分为主轴和册轴两个方向，同样的叫法有：行和列，x轴与y轴

默认主轴的方向就是x轴方向，水平向右

默认主轴的方向就是y轴方向，水平向下

<strong>属性值</strong>

flex-direction 属性决定主轴的方向（即项目的排列方向)

<font color="red">注意：主轴和侧轴是会变化的 就是设置谁是主轴，剩下的就是侧轴 而子元素是跟着主轴来排列的</font>



| 属性值         | 说明         |
| :------------- | ------------ |
| row            | 默认从左到右 |
| row-reverse    | 从右到左     |
| column         | 从上到下     |
| column-reverse | 从下到上     |

<h1>
     justify-content设置主轴上的子元素排列方式
</h1>

<strong>justify-content 属性定义了项目在主轴上的对齐式</strong>

<strong> <font color="red">注意：使用这个属性之前一定要确定好主轴是哪个</font></strong>

|    属性值     | 说明                                        |
| :-----------: | ------------------------------------------- |
|  flex-start   | 默认值 从头部开始 如果主轴是x轴，则从左到右 |
|   flex-end    | 从尾部开始排列                              |
|    center     | 在主轴居中对齐（如果主轴是x轴则水平居中）   |
| space-around  | 平分剩余空间                                |
| space-between | 先两边贴边 再平分剩余空间                   |

<h2>
    flex-wrap 设置子元素是否换行
</h2>

默认情况下，项目都排在一条线（又称“轴线”）上。flex-wrap属性定义，flex布局中默认是不换行的

| 属性值 | 说明          |
| ------ | ------------- |
| nowrap | 默认值 不换行 |
| wrap   | 换行          |

<h2>
    <font color="red"> align-items</font>设置侧轴上的子元素排列方式（单行）
</h2>

该属性是控制子项在侧轴（默认为y轴）上的排列方式 在子项为单项（单行）的时候使用

| 属性值     | 说明                     |
| ---------- | ------------------------ |
| flex-start | 默认值 从上到下          |
| flex-end   | 从下到上                 |
| center     | 挤在一起居中（垂直居中） |
| stretch    | 拉伸                     |

<h2>
    <font color="red"> align-content </font>设置侧轴上的 子元素的排列方式（多行）
</h2>

设置子项在侧轴上的排列方式 并且只能用于子项出现换行的情况（多行）在单行下 没有效果

| 属性值                                     | 说明                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| <font color="red">flex-start</font>        | <font color="red">默认值在侧轴的</font>                      |
| flex-end                                   | 在侧轴的尾部开始排列                                         |
| <font color="red">flex</font>              | <font color="red">在侧轴中间显示</font>                      |
| <font color="red">flexspace-around</font>  | <font color="red">子项在侧轴平分剩余空间</font>              |
| <font color="red">flexspace-between</font> | <font color="red">子项在侧轴先分布在两头，再平分剩余空间</font> |
| <font color="red">flex-stretch</font>      | <font color="red">设置子项元素高度平分父元素高度</font>      |

<h2>
    <font color="red">align-content 和 align-items的区别</font>
</h2>

 align-items适用于单行情况下，只有上对齐，下对齐，居中和拉伸

align-conten适用于换行（多行）的情况下（单行情况下无效），可以设置上对齐，下对齐，居中。拉伸以及平局分配剩余空间等属性值

总结就是单行找align-items多行找align-content

<h2>
    背景渐变
</h2

语法：background: linear-gradient(起始方向，颜色1，颜色2...............);

background: -webkit-linear-gradient(left,red,blue);

背景渐变必须添加浏览器私有前缀

起始方向可以是：方位词或者度数，如果省略默认为top

<h1>
    rem基础
</h1>

<h2>
    ren单位
</h2>

rem(root em)是一个相对单位，类似于em，em是父元素字体的大小。

不同的是rem的基准是相对于html元素的字体大小

比如，根元素（html）设置font-size=12px；非根元素设置wide：2rem；则换成就是24px

rem的优势：父元素文字大小可能不一致，但是整个页面只有一个html，可以很好的控制整个页面的元素大小

<h1>
    1,什么是媒体查询
</h1>

媒体查询（media）是css3新语法

<ul>
    <li>使用@media查询，可以针对不同的媒体类型定义不同的样式</li>
    <li><font color="red">@media可以针对不同的屏幕尺寸设置不同的样式</font></li>
    <li>当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面</li>
     <li>目前针对很多苹果手机，Android手机，平板等设备都用得到多媒体查询</li>
</ul>

<h2>
    2.2语法规范
</h2>

```

```

```
@media mediatype and|not|only(media feature){
    css-Code;
}
```

- 用于@media 开头注意@符好
- mediatype媒体类型
- 关键字 and not only
- media feature 媒体特性 必须有小括号包含

<h2>
    1，mediatype查询类型
</h2>

将不同的终端设备划分不同的类型，称为媒体类型

| 值     | 解释说明                           |
| ------ | ---------------------------------- |
| all    | 用于所有设备                       |
| print  | 用于打印机和打印预览               |
| screen | 用于平板电脑，电脑屏幕，智能手机等 |

<h2>
    2，关键字
</h2>

```

```



- 关键字将媒体类型或者多个媒体特性连接到一起做为媒体查询的条件
- and：可以将多个媒体特性连接到一起，相当于“且”的意思
- not：排除某个媒体类型，相当于“非”的意思，可以省略
- only：指定某个特定的媒体类型，可以省略

<h2>
    3，媒体特性
</h2>

每种媒体类型都具体各自不同的特性，根据不同的媒体类型的媒体特性设置不同的展示风格。我们暂时了解三个。

注意他们要加小括号包含

| 值        | 解释说明                           |
| --------- | ---------------------------------- |
| wide      | 定义输出设备中页面可见区域的宽度   |
| min-width | 定义输出设备中页面最小可见区域宽度 |
| max-width | 定义输出设备中页面最大可见区域宽度 |

<h1>
    less基础
</h1>

<h2>
    less介绍
</h2>

less（leaner Style Sheets的缩写）是一门css扩展语言，也成为css预处理器

做为css的一种形式的扩展，他并没有减少css的功能，而是在现有的css语法上，为css加入程序式语言的特性

他在css的语法基础上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了css的编写，并且降低了

css的维护成本，就像他的名称说的那样，less可以让我们用更少的代码做更多的事情

less中文网站：http://lesscss.cn/

<font color="red">    less是已门css预处理语言，他扩展了css的动态特性
</font>

<h2>
    less变量
</h2>

变量是指没有固定的值，可以改变的。因为我们css中的一些颜色和数值等经常是使用

```
@变量名:值;
```

<h2>
    变量名规范
</h2>

- 必须有@为前缀
- 不能包含特殊字符
- 不能已数字开头
- 大小写敏感

```
@color：pink;
```

<h2>
    元素大小取值方法
</h2>



1. 最后的公式：页面元素rem值=页面元素（px）/（屏幕宽度/划分的份数）4
2. 屏幕宽度/划分的份数就是html font-size 的大小
3. 或者：页面元素的rem值= 页面元素（px）/html font-size 字体大小

<h1>
    jquery概述
</h1>

jQuery是一个快速，简洁的JavaScript库，其设计宗旨是“"write Less,Do More",即倡导写更少的代码，做更多的事情

j就是JavaScript； Query查询；意思就是查询js，把js中的DOM操作做了封装，我们可以快速的查询使用里面的功能

jQuery封装了JavaScript常用的功能代码，优化了DOM操作，事情处理，动画设计和Ajax交互

学习Jqurey本质：就是学习调用这些函数

jQuery出现的目的是加快前端人员的开发速度，我们可以非常方便的调用和使用他，以提高开发速率

jQuery的入口函数

```
$(functiao(){
    
    ...//此处是页面DOM加载完成的入口
})；
```

```
$(document).ready(function({
    ... ...//此处是页面DOM加载完成的入口
}))
```

1,等着DOM结构渲染完毕即可执行内部代码，不必等到所有外部资源加载完成jQuery帮我们完成了封装

2，相当于原生js中的DOMContentLOaded。

3，不同于原生js中是load事件是等页面文档，外部的js'文件，css文件，图片加载完毕执行代码

4，更推荐使用第一种方式

<h2>
    jQuery的顶级对象$
</h2>

1，$是jQuery的别称,在代码可以使用jQuery代替$，但是一般为了方便，通常直接使用$

2,$是jQuery的顶级对象。相当于原生JavaScript中的window。把元素利用$包装成jQuery对象，就可以调用jQuery的方法

<h2>
    jQuery对象和DOM对象
</h2>

1，用原生js获取来的对象就是DOM对象

2，jquery方法获取的元素就是jQuery对象

3，jQuery对象本质是：利用$对DOM对象包装后产生的对象（伪数组形式存储）

<font color="red">注意</font>

只有jQuery对象才能使用jQuery方法，DOM对象则使用原生的JavaScript方法

DOM对象与jQuery对象之间是可以相互转换的

因为原生js比jQuery更大，原生的一些属性和方法jQuery没有给我们封装，要想使用这些属性和方法需要把

jQuery对象转换为DOM对象才能使用

1DOM对象转换为jQuery对象：$(DOM对象)

```
$('div')
```

2,jQuery对象转换为DOM对象（两种方式）

```
$('div')[index] index是索引
```

```
$('div').get(index) index是索引号
```

<h2>
    jQuery基础选择器
</h2>

原生js获取元素方式很多，很杂，而且兼容性情况不一致，因此jQuery给我们做了封装，是获取元素统一标准

```
$("选择器")//里面选择器直接写cs选择器即可，但是要加引号
```

| 名称       | 用法            | 描述                     |
| ---------- | --------------- | ------------------------ |
| ID选择器   | $("#id")        | 获取指定ID元素           |
| 全选选择器 | $('*')          | 匹配所有元素             |
| 类选择器   | $(".class")     | 获取同一类class的元素    |
| 标签选择器 | $("div")        | 获取同一类标签的所有元素 |
| 并集选择器 | $("div,p,li")   | 选取多个元素             |
| 交集选择器 | $("li.current") | 交集元素                 |

jQuery层级选择器

| 名称       | 用法       | 描述                                                        |
| ---------- | ---------- | ----------------------------------------------------------- |
| 子代选择器 | $("ul>li") | 使用>号，获取亲儿子层级的元素；注意并不会获取孙子层级的元素 |
| 后代选择器 | $("ul li") | 使用控格，代表后代选择器，获取ul下的所有li元素，包括孙子等  |

jQuery设置样式

```
$('div').css('属性','值')
```

<h2>
    隐式迭代
</h2>

遍历内部DOM元素（伪数组形式储存）的过程叫做隐式迭代

简单理解：给匹配到的所有元素进行循环遍历，执行相应的方法，而不用我们再进行循环，简化我们的操作，

方便我们调用

<h2>
    jQuery筛选选择器
</h2>



| 语法       | 用法          | 描述                                                      |
| ---------- | ------------- | --------------------------------------------------------- |
| :first     | $('li:frist') | 获取第一个li元素                                          |
| :last      | $("li:last")  | 获取最后一个li元素                                        |
| :eq(index) | $('li:eq(2)') | 获取到的li元素中，选择索引号为2的元素，索引号index从0开始 |
| :odd       | $('li:odd')   | 获取到的li元素中，选择索引号为奇数的元素                  |
| :even      | $('li:even')  | 获取到的li元素中，选择索引号为偶数的元素                  |

## jQuery 筛选方法

| 语法               | 用法                           | 说明                                                   |
| ------------------ | ------------------------------ | ------------------------------------------------------ |
| parent()           | $("li").parent();              | 查找父级                                               |
| children(selector) | $("ul),childen("li)            | 相当于$("ul>li")，最近一级（亲儿子）                   |
| find(selector)     | $("ul"),find("li")             | 相当于$("ul li")，后代选择器                           |
| siblings(selector) | $(".first"),siblings("li")     | 查找兄弟节点，不包括自己本身                           |
| nextAll([expr])    | $(".first").nextAll            | 查找当前元素之后所有的同辈元素                         |
| prevtAll([expr])   | $("l.ast").prevAll             | 查找当前元素之前所有的同辈元素                         |
| hasClass(class)    | $('div').hasClass("protected") | 检查当前的元素是否含有某个特定的类，如果有，则返回true |
| eq(index)          | $("li").eq(2)                  | 相当于$("li:eq(2)")，indexcong0开始                    |

<font color="red">重点：parent() children() find() siblings() eq()</font>

# jQuery样式操作

## 2.1操作css方法

jQuery可以使用css方法来修改简单元素样式；也可以操作类，修改多个样式。

1，参数只写属性名，则是返回属性值

```
$(this).css("color)；
```

2，参数是属性名，属性值，逗号分隔，是设置一组样式，属性必须加引号，值如果是数字可以不用跟单位和引号

```
$(this).css("color","red")；
```

3,参数可以是对象，方便设置多组样式。属性名和属性值用冒号隔开，属性可以不用加引号

```
$(this).css({"color":"white","font-size":"20px"})；
```

## 2.2设置类样式方法

作用等同于以前的classList，可以操作类样式，注意操作类里面的参数不要加点

1，添加类

```
$("div").addClass("current")
```

2,移除类

```
$("div").removeClass("current")
```

3,切换类

```
$("div").toggleClass("current")
```

# 3，jQuery效果

**显示隐藏**

```
show()
hide()
toggle()
```

**滑动**

```
slideDown()
slideUp()
slideToggle()
```

**淡入淡出**

```
fadeln()
fadeOut()
fadeToggle()
fadeTo()
```

**自定义动画**

```
animate
```

## 3.1显示隐藏效果

**1，显示语法规范**

```
show([speed],[easing],[fu])
```

##### **2，显示参数**

1.参数都可以省略，无动画直接显示

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

**1，隐藏语法规范**

```
hide([speed],[easing],[fu])
```

**2，隐藏参数**

1.参数都可以省略，无动画直接显示

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

1，切换语法规范

```
toggle(speed],[easing],[fu])
```

2,切换参数

1.参数都可以省略，无动画直接显示

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

<font color="red">建议：平时一般不带参数，直接隐藏即可</font>

## 3.2滑动效果

**1,下滑效果语法规范**

```
slideDown([speed],[easing],[fu])
```

**2,下滑效果参数**

1.参数都可以省略

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

**1,上滑效果语法规范**

```
slideUp([speed],[easing],[fu])
```

**2,上滑效果参数**

1.参数都可以省略

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

**1,滑动切换效果语法规范**

```
slideToggle([speed],[easing],[fu])
```

**2,滑动切换效果参数**

1.参数都可以省略

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

## 3.3事件切换

```
hover([over],[out])
```

1,over：鼠标移到元素上触发的函数（相当于mouseenter）

2,out:鼠标移出元素要触发的函数（相当于mouseleave）

3.如果只写一个函数，则鼠标经过和离开都会触发它

## 3.4动画队列及其停止排队方法

**1，动画或效果队列**

动画或效果一旦触发就会执行，如果多次触发，就会造成多个动画或者效果排队执行

**2，停止排队**

```
stop()
```

1,stop()方法用于停止动画效果

2，注意： stop（）写道动画或者效果的前面，相当于停止结束上一次动画

## 3.5淡入淡出效果

**1，淡入语法规范**

```
fadeIn([speed],[easing],[fu])
```

**2,淡入参数**

1，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

2，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

3，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

**1，淡出语法规范**

```
fadeOut([speed],[easing],[fu])
```

**2,淡出参数**

1，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

2，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

3，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

**1，淡入淡出切换语法规范**

```
fadeToggle([speed],[easing],[fu])
```

**2,淡入淡出切换参数**

1，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

2，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

3，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

**1，渐进方式调整到指定的的不透明度**

```
fadeTo([speed],opacity,[easing],[fu])
```

**2,效果参数**

1，opacity:透明度必须写，取值0~1之间

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

3.6自定义动画animate

1，语法

```
animate(params[speed][easing],[fu])
```

2,参数

1，params:想要更改的样式属性，以对象形式传递，必须写。属性名可以不用带引号，如果是复合属性则需要采取驼峰命名法borderLeft。其余参数都可以省略。

2，speed：三种预定速度之一的字符串（“slow”，“normal”，or “fast”）或表示动画时长的毫秒值

3，easing：（Optional）用来指定切换效果，默认是“swing”，可用参数“linear”

4，fn：回调函数，在动画完成时执行的函数，每个元素执行一次

# 5.jQuery属性操作

## 5.1设置或获取元素固有的属性值prop()

所谓元素固有的属性就是元素本身自带的属性，比如<a>元素里面的href

**1，获取属性语法**

```
prop("属性")
```

**2.设置属性语法**

```
prop("属性"，"属性值")
```

## 5.2设置或获取元素自定义属性值attr()

用户自己给元素添加的属性，我们称自定义属性。比如给div添加index="1"。

**1，获取属性语法**

```
attr("属性")              //类似原生getAttribute
```

**2.设置属性语法**

```
attr("属性","属性值")      //类似原生setAttribute
```

该方法也可以获取H5自定义属性

## 数据的缓存data()

data()方法可以在指定的元素上存取数据，并不会修改DOM元素结构。一旦页面刷新，之前存放的数据都将被移除

**1，附加数据语法**

```
data("name","value")    //向被元素附加数据
```

**2,获取数据语法**

```
data("name")     //向被选元素获取数据
```

同时，还可以读取html 5自定义属性data-index ,得到的是数字型

# 6.jQuery内容文本值

主要针对元素的内容还有表单值的操作

## 1.普通元素内容html()(相当于原生innerHTML)

```
html()//获取元素的内容
```

```
html("内容")//设置元素的内容
```

## 2，普通元素文本内容text()(相当与原生innerText)

```
text()//获取元素的文本内容
```

```
text("text文本内容")//设置元素的文本内容
```



## 3.表单的值val()(相当于原生value）

```
val() //获取表单的值
```

```
val("内容")  //设置表单的值
```

# 7，jQuery元素操作

主要是遍历，创建，添加，删除元素操作

## 7.1遍历元素

jQuery隐式迭代是对同一元素做了同样的操作。如果想要给同一元素做不同操作就需要用到遍历

语法1：

```
$("div").each(function(index,domEle){xxx;})
```

1，each()方法遍历匹配的每一元素。主要用DOM。each每一个

2，里面的回调函数有2个参数：index是这个元素的索引号；doemEle是每个DOM元素对象，不是jQuery对象

3，所有想要使用jQuery对象，需要把dom对象转换成jQuery对象

语法2

```
$("div").each(object ,function(index,element){xxx;})
```

1.$each(方法可用于遍历任何对象。主要用于数据处理，比如数组，对象

2，里面的函数有2个参数：index是每个元素的索引号；element遍历内容

## 7.2创建元素

语法

```
$("<li></li>")
```

动态的创建一个<li>

## 7.3添加元素

### 1，内部添加

```
element.append("内容")
```

把内容放入匹配元素内部最后边，类似原生aooendChild

```
element.prepend("内容")
```

把内容放入匹配元素内部最前边

