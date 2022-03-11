<template>
	<view>
		<!-- 方式一 标签跳转 -->
		<navigator url="/pages/details/details?name=哈特&age=18">跳转到微信页</navigator>
		<!-- 方式二 编程方式  事件触发方法 -->
		<button type="primary" size="mini" @click="goDetail">跳转</button>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		goDetail() {
			// unav
			uni.navigateTo({
				url: '/pages/details/details?name=heart&nickname=false老师'
			})
		}
	}
}
</script>

<style></style>
