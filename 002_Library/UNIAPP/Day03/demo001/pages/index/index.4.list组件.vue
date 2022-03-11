<template>
	<view>
		<!-- ulist 列表 -->
		<uni-list>
			<!-- clickable 可点击的  showArrow 显示箭头 -->
			<uni-list-item title="账号和安全" click showArrow></uni-list-item>
			<!-- rightText 右侧文字 -->
			<uni-list-item
				title="青少年模式"
				rightText="未开启"
			></uni-list-item>
			<uni-list-item
				title="微信安全中心"
				note="如果遇到微信被盗,无法登陆的情况,可以前往中心申诉"
			></uni-list-item>
			<uni-list-item
				title="扫一扫"
				thumb="/static/logo.png"
				showArrow
			></uni-list-item>
			<uni-list-item
				title="雷达添加好友"
				thumb="/static/logo.png"
				thumbSize="lg"
				showArrow
				clickable
			></uni-list-item>
			<!-- showSwitch 显示开关 -->
			<!-- bluetooth_text 显示文本  已开启  已关闭-->
			<!-- bluetooth_status  bool类型   true 开启   false 关闭 -->
			<!-- bluetoothChange  切换开关触发的处理方法 -->
			<!-- @ vue 对于事件的处理  v-on 缩写 -->
			<uni-list-item
				title="蓝牙"
				showSwitch
				:rightText="bluetooth_text"
				:switchChecked="bluetooth_status"
				@switchChange="bluetoothChange"
			></uni-list-item>
			<!-- 显示扩展图标 -->
			<uni-list-item
				title="10000"
				showExtraIcon
				:extraIcon="{
					color: 'rgb(18, 183, 245)',
					size: '24',
					type: 'qq'
				}"
			></uni-list-item>
			<uni-list-item
				title="10000"
				showExtraIcon
				:extraIcon="{
					color: 'rgb(0, 255, 0)',
					size: '24',
					type: 'weixin'
				}"
			></uni-list-item>
			<uni-list-item
				title="10000"
				showExtraIcon
				:extraIcon="{
					color: 'rgb(255, 0, 0)',
					size: '24',
					type: 'weibo'
				}"
			></uni-list-item>
			<uni-list-item
				title="请点击下载"
				showExtraIcon
				:extraIcon="{
					color: 'orangered',
					size: '30',
					type: 'cloud-download'
				}"
			></uni-list-item>
			<!-- 自定义插槽  插槽 提供更多的订制方式 -->
			<!-- direction 布局排列方式  column 竖向  row 横向 -->
			<uni-list-item direction="row">
				<template slot="header">
					<view style="background-color: #007AFF;">
						<text>头部范围</text>
						<text>头部范围</text>
					</view>
				</template>
				<template slot="body">
					<view style="background-color:#18BC37;">
						<text>身体范围</text>
						<text>身体范围</text>
					</view>
				</template>
				<template slot="footer">
					<view style="background-color:#DD524D;">
						<text>脚部范围</text>
						<text>脚部范围</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// bluetooth_text: '未开启',
			bluetooth_status: false
		};
	},
	methods: {
		bluetoothChange(e) {
			console.log(e.value);
			// 取反  特别开关操作   true 取反 false   false 取反为 true
			this.bluetooth_status = !this.bluetooth_status;
			// if(this.bluetooth_status == true){
			// 	this.bluetooth_status = false
			// }else{
			// 	this.bluetooth_status =true
			// }
			//  前面表达式 为真  则第一项生效   为假 后面项生效
			// this.bluetooth_text = this.bluetooth_status ? '已开启' : '已关闭';
		}
	},
	// 其中数据  通过其他数据  计算得出  可以将其放在计算属性中  本身具有缓存  数据改变才更新  效率更高一些
	computed: {
		bluetooth_text() {
			return this.bluetooth_status ? '已开启' : '已关闭';
		}
	}
};
</script>

<style scoped lang="scss">
	// deep 深度 穿透
/deep/ .uni-switch-input {
	// 调高优先级
	background-color: red !important;
	border-color: red !important;
}
</style>
