# DOM03

## 复习

- 双标签内容的读取

  - innerText: 读取页面上可见的文本
  - innerHTML: 读取所有的HTML代码
  - textContent: 读取所有HTML代码中的 文本, 不含标签

- 双标签内容的设置:

  - innerText: 原模原样进行展示
  - innerHTML: 会把文本中的 html 标签进行解析

- 属性的读取

  - 通用方式: `元素.getAttribute(属性名)`
  - 直接读取: `元素.属性名`

- 属性的设置

  - 通用方式: `元素.setAttribute(属性名, 值)`
  - 直接设置: `元素.属性名=值`

- 判断属性是否存在

  - 通用方式: `元素.hasAttribute(属性名)`
  - 判断空字符串:`元素.属性名 == ''`

- 自定义属性

  - `data-xxx`: DOM中读取时  `元素.dataset.xxx`

- 事件

  - onchange : 勾选框状态变化
  - onclick: 点击
  - onblur: 输入框失去焦点

- style中属性名 在DOM中
  style中的属性名通常有 `-`, 例如 `font-size`, `background-color`...

  JS的对象中, 属性名不允许含有 `-` 符号,  官方会自动转化为 小驼峰命名法

  `fontSize`, `backgroundColor`, `zIndex



## DOM

### 作业

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      td > span {
        color: red;
      }

      .ok {
        background: url("./images/ok.png") no-repeat center;
        width: 20px;
        height: 30px;
        display: none;
      }

      .err {
        background: url("./images/err.png") no-repeat center left;
        border: 1px solid red;
        background-color: lightgray;
        padding: 3px;
        padding-left: 20px;
        border-radius: 3px;
        display: none;
      }
    </style>
  </head>

  <body>
    <h2>增加管理员</h2>
    <!-- table>(tbody>tr*2>td*3)+(tfoot>tr>td*3) -->
    <table>
      <tbody>
        <tr>
          <td>姓名:</td>
          <td>
            <input type="text" />
            <span>*</span>
          </td>
          <td>
            <div class="ok uname"></div>
            <div class="err uname">10个字符以内的字母,数字或下划线的组合</div>
          </td>
        </tr>
        <tr>
          <td>密码:</td>
          <td>
            <input type="password" />
            <span>*</span>
          </td>
          <td>
            <div class="ok pwd"></div>
            <div class="err pwd">必须为6位数字</div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td colspan="2">
            <button type="submit">保存</button>
            <button type="reset">重填</button>
          </td>
        </tr>
      </tfoot>
    </table>

    <script>
      // 1. 为用户名输入框 添加 blur 事件的监听 : 失去焦点
      // 属性名选择器:  代表选择 属性名 type='text' 的元素
      let input_name = document.querySelector("[type='text']")
      console.log(input_name)

      input_name.onblur = function () {
        console.log("用户名输入框失去焦点!")
        let reg_name = /^\w{1,10}$/

        // 查找 ok 和 err
        // .ok.uname : 代表 class="ok uname" 同时有两种样式
        let div_ok = document.querySelector(".ok.uname")
        let div_err = document.querySelector(".err.uname")

        if (reg_name.test(this.value)) {
          console.log(this.value, "符合要求")
          div_ok.style.display = "block" // 显示正确
          div_err.style.display = "none" // 不显示错误
        } else {
          console.log(this.value, "不符合要求")
          div_ok.style.display = "none" // 不显示正确
          div_err.style.display = "block" // 显示错误
        }
      }
      // 2. 检查用户名是否符合要求: 字母/数字/下划线  最多10个

      // 练习: 模仿用户名, 实现密码的验证操作
      let input_pwd = document.querySelector('[type="password"]')

      input_pwd.onblur = function () {
        let reg_pwd = /^\d{6}$/

        let div_ok = document.querySelector(".ok.pwd")
        let div_err = document.querySelector(".err.pwd")

        if (reg_pwd.test(this.value)) {
          div_ok.style.display = "block"
          div_err.style.display = "none"
        } else {
          div_ok.style.display = "none"
          div_err.style.display = "block"
        }
      }
    </script>
  </body>
</html>

```

