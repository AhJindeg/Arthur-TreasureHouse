<template>
	<view>
		<!-- 商品列表 -->
		<!-- 发送请求=>拿数据=>存本地=>做展示 -->
		<!-- 4.做展示 -->
		<!-- 远程加载数据  如果没有数据请求回来 为null 判断数据为null 就不渲染页面 -->
		<uni-list v-if="data">
			<uni-list-item
				v-for="(item, index) in data.data"
				:key="index"
				showArrow
				clickable
				:to="`/pages/goods-details/goods-details?lid=${item.lid}`"
			>
				<!-- 自定义插槽 -->
				<template slot="body">
					<view class="cell">
						<!-- 图片 -->
						<image
							:src="`http://www.codeboy.com:9999/${item.pic}`"
						></image>
						<view>
							<!-- 产品名称 -->
							<view>{{ item.title }}</view>
							<!-- 价格 -->
							<view>¥{{ item.price }}</view>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 加载组件  提示文字 -->
		<!-- uload -->
		<!-- status 取值就三个 more  loading  noMore -->
		<uni-load-more :status="status"></uni-load-more>
		<!-- 回到顶部按钮 -->
		<view class="btn-gotop" @click="goTop" v-show="showBtn">
			<uni-icons color="white" size="35" type="arrowthinup"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 是否显示回到顶部按钮
			showBtn: false,
			data: null,
			// 加载组件的状态
			status: 'more'
		};
	},
	// 下拉事件
	onPullDownRefresh() {
		console.log('下拉刷新触发了');
		// 请求第一页
		this.getData();
	},
	// 触底事件
	onReachBottom() {
		// console.log('到底了,加载数据');
		// 触底后 加载组件的状态需要改变 loading
		this.status = 'loading';
		// 解构获取当前页码和最大页码 es6
		const { pno, pageCount } = this.data;
		if (pno == pageCount) {
			this.status = 'noMore';
			return;
		}
		// 请求数据
		this.getData(pno + 1);
	},
	// 监听滚动事件
	onPageScroll(e) {
		// 距离顶部的距离
		console.log(e.scrollTop);
		// 距离顶部1500时,就显示回到顶部按钮
		this.showBtn = e.scrollTop > 1500;
	},
	mounted() {
		this.getData();
	},
	methods: {
		// 回到顶部方法
		goTop() {
			// 滚动到页面的位置
			uni.pageScrollTo({
				// 0 为回到顶部
				scrollTop: 0
			});
		},
		getData(pno = 1) {
			// 判断默认请求第一页
			// 如果是触底事件加载 需要请求下一页
			// 1.发送请求
			uni.request({
				url: 'http://www.codeboy.com:9999/data/product/list.php',
				method: 'GET',
				// 页码参数是pno
				data: { pno: pno },
				success: res => {
					// 2.拿数据
					console.log(res);
					// 3.存本地
					// 如果页数大于1需要进行拼接新旧数据
					if (pno > 1) {
						res.data.data = [...this.data.data, ...res.data.data];
					}
					this.data = res.data;
					// 停止下拉刷新  放在请求加载完毕 并且数据返回后
					uni.stopPullDownRefresh();
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
	padding: 15rpx;
	// 弹性布局
	display: flex;
	> image {
		width: 180rpx;
		height: 180rpx;
		// 方法一:最小大小
		// min-width: 180rpx;
		// 方法二: 不要弹性压缩
		// flex 代表以下三个属性 none 0 0 auto
		// flex-grow	一个数字，规定项目将相对于其他灵活的项目进行扩展的量。
		// flex-shrink	一个数字，规定项目将相对于其他灵活的项目进行收缩的量。
		// flex-basis	项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字。
		// 不要收缩
		// flex:none
		// 方法三
		flex-shrink: 0;
	}
	> view {
		// 弹性布局
		display: flex;
		// 排列方向
		flex-direction: column;
		// 对齐方式   上下两边
		justify-content: space-between;
		// 商品名称
		// 第一个view
		> view:first-of-type {
			// 两行 隐藏 ...
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		// 价格
		// 最后一个view
		> view:last-of-type {
			color: red;
			font-size: 1.1em;
		}
	}
}
.btn-gotop {
	position: fixed;
	right: 40rpx;
	bottom: 150rpx;
	width: 100rpx;
	height: 100rpx;
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 50%;
	border: 1px solid #7e7e7e;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
