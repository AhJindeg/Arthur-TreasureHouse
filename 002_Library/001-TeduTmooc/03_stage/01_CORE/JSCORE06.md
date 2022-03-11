## JSCORE06

## 复习

### 数组方法

高级的数组方法, 他们的参数都是 `回调函数`

> 回调函数: 一个函数 如果是作为另一个函数的 参数使用, 称为回调函数!

- every: 每一个

  数组中的每一个元素 都经过 参数回调函数的验证之后, 返回true; 则最终结果是true, 否则false

- some: 一些, 至少有一个

  数组中的元素, 至少有一个满足 回调函数的验证, 则返回true, 否则false

- forEach

  遍历数组的简化写法

- map

  创建一个新的数组, 数组中的值 是回调函数的返回值组成

- filter: 过滤

  创建一个新的数组, 数组的值 是经过 回调函数 验证通过的 元素

- reduce: 合并, 归纳

  把数组中的所有元素, 通过回调函数 归纳总结为 一个值.

---

### 模板字符串

```js
`模板字符串...${JS代码...}`
```

- 拼接字符串 可以更加简洁
- 支持回车换行, 多行字符串
- `${}`中可以书写JS代码
- 转义符: **\\`** 来输出 \`

### 变量声明

> 声明提升的本质: 是JS引擎的预编译机制 

- var

  变量提升, 默认值是undefined

  全局污染: 声明的变量存储在 window 对象中, 重名的变量会覆盖!

- let

  变量提升, 默认值 `暂存死区`, 赋值之前直接使用会报错!

  块级作用域

  - 直接在全局区声明变量, 开辟一个 与 window 同级别的 Script 区域存储变量

  - 搭配 `{}` 使用, 可以声明独立的空间, 与window 同级别

    可以快速形成 类似 闭包的效果

    ```js
    {
        let name = 'xxxx'
        
        window.ashow = function(){
            name...
        }
    }
    ```

  - 不能重复声明 重名变量

- const

  常量: 一切都跟let一样,  但是 声明时必须赋值, 后续不能修改. -- 安全高效!

---

for..of

- 适合遍历数组: `for(let value of 数组)`

for..in

- 适合遍历对象:`for(let key in 对象)`
- 会遍历 原型链

---

### 箭头函数

简化普通匿名函数的写法

```
function (){}

() => {}

语法糖: 只有一个参数, () 省略
(name) => {}
name => {}

语法糖2:  函数体只有一行代码, 可以省略 return + {}
() => { return xxx; }

() => xxx

注意事项: 如果值是对象类型, 必须带()包围, 防止{}的歧义
()=> ({name:11})
```

## const

常量: 声明时必须赋值, 后期不可更改

- 不可更改 指的是 不可重新赋值, 但是 如果值是对象类型, 可以修改对象类型中的值

  ```js
  const a = {name:'ddd'}
  
  a = {age:222} //不可以
  
  a.age = 444 //可以
  ```

## 箭头函数的this

- 普通函数: this指向运行时所在的对象
- 箭头函数: 自身没有this, 使用声明时 所在的上级作用域的this

区别:

- 普通函数的this会在使用时变化
- 箭头函数的this在声明时固定,  使用时不会变化

## 函数的默认参数

```js
function xxx(a=5){}
```

函数的参数可以带有默认值, 调用函数时 不传递参数 则使用默认值

## 剩余参数

比 arguments 更好用的新写法, 用来接受函数的参数

```js
function xxx(...args){
    //args 是数组类型
    // args = [12,12,323,23]
}

xxx(12,12,323,23)
```

```js
// 可以指定接收剩余参数
function xxx(a, b, ...args){
    //args 是数组类型
    // args = [323,23]
    // a = 12
    // b = 11
}

xxx(12,11,323,23)
```

## 数组的展开写法

```js
var nums = [12,323,43,54]

...nums  相当于把 [] 溶解抵消

适合快速 浅克隆

