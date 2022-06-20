## 一、变量作用域

### **1.全局变量和局部变量：**

### 1.1 全局变量：

在全局作用域下声明的变量就是全局变量，可以在任意的作用域访问到

```javascript
/*
        全局变量：
        如果一个变量，没有定义在任何的function中，那么它将在全部范围内都可以使用，这个变量就成为全局变量
        */
var a = 1
function fn() {
  console.log(a) //1
}
fn()
console.log(a) //1
```

### 1.2 局部变量：

在函数作用域下声明的变量就是局部变量，只能在当前的函数作用域下访问到

```javascript
/*
        局部变量:
        一个变量如果定义在了一个function里面，那么这个变量就是一个局部变量，只在这个function里面有定义，出了这个function，就如同没有定义一样。
        */
function fn() {
  var a = 1
  console.log(a) //1
}
fn()
console.log(a) //报错：a is not defined ，a被var在了function里面，所以现在这个a变量只在函数内定义
```

### 1.3.全局作用域：

函数以外的作用域：所有在 script 标签里面的代码，都处在全局作用域中，**全局作用域在页面打开时会创建全局对象 GO 对象，页面关闭时会销毁 GO 对象**，找变量与函数

### 1.4.函数作用域：

函数以内的作用域：所有在函数里面的代码，都处在函数作用域中，**函数作用域在函数执行时会创建 AO 对象，在函数结束时会销毁 AO 对象，当下一次执行函数时，会创建全新的 AO 对象**

### 1.5.！注意：函数内不加 var 声明的变量就是全局变量、函数的参数：

也就是说未经声明的变量被赋值了，就归全局所有：

函数的参数，会默认定义为这个函数的局部变量：

```javascript
function fn() {
  a = 1
}
fn()
console.log(a) //1  这个a第一次赋值的时候，没有被var过，所以就自动的在全局的范围帮你var了一次
```

### 1.6.变量的提升：

在程序执行前，会将 var 声明的变量提升到所在作用域的最前边，但是只提升声明，赋值不提升。

```js
/*
    全局GO{
        fn:f(){}
    }
    */
function fn() {
  /*
        局部：AO{
            执行过程：
            n3=123;
            n2=n3;
            var n1=n2;
        }
        */
  var a = (b = c = 123)
}
fn()
console.log(c) // 123
console.log(b) //123
console.log(a) //报错：a is not defined
```

## 二、函数作用域

### 2.1、全局函数：

在全局作用域下创建的函数，可以在任意的作用域下访问到

### 2.2、局部函数：

在函数作用域下创建的函数，只能在当前函数作用域下访问到

### 2.3 作用域链：

多个作用域嵌套构成的作用域结构，在寻找变量的时候，先到当前的作用域下寻找，如果当前的作用域没有就会不断往上一级作用域寻找

### 2.4、函数声明的提升：

程序执行前，会将函数提升到所在作用域的最前边，是整体提升：JS 在执行前，会有一个预解析的过程，**把所有的函数声明提升到了最前面**，然后在执行第一行语句。

```js
//先调用
fun() //函数，因为函数有函数声明头提升的特性
//然后定义
function fun() {
  console.log('函数')
}
```

**函数声明会被提升，但是函数表达式不会被提升**：函数表达式提升的是变量，变量提升后面并不是一个函数，所以在表达式之前执行，会报错，为类型错误，因为不是函数

```js
fn()
var fn = function fn() {
  console.log('函数') //报错，函数表达式不会有提升
}
```

函数最先提升，然后变量提升，如果函数名称和变量名称相同，函数最先提升

```js
/*
    GO{
        c:undefind,函数声明提升赋值f c(){},2再赋值给c
    }
    */
var c = 2
function c() {
  console.log(c)
}
c() //报错 c is not a function,c是2
```

## 三、函数作用域分析

### 3.1、四部曲

1. 创建 AO 对象
2. 找到形参与变量，把形参和变量作为 AO 对象的属性名，初始值值是 undefind
3. 实参把值赋给形参
4. 在函数中找到函数声明，把函数名作为 AO 对象的属性名，值是函数体

### 3.2、案例分析

#### (1):

