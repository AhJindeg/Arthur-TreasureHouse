# **TypeScript 构造函数简写**

通过 TypeScript 中的构造函数创建一个类并为类属性赋值有一个简写。使用此方法时，TypeScript 会自动创建和设置类属性。

这个速记是 TypeScript 独有的，在 JavaScript 类定义中不可用。

```typescript
// Longhand
class Person {
  private name: string
  public age: int
  protected hobbies: string[]

  constructor(name: string, age: int, hobbies: string[]) {
    this.name = name
    this.age = age
    this.hobbies = hobbies
  }
}

// Shorthand
class Person {
  constructor(private name: string, public age: int, protected hobbies: string[]) {}
}
```

# **等待特定的时间量（以毫秒为单位）**

```typescript
const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

await wait(1000) // waiting 1 second
```

# **删除字符串的尾部斜杠**

```typescript
const removeTrailingSlash = (value: string): string => (value && value.charAt(value.length - 1) === '/' ? value.slice(0, -1) : value)

removeTrailingSlash('foo-bar/') // -> foo-bar
```

# **将大写字符串转换为小写**

```typescript
const decapitalize = (str: string): string => `${str.charAt(0).toLowerCase()}${str.slice(1)}`

decapitalize('Hello world') // -> hello world
```

# **检查日期是否为工作日**

```typescript
const isWeekday = (d: Date): boolean => d.getDay() % 6 !== 0

isWeekday(new Date(2022, 2, 21)) // -> true
isWeekday(new Date(2021, 2, 20)) // -> false
```

# **反转字符串**

```typescript
const reverse = (s: string): string => s.split('').reverse().join('')

reverse('elon musk') // -> 'ksum nole'
```

# **检查一个数字是否为偶数。**

```typescript
const isEven = (n: number): boolean => n % 2 === 0

isEven(2) // -> true
isEven(3) // -> false
```

# **大写字符串**

```typescript
const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1)

capitalize('lorem ipsum') // -> Lorem ipsum
```

# **检查数组是否为空**

```typescript
const isArrayEmpty = (arr: unknown[]): boolean => Array.isArray(arr) && !arr.length

isArrayEmpty([]) // -> true
isArrayEmpty([1, 2, 3]) // -> false
```

# **检查对象/数组是否为空**

```typescript
const isObjectEmpty = (obj: unknown): boolean => obj && Object.keys(obj).length === 0

isObjectEmpty({}) // -> true
isObjectEmpty({ foo: 'bar' }) // -> false
```

# **随机生成整数**

基于两个参数生成一个随机整数。

```typescript
const randomInteger = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

randomInteger(1, 10) // -> 7
```

# **生成随机布尔值**

```typescript
const randomBoolean = (): boolean => Math.random() >= 0.5

randomBoolean() // -> true
```

# **切换布尔值**

切换布尔值，变假为真，变真为假。

```typescript
const toggleBoolean = (val: boolean): boolean => (val = !val)

toggleBoolean(true) // -> false
```

# **转换**

将字符串转换为带“-”的连字字符串。

```typescript
const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')

slugify('Hello World') // -> hello-world
```

# **生成随数组组合**

随机生成一组任何类型的数组。

```typescript
const shuffleArray = <T>(arr: T[]): T[] => arr.sort(() => Math.random() - 0.5)

shuffleArray(<number[]>[1, 2, 3, 4, 5]) // -> [ 4, 5, 2, 1, 3 ]
```

# **将连字字符串转换为骆峰字符串**

```typescript
const snakeToCamel = (s: string): string => s.toLowerCase().replace(/(_\w)/g, (w) => w.toUpperCase().substring(1))

snakeToCamel('foo_bar') // -> fooBar
```

# **随机整数**

根据当前时间生成一个随机整数。

```typescript
const randomInteger = (): number => new Date().getTime()

randomInteger() // -> 1646617367345
```

# **随机数字符串**

根据当前时间生成随机数字符串。

```typescript
const randomNumberString = (): string => new Date().getTime() + Math.random().toString(36).slice(2)

randomNumberString() // -> 1646617484381wml196a8iso
```

# **将数字转换为字符/字母**

```typescript
const numberToLetter = (value: number): string => String.fromCharCode(94 + value)

numberToLetter(4) // -> b
```

# **生成随机的十六进制颜色**

```typescript
const randomHexColor = (): string =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`

randomHexColor() // -> #dc7c40
```

# **获取数组的随机项**

```typescript
const randomItem = <T>(arr: T[]): T => arr[(Math.random() * arr.length) | 0]

randomItem(<number[]>[1, 2, 3, 4, 5]) // -> 4
```
