class Rectangle {
  constructor(width, height) {
    // this: 当前对象, 在构造函数中就代表 即将创建出来的对象
    // this: 代表是对象中的
    // 不加this: 普通 var 出来的
    this.width = width
    this.height = height

    this.area = function () {
      return this.width * this.height
    }

    this.zc = function () {
      return (this.width + this.height) * 2
    }
  }
}
