<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goods_info.pics">
				<image @click="preview(index)" :src="item.pics_mid_url" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="goods_info_box">
			<!-- 价格 -->
			<view class="price">
				￥{{goods_info.goods_price ||''}}
			</view>
			<view class="goods_info_body">
				<!-- 商品介绍 -->
				<view class="goods_name">
					{{goods_info.goods_name ||''}}
				</view>
				<!-- 收藏图标 -->
				<view class="favi">
					<uni-icons type="star" size="26" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递:免运费{{cart.length}}
			</view>
		</view>
		<!-- 富文本可以将html标签渲染出来 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品导航区域 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapGetters
	} from 'vuex'
	import {
		mapMutations
	} from 'vuex'
	import badgr from '@/mixins/tabber-badgr.js'
	export default {
		data() {
			return {
				//商品详情页面对象
				goods_info: {

				},
				//底部goods-nav组件数据
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
					 backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			//获取数据
			this.getGoodsInfo(goods_id)
			this.options[1].info = this.total
		},
		mixins:[badgr],
		methods: {
			//获取数据函数
			async getGoodsInfo(goods_id) {
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				//利用正则表达式对字符串进行修改
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				this.goods_info =res.message
			},
			//预览图片
			preview(index) {
				uni.previewImage({
					//显示第几张图片
					current: index,
					//图片数组,map返回的会进入一个数组里面
					urls: this.goods_info.pics.map((x) => x.pics_big_url)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					//整理参数
					const goods ={
						goods_id: this.goods_info.goods_id,//商品的Id
						goods_name: this.goods_info.goods_name, //商品的名称
						goods_price: this.goods_info.goods_price,//商品的价格
						goods_count: 1,//商品的数量
						goods_small_logo: this.goods_info.goods_small_logo,//商品的图片
						goods_state: true//商品的勾选状态
					}
					//修改cart仓库数据
					this.addToCart(goods)
					//矫正购物车数量
					this.setBadge()
				}
			},
			...mapMutations('m_cart', ['addToCart'])
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			total(newValue){
				//调整购物车数量
				this.options[1].info = newValue
			},
		}
	}
</script>

<style lang="less">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods_info_box {
		padding: 30rpx 20rpx 20rpx 20rpx;

		.price {
			color: #a00000;
			font-size: 44rpx;
		}

		.goods_info_body {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;

			.goods_name {
				width: 520rpx;
				font-size: 30rpx;

			}

			.favi {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 150rpx;
				text-align: center;
				border-left: 1px solid #b0b0b0;

				text {
					font-size: 24rpx;
					color: #b0b0b0;
				}

			}
		}

		.yf {
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #b0b0b0;
		}
	}

	.goods_nav {
		position: sticky;
		bottom: 0;
	}
</style>
