# `微信小程序  Unit04`

### `<button>`组件



### 小程序的事件处理

事件是视图层到逻辑层的通讯方式。它可以将用户的行为反馈到逻辑层进行处理。

#### 事件类型

在微信小程序中，事件类型分类两大类：

1. 冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
2. 非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

##### 冒泡事件

以下表格列出了小程序中定义的常用的冒泡事件：

| 类型        | 触发条件                                                     |
| ----------- | ------------------------------------------------------------ |
| touchstart  | 手指触摸动作开始                                             |
| touchmove   | 手指触摸后移动                                               |
| touchcancel | 手指触摸动作被打断，如来电提醒，弹窗                         |
| touchend    | 手指触摸动作结束                                             |
| tap         | 手指触摸后马上离开                                           |
| longpress   | 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 |
| longtap     | 手指触摸后，超过350ms再离开（推荐使用longpress事件代替）     |

**除上表之外的其他组件自定义事件如无特殊声明都是非冒泡事件。**



##### 非冒泡事件

其他组件自定义事件（微信官方自定义，非原生`dom`事件）如无特殊声明都是非冒泡事件。例如：

```html
<input bindinput="inputEvent" />
<scroll-view bindscroll="scrollEvent" />
```



#### 小程序的事件绑定机制

常见的小程序事件绑定方式如下：

```html
<button bind事件名="事件处理函数名"></button>
<button bind:事件名="事件处理函数名"></button>
<button catch事件名="事件处理函数名"></button>
```

`bind`方式绑定事件可以应用于任何组件，而`bind:`方式不能应用于**原生组件**。

> 原生组件只由操作系统控制的组件，如`input`组件，`video`组件、`camera`组件等。原生组件的特点是由`Android`或`IOS`操作系统直接提供，并不是微信自己实现的`UI`。

`bind`与`bind:`方式绑定的事件不能阻止事件的冒泡， 但是`catch`方式绑定的事件可以自动阻止事件冒泡。



#### 小程序中事件参数的传递

无论组件绑定的是冒泡事件还是非冒泡事件，事件处理函数名称后严禁出现小括号：

```html
<button bindtap="tapEvent"></button>
<input bindinput="inputEvent" />
```

那么如何在执行事件处理函数时传递参数？



对于**非冒泡事件**，一般都是微信官方组件的自定义事件，**这些事件在触发时涉及到的参数已经被微信官方自动封装到了`event.detail`对象中。(详细参数参照相应文档)**

```html
<input bindinput="inputEvent" />
inputEvent(event){
	event.detail.value
	event.detail.keyCode
	....
}
```

```html
<scroll-view bindscroll="scrollEvent"></scroll-view>
scrollEvent(event){
	event.detail.scrollTop  // 当前位置距离顶部多远
	event.detail.scrollLeft  // 当前位置距离左边多远
}
```



对于**冒泡事件**，参数传递的语法如下：

```html
<button data-ind="0" data-name="zs" bindtap="delEvent">删除</button>
<button data-ind="1" bindtap="delEvent">删除</button>
<button data-ind="2" bindtap="delEvent">删除</button>
```

```javascript
delEvent(event){
    let ind = event.target.dataset.ind 
    let name = event.target.dataset.name
}
```

案例：自定义数组，模拟上述删除操作。



案例：吃饭睡觉打豆豆。



## 微信小程序`API`

### 小程序界面交互类`API`

#### `wx.showToast()`

```javascript
// 弹出Toast提示框
wx.showToast({
    title: "添加成功",
    icon: "success",
    duration: 1500,
    mask: true  // 遮罩
})
```



#### `wx.showModal()`

```javascript
wx.showModal({
    title: '提示',
    content: '确认删除吗？',
    cancelColor: '#aaa',
    cancelText: '我再想想',
    confirmColor: '#f00',
    confirmText: '残忍删除'
}).then(res=>{
    console.log(res)
    if(res.confirm){  // 选择了确认
        ...
    }
})

```



### 小程序路由类`API`

- [wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)
- [wx.reLaunch](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html)
- [wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html)
- [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)
- [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)

```
<navigator url="/pages/te/a/a" open-type="navigate">
<navigator open-type="navigateBack">
<navigator url="/pages/te/a/a" open-type="switchTab">
<navigator url="/pages/te/a/a" open-type="redirect">
<navigator url="/pages/te/a/a" open-type="reLaunch">
```

`wx.navigateTo`方法与`navigator`组件的**保留跳转**机制一模一样。保留将会保留当前页面，创建目标页，跳转到目标页面。（不能跳转到`tabbar`页面）。在这个过程中可以在两个页面之间进行参数的传递。这种参数传递传递需求有两类：**正向传参**、**反向传参**。

**A页面跳转到B页面，并且传参的过程：（正向传参）**

A页面传递参数：

```javascript
wx.navigateTo({
    url: '/pages/testing/a/a?id=1&name=zs&age=15'
})
```

B页面接收参数：

```javascript
Page({
    onLoad(options){   // 小程序页面加载时将会自动调用onLoad生命周期方法
        // options封装了上一个页面传过来的参数
        options.id
        options.name
        options.age
    }
})
```

**A页面跳转到B页面，在B页面中进行操作，向A回传参数的过程：（反向传参）**



### 小程序的生命周期

#### 小程序页面的生命周期

小程序页面的生命周期由小程序框架来管理，小程序框架开放了5个生命周期方法供开发者重写，使得可以在某一个时间节点执行开发者自定义的业务逻辑。这5个生命周期方法在`page.js`中声明：

```javascript
// pages/testing/a/a.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})
```





























