### 创建元素

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 动态创建元素 -->
    <div id="box"></div>

    <script>
      // 正常情况下: 书写html代码 -> 转化成DOM 对象
      // 场景: 通过网络请求获取到一些数据, 然后需要把数据转化成 HTML 代码显示在页面上
      // 例如生成: <a href="www.tmooc.com" id='a1'>go to tmooc</a>

      // 1.创建元素
      let a = document.createElement("a") //创建元素 a 标签
      a.href = "www.tmooc.com"
      a.id = "a1"
      a.innerHTML = "go to tmooc"

      // 2.添加到 id ='box' 的div 中, 作为子元素
      let box = document.getElementById("box")
      box.appendChild(a) // append:添加   child: 孩子

      // 生成 <button id='b1' class='danger'>我是按钮</button>
      let btn = document.createElement("button")
      btn.id = "b1"
      btn.className = "danger"
      btn.innerHTML = "我是按钮"

      // appendChild: 可以把元素 加入到 已有子元素的最后
      // box.appendChild(btn)
      //
      // 添加btn到 a 元素的前面
      // insert插入  Before在...之前
      // box.insertBefore(btn, a)
      //
      // 替换元素: 参数1 替换 参数2 的元素
      box.replaceChild(btn, a)
    </script>
  </body>
</html>

```

### 实时生成列表

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul id="news"></ul>

    <script>
      // 场景: 新闻页面的 最新消息列表,  其中内容应该实时变化
      // 做法1: 修改静态html页面, 上传到服务器..  -- 耗时,不应该
      // 做法2: 消息存储在服务器, 页面显示时 自动通过网络请求 从服务器获取最新消息, 实时更新到本地!
      let news = [
        { title: "震惊! 亮亮今天早上竟然做了这种事!", href: "xxxx" },
        { title: "震惊! 亚楠中午竟然要吃亮亮??", href: "xxxx" },
        { title: "震惊! 铭铭在第四阶段做了什么?", href: "xxxx" },
        { title: "震惊! 为什么天天在震惊!", href: "xxxx" },
      ]
      // 循环, 生成 <li><a href='xxx'>xxxxx</a></li> 添加到ul里
      news.forEach(item => {
        let a = document.createElement("a")
        a.href = item.href
        a.innerHTML = item.title

        let li = document.createElement("li")
        li.appendChild(a)

        // 由于上方数组叫 news , 跟 id='news' 重名了, 所以覆盖了
        // 必须在这里重新读,  此处是 函数作用域, 同名变量没关系
        let news = document.getElementById("news")
        news.appendChild(li)
      })
    </script>
  </body>
</html>

```

### 表格生成

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        width: 400px;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <!-- table>(thead>tr>td*3)+tbody -->
    <table border="1">
      <thead>
        <tr>
          <td>姓名</td>
          <td>薪资</td>
          <td>年龄</td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <script>
      // 通过请求的数据 通常都是 JSON 格式, 会转化成数组或对象
      let json = [
        { name: "Tom", salary: 10000, age: 25 },
        { name: "John", salary: 15000, age: 29 },
        { name: "Mary", salary: 11000, age: 27 },
        { name: "John", salary: 12000, age: 28 },
      ]
      // 遍历数组, 把每个数据项 <tr><td><td><td><td><td><td></tr>
      // 提示:
      // 生成1个tr
      // 生成td 写name属性值,加入tr中
      // 生成td 写salary属性值,加入tr中
      // 生成td 写age属性值,加入tr中
      // 然后 tr 加入到 tbody 中
      for (const item of json) {
        let tr = document.createElement("tr")

        let td_name = document.createElement("td")
        td_name.innerHTML = item.name
        tr.appendChild(td_name)

        let td_salary = document.createElement("td")
        td_salary.innerHTML = item.salary
        tr.appendChild(td_salary)

        let td_age = document.createElement("td")
        td_age.innerHTML = item.age
        tr.appendChild(td_age)

        // 强调: getElements 结果是数组, 必须用序号取值
        let tbody = document.getElementsByTagName("tbody")[0]
        tbody.appendChild(tr)
      }
      // 问题: 遍历数组的每一项, 组合成 tr , 加入到 tbody 中
      // 显示在页面上

      // 每次添加tr 到 tbody 中, 页面都需要 重绘 -- 重新绘制!
      // DOM的重绘非常消耗 电脑性能
      // 面试题中 所有的 提高电脑性能相关的问题, 最终的根本都是 解决 DOM 的性能问题!
    </script>
  </body>
</html>

