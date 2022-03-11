<template>
	<view>
		<!-- 商品列表 -->
		<!-- 发送请求=>拿数据=>存本地=>做展示 -->
		<!-- 4.做展示 -->
		<!-- 远程加载数据  如果没有数据请求回来 为null 判断数据为null 就不渲染页面 -->
		<uni-list v-if="data">
			<uni-list-item v-for="(item, index) in data.data" :key="index">
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
		<!-- 底部加载组件 -->
		<!-- uload -->
		<!-- status状态是固定的 只有三个 more 加载更多  loading 加载中  noMore 没有更多 -->
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
export default {
	data() {
		return {
			data: null,
			// 触底加载的组件状态
			status: 'more'
		};
	},
	// 触底事件
	onReachBottom() {
		// console.log('到底了,要加载数据了......');
		// 请求数据并合并
		// 获取当前页数pno和最大页数pageCount
		// es6 解构语法 https://www.runoob.com/w3cnote/deconstruction-assignment.html
		// let pno = this.data.pno;
		// let pageCount = this.data.pagerCount
		const { pno, pageCount } = this.data;
		// 如果当前页数,就是最大页数  说明没有后续数据了  直接退出
		if (pno == pageCount) {
			// 加载组件的状态 noMore
			this.status = 'noMore';
			return;
		}
		// 加载数据时,做请求,需要把加载组件状态也进行修改  改为loading 加载中
		this.status = 'loading';
		// 传入当前页的真实页数
		this.getData(pno);
	},
	mounted() {
		this.getData(0);
	},
	methods: {
		getData(pno) {
			// 判断默认请求第一页
			// 如果是触底事件加载 需要请求下一页
			// 1.发送请求
			uni.request({
				url: 'http://www.codeboy.com:9999/data/product/list.php',
				method: 'GET',
				data: { pno:pno+1 },
				success: res => {
					// 2.拿数据
					console.log(res);
					// 3.存本地
					this.data = res.data;
					// 需要把原来的数据和现在的新数据进行拼接
					// es6 [...旧数据,...新数据]
					// 判断非第一页才需要合并数组
					if (pno > 1) {
						// 新数据的key =  [...旧数据,...新数据]
						res.data.data = [...this.data.data, ...res.data.data];
						// 旧数据的key = 新数据  data pno pageCount要一起更新
						this.data = res.data;
					}
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
</style>
