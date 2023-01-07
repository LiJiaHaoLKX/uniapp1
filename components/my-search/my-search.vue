<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}">
		<!-- 使用view组件模拟input输入框 -->
		<view @click="searchBoxHandler" class="my-search-box" :style="{'border-radius':radius+'rpx'}">
			<uni-icons type='search' size='17'></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			//背景颜色
			bgcolor:{
				type:String,
				default:'red'
			},
			//圆角尺寸
			radius:{
				type:Number,
				default:36
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('myclick')
			}
		}
	}
</script>

<style lang="less">
.my-search-container{
	height: 100rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
	.my-search-box{
		height: 72rpx;
		background-color: white;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.placeholder {
			margin-left: 10rpx;
		}
	}
}
</style>