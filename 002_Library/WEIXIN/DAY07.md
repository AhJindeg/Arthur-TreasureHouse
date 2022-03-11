# `微信小程序  Unit07`


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



#### 渲染剧照列表

遍历渲染`movie.thumb`属性. `movie.thumb`中存储了当前电影所有剧照图片的路径, 格式如下:

```javascript
["url", "url", "url"....]
```

**后续需求**

1. 点击剧照图片后, 以大图方式浏览图片信息. 小程序提供了`wx.previewImage`方法方便的预览大图. 

   ```javascript
   wx.previewImage({
       url: [url, url, url, url ....]
   })
   ```



#### 小程序中的事件委托

```html
<scroll-view>
	<view>
    	<image src="" data-index=""></image>
    </view>
    <view>
    	<image src="" data-index=""></image>
    </view>
    .....
</scroll-view>
```

如果将事件直接绑定到`image`上, 就会导致事件绑定次数过多. 有一些性能问题. 可以利用事件冒泡机制, 将事件绑定到`scroll-view`上, 当点击`image`时, 也会触发点击事件, 执行事件处理函数. 意味着将事件处理委托给父元素(祖先元素)进行处理. 

值得注意的是, 祖先元素需要在事件处理时, 拿到触发该事件的事件源对象, 在小程序中可以使用`event.target`直接获取最先触发事件的事件源对象.从而执行后续业务.  减少了事件绑定次数.  这种机制称为**事件委托**.



## 小程序云开发

### 概述

开发者可以使用腾讯提供的云服务来开发微信小程序/小游戏的后端接口, 而无需自己搭建服务器.  云开发提供的基础能力有:

1. **云数据库**  是一个可以在小程序前端操作, 也可以在云函数中操作的`json`类型数据库. 
2. **云存储**  是一个可以在小程序前端操作的云盘.(云存储空间)
3. **云函数**  是一个在小程序端定义编写, 编写完毕后部署到云服务器, 在云服务器中运行的`nodejs`函数.



### 开通云开发服务

点击开发工具工具栏中的**云开发**按钮.



### 云数据库

是一个可以在小程序前端操作, 也可以在云函数中操作的`json`类型非关系型数据库. 

#### 结构化数据库与`json`数据库的区别

**结构化关系型数据库**

| id   | name | gender | school_id |
| ---- | ---- | ------ | --------- |
| 1    | zs   | m      | 1         |
| 2    | ls   | f      | 2         |
| 3    | ww   | m      | 1         |
| ..   | ..   | ..     | ..        |

| id   | name     | area | loc    |
| ---- | -------- | ---- | ------ |
| 1    | 清华大学 | 1000 | 五道口 |
| 2    | 北京大学 | 850  | 中关村 |

**`json`非关系型数据库**

```json
[
    {
        id: 1,
        name: 'zs',
        gender: 'm',
        school: {
            id: 1,
            name: '清华大学',
            loc: '五道口',
            area: 1000
        }
    },
    {
        id: 2,
        name: 'ls',
        gender: 'f',
        school: {
            id: 2,
            name: '北京大学',
            loc: '中关村',
            area: 850
        }
    },
    {
        id: 3,
        name: 'ww',
        gender: 'm',
        school: {
            id: 1,
            name: '清华大学',
            loc: '五道口',
            area: 1000
        }
    }
]
```

关系型数据库和 `JSON` 数据库的概念对应关系如下表：

| 关系型   `mysql` | 文档型      `云数据库` |
| ---------------- | ---------------------- |
| 数据库 database  | 数据库 database        |
| 表 table         | 集合 collection        |
| 行 row           | 记录 record / 文档 doc |
| 列 column        | 字段 field             |

使用云开发控制台操作云数据库.



### 小程序端云数据库操作

#### 插入数据

1. 初始化数据库, 获取某一个云环境下的数据库引用.

   ```javascript
   let db = wx.cloud.database({
       env: "填写自己云服务器 云环境ID"
   })
   ```

2. 通过`db`获取操作某个集合的集合引用:

   ```javascript
   let coll = db.collection('test')   //test: 集合名称
   ```

3. 调用`coll.add()`方法向集合中插入数据:

   ```javascript
   coll.add({
       data: { 需要存储的具体信息 },
       success: (res)=>{ 插入成功后的回调 },
       fail: (err)=>{ 插入失败后的回调 },
       complete: (data)=>{ }
   })
   ```

案例:  新建云开发项目, 在新页面中 `pages/add/add`, 点击按钮向`test`中添加数据.

![1637736379366](C:\Users\web\AppData\Roaming\Typora\typora-user-images\1637736379366.png)



> 注意:
>
> 若使用小程序向数据库添加数据, 除了会将信息插入集合之外, 还会在当前记录中自动添加一个新的字段: `_openid`.   `_openid`是使用当前小程序的用户的唯一标识符.  不同的用户将会分配不同的`_openid`. 所以该字段将会标识当前这条记录的归属. 谁添加的这条记录, 这条记录就属于谁.





#### 查询数据

##### 通过`id`查询一条数据

```javascript
db.collection('集合名称').doc('记录的主键_id值').get({
    success: (res)=>{}
})
```

##### 通过查询条件查询多条数据

```javascript
let db = wx.cloud.database({
    env: 'cloud-2102-6g5ztvkz5507bbea'
})
// 查询所有 未婚男性
db.collection('test').where({
    gender: '男',
    married: true
}).get().then(res=>{
    console.log(res)
})
```



#### 实现项目中的电影详情页面的评论列表

**实现步骤:**

1. 新建项目(云开发版学子影院). 
2. 将旧项目中的所有资源, 复制到新项目下的`miniprogram`文件夹下, 覆盖现有页面. (微调项目配置)
3. 在电影详情页面中, 获取电影`id`后, 不仅要加载电影详情数据, 还要去云数据库查询当前电影的评论列表. 
4. 一旦查询成功, 将得到的评论列表渲染到详情页中.



#### `Collection`对象

`Collection`对象用于操作集合. 通过`db.collection('集合名称')`获取. 它提供了很多的方法对集合进行处理:

| 方法名                | 作用                                     |
| --------------------- | ---------------------------------------- |
| `collection.add()`    | 向集合中添加数据                         |
| `collection.doc()`    | 通过id查询一条记录, 返回`Record`         |
| `collection.where()`  | 添加查询筛选条件                         |
| `collection.skip(n)`  | 跳过结果集的前n条记录                    |
| `collection.limit(n)` | 只向后加载n条记录                        |
| `collection.get()`    | 发请求, 访问云数据库, 获取符合条件的结果 |











#### 修改数据

#### 删除数据





























































