```js
/*
    GO{
        fn:(){}  调用fn，进入fn函数
    }
    */
function fn(a) {
  /*
        四部曲：1.创建AO对象，2.找形参和变量，初始值为undefind，3.把实参赋值给形参4.找函数声明，值是函数体
        AO{
            a:初始值为undefind，实参赋值给形参1，函数声明提前为f a(){}覆盖1，a赋值为123
            b:初始值为undefind，函数声明提前为f b(){}覆盖undefind，b赋值为f (){}
        }
        */
  console.log(a) //f a()第{} 一次执行，变量和函数提升，赋值不提升，初始值为undefind，实参赋值给形参1，函数声明提前为f a(){}覆盖1
  var a = 123
  console.log(a) //123  第二次执行，a赋值为123
  function a() {} //函数声明已经提升，所以不再执行
  console.log(a) //123  第三次执行，a还是123

  console.log(b) //f b(){} 第一次执行，初始值为undefind，函数声明提前为f b(){}覆盖undefind
  var b = function () {}
  console.log(b) //f (){}  第二次执行，b赋值为f (){}
  function b() {}
}
fn(1)
```

#### (2):

```js
/*
    GO{
        test:f(){}
    }
    */
function test(a, b) {
  /*
        AO{
            a:初始值undefind，实参赋值给形参为1，
            b:初始值undefind，函数声明提前function b(){}覆盖undefined，b赋值2覆盖undefined
            c:初始值undefind，c没var，为全局变量，赋值为0
            d:初始值undefind，函数声明提前function d(){}覆盖undefined
        }
        */
  console.log(a) //1 第一次执行，初始值为undefined，实参赋值给形参为1
  c = 0
  var c
  a = 3
  b = 2
  console.log(b) //2 第二次执行，初始值undefind，函数声明提前function b(){}覆盖undefined，b赋值2覆盖undefined
  function b() {}
  function d() {}
  console.log(b) //2  第三次执行，初始值undefind，函数声明提前function b(){}覆盖undefined，b赋值2覆盖undefined
}
test(1)
```

#### (3):

```js
/*
        GO{
            global:初始化undefined，global赋值为100
            fun:f(){}
        }
        */
global = 100
function fun() {
  /*
            AO{
                global:初始化为undefined，
            }
            */
  console.log(global) //undefind  第一次执行：初始化undefined
  global = 200
  console.log(global) //200  第二次执行，200赋值给global覆盖了undefined
  var global = 300
  console.log(global) //300  第三次执行，300赋值给global覆盖了200
}
fun()
var global
```

#### (3):

```js
/*
    a:undefind,10赋值a
    haha:f(){}
    */
function haha() {
  /*
        第一次haha()执行:AO{
            b:undefind
            c:undefind
        }
        第二次haha()执行:AO{
            b:undefind,if语句里面的a执行100赋值给了b覆盖了undefined
            c:undefind
        }
        */
  console.log(b) //第一次执行:undefind  第二次执行:undefind
  if (a) {
    var b = 100
  }
  console.log(b) //第一次执行:undefind  第二次执行:100  第二次执行的时候，因为a=10，所以if语句执行，b为100覆盖了undefined
  c = 234
  console.log(c) //第一次执行:234  第二次执行:234
}
var a
haha() //第一次执行只声明了变量，没赋值，function的if语句没执行
a = 10
console.log(c) //234
haha() //第二次执行，声明了a，同时也赋值了10，function的if语句执行，把100赋值给了b
```

#### (3):

```js
/*
    GO{
        a:undefind,10赋值给a覆盖了undefined
        aaa:f(){}
        bbb:f(){},bbb调用，进入bbb函数
    }
    */
var a = 10
function aaa() {
  /*
        AO{

        }
        */
  console.log(a) //10 内部没有a,找全局变量a，因为aaa()函数不能访问到bbb()里面的局部变量，所以访问到的是a=10,这个全局变量。
}
function bbb() {
  /*
        AO{
            a:undefind,20赋值给a覆盖了undefined
            aaa()函数调用，进入aaa函数
        }
        */
  var a = 20
  aaa()
}
bbb()
```

#### (6):

```js
/*
    GO{
        a:undefind 10
        aaa:f(){}
    }
    */
var a = 10
function aaa() {
  /*
        无变量声明和形参和函数声明
        */
  console.log(a) //10  局部变量里面没有var a,因此找到父级的a为10
  a = 20
}
aaa()
```

#### (6):

```js
//https://www.cnblogs.com/hfxm/p/5547922.html

/*
    GO{
        a:undefind 10
        aaa:f(){}
    }
    */
var a = 10
function aaa() {
  /*
        AO{
            aaa函数内没变量声明a，因此找父级的a赋值为10
            bbb:f(){}
        }
        */
  bbb()
  console.log(a) //10
  function bbb() {
    /*
            AO{
                a:undefind 20
            }
            */
    var a = 20
  }
}
aaa()
```

