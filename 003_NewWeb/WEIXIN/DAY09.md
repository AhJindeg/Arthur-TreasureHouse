# `微信小程序  Unit09`

## 自定义组件库

### 微信小程序自定义组件

```html
<my-button value="快速登录" 
           color="#aabb33"
           type="rect|round"
           bind:doubletap="doubleTapEvent"></my-button>

doubleTapEvent(){
	console.log('xxx')
}
```

#### 如何自定义组件?

1. 新建`Component`. 与`Page`类似, 包含四件套.

2. 在`.json`中编写组件声明.

   ```json
   {
     "component": true
   }
   ```

3. 编写组件基础的`wxml` / `wxss`.

4. 在普通页面中, 引入该组件, 使用该组件.

   1. 在`page.json`引入该组件, 自定义标签名称. 

      ```json
      {
        "usingComponents": {
          "mybutton": "path/to/the/custom/component"
        }
      }
      ```

   2. 在页面中使用:

      ```html
      <mybutton></mybutton>
      ```


#### 如何自定义组件的属性?

1. 在组件的`js`中声明属性:

   ```javascript
   // components/mybutton/mybutton.js
   Component({
       /** 声明组件的属性列表 */
       properties: {
           round: {
               type: Boolean,
               value: false
           },
           color: {
               type: String,
               value: '#36D'
           },
           value: {
               type: String, 
               value: '默认按钮'
           }
       }
   })
   
   ```

2. 在组件的`wxml`中使用属性:

   ```html
   <!--components/mybutton/mybutton.wxml-->
   <view class="mbutton  {{round?'round':'rect'}}"
       style="background-color: {{color}};">
       {{value}}
   </view>
   ```

3. 在使用组件时, 为组件指定属性:

   ```html
   <my-button value="去往购物车"  color="#f42211" round>
   </my-button>
   ```


#### 如何自定义组件的事件?

1. 在组件的`js`中定义触发事件的条件:

   ```javascript
   // components/mybutton/mybutton.js
   Component({
       /**
        * 组件的初始数据
        */
       data: {
           lastTime : 0   // 记录上次单击时的时间毫秒值
       },
       /** 组件的方法列表 */
       methods: {
           tapEvent(){
               // 捕获到单击事件 判断距离上次单击多长时间
               let now = new Date().getTime() // 毫秒
               if(now - this.data.lastTime<350){
                   // 触发了双击场景 触发父组件定义的doubletap
                   this.triggerEvent('doubletap')
                   now = 0
               }
               this.data.lastTime = now // 重写lastTime时间
           }
       }
   })
   
   ```

   当达到了事件触发条件, 调用`this.triggerEvent('doubletap')`触发事件.

2. 在父组件中, 绑定自定义事件`doubletap`:

   ```html
   <my-button
       bind:doubletap="doubleTapEvent"></my-button>
   ```


### 微信小程序`vant`组件库

`vant`提供了小程序的版本, 网站如下: 

`https://vant-contrib.gitee.io/vant-weapp/#/home`



#### 安装`vant`组件库

##### 步骤一 通过 `npm` 安装

进入项目根目录, 执行以下命令, 初始化`npm`, 安装`vant`:

```shell
# cd xzyycloud
npm init    # 一路回车  初始化npm  将会生成package.json
npm i @vant/weapp -S --production    # 安装vant
```

##### 步骤二 修改 `app.json`

将 `app.json` 中的 `"style": "v2"` 去除，小程序的[新版基础组件](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#style)强行加上了许多样式，难以覆盖，不关闭将造成部分组件样式混乱。

##### 步骤三 修改 `project.config.json`

手动在 `xzyycloud`项目的根目录`project.config.json` 内修改如下配置，使开发者工具可以正确索引到 `npm` 依赖的位置。

```json
{
  ...
  "setting": {
    ...
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram/"
      }
    ]
  }
}
```

##### 步骤四 构建 `npm` 包

点击小程序开发工具菜单栏中: 工具 -- 构建`npm`, 将下载的`vant`打包构建到`miniprogram`目录下, 构建成功后, 将会在`miniprogram`目录下出现`miniprogram_npm`目录. 里面存储着打包好的`vant`源代码. 

##### 步骤五  使用组件库

1. 在页面中, 引入需要使用的`vant`组件.(官方文档中有引入的代码).
2. 在`wxml`中直接使用即可.



### 实现小程序中的微信登录业务

1. 点击 "登录" 文本, 调用微信开放的`API`接口, 获取当前用户的微信公开信息: 昵称/头像等.

   ```javascript
   wx.getUserProfile({desc: '描述'})
   ```

2. 更新界面.



注意: 虽然`wx.getUserProfile`方法可以获取用户微信的基本信息用户显示, 但是一个完整的登录业务还远远没有写完. 因为不仅需要显示信息, 还需要将该用户的数据存入自己家的数据库, 而微信登录只是一个避免用户输入账号密码的手段而已. 一定要将该用户存入自己家数据库, 这样才可以更好的维护会员信息, 而不依赖于微信官方服务器. 

**一个完整的登录还需要再设计以下流程:**

1. 当获取微信用户信息后, 想尽一切办法将用户数据存入自己家数据库:

   1. 若自己家数据库已经有数据, 则直接获取, 更新界面即可.

   2. 若自己家数据库中没有数据, 则需要将新用户添加到自家数据库中, 完成注册.

      **(需要在这个过程中注意不要重复注册)**





### 实现登录后用户头像的更新

上传更新头像的业务流程:

1. 客户端点击头像选择头像图片.

   ```javascript
   wx.chooseImage()
   ```

2. 将头像图片上传到服务器, 并且获取访问该头像图片的网络路径.

3. 将该网络路径, 与当前用户绑定在一起存入数据库.

4. 在下次登录时, 获取到最新的头像路径, 就可以看到新头像了.



### 云开发-云存储

云存储相当于网络云盘, 可以将本地文件上传存入云存储, 也可以在需要的时候从云存储空间将文件下载到本地.

#### 通过小程序提供的`API`实现图片上传

```javascript
wx.cloud.uploadFile()
```



### 云开发-云函数

云函数是在小程序端定义, 部署到云端,  在云端执行的函数. 可以将云函数当做是`nodejs`接口进行调用, 流程:

1. 小程序使用相关`API`调用一个已经部署了的云函数.

2. 执行相应云函数代码, 返回结果.
3. 小程序端接收云函数返回的结果, 执行后续业务.



#### 案例: 编写一个云函数, 部署到云服务器, 在小程序端调用. 

1. 编写一个云函数

   右键`cloudFunctions`, 选择新建`Nodejs`云函数即可. (起个云函数名)

2. 部署到云服务器

   右键云函数文件夹, 选择上传并部署(云端安装依赖).

3. 在小程序端调用

   ```javascript
   wx.cloud.callFunction()
   ```














































