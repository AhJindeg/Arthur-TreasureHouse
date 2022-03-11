# `微信小程序  Unit06`

### `loadData`方法

由于`onLoad`/`tapNav`/`onReachBottom`都需要向`/index.php`发送请求, 获取电影列表, 最好封装一个`loadData`方法, 提高代码重用性, 便于后期维护.

`loadData`方法得设计: 接收两个参数: `cid`/`offset`, 发送请求, 获取响应后 将得到的电影列表 **返回给异步方法的调用者**.

```javascript
loadData(cid, offset){
	return new Promise((resolve, reject)=>{
        wx.request({
            url: 'xx',
            data:{cid, offset},
            success: (res)=>{
                resolve(res.data)
            },
            fail: (err)=>{
                reject(err)
            }
        })
	})
}
onLoad(){
    let movies = this.loadData(1, 0).then(movies=>{
        
    })
}
```



### 小程序缓存设计方案

**什么叫缓存?**

客户端向服务端发送请求试图获取一组数据, 当数据下载完毕后, 客户端可以将下载下来的数据**缓存**到客户端本地.  当下次再需要发送请求时, 先去**缓存**中搜索, 看看以前有没有存过, 若找得到则直接使用,  若找不到再发请求.

**什么样的业务适合使用缓存?**

数据变化频率低的业务.

访问量越大, 缓存对服务端优化效果越好.

> 注意:一旦真实数据发生了改变, 缓存中的数据也应该想办法更新. 更新频率应与小程序业务形态相适应. 有些小程序需要频繁更新, 有些小程序则不是.



### 切换选项卡时处理缓存

#### 小程序中缓存相关`API`

向缓存中存储数据:

```javascript
wx.setStorage({
    key: 'key',
    data: 'value'
})
```

从缓存中取出数据(需要根据`key`, 才能获取对应的`data`):

```javascript
// callback方式获取数据
wx.getStorage({
    key: 'key',
    success: (data)=>{},
    fail: (err)=>{}
})
// promise方式获取数据
wx.getStorage({key: 'key'}).then(
	(res)=>{  },   // 成功后执行  resolve
    (err)=>{  }    // 失败后执行  reject
)
```

清空缓存数据:

```javascript
wx.clearStorage()
```

删除缓存数据:

```javascript
wx.removeStorage({key:'key'})
```





**实现步骤:**

1. 当切换选项卡时, 加载当前类别下的首页数据. 将该数据存入缓存.  
2. 当下次切换选项卡时, 先去缓存中搜索一下是否已经缓存了这组数据, 如果有则直接使用,  没有再发请求.

```javascript
wx.getStorage({key: id}).then(
    (res)=>{
        // movies 即是缓存中的电影数据
        console.log(res.data)
        // 缓存中有数据, 更新列表即可
        this.setData({movies: res.data})
    }, (err)=>{
        console.warn(err)
        // 缓存中没有数据, 重新发送请求
        // 通过id, 发送https请求, 获取当前类别下的电影列表
        this.loadData(id, 0).then(movies=>{
            this.setData({movies})
            // 将首页数据, 存在缓存中 {key: data}
            // key:this.data.cid  data: [{},{},{}...]
            wx.setStorage({
                key: this.data.cid,
                data: movies
            })
        })
    })
```



### 实现首页列表的下拉刷新, 更新缓存

1. 监听`onPullDownRefresh`下拉刷新事件.
2. 发送请求,获取当前类别下的首页数据, 更新列表, 更新缓存..



### 在首页获取当前设备位置信息

1. 在`onLoad`时获取当前定位信息.
   1. 在`app.json`中配置`permission`字段注册位置权限.
   2. 调用`wx.getLocation`获取经纬度信息.
2. 根据当前经纬度, 解析为城市名称, 显示在首页左上角.(需要借助腾讯位置服务)



### 接入腾讯位置服务

`http://lbs.qq.com`

1. 申请开发者密钥（key）：[申请密钥](https://lbs.qq.com/dev/console/application/mine)

2. 开通webserviceAPI服务：控制台 ->应用管理 -> [我的应用](https://lbs.qq.com/dev/console/key/manage) ->添加key-> 勾选WebServiceAPI -> 保存

   (小程序SDK需要用到webserviceAPI的部分服务，所以使用该功能的KEY需要具备相应的权限)

3. 下载微信小程序JavaScriptSDK，微信小程序[JavaScriptSDK v1.1](https://mapapi.qq.com/web/miniprogram/JSSDK/qqmap-wx-jssdk1.1.zip)   [JavaScriptSDK v1.2](https://mapapi.qq.com/web/miniprogram/JSSDK/qqmap-wx-jssdk1.2.zip)

4. 安全域名设置，在[小程序管理后台](https://mp.weixin.qq.com/wxamp/home/guide) -> 开发 -> 开发管理 -> 开发设置 -> “服务器域名” 中设置request合法域名，添加https://apis.map.qq.com

5. 小程序示例

   ```javascript
   let QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
   let qqmapsdk = new QQMapWX({ key : '申请的key' })
   qqmapsdk.search({...})
   qqmapsdk.reverseGeocoder({...})
   ```


### 显示电影详情页

**实现步骤:**

1. 新建详情页: `pages/movie/movie`. 把相关资源覆盖到`movie`目录下.

2. 点击首页中列表某一项后, 跳转到电影详情页, 并且显示当前选中电影的详细信息.

   1. 在跳转过程中, 需要将选中项的电影`id`以参数的形式传给详情页.

      `index.wxml`

      ```html
      <navigator url="/pages/movie/movie?id=5">
      </navigator>
      ```

   2. 在详情页中,获取`id`, 发送`https`请求获取电影详情数据, 渲染页面.

      ```javascript
      Page({
          onLoad(options){
              let id = options.id
          }
      })
      ```


**通过电影`ID`查询电影详情接口**

|          | 说明                                     |
| -------- | ---------------------------------------- |
| 接口地址 | `https://api.tedu.cn/detail.php`         |
| 请求方式 | `GET`                                    |
| 请求参数 | `id: 需要查询详情的电影id`               |
| 返回数据 | `object`类型, 描述当前`id`的电影详情数据 |

返回的数据格式:

```
actor: [,…]
cover: "https://p0.meituan.net/movie/6a21e35a"
description: "耿浩（黄渤 饰）与一心想发大财的好兄弟大飞（沈腾 饰），经营着各自惨淡的“事业”，然而“天外来客”（徐峥 饰）的意外降临，打破了二人平静又拮据的生活。神秘的西方力量也派出“哼哈二将”在全球搜查外星人行踪。啼笑皆非的跨物种对决，别开生面的“星战”，在中国某海边城市激情上演。"
director: [,…]
moviename: "疯狂的外星人"
movietype: "剧情／喜剧／科幻"
score: "9.3"
showingon: "2019-02-05"
star: "黄渤／沈腾／马修·莫里森"
thumb: ['url','url']
```



#### 渲染详情页中的演职人员表

遍历渲染`movie.actor`属性. `movie.actor`属性的数据结构如下:

```
[{avatar:头像路径, name:姓名},{},{},{}...]
```



















































































