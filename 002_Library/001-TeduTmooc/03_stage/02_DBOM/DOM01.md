# DOM01

> > JS面试题, 公众号推荐:  `JS每日一题`
>
> JSCORE核心面试点:
>
> - 声明提升 -- JS的`预编译`机制
>
> - 闭包 -- 函数作用域的应用, 规避var的全局污染
>
> - 原型链 -- 对象的继承机制.  调用对象属性时, 对象没有, 会到 `__proto__` 中查找
>
> - call, bind, apply:  替换普通函数的this
>
> - 箭头函数: 简化匿名函数写法,  this为声明时的上层作用域的this
>
> - 函数重载: 不同的参数数量/类型, 采用不同的执行逻辑
>
> - 面向对象三大特征: 封装, 继承, 多态(继承后的重写)
>
> - Promise对象: 解决回调地狱问题
>
>   3种状态: pending(初始)  fulfilled(调用resolve) rejected(调用reject)
>
>   语法糖: await 与 async

## DOM

本阶段剩余内容 都是与 真正开发有关的 实际开发技巧

- 没有为什么, 都是官方设计提供的API, 我们只需要记住 会用即可!
- 本阶段的学习方式: 课上练习时间会较多
  - 老师带着书写一次..
  - 你保留注释填代码一次...
  - 删除注释, 默写一次....

## 什么是DOM

DOM: 文档对象模型 `Document Object Model`

html文件是如何呈现在浏览器上的?

html代码 -> 浏览器识别转化成 对象类型--document -> 把这个document对象显示在页面上

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
    <!-- html代码运行在浏览器上的步骤 -->
    <!-- html-> document对象 -> 浏览器解析并显示 -->

    <!-- DOM有什么用??
    作用: 可以通过JS代码 实时修改网页上的内容!

    普通的html 是静态的!
    有了DOM之后, 利用JS实时修改, 网页就能动起来了!
    -->
    <div id="d1">123123</div>
    <span>Hello World!</span>

    <script>
      // 打印 window 的 document 对象
      // log(): 会把对象转化成 人类容易查看的 字符串形式进行输出
      console.log(window.document)
      // dir(): 直接输出 direct, 才能看到对象的本质
      console.dir(document) //快捷: cdi

      document.body.innerText = "WEB2107!"
    </script>
  </body>
</html>

```

## 时钟

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
    <!-- DOM树: html代码在转化成 DOM对象的时候, 每个标签都是一个属性, 称为节点.  标签的子标签 会成为 属性对象的 属性,  这样逐层深入, 像树根一样的结构, 称为 DOM树! -->
  </body>

  <script>
    // 开启定时器, 每隔一秒钟, 读取当前时间, 更新到 body的文本中

    // sti
    setInterval(() => {
      let now = new Date().toLocaleTimeString()
      console.log(now)
      // 把 now 显示到 body 的 内容中

      // DOM: 文本对象模型, 浏览器会把html先转化成对象类型, 再把对象显示到页面上
      // 转化出来的对象 就是 window 的 document 对象
      document.body.innerText = now
    }, 1000)
  </script>
</html>

```

## 常用属性

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
    <span id="s1">Hello</span>

    <h1>标题1</h1>

    <script>
      // 获取节点的方式
      // cdi
      console.dir(document.head) // 对应head标签
      console.log(document.head) // 对应head标签

      console.dir(document.body) // 对应body标签
      console.log(document.body)

      // documentElement: 代表整个html
      console.log(document.documentElement)
      console.dir(document.documentElement)

      // 凡是html文件 都应该存在 以上节点, 所以官方提供了属性可以直接读取
      // 对于自定义的标签 -- dom中叫节点, 则需要通过特殊方式来读取

      // 读取某个自定义标签的方式 特别多, 需要根据实际情况来选择对应方式
      // 例如 描述 成亮老师的位置:
      // 1. 中国 北京  万寿路 文博大厦 2楼 xxx 教室
      // 2. 小新老师 隔壁教室..
      // ...

      // body下的第一个 元素节点
      // firstChild: 代表 body标签后面紧接着的 换行符+4个空格
      // 非标准写法: <div>密码:<input />   内容都应该放在标签里:
      // <div><span>密码:</span><input />
      // var span = document.body.firstChild // "\n   "
      //
      // Element: 元素, 标签
      // firstElementChild: 获取第一个 节点/标签/元素
      var span = document.body.firstElementChild
      console.log("span:", span)

      // 根据id查找?
      // get  Element  By    Id
      // 获取  元素   通过  id
      var span = document.getElementById("s1")
      console.log("span-id:", span)

      // 根据标签查找
      // get  Elements  By  Tag  Name
      // 获取 元素们   通过 标签  名
      // 由于 标签可以有很多相同的, 所以查找出来的是 类数组 类型, 必须通过序号来读取指定的元素
      var span = document.getElementsByTagName("span")[0]
      console.log(span)
    </script>
  </body>
