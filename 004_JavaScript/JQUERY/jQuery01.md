# jQuery01

## 本阶段的内容

- JS高级

  - 底层框架开发的 基础
  - Vue, Angular, React 这些框架: 底层都利用了 JS高级的知识点
  - 面试时: 重点考察 JS高级 部分!

- DOM & BOM

  - 这是操作 页面的 基本
  - 开发各种DOM相关框架的 基础

- jQuery

  应用层:  利用 JS高级部分 + DOM部分 的知识, 封装出来的框架

  理念: `write less, do more`  写的少 做的多!

- Vue

## jQuery

最早期的, 最成功的一款JavaScript 框架

绝对统治力 长达10数年时间, 直到后期的 Vue 框架2014年出现, 初步完善之后, 才被**1线**城市接受, 逐步替换了jQuery.

- jQuery目前市场占有率极大
  - 大多数旧项目都是jQuery书写的, 没有强烈意愿去 重构成 vue 框架
  - 非1线城市, 程序员的技能更新速度很慢, 大多数公司依然才有 jQuery 制作项目!

- jQuery: 学习非常简单

---

使用: 到 jQuery的官方网站 下载 作者封装好的 js 文件即可

已经提前放在FTP, 可以下载使用即可!

![image-20211014101948767](jQuery01.assets/image-20211014101948767.png)

官方网站:https://jquery.com/

下载地址: https://jquery.com/download/

![image-20211014102234005](jQuery01.assets/image-20211014102234005.png)



## css选择器

