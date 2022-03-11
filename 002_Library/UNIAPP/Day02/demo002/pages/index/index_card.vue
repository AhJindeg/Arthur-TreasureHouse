<template>
	<view>
		<uni-card title="标题文字" thumbnail="/static/logo.png" extra="额外信息" note="Tips">
			内容主体，可自定义内容及样式
			<!-- 插槽用法 -->
			<!-- actions 的插槽相对于 之前版本的note属性 -->
			<view slot="actions">
				底部信息
			</view>
		</uni-card>
	</view>
</template>

<script>
export default {};
</script>

<style scoped></style>
