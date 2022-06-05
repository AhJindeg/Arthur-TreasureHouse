# jQuery02

> DOM的脑图已经整理完毕, 可以到 FTP/DOM 中下载:`DOM&BOM_ALL.zip`

## 复习

jQuery: 是利用 JS 和 DOM 基础知识点, 封装的一套 JavaScript 框架

- 在早年间, 具有统治性的地位, 大多数项目都是用JQuery 制作的
- 虽然大趋势是vue开发为主, 但是 非1线城市 和 旧项目的维护, 政府项目..
- jQuery 很简单, 因为作者的理念: `write less, do more`: 写的少 做的多!

写法格式: `$(选择器).操作()`

- 选择DOM加载完毕的时机: 如果脚本script 书写在html顶部的位置, 页面代码还没有生成, 是无法直接操作DOM的, 需要监听DOM加载完毕的时机

  ```js
  $(document).ready(function(){
      // DOM 加载完毕....
  })
  
  // 简化:
  $(function(){
      
  })
  ```

- 变量声明: 用于保存 jq对象的变量, 应该用 `$` 开头, 非强制 但是 强烈推荐

- 各种选择器:

  - css选择器

    ```js
    $('p')  所有p标签
    $('.danger')  所有 class='danger' 标签
    $('#box') id='box' 的标签
    $('ul>li')  所有 ul下的子元素的li 标签
    ...
    ```

  - JQ提供的选择器: css选择器有时候过于复杂, 所有JQ提供了一些简化

    ```js
    $(':checkbox')   选择 type='checkbox' 的元素,  : 专属 input 标签
    $(':text')
    
    序号:  此序号 非 css 的 nth-child, 相对于 DOM 中的元素结构
    $('li:eq(0)') eq等于 eq(0) 相对的是 查询出来的所有li中 序号0的
    $('li:gt(0)')  gt大于
    $('li:lt(0)')  lt小于
    
    // 此处的奇数偶数 针对的是 查询出来的元素 的序号的奇数偶数
    奇数 odd   $('li:odd')
    偶数 even  $('li:even')
    ```

- 事件

  事件添加 采用的是 `addEventListener` 作为底层, 是一个事件列表,  新增事件不会覆盖旧事件

  - click: 点击
  - dblclick: 双击
  - mouseEnter: 鼠标进入
  - mouseLeave: 鼠标离开
  - hover: 参数1: 鼠标进入;  参数2: 鼠标离开
  - change: 变更 -- 勾选框
  - focus: 获取焦点 - 输入框
  - blur: 失去焦点

- 样式

  - css
    - 读取:`css(属性名)`
    - 设置:`css(属性名, 值)`
  - class
    - 添加样式: `addClass()`
    - 删除样式: `removeClass`
    - 切换样式: `toggleClass`
    - 判断是否存在: `hasClass`

- 属性
  - prop: 用于操作`系统提供`的标准属性
    - 读取: `prop(属性名)`
    - 设置: `prop(属性名, 值)`
  - attr: 用于操作`自定义`属性

---

## 包含关系选择器

- contains: 文本中包含xxx
- has: 子元素中包含
- not: 不包含

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
    <div>
      <h1>包含关系选择器</h1>
      <button>提交订单</button>
      <button>Submit注册信息</button>
      <button>马上提交</button>
      <button>清空重填</button>

      <hr />
      <div class="alert"></div>
      <hr />
      <div class="alert">
        <span class="close">x</span>
      </div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 选取 双标签内容中 含有 '提交' 字样的元素, 变为绿色按钮
      // contains: 包含,含有
      $("button:contains(提交)").css("background-color", "green")

      // 选中包含 .close 样式的 .alert 元素, 修改其样式
      // has: 有, 包含
      $(".alert:has(.close)").css({
        backgroundColor: "yellow",
        padding: "5px",
        borderRadius: "3px",
        textAlign: "right",
      })

      // 选择 .alert 中, 没有 .close 样式的
      // not: 没有
      $(".alert:not(:has(.close))").css({
        "background-color": "green",
        height: "30px",
      })

      // 空 empty, 代表没有子元素
      // 选择 .alert中 是空的那个
      $(".alert:empty").css("box-shadow", "0 0 3px 3px black")

      // 选择 .alert 中 不是空的,  把阴影改成 蓝色
      $(".alert:not(:empty)").css("box-shadow", "0 0 3px 3px blue")
    </script>
  </body>