#### (6):

```js
/*
    GO{
        a:undefind 10
        aaa:f(){}
    }
    */
var a = 10
function aaa(a) {
  /*
        AO{
            a:undefind 10
        }
        */
  console.log(a) //10  但参数和局部变量重名时，优先级是等同的
  var a = 20
}
aaa(a)
```

#### (6):

```js
/*
    GO{
        a:undefind 1
        func:f(){}
    }
    */
    var a = 1;
    function func(){
        /*
        a:undefind 2
        */
        var a;
        console.log(a); //undefind
        a = 2;
        console.log(a);  //2
    }
    func();
-------------------------------------------------------------------------

    /*
    GO{
        a:undefind 1
        func:f(){}
    }
    */
    var a = 1;
    function func(){
        /*
        AO{

        }
        */
        console.log(a); //1   局部作用域无声明变量，因此a会找全局作用域里面的a为1
        a = 2;
        console.log(a);  //2
    }
    func();
-------------------------------------------------------------------------
	/*
    GO{
        a:undefind 1
        func:f(){}
    }
    */
    var a = 1;
    function func(){
        /*
        a:undefind 2
        */
        var a;
        console.log(a); //undefind
        a = 2;
        console.log(a);  //2
    }
    func();
-------------------------------------------------------------------------

    /*
    GO{
        a:undefind 1
        func:f(){}
    }
    */
    var a = 1;
    function func(){
        /*
        AO{

        }
        */
        console.log(a); //1   局部作用域无声明变量，因此a会找全局作用域里面的a为1
        a = 2;
        console.log(a);  //2
    }
    func();

-------------------------------------------------------------------------
    /*
    GO{
        a:undefind 1
        func:f(){}
    }
    */
    var a =1;
    function func(){
        /*
        AO{
            a:undefind 2
        }
        */
        console.log(a) //undefind
        var a = 2;
        console.log(a) //2
    }
    func();
    console.log(a); //1

-------------------------------------------------------------------------
    /*
    GO{
        a:undefind 10
        funcA:f(){}
        funcB:f(){}
    }
    */
    var a = 10;
    function funcA(){
        /*
        AO{

        }
        */
        alert(a);  //10
    }
    function funcB(){
        /*
        AO{
            a:undefind 20
        }
        */
        var a = 20;
        funcA();
    }

    funcB();
-------------------------------------------------------------------------

    /**/
    function funcA(){
        var a=b=10;
    }
    funcA();
    console.log(a);
    console.log(b);
-------------------------------------------------------------------------
    /*
    GO{
        a:undefind 10
        funcA:f(){}
    }
    */
    var a=10;
    function funcA(){
        /*
        AO{
            a:undefind 20
        }
        */
        console.log(a);  //undefind
        var a=20;
        console.log(a);  //20
    }
    funcA();
-------------------------------------------------------------------------

    /*
    变量修改的时候另一个变量会跟着变化，但是当变量重新被定义时，则另一个不变化
    GO{
        a:undefind 5  [1,2,3]
        b:undefind 5  8  [1,2,3]  [1,2,3,4]
    }
    */
    var a = 5;
    var b = a;
    b +=3;
    console.log(a); //5
//引用数据类型传递的是地址，a和b指向了同一个地址，当b.push一个值以后，b的地址发生了改变，a也发生改变
    var a = [1,2,3];
    var b=a;  //b=[1,2,3]  a的地址复制给了b，a和b指向了同一个地址
    b.push(4);  //b=[1,2,3,4]
    console.log(a);  //[1,2,3,4]

-------------------------------------------------------------------------
    var a=[1,2,3];
    var b=a;  //b=[1,2,3]
    var b=[1,2,3,4]; //b=[1,2,3,4]
    console.log(a);  //[1,2,3] 因为b被重新赋值了，不指向a了。
-------------------------------------------------------------------------
    var a=10;
    function func(a){
        a += 3;
    }
//基本类型是按值传递的，所以传进foo函数里面的a是一个拷贝的数值，函数返回后这个数值就被销毁了，函数的实参的a和全局变量的a是两个独立的a
    func(a); //把全局变量的a拷贝了一份给实参a
    console.log(a); //10
-------------------------------------------------------------------------
    var a=10;
    function func(a){
        a += 3;
        console.log(a);
    }
    func(a); //13
-------------------------------------------------------------------------
    var a=[1,2,3];
    function func(a){
        a = [1,2,3,4];  //形参a只是被赋值，不会改变全局变量
    }
    func(a);
    console.log(a); //[1,2,3]
 -------------------------------------------------------------------------
    /*
     对引用数据类型，会发现在函数里，形参被赋值之前，对形参调用引用数据类型的属性（或方法）时，不仅会改变形参，还会改变全局变量。这大概是同名形参和全局变量的一种对应吧，通俗解释一下就是只有当你在函数里被重新赋值之后，你才是独立的。而在这之前我们是穿一条裤子的，属性和方法的调用会同时改变我们。
    */
    var a=[1,2,3];
    function func(a){
        a.push(4);  //调用引用类型方法，改变了形参a，也改变了全局变量a
    }
    func(a);
    console.log(a); //[1,2,3,4] push改变了全局的值,push是直接去改变了内存地址里面的值
-------------------------------------------------------------------------

    /*
    GO{
        a:undefind [1,2,3]
        foo:f(){}
    }
    */
    var a=[1,2,3];
    function foo(a){
        /*
        AO{
            a:[1,2,3]
        }
        */
        a.push(4); //调用引用类型方法，改变了形参a，也改变了全局变量a
        console.log(a); //[1,2,3,4] 此时的a是形参变量的值
        a=[5,6,7]; //形参重新赋值不会改变全局变量a
        console.log(a); //[5,6,7]
    }
    foo(a);
    console.log(a); //[1,2,3,4]

-------------------------------------------------------------------------
    var a=[1,2,3];
    function foo(a){
        /*
        AO{
            a:[1,2,3] [5,6,7]
        }
        */
        a=[5,6,7];  //形参a被重新赋值，不会改变全局a
        a.push(4); //[5,6,7,4] 此时只改变了形参a。不会改变全局a
        console.log(a);  //[5,6,7,4]
    }
    foo(a);
    console.log(a); //[1,2,3]
```

