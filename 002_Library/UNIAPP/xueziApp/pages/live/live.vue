<template>
	<view>
		<uni-collapse>
			<uni-collapse-item title="推荐" open>
				<uni-tag
					style="padding: 20rpx;"
					:text="item.cate_name"
					type="warning"
					:inverted="current == index ? false : true"
					v-for="(item, index) in tags"
					:key="index"
					@click="doCheck(index)"
				></uni-tag>
			</uni-collapse-item>
		</uni-collapse>
		<!-- 分类显示 -->
		<uni-grid
			:column="3"
			:showBorder="false"
			:highlight="false"
			:square="false"
		>
			<uni-grid-item v-for="(item,index) in cate">
				<image :src="item.pic_name"></image>
				<view>{{item.tag_name}}</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tags: null,
			current: 0,
			cate: null
		};
	},
	mounted() {
		this.getTags();
	},
	methods: {
		// 切换标签
		doCheck(index) {
			this.current = index;
			const { short_name } = this.tags[index];
			// console.log(this.tags[index]);
			// 分类切换之后需要获取分类数据
			// #ifdef H5
			const url = '/capi/api/v1/getColumnDetail?shortName=' + short_name;
			// #endif
			// #ifndef H5
			const url =
				'http://capi.douyucdn.cn/api/v1/getColumnDetail?shortName=' +
				short_name;
			// console.log(url);
			// #endif
			uni.request({
				url,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.cate = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		// 获取分类标签数据
		getTags() {
			// #ifndef H5
			const url = 'http://capi.douyucdn.cn/api/v1/getColumnList';
			// #endif
			// #ifdef H5
			const url = '/capi/api/v1/getColumnList';
			// #endif
			uni.request({
				url,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.tags = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style></style>
