# DOM02

> DOM: 文档 对象 模型  
>
> Document Object Model
>
> > html代码 会先转为 document对象, 然后document 对象再展示在 浏览器中
> > 所以 可以直接操作 document 对象, 来动态修改浏览器内容

DOM能够实现: JS代码 灵活操作 浏览器内容

- 查找元素的方式

  - 一些html中固定具有的元素, 可以直接读取

    - head: `document.head`
    - body: `document.body`
    - documentElement: 代表整个页面 html

  - 自定义元素的查找方式

    查找元素时, 几乎都有两种不同写法, 例如 `nextElementSibling`, `nextSibling`

    写法差一个 `Element`,  `Element`代表必须是个标签

    - 按照跟已知元素的关系查找

      - 兄弟关系

        - `nextElementSibling`: 下一个

        - `previousElementSibling`: 上一个

      - 父子关系

        - `children`: 所有子标签
        - `parentElement`: 父元素标签

      - 指定第几个子元素

        - `firstElementChild`: 第一个
        - `lastElementChild`: 最后一个

    - 查找
      - 根据id查找:`document.getElementById()`
        - 系统会把 带有id的元素, 直接按照id名称 生成一个变量, 直接可以使用!
      - 根据 name 查找:  name可以重复,所以结果是 类数组 类型
        - `document.getElementsByName()`
        - 使用时, 要么`遍历` 要么 通过`序号` 获取指定元素, 需要使用 `for..of..`
      - 根据 className 查找
        - `document.getElementsByClassName()`
      - 根据 标签名 查找
        - `document.getElementsByTagName()`
    - 通过 css 选择器查找: 使用较多!
      - `querySelector`: 获取的结果是 单个元素
      - `querySelectorAll`: 获取元素 是多个
        - 结果 带有 forEach 方法, 可以直接遍历

- 事件绑定:

  ```js
  元素.on事件名 = function (){
      this...
      this代表当前对象
  }
  
  此处的函数不能写 箭头函数, 因为 需要 this 指向当前对象, 就必须是普通函数
  
  箭头函数: this将会指向作用域中的this
  ```

- 元素的一些属性

  - innerHTML: 双标签的内容
  - style: 风格样式
  - innerText: 双标签内容!

> DOM的工作思路: 1.找到他 2.对他做操作!

## 总结

- 标签内容的读取
  - innerText: 读取网页上可见的内容
  - innerHTML: 读取所有HTML内容
  - textContent: 读取 所有HTML中的 文本内容, 不含标签
- 设置内容时
  - innerText: 原模原样进行显示
  - innerHTML: 内容会作为 HTML 被浏览器解析
- 属性的读取:
  - 通用方式: `元素.getAttribute('属性名')`
  - 直接读取: `元素.属性名`
- 属性的设置:
  - 通用方式: `元素.setAttribute(属性名, 值)`
  - 直接设置: `元素.属性名 = 值`
- 判断属性是否存在:
  - 通用写法: `元素.hasAttribute(属性名)`
  - 判断空字符串: `元素.属性名=''`

- 自定义属性: `data-xxx`
  - 读取时: `元素.dataset.xxx`
- 事件:
  - onblur: 输入框失去焦点
  - onclick: 点击
  - onchange: 勾选按钮 发生变化















