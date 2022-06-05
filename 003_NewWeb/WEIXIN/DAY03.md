# `微信小程序  Unit03`

### `<scroll-view>`组件

`<scroll-view>`组件用于实现滚动的视图容器（支持水平、垂直滚动）。其语法结构为：

```html
<scroll-view scroll-x="是否允许水平方向滚动"
             scroll-y="是否允许垂直方向滚动"
             enable-flex="{{true}}"
             show-scrollbar="{{false}}"
             enhanced="{{true}}">
</scroll-view>
```

案例：新建`pages/testing/scroll/scroll`。测试`scrollview`组件。



### `<input>`组件

`<input>`组件为输入框组件，其语法结构为：

```html
<input	type="输入框的类型"
       	placeholder="占位字符内容"
       	value="输入框的值（用于显示、提交）"
       	password="控制当前输入框是否是密码框"
       	maxlength="最大长度"
        focus="是否自动获取焦点（获取焦点将自动弹出软键盘）"
        bindinput="绑定事件处理函数"
       	bindblur=""
       	bindfocus="">
</input>
```

type的可选值：

> 1. `text`
> 2. `number`
> 3. `idcard`
> 4. `digit`

`input`组件中提供了一些事件处理（`eventhandle`）属性。这些属性用于为当前组件绑定事件处理函数。在属性值中填写事件处理函数名称即可。（**函数名后严禁出现小括号**）

```html
<input type="text" placeholder="用户名" bindinput="doInput"/>
```

一旦绑定了`doInput`， 则需要在`page.js`中声明`doInput`方法用于处理该事件。`doInput`方法中也将自动传入`event`对象，用于封装事件相关参数信息。

```javascript
Page({
    data:{},
    /** 处理输入框的input事件 */
    doInput(event){
        console.log(event.detail.value)
    },
})
```

#### 小程序表单组件的双向数据绑定

`VUE`：

```html
<template>
    {{name}}
	<input v-model="name">
</template>
<script>
    data(){
        return {
            name: ''
        }        
    }
</script>


```

微信小程序的双向数据绑定包含两步：

1. 视图层（`page.wxml`）到逻辑层（`page.js`）的数据更新业务。

   `page.wxml`

   ```html
   <input type="text" bindinput="doInput"></input>
   ```

   `page.js`

   ```javascript
   Page({
       data:{
           val: ""
       },
       doInput(event){ // 获取文本框的值， 更新data.val
           // 第一种设置data的方式
           this.data.val = event.detail.value 
           // 第二种设置data的方式
           this.setData({
               val: event.detail.value
           })
       }
   })
   ```

2. 逻辑层（`page.js`）到视图层（`page.wxml`）的页面更新业务。

   `page.js`

   ```
   Page({
       data: {
           val: 'abc'
       }
   })
   ```

   `page.wxml`

   ```html
   <text>{{val}}</text>
   ```



### `wxml`语法基础

`wxml`是一套标签语言，符合标签语言的相关语法， 用于定义页面结构。而如果涉及到在`wxml`中展示动态数据，就需要结合`js`文件中在`data`里声明的变量，来动态处理。这些动态数据大致包括：动态文本、动态属性、动态样式等。

```
Page({
    data:{
        name: 'zs',
        age: 16,
        xxxx: xxx
    }
})
```

`wxml`需要获取动态数据时，可以使用`{{}}`，常见的需求有一下几大类：

#### 内容绑定

动态更新组件的内容文本：

```html
<text>{{name}}</text>
<text>{{age}}</text>
```

#### 属性绑定

动态更新组件的属性值：

```javascript
Page({
    data:{
        url: '/images/1.jpg',
        num: 1,
        showbar: true
    }
})
```

```html
<image src="{{url}}"></image>
<image src="/images/{{num}}.jpg"></image>
<scroll-view show-scrollbar="{{showbar}}"></scroll-view>
```

#### 样式绑定

动态更新组件的`wxss`样式。

```javascript
Page({
    data:{
        className: 't2',
        c: 'red',
        bw: 1
    }
})
```

```html
<text class="{{className}}"></text>
<text style="color:{{c}}; border:{{bw}}px solid {{c}};"></text>
```

#### 列表渲染

基于小程序提供的列表渲染语法，可以动态的输出列表数据。类似`vue`中的`v-for`。

```javascript
Page({
    data:{
        goods:[ {id:1001, name:'叫花鸡', price:28.8},
        		{id:1002, name:'鱼香肉丝', price:38.8},
                {id:1003, name:'宫保鸡丁', price:21.8} ]
    }
})
```

`VUE`中的`v-for`，列表渲染语法如下：

```html
<div v-for="(item, i) in goods" :key="i">
	编号: {{item.id}}
    菜品: {{item.name}}
    价格：{{item.price}}
</div>
```

小程序中使用`wx:for`来实现列表渲染，语法如下：

```html
<div wx:for="{{goods}}">
	编号: {{item.id}}
    菜品: {{item.name}}
    价格：{{item.price}}
</div>
```

##### `wx:key`

如果列表项的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 [input](https://developers.weixin.qq.com/miniprogram/dev/component/input.html) 中的输入内容，[switch](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html) 的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符。

`wx:key` 的值以两种形式提供

1. 字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
2. 保留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。

当数据改变触发渲染层重新渲染的时候，会校正带有 key 的组件，框架会确保他们被重新排序，而不是重新创建，以确保使组件保持自身的状态，并且提高列表渲染时的效率。

**如不提供 wx:key，会报一个 warning， 如果明确知道该列表是静态，或者不必关注其顺序，可以选择忽略。**

```html
<div wx:for="{{goods}}" wx:key="id">
	编号: {{item.id}}
    菜品: {{item.name}}
    价格：{{item.price}}
</div>
```

`item`与`index`两个变量，是`wx:for`内置变量。 我们还可以自定义变量名，修改遍历过程中描述每一个对象和索引的变量名：

```html
<div wx:for="{{goods}}" wx:key="id" wx:for-item="cp" wx:for-index="i">
    {{i}}
	编号: {{cp.id}}
    菜品: {{cp.name}}
    价格：{{cp.price}}
</div>
```

#### 条件渲染

使用条件渲染可以动态处理是否渲染某个元素。类似`vue`中的`v-if`。例如：

```
data:{
    islogin: true
}
```

```html
<text wx:if="{{islogin}}">欢迎：xxx</text>
<text wx:else>登录、注册</text>
```

条件渲染的常见写法如下：

```html
<text wx:if="{{条件表达式}}"></text>
-------------------------------------------------
<text wx:if="{{条件表达式}}"></text>
<text wx:else></text>
-------------------------------------------------
<text wx:if="{{条件表达式}}"></text>
<text wx:elif="{{条件表达式}}"></text>
<text wx:elif="{{条件表达式}}"></text>
<text wx:elif="{{条件表达式}}"></text>
<text wx:else></text>
```

## 小程序组件库

### `<radio-group>`组件

`<radio-group>`组件为单选框组件，其基本结构为：

```html
<radio-group>
	<radio value="M" checked color="#00f">男</radio>
	<radio value="F" color="#f00">女</radio>
</radio-group>
```

案例：新建`pages/testing/radio/radio`。出一道单选题。















