```

### 文档片段

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      table {
        width: 400px;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <table border="1">
      <thead>
        <tr>
          <td>姓名</td>
          <td>薪资</td>
          <td>年龄</td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <!-- 文档片段: 是一个虚拟的包围, 我们可以把所有要添加的dom元素 都先放在这个 虚拟的包围中, 最后再一起放到页面上的DOM 里显示 -->

    <script>
      let json = [
        { name: "Tom", salary: 10000, age: 25 },
        { name: "John", salary: 15000, age: 29 },
        { name: "Mary", salary: 11000, age: 27 },
        { name: "John", salary: 12000, age: 28 },
      ]

      // 创建虚拟的 文档片段:  不是标签, 而是虚拟的包围
      // Fragment: 片段
      // 向frag中, 添加DOM元素, 不会触发页面的重绘
      let frag = document.createDocumentFragment()

      for (const item of json) {
        let tr = document.createElement("tr")

        let td_name = document.createElement("td")
        td_name.innerHTML = item.name
        tr.appendChild(td_name)

        let td_salary = document.createElement("td")
        td_salary.innerHTML = item.salary
        tr.appendChild(td_salary)

        let td_age = document.createElement("td")
        td_age.innerHTML = item.age
        tr.appendChild(td_age)

        // let tbody = document.getElementsByTagName("tbody")[0]
        // tbody.appendChild(tr)
        // 添加生成的tr 到片段中
        frag.appendChild(tr)
      }

      // 循环结束后, 把包含所有tr的 片段, 加入到 tbody中
      let tbody = document.getElementsByTagName("tbody")[0]
      tbody.appendChild(frag)
    </script>
  </body>
</html>

```

### 事件监听器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 事件的添加方式 共有3种: -->
    <!-- 方式1: 利用html自带的 事件属性 -->
    <!-- 缺点: 耦合性太强, 需要在html中书写 JS代码才可以 -->
    <button onclick="click1()">点击事件</button>
    <script>
      function click1() {
        console.log("点击事件!")
      }
    </script>

    <!-- 方式2: 利用dom添加 -->
    <button id="btn2">点击事件2</button>
    <script>
      // 确定: 无法添加多个点击事件
      btn2.onclick = function () {
        console.log("111111111")
      }
      // 重新为 onclick 属性赋值, 会覆盖之前的事件
      btn2.onclick = function () {
        console.log(2222222)
      }
    </script>

    <!-- 方式3: 事件列表,事件监听器 -->
    <button id="btn3">点击事件3</button>
    <script>
      // 用 get.. 方式读取, 才能有代码提示
      let btn3 = document.getElementById("btn3")
      // add  Event  Listener
      // 增加  事件   监听器

      // 关于参数1: 事件名称, 本身是不带 on 前缀的;
      // 官方为了用户 容易区分 哪些是事件 哪些是普通属性, 所以在事件的前面统一添加了 on 前缀
      btn3.addEventListener("click", function () {
        console.log("111111111111")
      })

      btn3.addEventListener("click", function () {
        console.log("222222222")
      })

      // 删除指定的事件监听器
      // remove: 移除
      // 错误写法: 虽然参数2 样子跟 上方的一样, 但是 他们是函数, 函数是对象类型,  本质上是不同的两个对象.  匿名函数是无法移除的!
      // btn3.removeEventListener("click", function () {
      //   console.log("222222222")
      // })

      // 只有命名函数 才可以移除
      function log3() {
        console.log(3333333333333)
      }
      btn3.addEventListener("click", log3)
      // 移除
      btn3.removeEventListener("click", log3)
    </script>
  </body>
</html>

```

### 事件冒泡机制

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .red {
        background-color: red;
        width: 200px;
        height: 200px;
      }

      .green {
        background-color: green;
        width: 150px;
        height: 150px;
      }

      .blue {
        background-color: blue;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <!-- 事件的冒泡机制: 当点击一个子元素时, 他的所有父元素都能感受到 事件的发生, 顺序按照 就近原则 -->
    <!-- div.red>div.green>div.blue -->
    <div class="red">
      <div class="green">
        <div class="blue"></div>
      </div>
    </div>

    <script>
      let div_red = document.getElementsByClassName("red")[0]
      // alt + 光标: 可以进入多光标状态
      // esc : 退出状态
      let div_green = document.getElementsByClassName("green")[0]
      let div_blue = document.getElementsByClassName("blue")[0]

      div_red.onclick = function () {
        console.log("red 被点击")
      }

      // 事件函数在触发时, 默认会接受 事件本身 作为参数
      div_green.onclick = function (event) {
        console.log("green 被点击")
        console.log("event:", event)
        // stopPropagation: 停止冒泡事件
        event.stopPropagation()
      }

      div_blue.onclick = function () {
        console.log("blue 被点击")
      }
    </script>
  </body>
</html>

```

### 冒泡机制的应用

