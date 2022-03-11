<template>
	<view>
		<!-- 通告栏 -->
		<!-- unotice -->
		<!-- 属性绑定 :  值为非字符串  都需要绑定 -->
		<uni-notice-bar
			single
			scrollable
			:speed="50"
			showClose
			showIcon
			color="#ff0313"
			backgroundColor="#fd8f6d"
			text="欢迎WEB2107班级同学学习到框架项目阶段,希望能够坚持学习找到好的工作!!!"
		></uni-notice-bar>
	</view>
</template>

<script>
export default {};
</script>

<style scoped></style>
