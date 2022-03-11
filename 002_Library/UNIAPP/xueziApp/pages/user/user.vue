<template>
	<view class="content">
		<!-- 背景图 -->
		<image class="img-bg" src="/static/images/pikaqiu.jpeg"></image>
		<!-- logo图片 -->
		<image class="img-logo" src="/static/icons/logo.png"></image>
		<!-- 表单区域 -->
		<!-- 用户名 -->
		<view class="input-area">
			<image src="/static/images/user.png"></image>
			<input type="text" value="" placeholder="用户名/手机号" />
		</view>
		<!-- 密码 -->
		<view class="input-area-pwd">
			<image src="/static/images/mima.png"></image>
			<input :type="pwd_type" value="" placeholder="密码" />
			<image
				@click="pwd_status = !pwd_status"
				:src="pwd_icon"
			></image>
		</view>
		<!-- 登录按钮 -->
		<view class="btn-login">登录</view>
		<!-- 账户操作区域 -->
		<view class="account-area">
			<view>忘记密码?</view>
			<view>立即注册</view>
		</view>
		<!-- 底部按钮  第三方登录 -->
		<view class="bottom">
			<!-- 横线和第三方的登录 -->
			<view>
				<view class="line"></view>
				<view>第三方直接登录</view>
				<view class="line"></view>
			</view>
			<!-- 图标 -->
			<view>
				<view><image src="/static/images/qq.jpg" mode=""></image></view>
				<view><image src="/static/images/wx.jpg" mode=""></image></view>
				<view><image src="/static/images/wb.jpg" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 是否显示密码的状态  true 为显示   false为不显示
			// 通过点击修改状态
			pwd_status: false
		};
	},
	computed: {
		// 文本显示状态  明文  密文
		pwd_type() {
			return this.pwd_status ? 'text' : 'password';
		},
		// 眼睛图片的src属性
		pwd_icon(){
			return this.pwd_status? '/static/images/eye.png':'/static/images/eye-close.png'
		}
	},
	methods: {}
};
</script>

<style lang="scss">
// 底部第三方登录
.bottom {
	position: fixed;
	bottom: 150rpx;
	left: 0;
	right: 0;
	padding: 0 100rpx;
	// 第三登录的文字
	> view:first-child {
		color: white;
		display: flex;
		align-items: center;
		> .line {
			height: 1px;
			background-color: white;
			width: 150rpx;
		}
	}
	> view:last-child {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
		// 图标的view
		> view {
			padding: 10rpx;
			border-radius: 50%;
			overflow: hidden;
			background-color: white;
		}
		// 图片大小
		image {
			width: 80rpx;
			height: 80rpx;
		}
	}
}
// 账户操作区域
.account-area {
	z-index: 1;
	margin-top: 30rpx;
	display: flex;
	justify-content: space-between;
	view {
		color: white;
		text-decoration: underline;
	}
}
// 登录按钮
.btn-login {
	border-radius: 10rpx;
	z-index: 1;
	margin-top: 30rpx;
	padding: 10rpx;
	width: 100%;
	background-color: orange;
	color: white;
	text-align: center;
}
// 密码
.input-area-pwd {
	border-radius: 10rpx;
	padding: 15rpx;
	z-index: 1;
	margin-top: 30rpx;
	background-color: white;
	color: gray;
	display: flex;
	// flex-direction: row;
	align-item: center;
	> image {
		width: 50rpx;
		height: 50rpx;
		margin: 0rpx 20rpx;
	}
}
// 用户名
.input-area {
	border-radius: 10rpx;
	padding: 15rpx;
	z-index: 1;
	margin-top: 100rpx;
	background-color: white;
	color: gray;
	display: flex;
	// flex-direction: row;
	align-item: center;
	> image {
		width: 50rpx;
		height: 50rpx;
		margin: 0rpx 20rpx;
	}
}
// logo
.img-logo {
	// logo 大小
	// rpx  微信小程序  把iphone6 屏幕宽度 分为750份  1rpx就是一份
	width: 400rpx;
	height: 100rpx;
	// 对齐方式  主轴自居中
	align-self: center;
	// 背景色
	background-color: white;
	// 填充
	padding: 5rpx 20rpx;
	// 圆角
	border-radius: 10rpx;
}
// 背景图
.img-bg {
	// 浮动
	position: fixed;
	// 调整位置
	left: 0;
	top: 0;
	// 拉伸
	width: 100%;
	height: 100%;
	// z-index 设置层
	z-index: 0;
	// 模糊
	filter: blur(2px);
}
// 整个内容
.content {
	padding: 100rpx;
	// flex 布局
	display: flex;
	// 排列方式  竖向  垂直  cloumn
	flex-direction: column;
}
</style>