#### (6):

```js
//https://www.cnblogs.com/shangjun6/p/10055323.html

/*
   GO{
       a:undefind 12
       fn:f(){}
   }
   */
var a = 12
function fn() {
  /*
        a:undefind 
        */
  console.log(a) //undefind
  return 4 //return 之后不再执行
  var a = 45
}
fn()

/*
    GO{
        a:undefind 45
        fn:f(){}
    }
    */
var a = 45
function fn(a) {
  /*
        AO{
            var a:undefind
        }
        */
  console.log(a) //undefind
}
fn()

/*
   GO{
     a:undefind 123
     fn:f(){}
   }
    */
var a = 123
function fn() {
  /*
        AO{}
        */
  alert(a) //123  函数内部无变量与形参，访问外部全局作用域的a
}
fn()

/*
    GO{a:undefind 123 fun:f(){}}
    */
var a = 123
function fun() {
  /*
        AO{a:undefind}
        */
  alert(a) //undefind
  var a = 456
}
fun()
alert(a) //123

var a = 123
function fun() {
  alert(a) //123
  a = 456
}
fun()
alert(a) //456  对全局的a重新赋值，因函数fun没有私有变量，所以它会向上一级查找，同时也会改变上一级的赋值

var a = 123
function fun(a) {
  /*
    AO{
        形参：var a:undefind
    }
    */
  alert(a) //undefind
  a = 456
}
fun()
alert(a) //123

var a = 123
function fun(a) {
  /*
        a:undefind 123
        */
  alert(a) //123
  a = 456
}
fun(123)
alert(a) //123

/*
        GO{
            tatol:undefind 0
            fn:f(){}
        }
        */
console.log(total) //undefind
var total = 0
function fn(num1, num2) {
  console.log(total) //undefind
  var total = num1 + num2
  console.log(total) //300
}
fn(100, 200)
console.log(total) //0

/*
    GO{
        to:undefind 1
        fn:f(){}
    }
    */
var to = 1
function fn(n1, n2) {
  console.log(to) //1
  to = n1 + n2
  console.log(to) //30
}
fn(10, 20)
console.log(to) //30

/*
        如果形参，声明变量，函数名同名时，在预解释的时候只声明一次，其他的都是在赋值时后面会把前面的覆盖掉
　　　权重为 形参<声明变量<函数名
        */
function fn(a) {
  /*
        AO{
            a:undefind 1 f a(){}
            b:undefind f(){}
        }
        */
  console.log(a) //f a(){}
  var a = 123
  console.log(a) //123
  function a() {}
  console.log(a) //123
  var b = function () {}
  console.log(b) //f(){}
  function d() {}
}
fn(1)

function test(a, b) {
  /*
        AO{
            a:undefind 1 3
            b:undefind function b(){} 2
            c:undefind 0
            d:undefind function d(){}
        }
        */
  console.log(b) //function b(){}
  console.log(a) //1
  c = 0
  var c
  a = 3
  b = 2
  console.log(b) //2
  function b() {}
  function d() {}
  console.log(b) //2
}
test(1)

function test(a, b) {
  /*
        AO{
            a:undefind 1 function a(){} 123
            b:undefind 234 function(){}
        }
        */
  console.log(a) //function a(){}
  console.log(b) //undefind
  var b = 234
  console.log(b) //234
  a = 123
  console.log(a) //123
  function a() {}
  var a
  b = 234
  var b = function () {}
  console.log(a) //123
  console.log(b) //function(){}
}
test(1)

function fn() {
  /*
        函数每次执行完，都会销毁，下一次执行时，会重新创建新的函数作用域
        第一次执行：AO{
            a:undefind 12 13
        }
        第二次执行：AO{
            a:undefind 12 13
        }
        第三次执行：AO{
            a:undefind 12 13
        }
        */
  var a = 12
  a++
  console.log(a)
}
fn() //13
fn() //13
fn() //13

/*
    GO{
        ss:undefind fn(){}
        fn:f(){}
    }
    */
function fn() {
  /*
        AO{
            a:undefind 12 13 14 15
        }
        */
  var a = 12
  return function () {
    /*AO{}*/
    a++
    console.log(a)
  }
}
var ss = fn()
ss() //13
ss() //14
ss() + //15
  //回调函数
  (function () {
    /*
        AO{
            a:undefind function a(){}
            b:f(){}
            c:undefind
        }
        */
    var a = 5
    function a() {}
    alert(a) //5
    function b() {}
    b = 6
    alert(b) //6 没var,b就是全局变量
    var c = (d = b) //var c=d d=b  d赋值了b的全局变量为6
  })()
alert(d) //6 d赋值了b的全局变量为6
alert(c) //全局变量没c的值 c is mot defind
```

