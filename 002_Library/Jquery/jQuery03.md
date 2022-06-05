# jQuery03

## 复习

**选择器**：

- 包含关系选择器
  - contains：双标签的内容中包含 指定的 文字
  - has：是否包含指定的标签
  - not：没有
  - empty：没有子元素的
- 可见性：  隐藏状态- display：none
  - `:hidden`: 选择被隐藏的元素,  `无法获取`因为全透明而不可见的元素
- 祖先选择器: 
  - parent: 父
  - parents: 所有的祖辈元素
  - parentsUntil: 直到...为止,  选择之间的
- 后代选择器:  适合动态获取的场景
  - children: 子元素
  - find: 后代元素
- 兄弟选择器:
  - next: 下一个
  - nextAll: 下方所有
  - nextUntil: 到xx为止
  - prev: 上一个
  - prevAll: 上方所有
  - prevUntil: 上方到xxx为止
  - siblings: 所有的兄弟
- 值的读取与设置
  - text
    - 读取: text(),  读取可见的文本, 本质 innerText
    - 设置: text(值).  原样显示
  - html
    - 读取:html(), 读取所有的html代码, 本质 innerHTML
    - 设置: html(值). 会被浏览器解析, 特别适合动态生成html代码 然后添加到页面
      - 覆盖原有的所有内容
  - val
    - 读取: val()    读取form表单元素的值, 比如 输入框, 单选框...
    - 设置: val(值) 
- 添加子元素
  - append: 向子元素的末尾添加
    - 参数:可以接受 多个参数 或 数组参数
  - prepend: 向子元素的开头添加
- 添加兄弟元素:
  - before: 在xxx之前 
  - after: 在xxx之后
- 删除元素:
  - 删除当前元素: remove
  - 删除所有子元素: empty
- 键盘的事件
  - keyup: 监听键盘按键 抬起的时候,  触发的事件的参数 e;  e.keyCode 代表按键的标识
- 实时监听输入框的值的变化
  - on(): 万能的事件绑定写法, 适用于所有的事件
    - on('input', function(){})
- on: 的冒泡用法
  - 选择器.on(事件名, '选择器', 回调函数)
    - 参数2: 事件是绑定在父元素上的, 利用参数2 代表指定的子元素才能触发本事件
      - 特点: 事件触发时的 this 指向子元素
- 克隆元素:  .clone()
- 替换: replaceWith

---

