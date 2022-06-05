/**
 * JS变量创建
 * 1. 直接赋值 字面量
 * 2. 构造函数 new String(); new Boolean()
 */

/**
 * 正则语句使用斜杠包裹 /xxx/
 * 正则的修饰符：
 * i ignore 忽略大小写
 * g global 全局匹配
 */

// 1. 直接赋值
// 字面量方式: 适合 正则不变  内容变化
let wordsA = prompt('请输入一段内容:')
let regA = /[\u4e00-\u9fa5]/g // 匹配一个中文

// 2. 构造函数 new RegExp('正则', '修饰符')
// 构造方式: 适合正则表达式会变化的场景
let regExg = prompt('请输入一段正则片段：')
let wordsB = prompt('请输入一段内容:')
let regB = new RegExp(regExg, 'ig')

// ^: 字符串开头 $: 字符串结尾
// \d数字 [a-z]英文 [\u4e00-\u9fa5]中文
// /^1[3-9]\d{9}$/  一位为1 二位为3-9 往后数字9个
// (): 正则的捕获组
// \d: 一个数字
// {n}: 代表有n个

// 字符串提供了 match 的方法, 专门用正则来抓取内容
let resultC = wordsA.match(regA)

// 正则验证 test 方法: 返回值是 boolean 类型 true/false
let regD = /^1[3-9]\d{9}$/ // 匹配手机号
let phoneD = prompt('请输入手机号：')
let resultD = regC.match(phoneD)

// 正则替换: replace 把参数1正则找到的内容, 替换成 参数2
// $n : 代表第n个捕获组捕捉的值
let phoneE = '13658874555'
let regE = /(\d{3})(\d{6})(\d{2})/g
// 捕获组序号    1      2     3
// 转化为 手机号 136******32
let resultE = phoneE.replace(regE, '$1******$3')

// 正则万能方法 exec
// 上面的正则方法 本质上都是利用 exec 方法 封装出来的