var nums1 = [...nums]

适合快速合并数组
var nums2 = [...nums, ...nums1]
```

## 参数的展开语法

```js
var nums = [12,323,43,54]

// 溶解抵消了 []
Math.max(...nums)
//相当于
Math.max(12,323,43,54)
```

## 对象的展开

```js
var obj = {name:'xx', age: 33}

// ... 相当于溶解了 {}
// 适合快速 浅克隆对象
var obj1 = {...obj}

// 同名变量,  后面写的 覆盖之前的
var obj2 = {...obj, name:'333'}
```

## 数组解构

```js
// 解构: 数组
var nums = [11, 22, 33, 44]

var [a, b, , c] = nums

console.log(a, b, c)

// 灵活的使用场景: 变量互换值
let x = 99
let y = 11
// 注意写分号, 否则会跟上一行 代码 合并在一起, 有歧义!
;[x, y] = [y, x]
console.log(x, y)

// 旧写法:
// var a = nums[0]
// var b = nums[1]
// var c = nums[3]
```

## 对象解构

```js
// 对象的解构
var obj = { name: "亚楠", age: 22, phone: "18748787877" }

let { name, age, phone } = obj
console.log(name, age, phone)

// 起别名  {属性名: 别名}
let { name: name1 } = obj
console.log(name1)

// 灵活的使用场景: 参数直接解构
var data = { name: "亮亮", age: 22 }

// 参数直接解构
function show({ name, age }) {
// var { name, age } = data
// var name = data.name
// var age = data.age
console.log(name, age)
}

show(data)

// var name = obj.name
// var age = obj.age
// var phone = obj.phone
```

## 复杂解构

```js
// 复杂解构
    var obj = {
    skills: ["html", "css", "js"],
    game: {
      name: "LOL",
      price: 9000,
    },
    }

    let {
    skills: [a, b, c],
    // : 是别名
    game: { name: gname, price },
    } = obj

    console.log(a, b, c, gname, price)
```

## 面向对象的class写法

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
    <!-- class 面向对象 -->
    <!-- JS早期使用 构造函数方式创建对象, 利用 原型链 实现继承效果 -->
    <!-- JS在后来版本中, 提供了 仿 JAVA 的 面向对象写法 -->
    <!-- 此写法并非一套新的机制, 只是一套语法糖写法而已, 本质还是 构造函数 和 原型操作 -->

    <!-- 面向对象有三大特征: 封装 继承 多态 -->
    <!-- 封装: 利用{} 把代码封装到一起, 可以复用. 函数就是具体表现 -->
    <!-- 继承: 原型链. 调用对象的属性, 对象本身没有就会到原型中查找, 原型会到原型的原型中查找... 直到没有原型为止 -->
    <!-- 多态:  重写, 原型中存在某个方法, 自身也可以属性同名的方法,  使用时遵循就近原则. -->

    <!-- 
      称呼上的变化: 
      1. 早期叫 构造函数
      2. 现在称为 类  class
     -->
    <script>
      // 下方写法等价:
      // function Student(name,age){ this.name=name; this.age=age;}

      // Student.prototype.desc = function(){}

      // let s1 = new Student("亮亮", 18)

      class Student {
        // constructor: 固定名称的方法, 称为构造函数
        constructor(name, age) {
          this.name = name
          this.age = age
        }
        // 省略关键词 : function
        desc() {
          console.log(this.name, this.age)
        }
      }
      // new运算符, 实际触发的是 类的 构造方法 constructor
      let s1 = new Student("亮亮", 18)
      console.log(s1)
      s1.desc()
    </script>
  </body>
</html>

```

### 静态属性

```js
// 静态属性:
    // function Student(name,age){this.name=name;this.age=age;}
    // Student.prototype.category = '体育生'
    // new操作, 只会更新普通属性的值, 不会影响到 原型中的属性
    class Student {
    // static: 静态
    // 此属性属于 类 的
    static category = "体育生"

    constructor(name, age) {
      this.name = name
      this.age = age
    }
    }

    // 使用时: 静态属性属于类
    console.log(Student.category)
```