</html>

```

## id属性的特殊

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
    <div id="d1">Hello</div>
    <div id="d2">Hello World</div>

    <script>
      // 输入 body 下方的所有子元素
      // childNodes: 获取body下所有的 元素和文本!
      console.dir(document.body.childNodes)
      // children: 获取所有元素
      console.dir(document.body.children)
      // 带有id属性的元素, 会被系统自动识别 并保存成 属性

      // 这种直接使用的方式, 在旧版本浏览器不支持
      console.log("d1:", d1)

      // 此写法适配所有版本的浏览器
      var dd1 = document.getElementById("d1")
    </script>
  </body>
</html>

```

## 查找元素

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
    <!-- 更多获取元素的方式: -->
    <div id="s1">Hello</div>
    <div>word</div>
    <script>
      // word: body中的 第一个元素 的兄弟级别下一个元素
      // nextElementSibling: 下一个 元素 兄弟
      var div = document.body.firstElementChild.nextElementSibling
      console.log(div)
    </script>

    <ul id="nav">
      <li class="item parent">电影</li>
      <li class="item parent">
        <span>综艺</span>
        <ul>
          <li class="item child active">吐槽大会</li>
          <li class="item child">脱口秀大会</li>
          <li class="item child">奇葩说</li>
        </ul>
        <li class="item parent">剧集</li>
      </li>
    </ul>
    
    <script>
      // 读取 id='nav' 的元素
      var nav = document.getElementById('nav')
      console.log(nav);

      // 读取 nav 节点下的所有 li 标签
      var lis = nav.getElementsByTagName('li')
      console.log(lis);

      // 读取 nav 下的 第二个li 下的所有li
      var lis = nav.children[1].getElementsByTagName('li')
      console.log(lis);

      // 读取 nav 下所有 class="item child" 的元素
      // get  Elements  By  Class  Name
      // 获取  元素们  通过  class  名
      var lis = nav.getElementsByClassName('item child')
      console.log(lis);

    </script>
  </body>
</html>

```

## 查找元素

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
    <form action="">
      <div>
        <span>用户名:</span>
        <input type="text" name="uname" />
      </div>
      <div>
        <span>性别:</span>
        <label>
          <!-- <input ></input> -->
          <!-- <input />: 如果双标签内没有内容, 可以简化 -->
          <!-- <img /> -->
          <input type="radio" name="sex" value="1" />
          <span>男</span>
        </label>
        <label>
          <input type="radio" name="sex" value="0" />
          <span>女</span>
        </label>
      </div>
    </form>

    <script>
      // 选择 name='sex' 的标签
      // getElementsByName 通过 name 属性来读取标签
      var sexs = document.getElementsByName("sex")
      console.log(sexs)
      // 读取元素之后, 可以修改元素的一些属性
      var sex_0 = sexs[0]
      console.dir(sex_0)
      // 利用DOM 修改元素的样式
      sex_0.style.boxShadow = "0 0 5px 5px purple"

      // 练习: 把输入框 name='uname' 的文字颜色 变为红色red
      // 1. 找到
      var input_uname = document.getElementsByName("uname")[0]

      // 2. 修改
      input_uname.style.color = "red"
    </script>
  </body>
</html>

```

