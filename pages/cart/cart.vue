<template>
	<view class="cart">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		<view class="cart_title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart_title_text">购物车</text>
		</view>
		<view class="active">
			<uni-swipe-action ref="action">
				<uni-swipe-action-item @click="deleteList(item),setBadge()" :right-options="options" v-for="(item,index) in cart">
					<my-goods :showRadio="true" :key="index" :item="item"></my-goods>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		
		<!-- 结算组件 -->
		<view class="my-settle">
			<my-settle></my-settle>
		</view>
		<!-- 空白购物车的区域 -->
		<view class="empty-cart" v-if="cart<=0">
			<image src="/static/image/noData.png"></image>
			<text class="tip-text">当前购物车空空如也~</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	import badgeMix from '@/mixins/tabber-badgr.js'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#a00000'
					}
				}]
			}
		},
		computed: {
			...mapGetters('m_cart', ['total']),
			...mapState('m_cart', ['cart'])
		},
		methods: {
			setBadge() {
				uni.setTabBarBadge({
					index: 1,
					text: this.total + '' //text不能位数字，所以我们在数字后面加上''
				})
			},
			...mapMutations('m_cart',['deleteList'])
		},
		onLoad() {
			this.setBadge()
		},
		onShow() {
			this.setBadge()
		}
	}
</script>

<style lang="less">
	.cart{
		position: relative;
		.cart_title {
			height: 80rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding-left: 10rpx;
			border-bottom: 1px solid #efefef;
		
			.cart_title_text {
				margin-left: 20rpx;
			}
		}
	}
	.active {
		padding-bottom: 130rpx;
	}
	.empty-cart{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		image {
			width: 350rpx;
			height: 350rpx;
		}
		text {
			font-size: 30rpx;
			color:#F55F5C
		}
		
	}
</style>
