# `微信小程序  Unit02`

#### `tabbar`配置项

`tabbar`用于指定小程序的底部选项卡。基本结构如下：

```json
"tabBar": {
    "color": "#333",
    "selectedColor": "#f00",
    "list": [{
        "text": "电影",
        "pagePath": "pages/index/index",
        "iconPath": "/images/index_disable.png",
        "selectedIconPath": "/images/index_enable.png"
    },{
        "text": "影院",
        "pagePath": "pages/theatre/theatre",
        "iconPath": "/images/theatre_disable.png",
        "selectedIconPath": "/images/theatre_enable.png"
    },{
        "text": "我的",
        "pagePath": "pages/me/me",
        "iconPath": "/images/me_disable.png",
        "selectedIconPath": "/images/me_enable.png"
    }]
},
```

注意事项：

> 1. `position`若为`top`， 则不会显示选项卡的图标。
> 2. `list`中至少含有2项， 最多5项。
> 3. `pagePath`不能以`/`开头。
> 4. `iconPath`与`selectedIconPath` 不支持网络图片路径，只能用本地路径。
> 5. 图标大小建议`81*81`，每张图片不超过`40K`。



#### `style`

> 基础库 2.8.0 开始支持，低版本需做[兼容处理](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)。

微信客户端 7.0 开始，UI 界面进行了大改版。小程序也进行了基础组件的样式升级。app.json 中配置 `"style": "v2"`可表明启用新版的组件样式。



#### `sitemapLocation`

指明 [sitemap.json](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html) 的位置；默认为 `'sitemap.json'` 即在 `app.json` 同级目录下名字的 `sitemap.json` 文件.

`sitemap.json`配置文件用于指明到底哪些页面希望微信官方搜索引擎收录。配置详情参考：`https://developers.weixin.qq.com/miniprogram/dev/framework/sitemap.html`

**`sitemap`的控制台索引提示默认是开启的，在控制台台会有黄色警告，若不希望看到这些警告，可以再`project.config.json`配置文件中， 找到`setting`下的`checkSiteMap`设置为`false`即可。（若没有，则自己添加一个）**



### `app.wxss`

用于定义组件的全局样式。



### `app.js`

`app.js`是小程序全局的初始化脚本。在该文件中定义全局使用的`js`脚本代码。 当小程序启动时， 将会执行`app.js`中的代码来初始化整个小程序的环境。初始化时， 将会自动调用`onLaunch`生命周期方法， 用于让小程序开发者在应用启动时完成某些自定义业务逻辑。

```javascript
App({
  onLaunch() {
    
  }
})

```



## 小程序官方组件库

小程序`wxml`用于搭建页面结构。内容由各式各样的组件构成。这些组件都是微信自定义的。 原生`html`标签不能用。所以需要先了解小程序提供的官方组件。

> 关于组件属性
>
> 1. 对于`boolean`类型属性， 无论设置为`true`还是`false`， 小程序都将会当做普通字符串来处理。都会被解析为`true`。 除非用空字符串`“”`。但是这么写有点野，建议通过`{{}}`引用`js`变量或字面量，为属性赋值即可。
> 2. 小程序中组件属性的命名既可以用驼峰命名法， 也可以使用短横线命名法，两种属性的设置小程序都会解析。

### `<view>`组件

`<view>`组件属于视图容器组件（类似`div`）。其基本语法如下：

```html
<view class="默认样式类名"
      hover-class="点击view时所应用的类名"
      hover-start-time="按住后多久出现点击态，单位毫秒"
      hover-stay-time="手指松开后点击态保留时间，单位毫秒"
      hover-stop-propagation="是否阻止点击状态样式的冒泡">
</view>
```

案例：新建页面： `pages/testing/view/view`。把该页面作为首页显示。在该页面中测试`view`组件的使用。



### `<image>`组件

`image`组件为图片组件， 支持`gif`、`jpg`、`png`、`svg`、`webp`等图像格式。其语法结构为：

```html
<image src="图片路径" 
       lazy-load="是否采用懒加载" 
       mode="图片的裁剪模式"
       show-menu-by-longpress="是否支持长按图片显示操作菜单">
</image>
```

案例： 新建首页： `pages/testing/image/image`。



#### `WXSS（Weixin Style Sheets）`

`wxss`是小程序提供的一套样式语言，用于描述组件样式。`wxss`具备了`css`的大部分特性。并且对`css`进行了扩展，新增了`rpx`作为尺寸单位。

##### `rpx`响应式像素（根据屏幕宽度的不同，`1rpx`在不同平台下描述了不同的`px`值）

微信官方规定，所有设备的屏幕宽度都是`750rpx`。由此规定可以在不同平台下得到`rpx`与`px`之间的换算公式。例如：`iphone6`屏幕宽度`375px`。由`rpx`规定可得在`iphone6`平台下，`1px`等于`2rpx`。

未来使用`rpx`作为尺寸单位来定义组件的宽搞，可以根据屏幕分辨率进行自适应。

| 设备         | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| ------------ | ------------------------ | ------------------------ |
| iPhone5      | 1rpx = 0.42px            | 1px = 2.34rpx            |
| iPhone6      | 1rpx = 0.5px             | 1px = 2rpx               |
| iPhone6 Plus | 1rpx = 0.552px           | 1px = 1.81rpx            |

**建议：** 开发微信小程序时设计师可以用 iPhone6 作为视觉稿的标准。



### `<swiper>`组件

`<swiper>`组件为轮播图组件， 其语法是：

```html
<swiper indicator-dots="{{true}}"
        indicator-color="#fff6"
        indicator-active-color="#0f0"
        autoplay="{{true}}"
        interval="3000"
        duration="200"
        circular="{{true}}"
        vertical="{{false}}">
    <swiper-item>...</swiper-item>
    <swiper-item>...</swiper-item>
    <swiper-item>...</swiper-item>
	...
</swiper>
```

案例：新建：`pages/testing/swiper/swiper`。



### `<text>`组件

`<text>`组件为文本组件， 其语法为：

```html
<text decode="是否支持解码"
      space="空格的显示方式   nbsp|ensp|emsp"
      user-select="文本是否可选">
</text>
```



### `<navigator>`组件

`<navigator>`组件是页面链接组件。用于控制页面之间的跳转。 其语法结构如下：

```html
<navigator url="当前小程序内的其他页面地址"
           open-type="跳转方式">点我跳转到目标页面</navigator>
```

`open-type`提供了多种跳转方式，可选项包括：

> 1. `navigate` ，默认的跳转方式， 它可以从当前页跳转到非`tabbar`页面。 跳转的过程中将保留当前页， 新建目标页， 而后跳转过去。称为**保留跳转**。
> 2. `navigateBack`，返回上级页面。 这种操作将会销毁当前页，从而显示上一页。可以配合`delta`属性来实现上`n`页的返回。
> 3. `switchTab`，字面理解为：切换到某个选项卡页面。这种跳转方式可以跳转到`tabbar`页面，但是一旦这么做，将会关闭所有非`tabbar`页面。
> 4. `redirect`， 字面理解为：重定向。这种跳转方式将会关闭当前页面，跳转到非`tabbar`页面。
> 5. `reLaunch`， 字面理解为：重新启动。 这种跳转方式将会关闭所有页面，创建并打开指定的页面。