## emmet

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
    <!-- emmet: 这是一款书写html的小工具, 利用特定的语法可以快速生成html代码 -->
    <!-- 
      回顾css 的选择器:
      # :id
      . :class
      > : 子代选择器
      + : 兄弟选择器
      el[属性名]: 属性选择器
     -->
    <!-- div+div -->
    <div></div>
    <div></div>

    <!-- div>div -->
    <div>
      <div></div>
    </div>

    <!-- div*3 -->
    <div></div>
    <div></div>
    <div></div>

    <!-- div#d1 -->
    <div id="d1"></div>

    <!-- div.item.child -->
    <div class="item child"></div>

    <!-- div[type='password'] -->
    <div type="password"></div>

    <!-- div{Hello World} -->
    <div>Hello World</div>

    <!-- 利用() 来包围 -->
    <!-- (div>span)*3 -->
    <div><span></span></div>
    <div><span></span></div>
    <div><span></span></div>

    <!-- 表格: table#emp[border=1]>(thead>tr>td*4)+(tbody>tr>td*4)+(tfoot>tr>td[colspan=4]) -->
    <!-- 通过 工具栏->编辑->emmet 触发 -->

    <table id="emp" border="1">
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4"></td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>

```

## 事件绑定

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
    <button>我是按钮</button>

    <div style="border: 1px solid purple; width: 100px; height: 100px"></div>

    <!-- 点击按钮之后, 按钮上的文字会变红 -->
    <script>
      //1. 找到按钮
      // body 下的第一个元素
      let btn = document.body.firstElementChild
      console.dir(btn)

      //2. 添加点击事件
      // 所有元素都具有 各种事件属性, 都是 on 开头
      // on : 当...时
      // onclick : 当 点击 时触发
      btn.onclick = function () {
        console.log("按钮被点击了!")

        // btn.style.color = "red"
        // this: 代表当前函数所在的对象
        this.style.color = "red"

        // 让按钮 隔壁的的 div 元素 背景色变红
        console.dir(this.nextElementSibling.style)
        this.nextElementSibling.style.backgroundColor = "red"
      }

      //3. 点击之后, 样式中 颜色变红

      // 练习: 点击 div , 可以让 背景色变蓝色,  按钮文字变蓝色
      let div = document.getElementsByTagName("div")[0]

      div.onclick = function () {
        this.style.backgroundColor = "blue"
        // next: 下一个
        // previous: 上一个
        this.previousElementSibling.style.color = "blue"
      }
    </script>
  </body>
</html>

```

## 事件遍历绑定

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
    <button>red</button>
    <button>blue</button>
    <button>purple</button>
    <button>green</button>
    <button>brown</button>
    <div style="width: 100px; height: 100px; border: 1px solid gray"></div>

    <script>
      // 点击按钮, 读取按钮的内容, 让div变为对应的 背景色
      let btns = document.getElementsByTagName("button")
      console.dir(btns)
      // btns 是类数组类型, 原型不是Array, 不具有 数组的各种方法
      // 例如 forEach, map, every...

      // 遍历有两种做法:
      // 1. 传统的 for 循环
      // 2. for..of..
      for (btn of btns) {
        console.dir(btn)

        //添加点击事件
        btn.onclick = function () {
          let color = this.innerText //双标签的内容

          // 查找div元素
          let div = document.getElementsByTagName("div")[0]

          div.style.backgroundColor = color
        }
      }
    </script>
  </body>
</html>