### 继承

```js
 // 继承: JS通过原型链实现继承效果
  class Father {
    // 此写法相当于在 构造方法中写 this.firstName= '王'
    firstName = "王"

    constructor(name, age) {
      this.name = name
      this.age = age
    }

    desc() {
      const { name, age, firstName } = this
      console.log(name, age, firstName)
    }
  }

  // 子类,  继承父类
  // extends: 继承的意思
  class Son extends Father {}

  let s = new Son("小亮", 33)
  s.desc()
```

### 重写

```js
// 重写: 子类 会继承父类的所有方法和属性,  但是子类可以书写相同的方法和属性.
    // 重写会受到 就近原则影响
    class Father {
    // 此写法相当于在 构造方法中写 this.firstName= '王'
    firstName = "王"

    constructor(name, age) {
      this.name = name
      this.age = age
    }

    desc() {
      const { name, age, firstName } = this
      console.log(name, age, firstName)
    }
    }

    // 子类,  继承父类
    // extends: 继承的意思
    class Son extends Father {
    // 重写构造方法, 初始化时 除了 姓名和 年龄以外 , 添加一个phone
    constructor(name, age, phone) {
      // 构造函数重写, 必须调用父类的 构造函数 super
      // 特殊设计: super() 就代表父类的构造方法
      super(name, age)
      // this.name = name
      // this.age = age
      this.phone = phone
    }

    // 多态: 一个父类 可以拥有很多子类
    // 每个子类 都可以重写一个方法
    // 此时父类的同一个方法 在不同的子类中 呈现不同的效果
    // 称为多态

    // 重写 desc
    desc() {
      // 关键词 super 代表父类
      super.desc()

      console.log("我是子类的 desc 方法")
    }
    }

    let s = new Son("小亮", 33, "1978988988")
    s.desc()
    console.log(s)
```

## promise

解决`回调地狱`

回调地狱: 传统写法中, 在一个异步方法成功后 调用下一个异步方法, 如此多层嵌套, 实现异步方法的 同步调用效果.  此写法会导致代码过于复杂, 嵌套难以理解

Promise是 官方提供的一个构造函数, 它生成的对象带有链式写法, 可以简化多层嵌套

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <table>
      <tbody id="box"></tbody>
    </table>

    <script>
      // Promise: 是官方提供的一个构造函数, 此构造函数生成的对象采用了 链式写法
      // 链式写法: 用.关联调用 obj.skill.name.xxx.xxxx

      // 熟练基本格式的书写:
      new Promise((resolve, reject) => {})
        .then((result) => {})
        .catch((err) => {});

      // 以上写法 就是固定语法:  先抄10遍 熟练下
      // 两个快捷代码块: prom  thenc

      // Promise 有3种状态:
      // 1. pending: 初始状态, 刚new出来
      // 2. fulfilled: 调用 resolve 之后
      // 3. rejected: 调用 reject 之后
      new Promise((resolve, reject) => {
        // 只能触发一种函数 resolve 或 reject 不可以同时调用

        // resolve: 调用之后, 触发then中的函数, 参数就是result的值
        resolve({ msg: "resolve" });

        // reject: 调用之后, 触发 catch 中的函数, 参数就是err
        reject({ msg: "reject" });
      })
        .then((result) => {
          console.log("result:", result);
        })
        .catch((err) => {
          console.log("err:", err);
        });

      new Promise((resolve, reject) => {
        resolve("我是resolve");
        // reject("我是reject")
      })
        .then((result) => {
          console.log("resolve触发:", result);
        })
        .catch((err) => {
          console.log("reject触发:", err);
        });

      let box = document.getElementById("box");
      console.log(box);
    </script>
  </body>
</html>

