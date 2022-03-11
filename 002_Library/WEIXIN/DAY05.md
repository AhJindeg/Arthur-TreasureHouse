# `微信小程序  Unit05`

### 小程序的生命周期

#### 小程序页面的生命周期

小程序页面的生命周期由小程序框架来管理，小程序框架开放了5个生命周期方法供开发者重写，使得可以在某一个时间节点执行开发者自定义的业务逻辑。这5个生命周期方法在`page.js`中声明：

```javascript
// pages/testing/a/a.js
Page({
  /** 生命周期函数--监听页面加载  执行一次 */
  onLoad: function (options) {

  },

  /** 生命周期函数--监听页面初次渲染完成  执行一次 */
  onReady: function () {

  },

  /** 生命周期函数--监听页面显示  执行多次 */
  onShow: function () {

  },

  /** 生命周期函数--监听页面隐藏  执行多次 */
  onHide: function () {

  },

  /** 生命周期函数--监听页面卸载  执行一次 */
  onUnload: function () {
	
  },
})
```



#### 小程序应用的生命周期

整个小程序应用程序从启动到销毁也会涉及到生命周期(全局生命周期). 称为**小程序应用的生命周期**. 涉及到的生命周期方法,在`app.js`中声明:

```javascript
// app.js
App({
  /** 当小程序第一次启动时执行 经常做全局初始化操作  执行一次 */
  onLaunch() {
  },
  /** 当小程序显示或回到前台时执行 */
  onShow(){},
  /** 当小程序隐藏到后台时执行 */
  onHide(){},
  /** globalData属于App对象的一个属性. 在此处可以声明每一个页面
      需要的共享的数据 
      当在页面中需要获取globalData中的数据时:
      getApp().globalData.userInfo 即可以访问到用户信息 */
  globalData: {
    userInfo: null
  }
})

```

案例:使用`globalData`实现城市的选择. 



### 小程序网络通信类`API`

#### `wx.request()`

`wx.request`可以向服务端发送`https`请求,但是有如下限制:

- 将需要通信的域名添加到后台管理网站的合法域名列表中.
- 域名只支持 `https` 和 `wss`协议；
- 域名不能使用 IP 地址（小程序的[局域网](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/mDNS.html) IP 除外）或 localhost；
- 域名必须经过 ICP 备案；
- 不支持配置父域名，使用子域名。

#### 服务器域名的配置

`https://api.tedu.cn/index.php?cid=1`

若连不上, 两种解决办法:

1. 找`mis`老师

2. 修改本机`dns`:  `114.114.114.114`

   右键网络  --  属性 -- 更改适配器设置  --  选择当前正在使用的网络 右键属性  -- 双击 `Internet 协议版本 v4`   --  选中自己设置服务端`DNS`地址:添加`114.114.114.114`  --  确定完成.


**将需要通信的域名添加到后台管理网站的合法域名列表中:**

1. 登录小程序后台.  `http://mp.weixin.qq.com`  扫码登录.
2. 导航: 开发管理 -- 开发设置 -- 服务器域名设置  -- 添加服务器域名 `https://api.tedu.cn`.
3. 如果有多个域名，域名与域名之间用英文分号隔开.
4. 打开开发工具, 点击详情 -- 项目配置, 查看开发工具是否已与后台网站同步设置.

```javascript
wx.request({
    url: '请求资源路径',
    method: '请求方式',
    header: {'cookie', 'ID:234234233'},  // 请求消息头
    data: {name:'zs', age:15},   // 请求参数
    success: (res)=>{},  // 请求发送成功后执行的回调方法
    fail: (err)=>{},  // 请求发送失败后执行的回调方法
    complete: (data)=>{}  // 无论成功或失败都会执行的回调方法
})
```

案例: 新建`pages/testing/request/request`页面, 测试`wx.request`.



## 学子影院

### 项目初始化

1. 新建项目.

   ![1637561628429](C:\Users\web\AppData\Roaming\Typora\typora-user-images\1637561628429.png)

2. 搭建项目的主体结构.

   1. 新建: `index`  `theatre`   `me` 三个页面.
   2. 拷贝所需要的的图片资源.
   3. 搭建底部选项卡基本结构.

3. 完成基本环境的搭建, 微调配置文件等.

   `project.config.json`文件中在`settings`配置项里添加`checkSiteMap:false`.



### 初始化加载热映类别下的电影列表

**电影列表数据接口**

|          | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| 接口地址 | `https://api.tedu.cn/index.php`                              |
| 请求方式 | `GET`                                                        |
| 请求参数 | `cid: 类别ID (热映:1, 待映:2, 经典:3)`<br/>`offset: 开始读取条目的下标位置(用于分页), offset=0,则会从0的位置返回20条记录. 若offset=10,则会从10的位置返回20条记录` |
| 返回结果 | 从`offset`位置开始向后数20条记录组成的电影列表.              |

返回的电影列表格式如下:

```
[{
    actors: "章若楠／孙晨竣／王彦霖",
    cover: "https://p1.meituan.net/movie/f6ec",
    id: "1",
    moviename: "如果声音不记得",,
    movietype: "爱情／青春／奇幻",
    score: "8.2"
}, .....]
```

**实现思路**

1. 在首页`onLoad`生命周期方法中加载热映类别下`cid=1`的文章列表.
2. 数据获取后,存入`data`,在页面中通过`wx:for`完成列表渲染即可.



### 控制顶部导航的选中项

1. 在`data`中声明一个变量:`cid`用来保存当前选中项的类别`ID`.
2. 修改视图层代码, 与`data.cid`完成数据绑定.
3. 为顶部导航的每一个`item`绑定`tap`事件, 点击后, 获取当前选中项的`id`,在逻辑层中修改`data.cid`,`data.cid`一旦改变, 视图层将会立即更新.



### 点击顶部导航后更新列表数据

1. 在`tapNav`事件处理函数中, 获取当前选中项的`id`. 发送`https`请求.
2. 获取响应数据后, 将`data.movies`更新为最新的列表数据即可.



### 触底加载下一页

**实现步骤**

1. 重写`onReachBottom`方法, 监听触底事件.
2. 在触底事件触发后, 发送新的`https`请求, 加载下一页数据.
   1. 下一页数据的加载需要`cid`与`offset`变量. `cid`为当前类别`id`. `offset`为从何下标位置继续向后读取`20`条(offset正好与当前列表的长度一致). 
   2. 一旦获取到响应数据, 将得到的结果**追加**到旧数组末尾, 完成列表更新.



### 封装`loadData`方法

由于`onLoad`/`tapNav`/`onReachBottom`都需要向`/index.php`发送请求, 获取电影列表, 最好封装一个`loadData`方法, 提高代码重用性, 便于后期维护.

`loadData`方法得设计: 接收两个参数: `cid`/`offset`, 发送请求, 获取响应后 将得到的电影列表 **返回给方法的调用者**.

```
loadData(cid, offset){
	return new Promise((resolve, reject)=>{
        wx.request({
            url: 'xx',
            data:{cid, offset},
            success: (res)=>{
                resolve(res.data)
            }
        })
	})
}
onLoad(){
    let movies = this.loadData(1, 0)
}
tapNav(){
    
}
onReachBottom(){
    
}
```















































































