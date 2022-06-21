# **null、undefined 和空值检查**

当我们创建了新变量，有时候想要检查引用的变量是不是为非 null 或 undefined。

JavaScript 确实有一个很好的快捷方式来实现这种检查。

```javascript
// Longhand
if (test1 !== null || test !== undefined || test1 !== '') {
  let test2 = test1
}
// Shorthand
let test2 = test1 || ''
```

# **给多个变量赋值**

```javascript
// Longhand
let test1, test2, test3
test1 = 1
test2 = 2
test3 = 3
// Shorthand
let [test1, test2, test3] = [1, 2, 3]
```

# **用于多个条件判断的 && 操作符**

如果只在变量为 true 时才调用函数，可以使用 && 操作符。

```javascript
// Longhand
if (test1) {
  callMethod()
}
// Shorthand
test1 && callMethod()
```

# **简短的函数调用**

我们可以使用三元操作符来实现多个函数调用。

```javascript
// Longhand
function test1() {
  console.log('test1')
}
function test2() {
  console.log('test2')
}
let test3 = 1
if (test3 == 1) {
  test1()
} else {
  test2()
}
// Shorthand
;(test3 === 1 ? test1 : test2)()
```

# **switch 简化**

我们可以将条件保存在键值对象中，并根据条件来调用它们

```javascript
// Longhand
switch (data) {
  case 1:
    test1()
    break
  case 2:
    test2()
    break
}
// Shorthand
let data = {
  1: test1,
  2: test2,
}
data[something] && data[something]()
```

# **指数表示法**

```javascript
// Longhand
for(let i = 0; i < 10000; i++){ ... }
// Shorthand
for(let i = 0; i < 1e4; i++) { ... }
```

# **默认参数值**

```javascript
// Longhand
function add(test1, test2) {
  if (test1 === undefined) test1 = 1
  if (test2 === undefined) test2 = 2
  return test1 + test2
}
// Shorthand
add = (test1 = 1, test2 = 2) => test1 + test2
add() // 3
```

# **解构赋值**

```javascript
// Longhand
const test1 = this.data.test1
const test2 = this.data.test2
const test3 = this.data.test3
// Shorthand
const { test1, test2, test3 } = this.data
```

# **数组 find 简化**

当我们有一个对象数组，并想根据对象属性找到特定对象，find 方法会非常有用。

```javascript
const data = [
  {
    type: 'test1',
    name: 'name1',
  },
  {
    type: 'test2',
    name: 'name2',
  },
]
function findtest1(name) {
  for (let i = 0; i < data.length; ++i) {
    if (data[i].type === 'test1' && data[i].name === name) {
      return data[i]
    }
  }
}
// Shorthand
filteredData = data.find((data) => data.type === 'test1' && data.name === 'name1')
console.log(filterdData) // { type: 'test1', name:'name1' }
```

# **条件查找简化**

如果我们要基于不同的类型调用不同的方法，可以使用多个 else if 语句或 switch，但有没有比这更好的简化技巧呢？

```javascript
// Longhand
if (type === 'test1') {
  test1()
} else if (type === 'test2') {
  test2()
} else if (type === 'test3') {
  test3()
} else {
  throw new Error('Invalid value' + type)
}
// Shorthand
let types = {
  test1: test1,
  test2: test2,
  test3: test3,
}
let func = types[type](!func) && throw new Error('Invalid value' + type)
func()
```
