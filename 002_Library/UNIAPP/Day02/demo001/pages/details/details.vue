<template>
	<!-- vue 单文件 组件 -->
	<!-- 模板  html -->
	<!-- 微信小程序的基础组件  适配移动端的  相当于div标签 -->
	<view>
		这是详情页
		<view>name:{{ options.name }}</view>
		<view>age:{{ options.age }}</view>
		<view>nikname{{ options.nikname }}</view>
	</view>
</template>

<script>
// js代码
export default {
	// 页面周期
	// onLoad:onLoad
	// options 形参  形式参数  可自定义
	// 参数变量名称 定义  知名见意
	onLoad(options) {
		// 存储到data 本地化数据
		this.options = options
		console.log(options)
		console.log('页面加载')
	},
	onShow() {
		console.log('页面显示')
	},
	onHide() {
		console.log('页面隐藏')
	},
	// 数据   组件内部数据   状态  本地数据
	data() {
		// 对象格式  key:value  键值对  name:"heart"
		return {
			// 初始化
			options: null
		}
	},
	// 方法
	methods: {}
}
</script>

<!-- 样式 -->
<style></style>
