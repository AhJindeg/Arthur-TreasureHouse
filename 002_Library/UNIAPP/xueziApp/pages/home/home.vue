<template>
	<view v-if="data">
		<!-- 通告栏 -->
		<uni-notice-bar
			style="margin: 0;"
			single
			text="基于uniapp开发的学子商城App即将完成,欢迎大家来试用! by WEB2107班级"
			scrollable
			showIcon
			showClose
			:speed="30"
		></uni-notice-bar>
		<!-- 轮播图 -->
		<swiper
			circular
			indicator-dots
			autoplay
			:interval="3000"
			:duration="1000"
		>
			<swiper-item v-for="(item, index) in carouselItems" :key="index">
				<image
					:src="baseURL + item.img"
					style="width: 100%; height: 100%;"
				></image>
			</swiper-item>
		</swiper>
		<!-- 楼层  商品列表 -->
		<view v-for="(item, index) in items">
			<!-- 1F 首页推荐  header -->
			<view class="header">
				<uni-icons type="shop" size="20"></uni-icons>
				<text>{{ item.title }}</text>
			</view>
			<!-- 商品列表 -->
			<uni-grid
				:column="2"
				:square="false"
				:showBorder="false"
				:highlight="false"
			>
				<uni-grid-item v-for="(item1, index) in item.data" :key="index">
					<view class="cell">
						<!-- 图片 -->
						<image :src="baseURL + item1.pic"></image>
						<!-- 商品名称 -->
						<view>{{ item1.title }}</view>
						<!-- 商品详情 -->
						<view>{{ item1.details }}</view>
						<!-- 价格 -->
						<view>¥{{ item1.price }}</view>
						<!-- 查看详情按钮 -->
						<button
							size="mini"
							style="background-color:#0077ff;color:white"
						>
							查看详情
						</button>
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- 底部图标 -->
		<uni-grid :column="4" :showBorder="false" :highlight="false">
			<!-- 1,2,3,4 -->
			<uni-grid-item v-for="(item, index) in 4">
				<image :src="`/static/icons/icon${item}.png`" style="width: 100%;"></image>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: null,
			baseURL: 'http://www.codeboy.com:9999/'
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			const url = 'http://www.codeboy.com:9999/data/product/index.php';
			uni.request({
				url,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.data = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	// 将接口返回的数据  进行拆分
	computed: {
		// 轮播图
		carouselItems() {
			return this.data.carouselItems;
		},
		// 1F 首页推荐
		recommendedItems() {
			return this.data.recommendedItems;
		},
		// 2F 最新上架
		newArrivalItems() {
			return this.data.newArrivalItems;
		},
		// 3F 热销单品
		topSaleItems() {
			return this.data.topSaleItems;
		},
		// 通过观察发现 1F,2F,3F的模板结构一致 但是数据不一样  通过在模板外层再套一层循环解决
		items() {
			return [
				{ title: '1F/首页推荐', data: this.recommendedItems },
				{ title: '2F/最新上架', data: this.newArrivalItems },
				{ title: '3F/热销单品', data: this.topSaleItems }
			];
		}
	}
};
</script>

<style lang="scss">
.header {
	padding: 15rpx;
	background-color: #eeeeee;
	> text {
		margin-left: 15rpx;
		font-weight: 400;
		font-size: 1.1em;
	}
}
.cell {
	padding: 5rpx;
	margin-left: 5rpx;
	border: 1px solid #c0c4cc;
	border-radius: 10rpx;
	> image {
		width: 100%;
		height: 280rpx;
	}
	> view {
		padding-left: 10rpx;
		// 一行  隐藏  ...
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		// https://www.runoob.com/cssref/css-selectors.html  css各选择器的用法
		// & 当前元素
		&:first-of-type {
			font-weight: bold;
		}
		&:nth-of-type(2) {
			color: gray;
			font-size: 0.9em;
		}
		&:last-of-type {
			color: red;
			font-size: 1.1em;
		}
	}
}
</style>