## 待办事项

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box > div:last-child {
        color: green;
        border: 1px solid green;
        padding: 5px;
        border-radius: 3px;
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <div>
        <input type="text" placeholder="请输入待办事项" />
        <button disabled>确定</button>
      </div>
      <div>
        <ul>
          <li>
            <span>吃饭</span>
            <button>删除</button>
          </li>
          <li>
            <span>睡觉</span>
            <button>删除</button>
          </li>
          <li>
            <span>打亮亮</span>
            <button>删除</button>
          </li>
        </ul>
      </div>
      <div>暂无待办事项</div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 监听输入框的值 的实时变化, 修改 确定 按钮的 不可用状态
      $("input").on("input", function () {
        // 获取输入框的值
        let val = $(this).val()
        console.log(val)
        // 空字符串的判断方式: 1.长度==0  2. == ''
        // if: 会把 '' [] {} 0 0.0 null undefined 判断为false
        if (val == "") {
          // 是空字符串, 则确定按钮不可用
          // prop: 设置系统属性
          $(this).next().prop("disabled", true)
        } else {
          // "false": 这叫 字符串
          // false: 这是 boolean
          $(this).next().prop("disabled", false)
        }
      })

      // 按钮中, 包含 确定 文字的
      $("button:contains(确定)").click(function () {
        // 添加新元素: 把 暂无 隐藏
        $("#box>div:last-child").css("display", "none")

        let $input = $(this).prev() //当前元素 上方的元素

        // 制造新的元素, 用模板字符串 ``
        let el = `<li>
            <span>${$input.val()}</span>
            <button>删除</button>
          </li>`
        // 添加到 ul 的子元素的最后
        $("ul").append(el)
        $input.val("") //清空: 把输入框的值改为 空字符串
        // 不可用
        $input.next().prop("disabled", true)
      })

      $("input").keyup(function (e) {
        // 按键编号: 13  代表回车
        if (e.keyCode == 13) {
          // 输入框的值 的 长度 不是 0, 代表有值
          if ($(this).val().length != 0) {
            // 添加新元素, 隐藏 暂无
            $("#box>div:last-child").css("display", "none")

            let el = `<li>
            <span>${$(this).val()}</span>
            <button>删除</button>
          </li>`

            $("ul").append(el) //添加到子元素
            $("input").val("") //清空输入框
            $(this).next().prop("disabled", true) //按钮不可用
          }
        }
      })

      // 关于删除: 因为删除按钮特别多, 如果为每一个按钮添加事件, 需要非常多的事件函数, 浪费内存!
      // 新增按钮添加事件, 也比较繁琐
      // 如果是新增按钮, 应该写成 <button onclick="del()">删除</button>
      // 需要额外搭配一个 del 函数, 实现绑定

      // 冒泡: 监听 ul 中, 所有button 触发的点击事件
      $("ul").on("click", "button", function () {
        // this: 代表按钮
        $(this).parent().remove() //移除按钮的父节点

        // 判断: 如果 ul 中没有子元素了, 则显示 暂无待办事项
        console.log("子元素:", $("ul").children())
        if ($("ul").children().length == 0) {
          // display:block;   显示出来
          $("#box>div:last-child").css("display", "block")
        }
      })
    </script>
  </body>
</html>

```

## 显示与隐藏

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box > div {
        background-color: cadetblue;
        border: 1px solid gray;
        padding: 5px;
        cursor: pointer;
        user-select: none;
      }

      #box > div:last-child {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="box">
      <div>点击查看今日菜单</div>
      <div>
        <li>KFC</li>
        <li>黄焖鸡</li>
        <li>红烧牛肉.....面</li>
        <li>清炒亮亮</li>
        <li>红烧FPX</li>
      </div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 点击后, 让下方的菜单显示
      $("#box>div:eq(0)").click(function () {
        // show: 显示,  本质是修改 display:block
        // $(this).next().show()
        // show带有参数: 代表动画时长, 默认是0
        // 可选值: fast-快 slow-慢 自定义的毫秒数
        // $(this).next().show('fast')
        // $(this).next().show("slow")
        // $(this).next().show(2000)
        // 本质是 通过动画方式, 把宽高 从0 变为实际大小
        // 带有参数2: 回调函数,  动画结束时触发
        $(this)
          .next()
          .show(1000, function () {
            alert("已完整显示!")
          })
      })

      // 点击菜单后, 隐藏菜单
      $("#box>div:last-child").click(function () {
        // hide: 隐藏,  所有参数 同 show
        $(this).hide(1000, function () {
          alert("隐藏完毕!")
        })
      })
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
    <button>切换显示状态</button>
    <p>这是一段文本...</p>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // toggle: 切换
      $("button").click(function () {
        // $("p").toggle()
        $("p").toggle(1000, function () {
          alert("动画结束")
        })
      })
    </script>
  </body>
</html>

```

## 淡入淡出

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #box > div {
        background-color: cadetblue;
        border: 1px solid gray;
        padding: 5px;
        cursor: pointer;
        user-select: none;
      }

      #box > div:last-child {
        display: none;
      }
    </style>
  </head>
  <body>
    <button>切换</button>
    <div id="box">
      <div>点击查看今日菜单</div>
      <div>
        <li>KFC</li>
        <li>黄焖鸡</li>
        <li>红烧牛肉.....面</li>
        <li>清炒亮亮</li>
        <li>红烧FPX</li>
      </div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 淡入: 显示, 利用透明度动画出现
      $("#box>div:eq(0)").click(function () {
        // fadeIn: 淡入
        // $(this).next().fadeIn()
        // 参数1: 动画时长 slow fast 毫秒
        // 参数2: 回调函数-完成时触发
        $(this)
          .next()
          .fadeIn(1000, function () {
            alert("淡入完毕!")
          })
      })

      // 淡出: fadeOut - 隐藏
      $("#box>div:last-child").click(function () {
        $(this).fadeOut(1000, function () {
          alert("淡出完毕")
        })
      })

      // 切换:
      $("button:eq(0)").click(function () {
        // 参数同之前的
        $("#box>div:eq(1)").fadeToggle()
      })

      // 指定透明度
      // hover(鼠标进入, 鼠标移出)
      $("#box>div:eq(0)").hover(
        function () {
          // 0.6: 透明度,  0 是透明  1是不透明
          // 参数1: 时长,  fast slow 或 毫秒数
          // 参数2: 透明度
          $(this).fadeTo("fast", 0.6)
        },
        function () {
          $(this).fadeTo("fast", 1)
        }
      )
    </script>
  </body>
