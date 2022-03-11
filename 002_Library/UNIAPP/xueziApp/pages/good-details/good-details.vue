<template>
	<view v-if="data">
		<!-- 商品名称 少 -->
		<view class="lname">{{ details.lname }}</view>
		<!-- 轮播图 -->
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			style="width: 100%;height: 700rpx;"
		>
			<swiper-item v-for="(item, index) in picList" :key="index">
				<image
					style="width: 100%; height: 100%;"
					:src="baseUrl + item.md"
				/>
			</swiper-item>
		</swiper>
		<!-- 商品名称 多-->
		<view style="font-weight: bold;">{{ details.title }}</view>
		<!-- 商品描述 -->
		<view style="color: gray;font-size: 0.8em; margin: 15rpx 0;">
			{{ details.subtitle }}
		</view>
		<!-- 价格 -->
		<view style="color:red;font-size: 1.1; font-weight: bold;">
			¥{{ details.price }}
		</view>
		<!-- 推荐 -->
		<uni-collapse>
			<view>更多相关商品推荐 <uni-icons type="showArrowtop"></uni-icons></view>
			<uni-collapse-item
				:to="`/pages/good-details/good-details?lid=${item.lid}`"
				v-for="(item, index) in laptopList"
				:key="index"
				:title="item.spec"
				showArrow
				clickable
			></uni-collapse-item>
		</uni-collapse>
		<!-- html页面 -->
		<view v-html="html_detalis"></view>
		<!-- 布局一个空白容器 具有高度把导航挡住的地方露出来 -->
		<view style="height: 100rpx"></view>
		<!-- 导航 -->
		<uni-goods-nav  style="position: fixed;bottom: 0;width: 100%;"/>
	</view>
</template>

<script>
export default {
	data() {
		return {
			lid: null,
			data: null,
			baseUrl: 'http://www.codeboy.com:9999/'
		};
	},
	// 页面初始化加载
	onLoad(options) {
		// 默认传入路由参数
		const { lid } = options;
		// console.log(lid);
		this.lid = lid;
	},
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			const url =
				'http://www.codeboy.com:9999/data/product/details.php?lid=' +
				this.lid;
			// console.log(url);
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
		html_detalis() {
			// 通过正则替换 1、图片地址 2、协议// 手机端需要确定协议  3、设置图片宽度
			let details = this.details.details;
			// 替换图片地址
			// src="img/product/detail/57b15612N81dc489d.jpg">
			// src="baseUrl+img/"
			// g 全局匹配替换
			details = details.replace(
				/src="img/g,
				'src="' + this.baseUrl + 'img'
			);
			// 协议 // 替换为https
			// src="//img20.360buyimg.com/vc/jfs/t2683/60/4222930118/169462/233c7678/57b15616N1e285f09.jpg"
			details = details.replace(/src="\/\/img20/g, 'src="https://img20');
			// 图片宽度
			details = details.replace(/<img/g, '<img width="100%"');
			// console.log(details);
			return details;
		}
	}
};
</script>

<style lang="scss">
.lname {
	border-bottom: 1px solid #cbcbcb;
	padding: 10rpx;
}
</style>
<!-- "<div class="content_tpl"> <div class="formwork">   <div class="formwork_img"><br></div><div class="formwork_img">    <img alt="" class="" src="img/product/detail/57b15612N81dc489d.jpg">   </div>  </div>  <div class="formwork">   <div class="formwork_img">    <img alt="" class="" src="//img20.360buyimg.com/vc/jfs/t2683/60/4222930118/169462/233c7678/57b15616N1e285f09.jpg">   </div>  </div>  <div class="formwork">   <div class="formwork_text">    技术规格请前往 www.apple.com/cn/macbook-air/specs.html 查看完整内容。</div></div></div>" -->