```

#### 用函数封装

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // promise
      function checkPhone() {
        //prom
        return new Promise((resolve, reject) => {
          // 获取随机数字, 假设 >0.5 算成功
          let code = Math.random()
          console.log("随机数字:", code)
          // 三目运算符  条件? 真执行这里 : 假执行这里
          code > 0.5 ? resolve("成功") : reject("失败")
        })
      }
      // 此函数调用后的结果 是 new Promise() 对象
      checkPhone()
        .then(result => console.log(result))
        .catch(err => console.log(err))
    </script>
  </body>
</html>

```

### promise简化多层嵌套

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // Promise 解决 回调地狱 问题
      // 验证手机号, 邮箱, 用户名
      // 之前写法中, 需要挨个验证, 成功后在内部 验证下一项..
      // Promise 把异步操作, 独立进行封装
      function checkUname() {
        // prom:  插件 - JavaScript (ES6) code snippets
        return new Promise((resolve, reject) => {
          Math.random() > 0.3 ? resolve("用户名可用") : reject("用户名不可用!")
        })
      }

      function checkPhone() {
        return new Promise((resolve, reject) => {
          Math.random() > 0.3 ? resolve("手机号可用") : reject("手机号不可用!")
        })
      }

      function checkEmail() {
        return new Promise((resolve, reject) => {
          Math.random() > 0.3 ? resolve("邮箱可用") : reject("邮箱不可用!")
        })
      }

      function doRegister() {
        return new Promise((resolve, reject) => {
          Math.random() > 0.3 ? resolve("注册成功") : reject("注册失败!")
        })
      }

      // 检测用户名 -> 检测手机号 -> 检测邮箱 -> 注册
      checkUname()
        .then(result => {
          console.log(result)
          // then中如果返回 一个promise 对象, 则 可以触发下一个then
          return checkPhone()
          // 此处的return 就是 checkUname()的返回值
          // 类似于 checkPhone().then().catch()
        })
        .then(result => {
          // 这个then 是 checkPhone() 的
          console.log(result)
          return checkEmail()
        })
        .then(result => {
          //这个then 是 checkEmail() 的
          console.log(result)
          return doRegister()
        })
        .then(result => {
          // 这个then 是 doRegister() 调用的
          console.log(result)
        })
        .catch(err => console.log("err:", err))

      // 箭头函数的简化 ()=>{return xxx()}  简化为 ()=> xxx()
      // 每个then() 的返回值, 触发下一个then()
      checkUname()
        .then(result => checkPhone())
        .then(result => checkEmail())
        .then(result => doRegister())
        .catch(err => console.log("err:", err))
    </script>
  </body>
</html>

```

### async 和 await

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // async 和 await:
      // 是一个新的语法糖写法, 用来替代 then...catch...的写法
      function checkUname() {
        return new Promise((resolve, reject) => {
          Math.random() > 0.3 ? resolve("用户名可用") : reject("用户名不可用!")
        })
      }

      function checkEmail() {
        return new Promise((resolve, reject) => {
          Math.random() > 0.3 ? resolve("邮箱可用") : reject("邮箱不可用!")
        })
      }

      // promise 必须在一个函数中使用, 函数必须带 async 前缀
      // async: 代表异步,  代表 show 函数将会异步执行
      async function show() {
        // wait: 等待
        // 不用写 .then 来接受 result, 改成返回值了
        // 优点: 不用写一长串 .then了.

        // 失败需要用 try...catch... 来抓取
        // try {
        //   let result = await checkUname()
        //   console.log("result:", result)
        // } catch (error) {
        //   console.log("error:", error)
        // }

        try {
          let result = await checkEmail()

          result = await checkUname()

          console.log("result:", result)
        } catch (error) {
          console.log("error:", error)
        }

        // 如果不管报错, 则可以比较简化
        let result = await checkUname()
        result = await checkEmail()
      }

      show()
    </script>
  </body>
</html>
```



































