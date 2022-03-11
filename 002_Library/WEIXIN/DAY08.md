# `微信小程序  Unit08`

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
| `collection.field()`  | 指定查询结果集中的字段                   |
| `collection.update()` | 局部更新数据                             |
| `collection.remove()` | 删除数据                                 |



##### 查询指令

假设我们需要查询进度大于 30% 的待办事项，那么传入对象表示全等匹配的方式就无法满足了，这时就需要用到查询指令。数据库 API 提供了大于、小于等多种查询指令，这些指令都暴露在 `db.command` 对象上。比如查询进度大于 30% 的待办事项：

| 查询指令 | 说明                 |
| -------- | -------------------- |
| eq       | 等于                 |
| neq      | 不等于               |
| lt       | 小于                 |
| lte      | 小于或等于           |
| gt       | 大于                 |
| gte      | 大于或等于           |
| in       | 字段值在给定数组中   |
| nin      | 字段值不在给定数组中 |

`https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/database/Command.html`



#### 修改数据

#### 删除数据



### 实现首页中选择城市业务

业务流程: 点击左上角城市名称, 跳转到一个新的城市列表选择页, 点击某个城市名称返回首页, 更新首页左上角城市名称. 

1. 准备好新的页面: `pages/citylist/citylist`, 完成页面中的城市列表的呈现.
   1. 将`map.js`引入项目下的`libs`目录.
   2. 在`citylist`页面中, 通过`reqiure`加载城市数据, 呈现城市列表.
2. 在城市选择页面中, 选择城市后, 将城市名称存入`globalData`, 返回首页即可.
3. 在首页中, 重写`onShow`生命周期方法, 获取`globalData`中的城市名称, 更新左上角即可.



#### 点击右侧边栏导航, 动态滚动到相应位置

如何控制`scroll-view`滚动到某个位置:

```html
<scroll-view scroll-into-view="{{动态变量letter}}">
	<view id="A"></view>
    <view id="B"></view>
    <view id="C"></view>
    <view id="D"></view>
    <view id="E"></view>
    ...
</scroll-view>
data{
	letter : 'E'
}

```



#### 在城市列表页面中重新定位当前城市名, 更新定位

1. 将`index.js`中涉及到定位的代码, 复制到`citylist.js`中. 当页面加载时, 重新定位, 更新位置信息.



### 实现影院模块

1. 将`ftp`中影院相关资源(`theatre`四件套)覆盖到影院页面.

2. 访问腾讯位置服务, 加载当前城市的影院列表.

   ```
   当前城市
   qqmapsdk.search({
       keyword: '',
       region: '',
       page_size: 20,
       success: (res)=>{ ... }
   })
   ```

3. 完成列表渲染.

















































