| 选择器                                                       | 例子                  | 例子描述                                             |
| :----------------------------------------------------------- | :-------------------- | :--------------------------------------------------- |
| [.*class*](https://www.w3school.com.cn/cssref/selector_class.asp) | .intro                | 选择 class="intro" 的所有元素。                      |
| .*class1*.*class2*                                           | .name1.name2          | 选择 class 属性中同时有 name1 和 name2 的所有元素。  |
| .*class1* .*class2*                                          | .name1 .name2         | 选择作为类名 name1 元素后代的所有类名 name2 元素。   |
| [#*id*](https://www.w3school.com.cn/cssref/selector_id.asp)  | #firstname            | 选择 id="firstname" 的元素。                         |
| [*](https://www.w3school.com.cn/cssref/selector_all.asp)     | *                     | 选择所有元素。                                       |
| [*element*](https://www.w3school.com.cn/cssref/selector_element.asp) | p                     | 选择所有 <p> 元素。                                  |
| [*element*.*class*](https://www.w3school.com.cn/cssref/selector_element_class.asp) | p.intro               | 选择 class="intro" 的所有 <p> 元素。                 |
| [*element*,*element*](https://www.w3school.com.cn/cssref/selector_element_comma.asp) | div, p                | 选择所有 <div> 元素和所有 <p> 元素。                 |
| [*element* *element*](https://www.w3school.com.cn/cssref/selector_element_element.asp) | div p                 | 选择 <div> 元素内的所有 <p> 元素。                   |
| [*element*>*element*](https://www.w3school.com.cn/cssref/selector_element_gt.asp) | div > p               | 选择父元素是 <div> 的所有 <p> 元素。                 |
| [*element*+*element*](https://www.w3school.com.cn/cssref/selector_element_plus.asp) | div + p               | 选择紧跟 <div> 元素的首个 <p> 元素。                 |
| [*element1*~*element2*](https://www.w3school.com.cn/cssref/selector_gen_sibling.asp) | p ~ ul                | 选择前面有 <p> 元素的每个 <ul> 元素。                |
| [[*attribute*\]](https://www.w3school.com.cn/cssref/selector_attribute.asp) | [target]              | 选择带有 target 属性的所有元素。                     |
| [[*attribute*=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value.asp) | [target=_blank]       | 选择带有 target="_blank" 属性的所有元素。            |
| [[*attribute*~=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | [title~=flower]       | 选择 title 属性包含单词 "flower" 的所有元素。        |
| [[*attribute*\|=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | [lang\|=en]           | 选择 lang 属性值以 "en" 开头的所有元素。             |
| [[*attribute*^=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_begin.asp) | a[href^="https"]      | 选择其 src 属性值以 "https" 开头的每个 <a> 元素。    |
| [[*attribute*$=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_end.asp) | a[href$=".pdf"]       | 选择其 src 属性以 ".pdf" 结尾的所有 <a> 元素。       |
| [[*attribute**=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_contain.asp) | a[href*="w3schools"]  | 选择其 href 属性值中包含 "abc" 子串的每个 <a> 元素。 |
| [:active](https://www.w3school.com.cn/cssref/selector_active.asp) | a:active              | 选择活动链接。                                       |
| [::after](https://www.w3school.com.cn/cssref/selector_after.asp) | p::after              | 在每个 <p> 的内容之后插入内容。                      |
| [::before](https://www.w3school.com.cn/cssref/selector_before.asp) | p::before             | 在每个 <p> 的内容之前插入内容。                      |
| [:checked](https://www.w3school.com.cn/cssref/selector_checked.asp) | input:checked         | 选择每个被选中的 <input> 元素。                      |
| [:default](https://www.w3school.com.cn/cssref/selector_default.asp) | input:default         | 选择默认的 <input> 元素。                            |
| [:disabled](https://www.w3school.com.cn/cssref/selector_disabled.asp) | input:disabled        | 选择每个被禁用的 <input> 元素。                      |
| [:empty](https://www.w3school.com.cn/cssref/selector_empty.asp) | p:empty               | 选择没有子元素的每个 <p> 元素（包括文本节点）。      |
| [:enabled](https://www.w3school.com.cn/cssref/selector_enabled.asp) | input:enabled         | 选择每个启用的 <input> 元素。                        |
| [:first-child](https://www.w3school.com.cn/cssref/selector_first-child.asp) | p:first-child         | 选择属于父元素的第一个子元素的每个 <p> 元素。        |
| [::first-letter](https://www.w3school.com.cn/cssref/selector_first-letter.asp) | p::first-letter       | 选择每个 <p> 元素的首字母。                          |
| [::first-line](https://www.w3school.com.cn/cssref/selector_first-line.asp) | p::first-line         | 选择每个 <p> 元素的首行。                            |
| [:first-of-type](https://www.w3school.com.cn/cssref/selector_first-of-type.asp) | p:first-of-type       | 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。     |
| [:focus](https://www.w3school.com.cn/cssref/selector_focus.asp) | input:focus           | 选择获得焦点的 input 元素。                          |
| [:fullscreen](https://www.w3school.com.cn/cssref/selector_fullscreen.asp) | :fullscreen           | 选择处于全屏模式的元素。                             |
| [:hover](https://www.w3school.com.cn/cssref/selector_hover.asp) | a:hover               | 选择鼠标指针位于其上的链接。                         |
| [:in-range](https://www.w3school.com.cn/cssref/selector_in-range.asp) | input:in-range        | 选择其值在指定范围内的 input 元素。                  |
| [:indeterminate](https://www.w3school.com.cn/cssref/selector_indeterminate.asp) | input:indeterminate   | 选择处于不确定状态的 input 元素。                    |
| [:invalid](https://www.w3school.com.cn/cssref/selector_invalid.asp) | input:invalid         | 选择具有无效值的所有 input 元素。                    |
| [:lang(*language*)](https://www.w3school.com.cn/cssref/selector_lang.asp) | p:lang(it)            | 选择 lang 属性等于 "it"（意大利）的每个 <p> 元素。   |
| [:last-child](https://www.w3school.com.cn/cssref/selector_last-child.asp) | p:last-child          | 选择属于其父元素最后一个子元素每个 <p> 元素。        |
| [:last-of-type](https://www.w3school.com.cn/cssref/selector_last-of-type.asp) | p:last-of-type        | 选择属于其父元素的最后 <p> 元素的每个 <p> 元素。     |
| [:link](https://www.w3school.com.cn/cssref/selector_link.asp) | a:link                | 选择所有未访问过的链接。                             |
| [:not(*selector*)](https://www.w3school.com.cn/cssref/selector_not.asp) | :not(p)               | 选择非 <p> 元素的每个元素。                          |
| [:nth-child(*n*)](https://www.w3school.com.cn/cssref/selector_nth-child.asp) | p:nth-child(2)        | 选择属于其父元素的第二个子元素的每个 <p> 元素。      |
| [:nth-last-child(*n*)](https://www.w3school.com.cn/cssref/selector_nth-last-child.asp) | p:nth-last-child(2)   | 同上，从最后一个子元素开始计数。                     |
| [:nth-of-type(*n*)](https://www.w3school.com.cn/cssref/selector_nth-of-type.asp) | p:nth-of-type(2)      | 选择属于其父元素第二个 <p> 元素的每个 <p> 元素。     |
| [:nth-last-of-type(*n*)](https://www.w3school.com.cn/cssref/selector_nth-last-of-type.asp) | p:nth-last-of-type(2) | 同上，但是从最后一个子元素开始计数。                 |
| [:only-of-type](https://www.w3school.com.cn/cssref/selector_only-of-type.asp) | p:only-of-type        | 选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。     |
| [:only-child](https://www.w3school.com.cn/cssref/selector_only-child.asp) | p:only-child          | 选择属于其父元素的唯一子元素的每个 <p> 元素。        |
| [:optional](https://www.w3school.com.cn/cssref/selector_optional.asp) | input:optional        | 选择不带 "required" 属性的 input 元素。              |
| [:out-of-range](https://www.w3school.com.cn/cssref/selector_out-of-range.asp) | input:out-of-range    | 选择值超出指定范围的 input 元素。                    |
| [::placeholder](https://www.w3school.com.cn/cssref/selector_placeholder.asp) | input::placeholder    | 选择已规定 "placeholder" 属性的 input 元素。         |
| [:read-only](https://www.w3school.com.cn/cssref/selector_read-only.asp) | input:read-only       | 选择已规定 "readonly" 属性的 input 元素。            |
| [:read-write](https://www.w3school.com.cn/cssref/selector_read-write.asp) | input:read-write      | 选择未规定 "readonly" 属性的 input 元素。            |
| [:required](https://www.w3school.com.cn/cssref/selector_required.asp) | input:required        | 选择已规定 "required" 属性的 input 元素。            |
| [:root](https://www.w3school.com.cn/cssref/selector_root.asp) | :root                 | 选择文档的根元素。                                   |
| [::selection](https://www.w3school.com.cn/cssref/selector_selection.asp) | ::selection           | 选择用户已选取的元素部分。                           |
| [:target](https://www.w3school.com.cn/cssref/selector_target.asp) | #news:target          | 选择当前活动的 #news 元素。                          |
| [:valid](https://www.w3school.com.cn/cssref/selector_valid.asp) | input:valid           | 选择带有有效值的所有 input 元素。                    |
| [:visited](https://www.w3school.com.cn/cssref/selector_visited.asp) | a:visited             | 选择所有已访问的链接。                               |

## jQuery封装思想

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
    <button>1111</button>
    <button>2222</button>
    <script>
      // 任务: 查找所有按钮, 点击后 让被点击按钮的 文字变红色
      // 提示: querySelectorAll(); forEach; onclick; style.color='red';
      let btns = document.querySelectorAll("button")

      btns.forEach(item => {
        item.onclick = function () {
          this.style.color = "red"
        }
      })

      //----------------------------------------
      // 封装框架:
      function Query(selector) {
        // 参数selector : 用户传入的 css选择器代码
        // 利用选择器 查找元素
        // elements: 元素们.  自定义变量名 保存查询出来的所有元素
        this.elements = document.querySelectorAll(selector)
      }
      // 为构造函数的原型 添加方法
      // callback: 接收一个回调函数  难点!
      Query.prototype.click = function (callback) {
        // this: 代表new出来的对象, 即当前对象
        this.elements.forEach(item => (item.onclick = callback))
      }

      let func = function () {
        this.style.color = "blue"
      }

      new Query("button").click(func)

      // function click(callback){
      //   // this.elements: 就是new时 查询出的所有按钮
      //   this.elements.forEach(item => (item.onclick = callback))
      // }

      // 查找所有 button
      new Query("button").click(function () {
        this.style.color = "blue"
      })

      function $(selector) {
        return new Query(selector)
      }
      //
      $("button").click(function () {
        this.style.color = "purple"
      })
    </script>
  </body>
</html>

```

## 初体验

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
    <button>111</button>
    <button>222</button>
    <!-- 引入 jquery 脚本 -->
    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // jQuery的固定写法
      // $(选择器).事件名(回调函数)
      // 事件触发时, 就会执行回调函数, 函数中的this就代表选择器选到的元素
      // 选择器: 所有的css选择器在这里都可以使用!
      $("button").click(function () {
        this.style.color = "blue"
      })

      // 选择第二个按钮:
      // 本质是 DOM的 querySelectorAll('选择器')
      // nth-child(n): 选中作为第二个孩子的 button元素
      $("button:nth-child(2)").click(function () {
        this.style.backgroundColor = "red"
      })
    </script>
  </body>
</html>

```

## 监听页面加载完成的时机

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
    <!-- 切记: 使用jQuery 必须先引入脚本! -->
    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // jQuery: 监听
      // 选中document对象, 添加ready准备就绪事件, 触发回调函数
      $(document).ready(function () {
        console.log("dom加载完毕")
        box.style.backgroundColor = "purple"
      })
      // 简化
      $(function () {
        console.log("dom加载完毕")
        box.style.border = "2px solid green"
      })
      // 插件代码块: jqshort
      $(function () {})
    </script>

    <script>
      // 监听页面加载完毕的事件, 在这个事件里执行dom操作
      // onload: 在页面加载完毕后, 会自动触发
      window.onload = function () {
        console.log("页面加载完毕!")
        box.style.color = "red"
      }
    </script>

    <div id="box">Hello World!</div>
  </body>
</html>

```

## jq对象

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
    <button>111</button>
    <button>222</button>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 官方推荐: 保存jq查询结果的变量, 应该用 $ 开头, 以示特殊性
      // 此规范 非强制
      let $btns = $("button")
      console.log($btns)
      // jquery对象: 原型中包含了各种各样的 方法, 用来操作DOM元素
    </script>
  </body>
</html>

```



## 事件click

- 事件的绑定底层是 `addEventListener`:  添加的是事件列表
  多次添加click事件, 不会覆盖之前的, 而是顺序执行

- 可以移除所有事件: `unbind()`

- 可以移除指定事件, 要求必须使用 `命名函数`

  `xxx.unbind('事件名', 函数名)`

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
    <button>点击事件</button>
    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      $("button").click(function () {
        console.log("111111")
      })
      // jqclick
      $("button").click(function (e) {
        // 代码块自带: 阻止默认事件, 推荐保留, 可以避免很多麻烦
        e.preventDefault()
        console.log(22222)
      })
      // 新增事件 不会替换已有事件, 说明是 addEventListener 的方式添加的
      // 带有事件列表, 会按照添加顺序执行

      // 删除所有事件:  unbind: 不绑定
      // $("button").unbind()

      // 删除指定事件: 要求事件必须是 命名函数 才可以!
      function show() {
        console.log(33333333)
      }
      $("button").click(show)
      // 指定删除: click 的 show 方法
      $("button").unbind("click", show)
    </script>
  </body>
</html>

```

## css操作

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
    <div id="box" style="color: blue; border: 2px solid green; font-size: 30px">
      Hello World
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 获取 id='box' 元素的 css 样式的内容
      // 读取的box对象, 存储在变量中, 便于反复使用, 变量名推荐$开头
      let $box = $("#box")
      // 读取样式中的color的值
      console.log($box.css("color"))
      console.log($box.css("border"))
      // 代码块: jqcssGet
      console.log($("#box").css("font-size"))

      // 修改颜色: jqcssSet
      $("#box").css("color", "purple")

      // 同时设置多个属性: jqcssSetObj
      $("#box").css({
        "border-radius": "9px",
        "background-color": "gold",
        // 对于带 - 的属性,  可以用字符串方式, 也可以用小驼峰写法
        // "font-size":"44px",
        fontSize: "50px",
      })
    </script>
  </body>
</html>

```

## class操作

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .danger {
        width: 200px;
        background-color: red;
        border-radius: 4px;
        text-align: center;
        padding: 10px 0;
        color: white;
      }
    </style>
  </head>
  <body>
    <button>添加样式</button>
    <button>删除样式</button>
    <button>切换样式</button>
    <button>判断是否存在danger样式</button>

    <div id="box">Welcome to 2107</div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 缩写格式: eq(n)  序号n 的元素, 序号从0开始数!
      // equal: 相等
      // $("button:nth-child(1)")  // css的孩子从 1 开始数
      $btn0 = $("button:eq(0)")
      console.log($btn0)
      // 为 id='box' 的元素添加 danger 样式class
      $btn0.click(function () {
        $("#box").addClass("danger") // jqClassAdd
      })

      // 删除按钮点击时, 删除 id='box' 元素的 danger 样式
      $("button:eq(1)").click(function (e) {
        // removeClass: 移除
        $("#box").removeClass("danger")
      })

      // 切换: 有的时候删除, 没的时候添加
      $("button:eq(2)").click(function (e) {
        // toggle: 切换
        $("#box").toggleClass("danger")
      })

      // 是否存在 danger 样式
      $("button:eq(3)").click(function (e) {
        e.preventDefault()
        console.log($("#box").hasClass("danger"))
      })
    </script>
  </body>
</html>

```

## 各种事件

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
    <div
      id="box"
      style="width: 200px; height: 200px; border: 1px solid red"
    ></div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 单击事件: jqclick
      $("#box").click(function (e) {
        //设置盒子的内容
        // $("#box").html("单击事件!")
        // 在事件内部, 使用 this 代表当前元素
        // $(this): 代表jQuery 封装之后的 JQ 对象, 可以使用JQ的相关方法
        $(this).html("单击事件!")
        console.log($(this))
        // this: 代表当前操作的DOM元素, 使用原生的DOM语法
        // 相当于 document.getElementById('box')
        this.innerHTML = "单击事件!"
        console.log(this)
      })

      // 双击事件:   dbl:  double
      $("#box").dblclick(function () {
        // html: 设置元素的 innerHTML 属性
        $(this).html("双击事件")
      })

      // 鼠标进入: jqMouseEnter
      $("#box").mouseenter(function () {
        $(this).html("鼠标进入")
        $(this).css("background", "green")
      })

      // 鼠标移出: jqMouseLeave
      $("#box").mouseleave(function () {
        // 链式写法:  xxx.xx.xxx.xx.xxx
        $(this).html("鼠标移出").css("background-color", "orange")
      })

      // 鼠标事件通常是合并的:  移入+移出 -- hover
      // hover(进入时触发, 移出时触发)
      $("#box").hover(
        function () {
          $(this).css("border-radius", "10px")
        },
        function () {
          $(this).css("border-radius", "1px")
        }
      )
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
    <input type="text" placeholder="用户名" />
    <br />
    <input type="password" placeholder="密码框" />
    <br />
    <input type="checkbox" checked />

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      //对于input标签, 具有不同的type类型, 提供了快速选取的方式:
      let $name = $(":text")
      console.log($name)

      $name.focus(function () {
        console.log("用户名输入框获得焦点")
      })

      // 失去焦点
      $name.blur(function () {
        console.log("用户输入框失去焦点")
      })

      // 选择密码框
      console.log($(":password"))

      // 多选框的勾选: change 事件 -- jqchange
      $(":checkbox").change(function (e) {
        e.preventDefault()
        console.log("多选框变化:", $(this).prop("checked"))
        // prop: 用于读取或设置 属性的值
        // property的缩写: 属性
      })
    </script>
  </body>
</html>

```

### 事件练习

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .btn {
        color: white;
        background-color: green;
        border-radius: 4px;
        display: inline-block;
        margin: 10px;
        padding: 5px 70px;
        cursor: pointer;
        /* 用户无法选择文本 */
        user-select: none;
      }

      .btn.disabled {
        background-color: lightgray;
        /* 光标事件: 没有 */
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <div>
        <input type="checkbox" />
        <span>我已阅读并同意用户注册协议</span>
      </div>
      <div class="btn disabled">提交注册</div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 按钮点击后, 透明度发生变化, 在0.2 秒后恢复正常
      $(".btn").click(function (e) {
        e.preventDefault()
        $(this).css("opacity", 0.6) // opacity: 透明度
        // sto : 定时器, 0.2秒之后 触发
        setTimeout(() => {
          $(this).css("opacity", 1)
        }, 200)
      })

      // 监听勾选框的 变更change, 如果勾选,就应该去掉按钮的disabled样式
      // 否则 就应该就应该 添加 disabled 样式
      $(":checkbox").change(function (e) {
        // 读取属性: prop
        if ($(this).prop("checked")) {
          // 操作class:  移除disabled 样式
          $(".btn").removeClass("disabled")
        } else {
          // 非勾选, 则添加样式
          $(".btn").addClass("disabled")
        }
        // 扩展: 可以利用三目运算符简化代码
        // 大概格式: checked ? 移除 : 添加
      })
    </script>
  </body>
</html>

```

## 序号选择器

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
    <ul>
      <li>0.亮亮</li>
      <li>1.亚楠</li>
      <li>2.小新</li>
      <li>3.铭铭</li>
      <li>4.False</li>
      <li>5.xxx</li>
    </ul>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 选中 eq 序号3 的li, 改为 红色  css color red
      $("li:eq(3)").css("color", "red")
      // lt: less than  小于    实体字符: &lt; <
      // gt: greater than 大于  实体字符: &gt; >

      // 小于序号3 的元素, 改为 绿色
      $("li:lt(3)").css("color", "green")
      // 大于序号3的元素, 改为 橙色
      $("li:gt(3)").css("color", "orange")

      // even: 偶数  --4个字母的单词是偶数
      // odd: 奇数  -- 3个字母的单词是奇数
      // li的偶数序号 添加背景色 浅灰
      $("li:even").css("background-color", "lightgray")
      // 奇数行, 添加 brown 背景颜色
      $("li:odd").css("background-color", "brown")
    </script>
  </body>
</html>

```

### 序号选择器练习

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
        border-collapse: collapse;
      }
      td {
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <!-- table>(thead>tr>th*3)+(tbody>tr*5>td*3) -->
    <table border="1">
      <thead>
        <tr>
          <th>阶段</th>
          <th>讲师</th>
          <th>内容</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>阶段1</td>
          <td>亮亮</td>
          <td>数据库, 服务器, js基础</td>
        </tr>
        <tr>
          <td>阶段2</td>
          <td>亚楠</td>
          <td>html, css, ajax</td>
        </tr>
        <tr>
          <td>阶段3</td>
          <td>小新</td>
          <td>js高级, dom&bom, jquery, vue</td>
        </tr>
        <tr>
          <td>阶段4</td>
          <td>铭铭</td>
          <td>vue扩展组件库, HTML高级, 微信小程序, 大数据展示</td>
        </tr>
        <tr>
          <td>阶段5</td>
          <td>贾</td>
          <td>uniapp, react, angular, vue</td>
        </tr>
      </tbody>
    </table>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      $("tbody>tr:even").css("background-color", "lightgray")
      $("tbody>tr:odd").css("background-color", "orange")
      // 当鼠标移入到哪一行 放大字体
      $("tbody>tr").hover(
        function () {
          // 进入
          $(this).css({ "font-size": "1.2em", color: "green" })
        },
        function () {
          // 移出
          $(this).css({ "font-size": "1em", color: "black" })
        }
      )
    </script>
  </body>
</html>

```

## 属性操作

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
    <!-- data-color: 自定义属性  -->
    <a href="http://www.baidu.com" target="_blank" data-color="blue"
      >百度一下</a
    >

    <input type="checkbox" checked />
    <input type="checkbox" />

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 读取属性值的两种方式: prop (property) 和 attr (attribute)
      console.log($("a").prop("href"))
      console.log($("a").attr("href"))

      // 差别1:
      // prop只能读取官方提供的属性
      // attr能读取 官方提供的属性 + 自定义属性
      console.log($("a").prop("data-color"))
      console.log($("a").attr("data-color"))

      // 差别2:
      // prop: 可以读取所有类型的返回值
      // attr: 只能读取字符串类型的返回值
      console.log($(":checkbox"))
      console.log($(":checkbox:eq(0)").prop("checked")) //true
      console.log($(":checkbox:eq(1)").prop("checked")) //false

      console.log($(":checkbox:eq(0)").attr("checked")) //checked
      console.log($(":checkbox:eq(1)").attr("checked")) //undefined3

      // 总结: 凡是系统提供的属性, 用prop
      // 凡是自定义属性用 attr
    </script>
  </body>
</html>

```

## 属性修改

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
    <a href="http://www.baidu.com">百度一下</a>
    <button>修改href</button>

    <input type="checkbox" />
    <button disabled>注册</button>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 点击按钮, 修改 a 的href属性
      $("button").click(function (e) {
        // prop: 典型的 函数重载: 根据参数数量/类型的不同, 执行不同的代码逻辑
        // prop(属性名):  单参数是 读取操作
        // prop(属性名, 值): 双参数 是设置操作
        $("a").prop("href", "http://tmooc.cn")
        // attr也能修改, 但是attr适合修改 自定义属性
        $("a").attr("href", "xxxxxx")
      })

      // 读取 disabled 属性:  此属性是系统的,用prop读取
      console.log($("button:eq(1)").prop("disabled"))
      // 监听 勾选框的change事件, 修改 按钮的disabled 值
      $(":checkbox").change(function (e) {
        console.log($(this).prop("checked"))
        if ($(this).prop("checked")) {
          //勾选, 则按钮可用, 说明 disabled 是false
          $("button:eq(1)").prop("disabled", false)
        } else {
          $("button:eq(1)").prop("disabled", true)
        }
      })
    </script>
  </body>
</html>

```



## 图片轮播

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
    <img src="./img/1.jpg" alt="" data-cur="0" />
    <button>下一张</button>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      let imgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
      //点击时, 修改 src 的值为下一张
      $("button").click(function (e) {
        // data-cur: 自定义属性, 保存了当前图片的序号
        let $img = $("img")
        let cur = $img.attr("data-cur") //自定属性, 用attr
        cur++ //下一张, ++代表+1
        // 更新当前页 序号
        // %: 取余符号  超过最大需要 自动回0
        // 例如 1%4 = 1;  2%4=2   4%4=0
        cur = cur % imgs.length
        // 实时读取数组长度, 数组就算有变化, 代码依然会正常运行
        $img.attr("data-cur", cur)

        // 注意: 不能写cur+=1, 因为 cur 是字符串类型, 会导致拼接操作
        // 根据新的序号 读取新的图片
        let new_img = imgs[cur]
        // src 是系统的属性, 用prop
        $img.prop("src", `./img/${new_img}`)
      })
    </script>
  </body>
</html>

```































