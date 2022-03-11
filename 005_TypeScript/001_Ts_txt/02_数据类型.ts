// 类型
let a: string = "33" // 字符串
let b: number = 44 // 数字
let c: boolean = true // 布尔类型

// any: 任意类型
let d: any
d = 11
d = "mike"
d = true

// 可选的符合类型 类型|类型
let e: number | string
e = 44
e = "kkk"
// e = true // 报错：只允许 number 和 string

// 数组类型
// Array<类型名>:代表数组中都是指定类型的值
let f: Array<number> = [1, 2, 3]
// f.push(true) // 报错：类型不是number
// 简化：类型[]等价于Array<类型>
let g: number[] = [2, 3, 4]
// 指定数据的元素个数以及类型
let h: [number, string, boolean] = [18, "king", true]
