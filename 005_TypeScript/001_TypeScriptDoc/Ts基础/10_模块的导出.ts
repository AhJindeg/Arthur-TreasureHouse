// 导出
// Js的导出两种方式

// export default{}
// 对应的导入 import 自定义名称 from 文件

// 方式2：分别导出
// export xxx
// export xxx
// 使用时：import {xx,aa,bb} from 文件

// Ts文件：
function mapState() {}
function mapMutaions() {}
function mapGetters() {}
// Ts提供的导出方法: 不用写 default 也能导出多个
export { mapGetters, mapState, mapMutaions }