</html>

```

## 可见性选择器

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
      HTML的元素可以隐藏, 隐藏方式有以下几种:
      - display: none 移除, 不占位
      - 表单元素input, 带有type='hidden' 写法, 效果与display:none相同
      - opacity: 0;  透明度改全透明, 但是依然占位
      - visibility:hidden   也是透明度全透明, 隐藏但是占位

      此处的 不可见元素选择器, 只能选中第一种 display:none
    -->
    <div id="box">
      <div style="display: none">11111111111</div>
      <div style="visibility: hidden">222222222222</div>
      <div style="opacity: 0">333333333333</div>
      <input type="hidden" />
    </div>

    <!-- 细节: 优化方式 -->
    <!-- 让要显示给用户看的内容, 最先加载 -->
    <!-- 脚本应该放在最后书写 -->
    <script src="./vendor/jquery-3.6.0.min.js"></script>

    <script>
      // 选择器: 选择隐藏的DOM元素 -- 仅限 display:none 的
      // 包含 input 的 type='none'
      console.log($("#box>*:hidden"))
      // 通配符 *  可以省略:
      console.log($("#box>:hidden"))
    </script>
  </body>
</html>

```

## 祖先选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        border: 2px solid gray;
        padding: 10px;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <!-- div#d1>div#d2>div#d3>div#d4>div#d5 -->
    <div id="d1">
      d1
      <div id="d2">
        d2
        <div id="d3">
          d3
          <div id="d4">
            d4
            <div id="d5">Hello World!</div>
          </div>
        </div>
      </div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // parent: 父母
      // 选择 id='d5' 的元素的 父元素
      // 由于css没有选择父元素的 选择器, 所有JQ提供了专门的方法来实现
      $("#d5").parent().css("border-color", "blue")

      // 所有的祖辈元素  parents
      $("#d5").parents().css("border-color", "orange")

      // 选择 在 当前元素 和 指定元素 之间的所有祖辈元素
      // Until: 直到...为止
      // 不含 #d2 元素
      $("#d5").parentsUntil("#d2").css("border-color", "green")
    </script>
  </body>
</html>

```

## 后代选择器

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      div {
        border: 2px solid gray;
        padding: 10px;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div id="d1">
      <div>11111</div>
      <div>
        <div>2222</div>
        <div>2222</div>
      </div>
      <div>11111</div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 后代选择器:
      // 选择d1 下方所有的子元素
      $("#d1>div").css("border-color", "blue")
      // 另一种写法: 适合动态获取子元素
      $("#d1").children().css("border-color", "red")

      // 需求: 点击div元素后, 把子元素添加阴影
      $("div").click(function () {
        //选择当前元素的 子元素
        $(this).children().css("box-shadow", "0 0 3px 3px black")
      })

      // 后代元素的获取
      $("#d1 div").css("border-color", "orange")
      // 另一种写法: 适合动态获取 find
      $("#d1").find("div").css("border-color", "purple")
    </script>
  </body>
</html>

```

## 大小图联动效果

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
    <div>
      <img src="./img/1.jpg" data-big="./img/1-l.jpg" width="100" alt="" />
      <img src="./img/2.jpg" data-big="./img/2-l.jpg" width="100" alt="" />
      <img src="./img/3.jpg" data-big="./img/3-l.jpg" width="100" alt="" />
      <img src="./img/4.jpg" data-big="./img/4-l.jpg" width="100" alt="" />
    </div>
    <hr />
    <div>
      <img src="./img/1-l.jpg" width="400" alt="" />
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      $("div:eq(0)>img").mouseover(function () {
        console.log("鼠标经过")
        // attr: 读取自定义属性
        // let big_img = $(this).attr("data-big")
        // 设置到 大图的 src - 系统属性
        // $("div:eq(1)>img").prop("src", big_img)
        //
        // 观察发现: 小图  xxx.jpg    大图 xxx-l.jpg
        // 利用正则替换: 把 .jgp 换成 -l.jpg
        let src = $(this).prop("src")
        // .是正则的 通配符, 需要 \. 转义成不同的.
        console.log("替换前:", src)
        src = src.replace(/\.jpg/, "-l.jpg")
        console.log("替换后:", src)
        $("div:eq(1)>img").prop("src", src)
      })
    </script>
  </body>
</html>

```





