非冒泡机制:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 冒泡机制的应用场景 -->
    <div id="btns">
      <button data-color="red">红色</button>
      <button data-color="blue">蓝色</button>
      <button data-color="green">绿色</button>
    </div>
    <div
      id="area"
      style="width: 100px; height: 100px; border: 1px solid gray"
    ></div>

    <script>
      // Elements: 结果 类数组 中 没有forEach
      // querySelectorAll 才有forEach
      let btn_all = document.getElementsByTagName("button")
      console.log(btn_all)
      // 必须采用 for ... of .. 遍历
      for (const btn of btn_all) {
        btn.onclick = function () {
          area.style.backgroundColor = btn.dataset.color
        }
      }
    </script>
  </body>
</html>

```

冒泡机制优化

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 冒泡机制的应用场景 -->
    <div id="btns">
      <button data-color="red">红色</button>
      <button data-color="blue">蓝色</button>
      <button data-color="green">绿色</button>
    </div>
    <div
      id="area"
      style="width: 100px; height: 100px; border: 1px solid gray"
    ></div>

    <script>
      // 通过循环遍历的方式, 为每个按钮添加点击事件, 如果按钮数量过多, 则会生成 特别多的 函数, 浪费空间!
      // 根据冒泡机制: 所有的按钮点击后, 都会触发其父元素的点击事件
      btns.onclick = function (event) {
        console.log(event)
        // 冒泡触发的事件, 其中有target属性, 保存了是哪个子元素触发的事件
        area.style.backgroundColor = event.target.dataset.color
      }
    </script>
  </body>
</html>

```

### 阻止默认事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <a href="http://tmooc.cn">超链接</a>
  </body>

  <script>
    let a = document.getElementsByTagName("a")[0]
    // event , 简写成 e
    a.onclick = function (e) {
      // prevent: 阻止    default:默认
      // e: 是当前事件.  带有 preventDefault 方法, 能够阻止默认事件的发生
      e.preventDefault()

      alert(1111)
      // 默认机制: 先触发点击事件中的代码, 再执行自身默认的事件
    }
  </script>
</html>

```

### 事件中的坐标值

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box {
        width: 200px;
        height: 200px;
        background-color: green;
        position: fixed;
        left: 100px;
        top: 100px;
      }
    </style>
  </head>
  <body>
    <div id="box"></div>

    <script>
      box.onclick = function (e) {
        console.log(e)

        // 事件触发后, 会有多个坐标值
        // 其中 screen: 屏幕, 相对于电脑屏幕的左上角的坐标
        console.log("距离电脑屏幕左上角:")
        console.log(e.screenX, e.screenY)

        // client: 客户端, 距离浏览器内容部分的左上角位置
        console.log("距离浏览器内容部分的左上角位置:")
        console.log(e.clientX, e.clientY)
        // 这两个坐标使用较多, 所以官方给了简化写法 x,y
        console.log(e.x, e.y)

        // 使用场景: 点击页面, 然后在点击位置生成一个 元素..

        // offsetX, offsetY: 当前被点击元素的左上角
        console.log("距离当前被点击元素的左上角")
        console.log(e.offsetX, e.offsetY)
      }
    </script>
  </body>
</html>

```





## BOM

浏览器共提供了 3 个重要属性:

- location:  保存了当前网页的相关信息, 例如 端口号, 地址, 域名, 协议...
  - 3个常用
    - replace: 替换当前页面的 href, 不可回退
    - reload: 刷新, 重载当前页面
    - href属性: 可以跳转到新的页面, 带有历史
- history: 标签进行跳转页面操作时, 会自动记录跳转操作的历史
  - 万能方法: go(n)  n是正数代表前进, n是负数代表回退
  - back(): 回退1页
  - forward(): 前进1页
- navigator: 查看浏览器的相关信息, 比如浏览器所在操作系统的信息, 插件信息....

### 页面跳转

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 
      DOM: Document Object Model - 文档 对象 模型
      用于操作 浏览器界面上的内容
    -->
    <!-- 
      BOM: Browser Object Model - 浏览器 对象 模型
      用于操作 浏览器 相关事件
     -->

    <!-- 传统的页面跳转 -->
    <!-- target='_self'  代表在当前页面 打开新页面 -->
    <a href="http://tmooc.cn" target="_self">click me</a>

    <!--  -->
    <button onclick="openUrl()">click me</button>

    <!-- 使用场景: -->
    <button onclick="goHome()">页面走丢了, 3秒后为您切换到首页</button>
    <div id="msg"></div>

    <script>
      function goHome() {
        let count = 3
        setInterval(() => {
          count--
          console.log("倒数:", count)

          msg.innerHTML = `即将为您跳转: ${count}`
          if (count == 0) {
            location.href = "http://tmooc.cn"
          }
        }, 1000)
      }

      //  通过代码 来实现 页面的跳转: 打开新的页面
      function openUrl() {
        // window.open("http://tmooc.cn", "_self")
        //
        // location: 浏览器的一个对象属性, 可以直接修改其 href
        location.href = "http://tmooc.cn"
      }
    </script>
  </body>
