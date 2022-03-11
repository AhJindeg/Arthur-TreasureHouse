<template>
	<view v-if="data">
		<!-- 头部的标题 -->
		<view
			style="padding: 10rpx;border-bottom: 1px solid gray;font-size: 30rpx;"
		>
			{{ details.lname }}
		</view>
		<!-- 轮播图 -->
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			style="width: 100%;height: 700rpx;"
		>
			<swiper-item v-for="(item, index) in picList">
				<image
					:src="baseURL + item.md"
					style="width: 100%; height: 100%;"
				></image>
			</swiper-item>
		</swiper>
		<!-- 商品介绍 -->
		<view style="padding-left: 30rpx;">
			<view style="font-weight: bold;">{{ details.title }}</view>
			<view style="color:gray;font-size:0.8em;margin: 15rpx 0;">
				{{ details.subtitle }}
			</view>
			<view style="color:red;font-size:1.2em;font-weight: bold;">
				¥{{ details.price }}
			</view>
		</view>
		<!-- 同类商品 -->
		<uni-collapse>
			<uni-collapse-item title="更多商品推荐" open>
				<uni-list>
					<uni-list-item
						:title="item.spec"
						v-for="(item, index) in laptopList"
						showArrow
					></uni-list-item>
				</uni-list>
			</uni-collapse-item>
		</uni-collapse>
		<!-- html页面 介绍图片等 -->
		<view v-html="html_details"></view>
		<view style="height: 200rpx;"></view>
		<!-- 商品导航 -->
		<view style="position: fixed;bottom: 0;width: 100%;">
			<uni-goods-nav/>
		</view>
	</view>
</template>

<script>
export default {
	// 接收路由参数
	onLoad(options) {
		// console.log(options);
		this.lid = options.lid;
	},
	data() {
		return {
			lid: null,
			data: null,
			baseURL: 'http://www.codeboy.com:9999/'
		};
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			const url =
				'http://www.codeboy.com:9999/data/product/details.php?lid=' +
				this.lid;

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
	// 处理数据
	computed: {
		details() {
			return this.data.details;
		},
		family() {
			return this.data.family;
		},
		picList() {
			return this.details.picList;
		},
		laptopList() {
			return this.family.laptopList;
		},
		html_details() {
			let details = this.details.details;
			// 添加域名
			// <img class="" src="img/product/detail/59003d3fNd4e6c74e.jpg">
			details = details.replace(
				/src="img/g,
				'src="' + this.baseURL + 'img'
			);
			// 限制显示大小
			details = details.replace(/<img/g, '<img width="100%"');
			return details;
		}
	}
};
</script>

<style></style>
