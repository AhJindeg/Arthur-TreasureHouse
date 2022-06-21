`以下来自公众号 web前端开发`

在我们的日常开发过程中，我们经常会遇到数字与字符串转换，检查对象中是否存在对应值，条件性操作对象数据，过滤数组中的错误值，等等这类处理。

在这里，整理出了一些常用的小技巧，这些技巧是我比较喜欢的，可以使我们的代码更精简、更干净，且非常实用。

# **01、通过条件判断向对象添加属性**

```javascript
const isValid = false
const age = 18

// 我们可以通过展开运算符向对象添加属性
const person = {
  id: 'id',
  name: 'name',
  ...(isValid && { isActive: true }),
  ...((age > 18 || isValid) && { cart: 0 }),
}
console.log('person', person)
```

# **02、检查对象中是否存在某个属性**

```javascript
const person = {
  id: 'id',
  name: 'name',
}
console.log('name' in person) // true
console.log('isActive' in person) // false
```

# **03、解构赋值**

```javascript
const product = {
  id: 'id',
  name: 'nameAct',
}
const { name: weaponName } = product
console.log('weaponName:', weaponName) // weaponName: nameAct

// 通过动态key进行解构赋值
const extractKey = 'name'
const { [extractKey]: data } = product
console.log('data:', data) // data: nameAct
```

# **04、循环遍历一个对象的 key 和 value**

```javascript
const product = {
  id: 'idArt',
  name: 'nameArt',
  isSale: false,
}
Object.entries(product).forEach(([key, value]) => {
  if (['id', 'name'].includes(key)) {
    console.log('key:', key, 'value:', value)
  }
})
// key:id value:idArt
// key:name value:nameArt
```

# **05、使用可选链(Optionalchaining)避免访问对象属性报错**

```javascript
const product = {
  id: 'idArt',
  name: 'nameArt',
}
console.log(product.sale.isSale) // throw error
console.log(product?.sale?.isSale) // undefined
```

注意: 在实际使用场景中，有些场景对于我们要获取的属性是非必需的，我们可以通过上面这种方式去避免报错出现；但是有些场景下一些属性是必须的，不然就会影响我们的实际功能，这个时候还是尽量给出清晰的报错提示来解决这种错误的出现。

# **6、检查数组中 falsy 的值**

```javascript
const fruitList = ['apple', null, 'banana', undefined]
// 过滤掉falsy的值
const filterFruitList = fruitList.filter(Boolean)
console.log('filterFruitList:', filterFruitList) // filterFruitList:['apple', 'banana']
// 检查数组中是否有truthy的值
const isAnyFruit = fruitList.some(Boolean)
console.log('isAnyFruit:', isAnyFruit) // isAnyFruit: true
```

# **7、数组去重**

```javascript
const fruitList = ['apple', 'mango', 'banana', 'apple']
const uniqList = [...new Set(fruitList)]
console.log('uniqList:', uniqList) // uniqList: ['apple', 'mango', 'banana']
```

# **8、检查是否为数组类型**

```javascript
const fruitList = ['apple', 'mango']
console.log(typeof fruitList) // object
console.log(Array.isArray(fruiltList)) // true
```

# **9、数字&字符串类型转换**

```javascript
const personId = '007'
console.log('personId:', +personId, 'type:', typeof +personId)
// personId: 7 type:number

const personId = '007'
console.log('personId:', personId + '', 'type:', typeof (personId + ''))
// personId: 007 type:string
```

# **10、巧用空值合并(??)**

```javascript
let data = undefined ?? 'noData' // noData
data = null ?? 'noData' // noData
data = 0 ?? null ?? 'noData' // noData
// 当我们根据变量自身判断时
data ??= 'noData' // noData
```

> 和或（||） 运算符的区别？
> 或运算符针对的是 falsy 类的值 (0,’ ’, null, undefined, false, NaN)，而空值合并仅针对 null 和 undefined 生效