## 三.作用域链

### 3.1：什么是作用域链

作用域链：一个变量在使用的时候，就会在当前去寻找它的定义，找到了，就会直接使用这个变量的值，找不到，找上一次 function。直到找到全局变量，如果全局也没有，就会报错(引用错误异常 ReferenceError)

![image-20210910094213738](C:\Users\web\AppData\Roaming\Typora\typora-user-images\image-20210910094213738.png)

### 3.2:作用域链举例

#### 3.3:作用域链创建规则

#### 3.4:案例

```js
/*这是个嵌套函数，相应的应该是作用域链上有三个对象。
那么在调用的时候，需要查找name的值，就在作用域链上查找。
当成功调用test1()的时候，顺序为 test1()->test()->全局对象window 因为在test1()上就找到了name的值three，所以完成搜索返回。
当成功调用test1()的时候，顺序为 test2()->test()->全局对象window  因为在test2()上没找到name的值，所以找test()中的，找到了name的值two,就完成搜索返回*/
var name = 'one'
function test() {
  /*
        AO{
            name:undefind two
            test1:f(){}
            test2:f(){}
        }
        */
  var name = 'two'
  function test1() {
    /*
            AO{name:undefind three}
            */
    var name = 'three'
    console.log(name) //three
  }
  function test2() {
    console.log(name) //two
  }
  test1()
  test2()
}
test()

/*
    GO{
        a:undefind 1
        b:undefind 2
        outer:f(){}
    }
    */
var a = 1
var b = 2
function outer() {
  /*
        AO{
            a:undefind 3
            inner:f(){}
        }
        */
  var a = 3
  function inner() {
    /*
            AO{
                b:undefind 4
            }
            */
    var b = 4
    console.log(a) //inner->outer 3
    console.log(b) //inner 4
  }
  inner()
  console.log(a) //outer 3
  console.log(b) //outer->window 2
}
outer()
console.log(a) //window 1
console.log(b) //window 2

/*
    GO{
        c:undefind 888
        dd:undefind f(){}
        aa:f(){}
    }
    */
function aa() {
  /*
        AO{
            a:undefind 250
            bb:f(){}
        }
        */
  function bb() {
    var b = 666
    console.log(a) //250
  }
  var a = 250
  return bb
}
var c = 888
var dd = aa()
dd()
```

## 四、闭包

### 4.1、什么是闭包

外部变量使用内部函数的值，导致作用域不会被销毁：一个 A 函数内部定义了一个 B 函数，这个 B 函数被移到 A 函数作用域以外的其他作用域中重新定义，导致这个 B 函数一直被定义这，那么这个 B 函数定义时记录的父作用域（即 A 函数作用域）不会被销毁，从而形成了闭包