</html>

```

## 实战练习

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #setting {
        border: 1px solid red;
        display: inline-block;
      }
      #setting > div:nth-child(2) {
        /* 修改为定位布局: 绝对定位.  这个元素就会脱离文档流布局, 不会影响到默认的页面元素布局 */
        position: absolute;

        display: inline-block;
        padding: 4px;
        border-radius: 4px;
        background-color: lightyellow;
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="setting">
      <div>
        <a href="">设置</a>
      </div>
      <div>
        <div>搜索设置</div>
        <div>高级搜索</div>
        <div>关闭预测</div>
        <div>隐私设置</div>
      </div>
    </div>
    <div id="box">
      <h1>页面内容...</h1>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 1. 鼠标悬浮在 设置上时, 显示下方的内容
      $("#setting>div:eq(0)>a").mouseover(function () {
        $("#setting>div:eq(1)").show(100)
      })
      // 2. 鼠标离开  整个设置所在的空间时, 才会隐藏内容
      $("#setting").mouseleave(function () {
        $("#setting>div:eq(1)").hide(100)
      })
      // 3. 以上操作会导致 页面内容 的位置发生变化. 这是bug
      //    需要利用css的 定位方式position 让 设置所在区域脱离 普通的文档流布局, 他的显示才不会影响到  页面内容的位置
    </script>
  </body>
</html>

```

## 侧边栏

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #menu > div > span:first-child {
        display: inline-block;
        padding: 4px;
        border-radius: 3px;
        background-color: aquamarine;
      }

      #menu {
        /* border: 2px solid red; */
        display: inline-block;
      }

      #menu > div {
        /* 定位模式: 相对定位;  是为了子元素的 绝对定位服务的 */
        position: relative;
      }

      #menu > div > div:last-child {
        /* 行元素 强制 不折行 */
        /* wrap: 换行 */
        white-space: nowrap;

        /* 绝对定位: 相当于 祖先元素中, 最近的 同样是定位方式的元素 */
        /* 如果祖先不存在定位方式元素, 则相对于浏览器的内容区域 */
        position: absolute;
        top: 0;
        left: 100%;
        display: none;

        background-color: aqua;
        padding: 3px;
        border-radius: 3px;
      }
    </style>
  </head>
  <body>
    <div id="menu">
      <!-- (div>span+div>div*3)*5 -->
      <div>
        <span>阶段1</span>
        <div>
          <div>数据库MySQL</div>
          <div>服务器express</div>
          <div>Node.js</div>
        </div>
      </div>
      <div>
        <span>阶段2</span>
        <div>
          <div>HTML</div>
          <div>CSS</div>
          <div>AJAX</div>
        </div>
      </div>
      <div>
        <span>阶段3</span>
        <div>
          <div>JS高级</div>
          <div>BOM&DOM</div>
          <div>jQuery</div>
          <div>Vue</div>
        </div>
      </div>
      <div>
        <span>阶段4</span>
        <div>
          <div>Vue扩展</div>
          <div>HTML高级</div>
          <div>大数据展示</div>
          <div>微信小程序</div>
        </div>
      </div>
      <div>
        <span>阶段5</span>
        <div>
          <div>UniApp</div>
          <div>React</div>
          <div>Angular</div>
          <div>Vue</div>
        </div>
      </div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      $("#menu>div>span:first-child").hover(
        function () {
          // fadeTo: 用参数1的时间, 透明度变为参数2
          $(this).fadeTo(100, 0.6)
          $(this).next().show()
        },
        function () {
          $(this).fadeTo(100, 1)
        }
      )

      // 隐藏
      $("#menu>div").mouseleave(function () {
        $(this).children().last().hide()
      })
    </script>
  </body>
