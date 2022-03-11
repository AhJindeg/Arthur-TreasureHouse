// 私有属性
// 在Ts语言中为属性提供了3种权限
// public：公开的
// protected：保护的
// private：私有的
class Father {
  public name = "亮亮" // 公开的名字
  protected money = "亮亮的钱" // 保护的钱
  private avi = "亮亮珍藏多年的小电影" // 私有的小电影
}

let f = new Father()
f.name
// f.money // 公共区域无法访问 类的保护属性
// f.avi // 公共区域无法访问 类的私有属性

class Son extends Father {
  show() {
    console.log(this.name)
    console.log(this.money) // 子类可以访问父类的保护属性
    // console.log(this.avi) // 子类无法访问父类私有的属性
  }
}
