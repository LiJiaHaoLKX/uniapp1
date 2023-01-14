<template>
	<view class="my-settle">
		<view class="checkAll">
			<radio :checked="isCheckAll" @click="changeCheckAll(!isCheckAll)" color="#a00000"></radio>
			<text>全选</text>
		</view>
		<view class="aggregate">
			<text>合计:￥{{aggregate}}.00</text>
		</view>
		<view class="close-an-account">
			结算({{cartLength}})
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
			};
		},
		methods:{
			...mapMutations('m_cart',['changeCheckAll'])
		},
		computed:{
			...mapGetters('m_cart',['isCheckAll','aggregate','cartLength'])
		}
	}
</script>

<style lang="less">
	.my-settle{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background-color: white;
		.checkAll{
			margin-left: 10rpx;
		}
		.close-an-account{
			height: 130rpx;
			width: 240rpx;
			background-color: #BF0001;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 30rpx;
			color: white;
		}
		.aggregate{
			color: #a00000;
		}
	}

</style>