</html>

```

## 滑动动画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      #box > div {
        background-color: cadetblue;
        border: 1px solid gray;
        padding: 5px;
        cursor: pointer;
        user-select: none;
      }

      #box > div:last-child {
        display: none;
      }
    </style>
  </head>
  <body>
    <button>切换效果</button>

    <div id="box">
      <div>点击查看今日菜单</div>
      <div>
        <li>KFC</li>
        <li>黄焖鸡</li>
        <li>红烧牛肉.....面</li>
        <li>清炒亮亮</li>
        <li>红烧FPX</li>
      </div>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      $("#box>div:first-child").click(function () {
        // slideDown: 滑动 向下展开
        // $(this).next().slideDown()
        // 参数1: 时长 fast slow 毫秒
        // 参数2: 回调函数
        $(this)
          .next()
          .slideDown("slow", function () {
            alert("动画结束")
          })
      })

      $("#box>div:last-child").click(function () {
        // up: 向上滑动
        $(this).slideUp()
      })

      $("button").click(function () {
        // slideToggle: 切换展开状态
        $("#box>div:last-child").slideToggle()
      })
    </script>
  </body>
</html>

```

## 自定义动画

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
        padding: 10px;
        background-color: beige;
        display: inline-block;
        /* 重要: 页面上的普通元素 理论上不能随便移动位置, 会导致周边元素受到影响, 要想动画移动位置之类的, 应该把元素改成定位方式, 就不会影响到周边元素 */
        position: relative;
        /* relative: 相对定位, 相对于当前位置 进行调整 */
      }
    </style>
  </head>
  <body>
    <button>开始动画1</button>
    <button>开始动画2</button>

    <div id="box">
      <h1>Hello Animation</h1>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      //
      $("button:eq(0)").click(function () {
        // animate(动画修改的样式, 动画时长, 回调函数)
        $("#box").animate(
          {
            top: "100px",
            "border-radius": "50%",
          },
          2000
        )
      })

      // 动画队列:
      $("button:eq(1)").click(function () {
        // 添加多个动画, 会依次执行
        $("#box").animate({ top: "20px" }, "fast")
        $("#box").animate({ top: "0" }, "fast")
        $("#box").animate({ top: "20px" }, "fast")
        $("#box").animate({ top: "0" }, "fast")
        $("#box").animate({ top: "20px" }, "fast")
        $("#box").animate({ top: "0" }, "fast")
      })

      // 练习: 当鼠标悬浮在 id='box' 的元素上,  元素左右快速晃动几次
      // 晃动的同时, 透明度也发生变化:  opacity 属性
      $("#box").mouseenter(function () {
        $(this).animate({ left: "10px", opacity: "0.7" }, 100)
        $(this).animate({ left: "0", opacity: "1" }, 100)
        $(this).animate({ left: "10px", opacity: "0.7" }, 100)
        $(this).animate({ left: "0", opacity: "1" }, 100)
        $(this).animate({ left: "10px", opacity: "0.7" }, 100)
        $(this).animate({ left: "0", opacity: "1" }, 100)
        $(this).animate({ left: "10px", opacity: "0.7" }, 100)
        $(this).animate({ left: "0", opacity: "1" }, 100)
      })

      // 停止动画
      $("#box").mouseleave(function () {
        // stop: 停止动画
        $(this).stop(true) //true: 停止所有动画
      })
    </script>
  </body>
</html>

