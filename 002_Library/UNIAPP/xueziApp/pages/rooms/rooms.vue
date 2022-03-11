<template>
	<!-- v-if 判断页面DOM是否渲染 一般用来解决网络数据没有返回前不要去渲染数据，否则会有报错警告 -->
	<view v-if="data">
		<!-- 斗鱼直播房间列表 -->
		<!-- 发请求  拿数据   存本地  做展示 -->
		<!-- grid快捷 -->
		<uni-grid
			:column="2"
			:square="false"
			:showBorder="false"
			:highlight="false"
		>
			<uni-grid-item v-for="(item, index) in data.list" :key="index">
				<view class="cell">
					<view>
						<!-- 图片 -->
						<image :src="item.roomSrc" mode=""></image>
						<!-- 左下角 -->
						<view>{{ item.nickname }}</view>
						<!-- 右上角 -->
						<view>{{ item.hn }}</view>
					</view>
					<view>{{ item.roomName }}</view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<!-- 加载更多组件  loadmore-->
		<uni-load-more :status="status"></uni-load-more>
		<!-- 回到顶部按钮 -->
		<view class="btn-gotop" v-show="showGoTop" @click="doGoTop">
			<uni-icons color="white" size="20" type="arrowthinup"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	// vdata快捷
	data() {
		return {
			// short_name 作为接口请求参数  type的参数
			type: null,
			// url: 'https://m.douyu.com/api/room/list?page=1&type=yz'
			// 接口地址修改为以/douyu开头 才会被代理
			url: '/douyu/api/room/list',
			// 存储网络返回的数据
			data: null,
			// 加载更多的状态 more loading noMore
			status: 'more',
			// 是否显示回到顶部按钮
			showGoTop: false
		};
	},
	onLoad(options) {
		const { short_name, tag_name } = options;
		this.type = short_name;
		uni.setNavigationBarTitle({
			title: tag_name
		});
	},
	// 监听页面滚动到的位置
	onPageScroll(e) {
		console.log(e);
		// 后边表达式为真  前面的值也为真
		this.showGoTop = e.scrollTop > 2000;
	},
	// 下拉刷新  需要在pages.json中开启
	onPullDownRefresh() {
		this.getData(1, true);
	},
	// 触底事件 加载更多  翻页
	onReachBottom() {
		// console.log('到底了加载数据吧');
		// 修改加载更多组件的状态  值固定不能自己传  more loading noMore
		this.status = 'loading';
		// 发送请求  传页码  总页数  当前数组的数据
		const { nowPage, pageCount, list } = this.data;
		// 通过判断当前页是否为最大页数，来确实是否还需要翻页
		// 如果当前页就是最大页，后续没有数据了，就不要发送请求
		if (nowPage == pageCount) {
			// 加载组件状态修改为没有更多数据
			this.status = 'noMore';
			// 方法后续都不再执行
			return;
		}
		// 1、发送请求
		this.getData(nowPage + 1);
	},
	mounted() {
		// 调用发送请求方法
		this.getData(1);
	},
	// vm快捷
	methods: {
		// // getMore(){
		//   	// console.log('到底了加载数据吧');
		//   	// 修改加载更多组件的状态  值固定不能自己传  more loading noMore
		//   	this.status = 'loading';
		//   	// 发送请求  传页码  总页数  当前数组的数据
		//   	const { nowPage, pageCount, list } = this.data;

		//   	// 通过判断当前页是否为最大页数，来确实是否还需要翻页
		//   	// 如果当前页就是最大页，后续没有数据了，就不要发送请求
		//   	if (nowPage == pageCount) {
		//   		// 加载组件状态修改为没有更多数据
		//   		this.status = 'noMore';
		//   		// 方法后续都不再执行
		//   		return;
		//   	}
		//   	// 1、发送请求
		//   	uni.request({
		//   		url: this.url,
		//   		method: 'GET',
		//   		// 下一页页码  nowPage当前页码  +1 下一页
		//   		data: { page: nowPage + 1 },
		//   		success: res => {
		//   			// 2、拿数据
		//   			// console.log(res);
		//   			// 3、存本地  新数据和旧数据进行合并
		//   			res.data.data.list = [...list, ...res.data.data.list];
		//   			this.data = res.data.data;
		//   		},
		//   		fail: () => {},
		//   		complete: () => {}
		//   	});
		// },
		// 回到顶部处理
		doGoTop() {
			// 页面滚动到某个像素位置
			uni.pageScrollTo({
				// 0为顶部  0px
				scrollTop: 0,
				// 滚动动画时长  单位ms
				duration: 100
			});
		},
		getData(page, isPull = false) {
			// 1、发送请求
			// ureq快捷
			console.log('page:', page, 'type:', this.type);
			uni.request({
				url: this.url,
				method: 'GET',
				// 接口传参
				// 如果需要调试最大页数，可以把初始页面码调大
				data: { page: page, type: this.type },
				success: res => {
					// 2. 拿数据
					console.log(res);
					// 3.存本地  根据接口返回数据 具体选择
					if (page > 1) {
						res.data.data.list = [
							...this.data.list,
							...res.data.data.list
						];
					}
					this.data = res.data.data;
					// 为了适配大屏手机 默认数据太少，不足一个屏幕，默认多加载一点儿数据
					if (isPull) {
						uni.stopPullDownRefresh();
					}
					// this.getMore()
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.cell {
	padding: 6rpx;
	image {
		width: 100%;
		height: 240rpx;
		border-radius: 6rpx;
		// 图片默认为行元素，具有行间距 会导致底部留白
		display: block;
	}
	> view:first-of-type {
		position: relative;
		> view:first-of-type {
			position: absolute;
			left: 0;
			bottom: 0;
			color: white;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 6rpx;
			border-radius: 6rpx;
			font-size: 0.9em;
		}
		> view:last-of-type {
			position: absolute;
			right: 0;
			top: 0;
			color: white;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 6rpx;
			border-radius: 6rpx;
			font-size: 0.9em;
		}
	}
}
// 回到顶部按钮
.btn-gotop {
	// 浮动
	position: fixed;
	// 定位位置
	bottom: 100rpx;
	right: 30rpx;
	opacity: 0.8;
}
</style>
