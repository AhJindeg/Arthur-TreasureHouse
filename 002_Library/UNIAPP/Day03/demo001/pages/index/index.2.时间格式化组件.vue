<template>
	<view>
		<!-- udate  时间处理组件-->
		<uni-dateformat :date="time"/>
		<br/>
		<!-- 自定义格式 -->
		<uni-dateformat :date="time" format="yyyy年MM月dd日"/>
		<br/>
		<uni-dateformat :date="time" format="yyyy年MM月dd日 hh:mm"/>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//获取时间戳  JS代码语法
			time: new Date().getTime()
		};
	}
};
</script>

<style scoped></style>