#### 闭包的最大问题：

闭包的作用域不会被销毁，导致内存泄漏

#### 闭包的特性：

因为闭包的作用域不会被销毁, 可以利用闭包做缓存数据

4.2、案例

```js
/*
    外部的myArr变量使用内部test函数的arr[]，导致函数test的作用域不会被销毁
    GO{
        myArr:undefind S001
        test:f(){}
    }
    */
function test() {
  /*
        AO{ 引用类型是地址
            arr:undefind [
                当i=0时，function(){
                console.log(i); 
                }，
                当i=1时，function(){
                console.log(i);
                }，
                当i=2时，function(){
                console.log(i);
                }，
            ]假设内存地址为S001
            i:undefind 0 1 2 3
        }
        */
  var arr = []
  for (var i = 0; i < 10; i++) {
    //arr的i为0时，1时，2时，[function(){console.log(i)},function(){console.log(i)},function(){console.log(i)}]
    //一个函数如果定义了声明了，没有调用，这个函数就没有意义
    //arr[i]()函数没有执行，里面代码毫无意义,这个函数只是函数表达式的定义，但是这个函数没有执行
    arr[i] = function () {
      console.log(i)
    }
  }
  return arr //把arr[]return出来
}
var myArr = test() //赋值语句，先执行右边，再把右边赋值给左边，arr[]return出来由myArr接收
console.log(myArr)
myArr[0]() //10 当myArr调用时，进入到for循环里面的函数，函数执行完，被销毁，下一次执行时，重新创建一个新的作用域
myArr[1]() //10
```

```js
/*
    Go{
        inn:undefind 存地址为S001  inn始终关联函数里面的inner值
        outer:f(){}
    }
    */
function outer() {
  /*
        AO{
            a:undefind 333
            inner:f(){}  假设内存地址为S001
        }
        */
  var a = 333
  function inner() {
    a++
    console.log(a)
  }
  return inner //②把inner值return出去
}
var inn = outer() //①先执行右边outer函数，控制权进入outer函数 ③inner的值为f(){}，假设内存地址为S001，把inner的值return出来赋值给左边inn
inn() //④inn执行，找到全局的inn，全局的inn关联函数内部的inner值，进入函数inner，执行inner的函数，控制权进入inner函数
```

#### 解决办法：

让外部函数自己 return 掉内部函数，在全局执行外部函数，把外部函数赋值给一个变量，再执行变量

```js
/*
    一个函数可以把它自己内部的语句，和自己声明时所处的作用域一起封装成了一个密闭环境，我们称为“闭包” （Closures）
   o函数里面定义了一个i函数，i函数被return出去，赋值给全局变量，全局不会被销毁，导致i函数不会被销毁，i函数出生的父作用域也不会被销毁
    GO{
        i:undefind 
        o:f(){}
    }
    */
function o() {
  /*
        AO{	这个作用域不会被销毁
            a:undefind
            i:f(){}
        }
        */
  var a = 10
  function i() {
    /*
            AO{}
            */
    console.log(a)
  }
  return i //②o返回了i的引用
}
var i = o() //①先执行右边，控制权进入到函数内部，o执行的时候，把i，return出来  ③声明一个变量i接收return出来的i，i就是i函数了
i()
```

```js
 /*
    GO{
        aa:f(){}
        cc:f(){}
    }
    */
    function aa(){
        /*
        AO{形成闭包
            num:undefind 10
            bb:f b(){}
        }
        */
        var num=10;
        function bb(){
            /*
            AO{}
            */
            num++;
            console.log(num);
        }
        return bb(; //③return，bb的值f b(){}
    }
    function cc(){
        /*
        AO{
            dd:undefind f b(){}
        }
        */
        var dd=aa(); //②执行aa函数，控制权进入aa函数，把aa执行的结果赋值给dd ④aa执行的结果return出来，bb的值f b(){}赋值给dd
        dd(); //dd执行,控制权进入bb函数
    }
   cc(); //①执行cc函数，控制权进入cc函数
```

## 五、this 指向问题

### 5.1.了解词法作用域和动态作用域

词法作用域：不关心函数是怎么样调用的，只关心函数在什么地方声明或者定义，`<span style="color:red">`**函数声明或者定义在哪，函数的父作用域就是谁**

