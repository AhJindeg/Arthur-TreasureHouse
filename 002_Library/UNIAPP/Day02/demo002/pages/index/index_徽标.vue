<!-- vbs -->
<template>
	<!-- 移动端 使用view容器组件 -->
	<view>
		<!-- 数字角标 徽标 -->
		<!-- ubadge -->
		<uni-badge text="99" type="primary"></uni-badge>
		<uni-badge text="73" type="success"></uni-badge>
		<uni-badge text="15" type="error"></uni-badge>
		<uni-badge text="63" type="warning"></uni-badge>
		<view style="margin-top: 20px;">
			<uni-badge text="63" type="error" absolute="rightTop">
				<button type="primary" size="mini">收件信息</button>
			</uni-badge>
		</view>
	</view>
</template>

<script>
export default {};
</script>

<style scoped></style>
