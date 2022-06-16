// 以下文章来源于 公众号:web前端开发
/**
 * “x !== x”可以返回true吗？
 * JavaScript 中有一个值 NaN，它不等于任何值，甚至不等于自身
 */
const x = NaN // Please fill in the value of "x?
if (x !== x) console.log('hello fatfish')
console.log(NaN === NaN) // false
console.log(x !== x) // true
console.log(Number.isNaN(x)) // true

/**
 * (!isNaN(x) && x !== x) 可以返回true吗？
 * 当我们过滤掉“NaN”时 还有什么值
 * “Object.Defineproperty”
 */
window.y = 0 // Any value is OK
Object.defineProperty(window, 'y', {
  get() {
    return Math.random()
  },
})
console.log(y) // 0.12259077808826002
console.log(y === y) // false
console.log(y !== y) // true

/**
 * 如何使“x === x + 1”
 * “Number.MAX_SAFE_INTEGER 常量代表 JavaScript 中的最大安全整数 (2⁵³ — 1)。”
 * 我们可以为“x”分配任何大于“Number.MAX_SAFE_INTEGER”的值
 */
const z = Number.MAX_SAFE_INTEGER + 1 // Please fill in the value of "x?
if (z === z + 1) console.log('hello fatfish')

/**
 * “x > x”可以是真的吗？
 * “Symbol.toPrimitive”
 */
const a = {
  // Please fill in the value of "x?
  value: 1,
  [Symbol.toPrimitive]() {
    console.log('a', this.value)
    return --this.value
  },
}
if (a > a) console.log('hello fatfish')

/**
 * typeof x === ‘undefined’ && x.length > 0
 * document. All，包含文档中每个元素的 HTMLAllCollection
 */
const b = document.all // Please fill in the value of "x?
if (typeof b === 'undefined' && b.length > 0) console.log('hello fatfish')
console.log(b)
console.log(typeof b)
console.log(b === undefined)