</html>

```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 替换操作, 不可回退! -->
    <button onclick="openUrl()">替换当前页, 不可回退</button>
    <script>
      function openUrl() {
        // replace: 替换当前页面, 不可回退!
        location.replace("http://tmooc.cn")
      }
    </script>

    <!-- 在新窗口打开, _blank 可以开启多个 -->
    <a href="http://tmooc.cn" target="_blank">go to tmooc</a>
    <!-- 采用代码方式实现 -->
    <button onclick="openMore()">新窗口打开, 开多个</button>
    <script>
      function openMore() {
        window.open("http://tmooc.cn", "_blank")
      }
    </script>

    <!-- 在新窗口开启页面, 仅能开启一个 -->
    <!-- target: 只要填写 任意自定义的 字符串即可! -->
    <a href="http://tmooc.cn" target="tmooc">开启 tmooc</a>
    <!-- 用代码方式实现 -->
    <button onclick="openNewTab()">1个新窗口打开新页面</button>
    <script>
      function openNewTab() {
        window.open("http://tmooc.cn", "tmooc")
      }
    </script>
  </body>
</html>

```

### 历史操作

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 历史操作 -->
    <h2>我是 08_2</h2>

    <button onclick="goback()">回退到上一页</button>
    <script>
      // history: 历史
      // 浏览器会自动记录 当前标签页的所有跳转历史
      function goback() {
        // 不要直接运行当前页面, 要运行 08 然后通过点击跳转的方式 , 来到 08_2
        // back: 回退 1 页
        // history.back()
        // 万能写法: go(n)  负数代表回退的具体页数
        // history.go(-1)
        // -2 就代表回退到 上上一页
        history.go(-2)
      }
    </script>
  </body>
</html>

```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 历史操作 -->
    <a href="./08.历史操作_1.html">08_1</a>
    <a href="./08.历史操作_2.html">08_2</a>

    <button onclick="goForward()">前进操作</button>
    <script>
      function goForward() {
        // history.forward() //前进1页
        // 通用方式 go(n)  n是正数就代表前进
        history.go(1)
      }
    </script>
  </body>
</html>

```

### 刷新界面

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button onclick="reload()">刷新</button>
    <!-- 如果要执行的JS代码过于简单, 可以直接在HTML中书写 -->
    <button onclick="javascript: location.reload();">刷新1</button>

    <script>
      function reload() {
        location.reload()
      }

      // location: 此变量中, 存放了 当前页面的 各种信息
      console.log(location)
    </script>
  </body>
</html>

```

### 浏览器信息读取

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- 利用 BOM 的代码 可以检测浏览器安装了哪些扩展插件 -->
    <script>
      console.log(navigator) //导航器
      // 插件列表
      console.log(navigator.plugins)
      // 查看用户是否安装了PDF插件, 如果没有安装 则提醒用户到xxx进行安装
      if (navigator.plugins["PDF Viewer"]) {
        // 真: 说明存在此属性
        document.write("<h3>已安装PDF插件, 可以阅读PDF文件</h3>")
      } else {
        // 假: 说明不存在此属性
        document.write("<h3>未安装PDF插件, <a href='#'>点击下载</a></h3>")
      }
    </script>
  </body>
</html>

```





## 总结

DOM 和 BOM

- 最原始的 操作页面 和 浏览器的方式

以后的使用频率: 几乎不用

原因: 因为原始的 官方提供的 操作DOM的方式 过于复杂

所以 除了各种第三方框架, 进行了封装.  封装之后的DOM操作变得极其简单.

- 最早期的 最好用的框架:  jQuery
  - 目前依然活跃在 2,3,4----8 线城市的开发中, 以及古老的旧项目, 政府项目...
- 2009年: Angular框架出现--功能更强大, Google公司
- 2013年: React  Facebook公司开发
- 2014年: Vue 框架, 开源项目,  站在 React 和 Angular 的肩膀上开发的..

---