动态作用域：js 没有动态作用域，但是有一个和动态作用域很像的 this。不关心函数定义，只关心函数的执行，`<span style="color:red">`**函数在哪个作用域执行，函数的父作用域就是谁**

```js
/*
    GO{
        num:undefind 10
        a:f(){}
        b:f(){}
        c:f(){}
    }
    */
var num = 10
function a() {
  /*
        b AO{}
        AO{}
        */
  console.log(num)
}
a() //词法作用域：函数在全局声明，因此a函数的父作用域是window
function b() {
  /*
        GO{}
        AO{}
        */
  var num = 50
  a() //动态作用域：函数在哪个作用域执行，函数的父作用域就是谁， a函数调用，a函数在b函数执行，a函数的父级就是b函数
}
b() //
function c() {
  function d() {
    a()
  }
  d()
}
c()
```

### 5.2、调用栈

```js
//在哪个作用域执行，父作用域就是谁
//调用栈 能找到我的路径
//调用位置  我在哪里被调用
function baz() {
  //调用栈  baz
  // 调用位置  全局
  console.log('baz')
  bar() // 调用位置 在baz函数调用的，还没执行完，控制权进入bar函数
}

//如果没有baz函数，bar一辈子都不会执行
function bar() {
  //  调用栈: baz -> bar
  // 调用位置: baz
  console.log('bar')
  foo() // 调用位置 在bar函数调用的，还没执行完，控制权进入foo函数
}

function foo() {
  // 调用栈 baz -> bar -> foo
  // 调用位置   bar
  console.log('foo')
}

baz() // 调用位置(全局)   控制权进入到baz函数
//函数foo执行完，返回bar函数，bar函数执行完，返回baz函数，baz函数被清空

//爆栈
// function bb() {
//   bb()
// }
// bb()

//bb->bb->bb->  每一次执行，作用域都不一样，调用栈不一样
```

### 5.3、this 指向问题

this 指向的是一个对象，我们把 this 指向的对象叫做函数执行的上下文对象，当函数被调用的时候，this 指向会发生改变，指向调用函数的对象，**this 跟函数的调用有关，看最后一步函数怎么调用\*\***，方法调用哪个对象，this 就指向谁\*\*

### 5.4、this 绑定的规则

#### （1）默认绑定

**函数名（）调用**

```js
/*在函数预编译的时候，会生成AO对象，程序会默认把this作为AO对象的一个属性名，默认属性值是window*/
function foo() {
  console.log(this) //window
}
foo()

function foo() {
  console.log(this.a) //this===window
  console.log(window.a)
}
var a = 10
foo()
```

#### （2）隐式绑定

**对象.方法()调用**

```js
/*
        GO{
            this:window
            obj:{}
            fn:f(){}
        }
        */
function fn() {
  console.log(this) //{a: 10, fn: ƒ}
  console, log(this.a) //this是执行期上下文，上下文对象就是这个对象, 此时的this就是obj，因此获取obj里面的a值
}
// this.a  === obj.a
var obj = {
  a: 10,
  fn: fn, //第一个fn为obj里面的属性，第二个fn为变量，要找作用域里的变量，在fn函数:function fn(){}
}
obj.fn() // 隐式绑定  通过对象.方法()调用，方法调用哪个对象，this就指向谁，fn方法调用obj对象，this指向obj
```

```js
function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 42,
  foo: foo,
  /*foo:function foo(){
            console.log(this.a); 方法调用哪个对象，this就指向谁,foo方法调用obj2对象，this指向obj2，this.a==obj2.a
        }
            */
}
var obj1 = {
  a: 22,
  obj2: obj2,
  /*obj2:obj2={
            a:42,
            foo:foo
        }
            */
}
obj1.obj2.foo() //42 先找obj1的obj2，再找obj2的foo方法
```

#### （3）显示绑定

隐式绑定必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接的应用函数，从而把 this 隐式的绑定到这个对象上，如果不想在函数内部包含函数的引用，就使用显示绑定

##### call 和 apply 方法

通过 call 和 apply 方法改变 this 指向

作用：1.在函数执行时，2.修改函数内部 this 的指向

call 方法的第一个参数为修改 this 的对象，因此实参是从第二个参数开始算起，可以传很多参数

apply 方法接受两个实参，第一个是修改 this 指向的对象，第二个实参是所有实参组合形成的数组

注意：call 和 apply 在修改 this 指向的时候，第一个参数都是对象，如果不是对象，是字符串、数字、布尔值基本数据类型，那么 this 将会指向他们的包装类包装的对象，要不然就是指向 window

