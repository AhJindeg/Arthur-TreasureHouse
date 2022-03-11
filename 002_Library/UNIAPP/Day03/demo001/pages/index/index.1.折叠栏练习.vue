<template>
	<!-- 完成一个案例效果 -->
	<!-- 发送请求=>拿数据=>存本地=>做展示 -->
	<!-- html地方 -->
	<view>
		<!-- 4.做展示 -->
		<!-- ucoll -->
		<!-- accordion 手风琴效果 只打开一个 其它关闭 -->
		<uni-collapse accordion>
			<!-- key 唯一标识  使用尽量短的   一般使用index -->
			<!-- : 动态的属性绑定  vue会进行解析   js代码   v-bind 缩写形式 -->
			<uni-collapse-item
				v-for="(item, index) in data"
				:key="item.heroId"
				:title="item.title"
				:thumb="
					`https://game.gtimg.cn/images/lol/act/img/champion/${
						item.alias
					}.png`
				"
			>
				<!-- 写两个按钮 -->
				<view>
					<!-- item.banAudio  英雄的ban音频地址 -->
					<button
						type="primary"
						size="mini"
						@click="playAudio(item.banAudio)"
					>
						BAN
					</button>
					<button
						type="warn"
						size="mini"
						@click="playAudio(item.selectAudio)"
					>
						PICK
					</button>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
// JS代码
export default {
	// option 配置项  属于同等级别
	data() {
		// 这里的数据可以在模板中进行渲染显示
		return {
			// 这里的key定义一般用data result... 数据结果
			// 初始化  声明一下  null 为空 啥都没有
			data: null,
			// 防止多个音频同时播放  使用同一个音频对象
			audio: uni.createInnerAudioContext()
		};
	},
	mounted() {
		// 调用方法
		this.getData();
	},
	methods: {
		// 播放音频
		playAudio(url) {
			// url 形参 看具体调用的方法传入的参数
			// 创建一个音频对象
			// let audio = uni.createInnerAudioContext()
			// 音频地址
			this.audio.src = url;
			// 再播放之前先停掉之前的  避免多个音频同时播放
			this.audio.stop();
			// 手动开启播放
			this.audio.play();
		},
		// 发请求的处理方法
		getData() {
			// uniapp 1.发送请求
			// urequest
			uni.request({
				// 接口地址
				url:
					'https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js?v=43',
				// 请求方法   POST GET
				// Restful接口风格   四种请方式  PUT DELETE GET POST
				method: 'GET',
				// 携带参数  没有可以不传
				data: {},
				// 成功后执行
				success: res => {
					// 2.拿数据
					// console.log(res);
					// 3.存本地
					this.data = res.data.hero;
				},
				// 失败后执行
				fail: () => {},
				// 请求完毕后执行
				complete: () => {}
			});
		}
	}
};
</script>

<style scoped>
/* 样式 */
</style>