```

## 购物车 cell

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
        /* 合并边框 */
        border-collapse: collapse;
        min-width: 500px;
      }

      td {
        padding: 0 5px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <!-- table[border=1]>(thead>tr>td*5)+(tbody>tr[name='cell']>td*5) -->
    <!-- 通过 ctrl + i  可以弹出提示 -->

    <table border="1">
      <thead>
        <tr>
          <td>序号</td>
          <td>名称</td>
          <td>单价</td>
          <td>数量</td>
          <td>总价</td>
        </tr>
      </thead>
      <tbody>
        <tr name="cell">
          <td>1</td>
          <td>iPhone13 pro max</td>
          <td>¥9999</td>
          <td>
            <!-- button+span+button -->
            <button>-</button>
            <span>5</span>
            <button>+</button>
          </td>
          <td>¥49995</td>
        </tr>
      </tbody>
    </table>

    <script>
      // 1. 获取 name='cell' 的 tr
      let tr_cell = document.getElementsByName("cell")[0]

      // 找到cell 元素中的 按钮
      let btns = tr_cell.getElementsByTagName("button")

      // - 按钮
      btns[0].onclick = function () {
        let span_count = this.nextElementSibling
        // 暂时 innerHTML 和 innerText 属性一样, 具体区别 明天讲
        // 代表 双标签的内容
        span_count.innerHTML--

        // 内容是 1 , 则当前按钮 不可用状态 为 true
        // if (span_count.innerHTML == 1) this.disabled = true

        // 比较运算符 == 的结果 是boolean类型
        this.disabled = span_count.innerHTML == 1
      }

      btns[1].onclick = function () {
        // ++ : 自动变为 数字类型 自增
        // this.previousElementSibling.innerHTML++

        // innerHTML 的值是字符串类型, 当遇到 += 是字符串拼接
        let count = this.previousElementSibling.innerHTML
        // 字符串类型转数字: Number(). parseInt
        // 小技巧: *1 会快速转数字
        this.previousElementSibling.innerHTML = count * 1 + 1

        //如果值>1 则让 - 按钮可用!
        if (this.previousElementSibling.innerHTML > 1) {
          // 此处的this是 + 按钮
          // - 按钮, 是 + 按钮的 上一个 的上一个
          this.previousElementSibling.previousElementSibling.disabled = false
        }
      }
    </script>
  </body>
</html>

```