```js
function foo() {
  /*
            AO{
                this:obj
            }
            */
  console.log(this.a) //this指向obj
}
var obj = {
  a: 20,
}
foo.call(obj) //20 通过call这个方法，在foo函数调用的时候，将函数内部的this绑定到obj上
foo.apply(obj)
```

```js
function foo(n1, n2) {
  /*
            AO{
                this:obj
            }
            */
  console.log(this.a) //this指向obj
  console.log(n1, n2)
}
var obj = {
  a: 20,
}
foo.call(obj, 10, 20) //20 通过call这个方法，在foo函数调用的时候，将函数内部的this绑定到obj上
foo.apply(obj)
foo.apply(obj, [10, 20])
```

```js
function add(c, d) {
  return this.a + this.b + c + d
}
var obj = {
  a: 1,
  b: 2,
}
console.log(add.call(obj, 3, 4))
console.log(add.apply(obj, [5, 6]))

// function fun(n1, n2, n3) {
//   console.log(n1, n2, n3)
// }
// // var a = 10
// // var b = 20
// // var c = 30
// var arr = [11, 22, 33]

// // fun(arr[0], arr[1], arr[2])
// fun.apply(undefined, arr)
```

```js
function foo() {
  console.log(this) //此时的this是指向window
  console.log(this.a)
}
var obj = {
  a: 20,
  foo: foo,
}
var a = 33
var bar = obj.foo
//bar是全局变量，在全局环境下执行，this指向Windows
bar() //33 此时的 赋值的知识函数的引用，bar则是一个不带任何修饰的函数调用，因此应用了默认绑定
```

```js
var name = 'xiaoming'
function showName() {
  console.log(this)
  console.log(this.name)
}
var person1 = {
  name: 'xiaohuan',
  sayName: showName,
  /*
            sayName:function showName(){
            console.log(this.name); 此时的this指向person1对象，this.name==person1.name
        }
            */
}
var person2 = {
  name: 'xiaohong',
  sayName: function () {
    //this==person2
    console.log(this)
    //person1.sayName==showName
    //fn==showName
    //fn= function showName(){
    //     console.log(this); this指向window
    //     console.log(this.name); this.name==window.name
    // }
    var fn = person1.sayName
    fn() //默认绑定，函数()调用
  },
}

//person1.sayName==showName==function showName(){
//     console.log(this);
//     console.log(this.name);
// }
// person1.sayName();  //xiaohuan sayName方法调用person1对象，因此this指向person1对象

//person2.sayName()==function(){
//     console.log(this);
//     var fn=person1.sayName;
//     fn();
// }
person2.sayName() //xiaoming  this指向Windows
```

##### bind 方法

```js
function foo(n1, n2, n3) {
  console.log(n1, n2, n3)
  console.log(this)
  console.log(this.a)
}
var obj = {
  a: 23,
}
//bind不会执行，只是把函数的this强制绑定了参数对象上，把this强制绑定在了obj上
//谁强制绑定，是bar，只要bar调用了foo函数，就会把this强制绑定在了obj上
var bar = foo.bind(obj)
// bar();
bar(10, 20, 30)
```

##### new 操作符

```js
function fun() {
  /*
            AO{
                this:{}
            }
            */
  console.log(this)

  //最后return出去
}
var obj = new fun() //构造函数创建一个空对象
```

### 5.5、优先级

优先级: 默认 < 隐式 < 显示 < new 操作符

1.默认的是最低

2.显示绑定优先级高于隐式绑定的优先级

3. new 操作符的优先级高于隐式绑定
4. new 操作符的优先级高于显示绑定

   > 函数是否使用 new 操作符调用,如果有,那么 this 将绑定到新创建的对象
   >
   > 函数是否使用 call,apply 或者硬绑定,如果有,this 执行显示绑定的对象
   >
   > 函数是否在某个上下文对象中调用,如果有 this 指向那个上下文对象(隐式绑定)
   >
   > 如果以上都不是,那就是默认绑定,

## 案例小分析

```js
/*
    num:undefind 20
    fn:f(){}函数执行，进入到函数作用域里面
    */
var num = 20
function fn(bol) {
  /*
        变量会有变量提升，自动提升到当前作用域顶层
        bol:1.先初始化：undefind 2.把实参传递给形参：false
        num:1.先初始化：undefind
        */
  if (bol) {
    /*
            当实参为true才会执行
            */
    var num = 10
    console.log(num)
  } else {
    /*
            当实参为false时执行，初始值为undefined，因此输出undefind
            */
    console.log(num) //undefind
  }
}
fn(false)
```