```

## 动画插件 snabbt

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
    <!-- JS动画插件: JS能够实现 比 CSS 更加强大的自定义动画 -->
    <!-- JS具有很多的动画库, 都是可以直接使用的! -->
    <!-- http://daniel-lundin.github.io/snabbt.js/ -->
    <!-- (div>button{$$$$$})*5 -->
    <div><button>00001</button></div>
    <div><button>00002</button></div>
    <div><button>00003</button></div>
    <div><button>00004</button></div>
    <div><button>00005</button></div>
    <!-- 必须先写 jq 的引入 -->
    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script src="./vendor/snabbt.min.js"></script>

    <script>
      $("div:eq(0)>button").click(function () {
        // 动画: 从官方复制代码, 然后 修改element参数为 $(this)
        // snabbt(首个动画).snabbt(接下里的动画)
        $(this)
          .snabbt({
            position: [50, 50, 0], //[x,y,z]
            easing: "ease", //动画方式: 先快 再慢 再快
          })
          .snabbt({
            fromRotation: [0, 0, -2 * Math.PI],
            position: [0, 0, 0],
            easing: "spring",
            springConstant: 0.2,
            springDeceleration: 0.9,
            springMass: 10,
          })
      })

      // 向右移动, 放大自身, 再返回+缩小
      $("div:eq(1)>button").click(function () {
        $(this)
          .snabbt({
            position: [50, 0, 0], //[x,y,z]
            // 旋转
            rotation: [0, Math.PI * 2, 0], //[x,y,z]
            //放大
            scale: [1.5, 1.5], //[x,y]
            // 动画时长
            duration: 2000,
            //透明度变化, 必须添加 fromOpacity: 代表初始值
            fromOpacity: 1, //1 不透明
            opacity: 0.5, // 0.5 半透明
          })
          .snabbt({
            opacity: 1,
            position: [0, 0, 0],
            scale: [1, 1],
            rotation: [0, 0, 0],
          })
      })

      // $("div>button").mouseenter(function () {
      //   // 参数1: 可以直接写 this  代替 $(this) 的写法
      //   snabbt(this, "attention", {
      //     rotation: [0, 0, Math.PI / 2],
      //     springConstant: 1.9,
      //     springDeceleration: 0.9,
      //   })
      // })
    </script>
  </body>
</html>

```



## 评分动画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #score > span {
        display: inline-block;
        background-color: lightgray;
        margin: 3px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }

      #score .checked {
        background-color: orange;
      }
    </style>
  </head>
  <body>
    <div>
      <span>亮亮本周的评分:</span>
      <b>1</b>
    </div>
    <div id="score">
      <!-- 5个span标签 -->
      <span class="checked"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 鼠标进入时, 添加 checked 样式类
      $("#score").on("mouseenter", "span", function () {
        // 冒泡写法: 鼠标进入时, span标签触发
        // $(this).prevAll().next().addClass("checked")
        $(this).addClass("checked")
        $(this).prevAll().addClass("checked")
        // 后面部分应该删除checked样式
        $(this).nextAll().removeClass("checked")
        // 获取当前触发事件的 元素, 是父元素中的 哪一个
        // 所有标签.index(某标签):  得到此标签的 序号
        let i = $("#score>span").index($(this))
        console.log(i)
        // 设置到分数中
        $("b").html(i + 1)
      })
    </script>
  </body>
</html>

```

## 遍历元素

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
      <li>60</li>
      <li>80</li>
      <li>77</li>
      <li>22</li>
      <li>55</li>
    </ul>

    <script src="./vendor/jquery-3.6.0.min.js"></script>
    <script>
      // 回顾forEach
      let names = ["mary", "lily", "john"]
      // 参数1: 元素自身   参数2: 元素序号
      names.forEach((item, index) => {
        console.log("index:", index)
        console.log("item:", item)
      })

      // jq提供了遍历选择器 得到的元素方法 : each((序号,元素)=>{})
      $("li").each((index, item) => {
        // item: 是原生的DOM对象, 不是JQ对象
        console.log(index, item)
        // 转化成JQ对象
        let $item = $(item)
        // 要求: 内容>=60 绿色, 否则红色
        if ($item.html() >= 60) {
          $item.css("color", "green")
        } else {
          $item.css("color", "red")
        }
      })
    </script>
  </body>
</html>

```



## 下周安排

周1: 讲解网络操作 ajax,  需要开通网络!

讲解 CORS 跨域, 需要安装 node: http://nodejs.cn/download/



















