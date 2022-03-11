<template>
	<view>
		<!-- 4. 做展示 -->
		<!-- <uni-card
			v-for="(item, index) in data"
			:key="index"
			:title="item.title"
			:thumbnail="item.image"
			:extra="item.passtime"
		></uni-card> -->
		
		<!-- 插槽写法 -->
		<uni-card v-for="(item,index) in data" :key="index">
			<!-- 插槽 -->
			<!-- header 头部 -->
			<!-- <template v-solt:header>
				<view>{{item.title}}</view>
			</template> -->
			<template solt="title">
				<view>{{item.title}}</view>
			</template>
			<!-- 图片 -->
			<image :src="item.image" style="display: block;"></image>
			<!-- footer 尾部 -->
			<!-- <template v-solt:footer>
				<view>{{item.passtime}}</view>
			</template> -->
			<template slot="actions">
				<view>{{item.passtime}}</view>
			</template>
		</uni-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// data:[]
			data: null
		};
	},
	// 发请求可不可以放在onLoad中  理论上是可以的
	mounted() {
		// 获取结构数据  this代表vue对象  当前组件
		this.getData();
	},
	methods: {
		getData() {
			// 1.发请求
			// vue axios 微信  wx.request   不管用什么 底层都是xmlhttprequest对象
			// uni.request
			// ureq快捷
			uni.request({
				// 接口地址
				// 这个接口https协议配置服务器端配置了跨域
				// 这里使用https协议
				url: 'https://api.apiopen.top/getWangYiNews',
				// 请求方法
				method: 'GET',
				// 请求携带的数据
				data: {},
				// 成功回调方法
				success: res => {
					// 2.拿数据
					// console.log(res);
					// 存本地
					this.data = res.data.result;
				},
				// 失败回调方法
				fail: () => {},
				// 请求完成后的回调方法
				complete: () => {}
			});
		}
	}
};
</script>

<style scoped></style>
