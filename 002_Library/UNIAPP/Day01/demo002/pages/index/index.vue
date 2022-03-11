<!-- vb 快速提示 -->
<template>
	<!-- view 移动端使用view -->
	<view>
		我是测试文字
		<my-hello></my-hello>
		<my-hello />
		<!-- 路由跳转 -->
		<!-- 方法一：标签跳转 -->
		<navigator url="../details/details">详情页跳转</navigator>
		<!-- 方式二：编程方式跳转 -->
		<button type="primary" @click="goDetail()">跳转详情页</button>
	</view>
</template>

<script>
// vue中使用组件 引入->注册->标签方式调用
// uniapp中 对于component文件夹下的组件 进行了自动加载 要遵循easycom机制
export default {
	
	methods: {
		goDetail() {
			// 快捷 unav
			uni.navigateTo({
				url:'../details/details'
			});
		}
	},
}
</script>

<style scoped></style>