## 购物车cell + 总价格

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
        /* 合并边框 */
        border-collapse: collapse;
        min-width: 500px;
      }

      td {
        padding: 0 5px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <!-- table[border=1]>(thead>tr>td*5)+(tbody>tr[name='cell']>td*5) -->
    <!-- 通过 ctrl + i  可以弹出提示 -->

    <table border="1">
      <thead>
        <tr>
          <td>序号</td>
          <td>名称</td>
          <td>单价</td>
          <td>数量</td>
          <td>总价</td>
        </tr>
      </thead>
      <tbody>
        <tr name="cell">
          <td>1</td>
          <td>iPhone13 pro max</td>
          <td>¥9999</td>
          <td>
            <!-- button+span+button -->
            <button>-</button>
            <span>5</span>
            <button>+</button>
          </td>
          <td>¥49995</td>
        </tr>
      </tbody>
    </table>

    <script>
      // 官方提供了 更加简单的 查找元素的方式: 利用css的选择器实现

      // querySelector: 通过选择器查找 单个元素
      let btn_minus = document.querySelector("tbody button:first-child")
      console.log(btn_minus)

      let span_count = document.querySelector("tbody span")
      console.log(span_count)

      let btn_add = document.querySelector("tbody button:last-child")
      console.log(btn_add)

      btn_minus.onclick = function () {
        span_count.innerHTML--
        this.disabled = span_count.innerHTML == 1
        updateTotalPrice()
      }

      btn_add.onclick = function () {
        span_count.innerHTML++
        btn_minus.disabled = false //不可用为假
        updateTotalPrice()
      }

      // 读取单价, 在数量变化时, 计算出总价格 更新到总价格里
      // 细节: 单价需要去掉 ¥ 符号才能使用
      function updateTotalPrice() {
        // 读取单价
        let td_price = document.querySelector("tbody td:nth-child(3)")
        console.log(td_price)
        // slice: 截取字符串, 截取序号1 开始到最后, 排除¥符号
        let price = td_price.innerHTML.slice(1) // 单价
        console.log(price)
        let count = span_count.innerHTML //数量

        //更新到 总价格 即可!
        let td_total_price = document.querySelector("tbody td:last-child")
        td_total_price.innerHTML = "¥" + count * price
      }

      updateTotalPrice()
    </script>
  </body>
</html>

```

## 购物车 完整版本

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
        /* 合并边框 */
        border-collapse: collapse;
        min-width: 500px;
      }

      td {
        padding: 0 5px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <!-- table[border=1]>(thead>tr>td*5)+(tbody>tr[name='cell']>td*5) -->
    <!-- 通过 ctrl + i  可以弹出提示 -->

    <table border="1">
      <thead>
        <tr>
          <td>序号</td>
          <td>名称</td>
          <td>单价</td>
          <td>数量</td>
          <td>总价</td>
        </tr>
      </thead>
      <tbody>
        <tr name="cell">
          <td>1</td>
          <td>iPhone13 pro max</td>
          <td>¥9999</td>
          <td>
            <!-- button+span+button -->
            <button>-</button>
            <span>5</span>
            <button>+</button>
          </td>
          <td>¥49995</td>
        </tr>

        <tr name="cell">
          <td>1</td>
          <td>Mix4</td>
          <td>¥5999</td>
          <td>
            <!-- button+span+button -->
            <button>-</button>
            <span>15</span>
            <button>+</button>
          </td>
          <td>¥49995</td>
        </tr>

        <tr name="cell">
          <td>1</td>
          <td>OPPO Find X pro</td>
          <td>¥4888</td>
          <td>
            <!-- button+span+button -->
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </td>
          <td>¥49995</td>
        </tr>

        <tr name="cell">
          <td>1</td>
          <td>P50 pro</td>
          <td>¥6999</td>
          <td>
            <!-- button+span+button -->
            <button>-</button>
            <span>3</span>
            <button>+</button>
          </td>
          <td>¥49995</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="5" style="text-align: right">
            <span>总金额:</span>
            <span>******</span>
          </td>
        </tr>
      </tfoot>
    </table>

    <script>
      // 1.查找 tbody 下的所有 tr
      // querySelectorAll: 查所有满足条件的元素, 返回值为 类数组 类型
      let trs = document.querySelectorAll("tbody tr")
      // querySelectorAll: 查询结果是 类数组类型, 具有 forEach 遍历方法
      // getElementsxxxx 之类的, 查询结果 没有 forEach 方法
      console.log(trs)

      trs.forEach((item, index) => {
        // item: 每个tr元素
        // index: 当前tr元素的序号
        console.log(item, index)

        //序号: 从0 开始, 此处需要+1 才能改为 从1 开始数
        item.firstElementChild.innerHTML = index + 1

        let tr_price = item.children[2] //单价: 第3个子元素, 序号2
        let tr_total_price = item.lastElementChild //总价: 最后一个

        let btn_minus = item.children[3].firstElementChild
        let btn_add = item.children[3].lastElementChild
        let span_count = item.getElementsByTagName("span")[0]

        console.log(tr_price)
        console.log(tr_total_price)
        console.log(btn_minus)
        console.log(btn_add)
        console.log(span_count)

        // 减按钮的点击事件...
        btn_minus.onclick = function () {
          span_count.innerHTML--
          this.disabled = span_count.innerHTML == 1
          updatePrice()
        }

        // 刚开始 初始化时, 就判断一次, 如果数量是1 则 - 无效
        btn_minus.disabled = span_count.innerHTML == 1

        // 加按钮的 点击事件
        btn_add.onclick = function () {
          span_count.innerHTML++
          btn_minus.disabled = false
          updatePrice()
        }

        // 总价格的更新...
        function updatePrice() {
          // 更新总价格
          let count = span_count.innerHTML
          // 利用 slice 去掉 ¥ 符号
          let price = tr_price.innerHTML.slice(1)
          tr_total_price.innerHTML = "¥" + count * price

          // 总金额: 遍历所有行的 最后金额, 累加成总金额
          let tr_total_prices = document.querySelectorAll("tbody td:last-child")

          var sum = 0

          tr_total_prices.forEach(item => {
            // 获取每一项的值, 去掉 ¥
            let price = item.innerHTML.slice(1)
            // price是字符串类型,  *1 转化成数字 再累加
            sum += price * 1
          })

          // 更新到总金额中
          let span_total_price = document.querySelector("tfoot span:last-child")
          span_total_price.innerHTML = "¥" + sum
        }
        updatePrice()
      })
    </script>
  </body>
</html>

```









## 总结

DOM: 文档对象模型

html代码实际运行时, 会先转化 document 对象, 然后才被浏览器进行展示

我们可以利用JS来操作 document 对象, 可以让 静态的HTML页面 `动起来`

重点内容:

1. 如何 查找到 想要操作的元素!
2. 需要了解 元素中都有哪些 属性 可以使用

### 晚上作业

把购物车多练习几遍,  最好能根据 需求 独立默写出来!















