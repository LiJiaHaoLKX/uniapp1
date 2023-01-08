<template>
	<view class="goods-item">
		<view class="goods-item-img">
			<image :src="item.goods_small_logo ||'https://img-blog.csdnimg.cn/20210423111341499.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1RvbV9fY3k=,size_16,color_FFFFFF,t_70#pic_center'"></image>
		</view>
		<view class="goods-item-box">
			<view class="goods-item-box-top">
				{{item.goods_name}}
			</view>
			<view class="goods-item-box-bottom">
				￥{{item.goods_price}}.00
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		props:['item'],
		data() {
			return {

			};
		},
		onShow() {
		}
	}
</script>

<style lang="less">
	.goods-item {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 15rpx;
		border-bottom: 1px solid #efefef;

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
			width: 500rpx;

			.goods-item-box-top {
				font-size: 25rpx;
			}

			.goods-item-box-bottom {
				color: #a00000;
				font-size: 40rpx;
			}
		}
	}
</style>
