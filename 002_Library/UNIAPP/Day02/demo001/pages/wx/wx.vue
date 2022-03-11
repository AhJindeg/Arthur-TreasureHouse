<template>
	<view>微信页面</view>
</template>

<script>
export default {
	// 页面加载时
	onLoad(option) {
		// option代表路由传递过的参数
		// clog 快捷
		// 接收路由传递的参数
		console.log('页面加载时')
		console.log(option)
	},
	// 页面显示时
	onShow() {
		console.log('页面显示时')
	},
	// 页面隐藏时
	onHide() {
		console.log('页面隐藏时')
	},
	data() {
		return {}
	},
	methods: {}
}
</script>

<style></style>
