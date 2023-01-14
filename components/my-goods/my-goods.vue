<template>
	<view class="goods-item">
		<view v-if="showRadio" class="goods-item-left">
			<radio @click="clickRadio(item)" :checked="item.goods_state" color="#c00000"></radio>
		</view>
		<view class="goods-item-img">
			<image
				:src="item.goods_small_logo ||'https://img-blog.csdnimg.cn/20210423111341499.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RvbV9fY3k=,size_16,color_FFFFFF,t_70#pic_center'">
			</image>
		</view>
		<view class="goods-item-box">
			<view class="goods-item-box-top">
				{{item.goods_name}}
			</view>	
			<view class="goods-item-box-bottom">
				<view class="">
					￥{{item.goods_price}}.00
				</view>
				<!-- 商品数量 -->
				<uni-number-box :value="item.goods_count" @change="bindChange" v-if="showRadio":min="1"></uni-number-box>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	import badgeMix from '@/mixins/tabber-badgr.js'
	export default {
		name: "my-goods",
		props: {
			item: {
				type: Object,
				default: {

				}
			},
			showRadio: {
				type: Boolean,
				default: false
			}
	},
	mixins:[badgeMix],
	data() {
			return {

			};
		},
		methods:{
			...mapMutations('m_cart',['changeRadio']),
			//修改商品数量
			bindChange(e){
				this.item.goods_count = e
				this.changeRadio(this.item)
				//mixin里面的函数
				this.setBadge()
			},
			//点击Radio
			clickRadio(item){
				item.goods_state = !item.goods_state
				this.changeRadio(this.item)
				
			}
		},
		computed:{
		}
	}
</script>

<style lang="less">
	.goods-item {
		width: 710rpx;
		display: flex;
		justify-content: space-between;
		padding: 15rpx;
		border-bottom: 1px solid #efefef;

		.goods-item-left {
			width: 50rpx;
			display: flex;
			align-items: center;
		}

		.goods-item-img {
			width: 200rpx;
			height: 200rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-item-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 450rpx;

			.goods-item-box-top {
				font-size: 25rpx;
			}

			.goods-item-box-bottom {
				display: flex;
				justify-content: space-between;
				color: #a00000;
				font-size: 40rpx;
			}
		}
	}
</style>
