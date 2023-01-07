<template>
	<view>
		<view class="search-box">
			<my-search @myclick="gotoSearch"></my-search>
		</view>
		<!-- 自动轮播间隔interval 循环轮播circular-->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
					<image :src="item.image_src" >
				</navigator> 
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view @click="navClickHandler(item)" class="nav-item" v-for="(item,index) in navList" :key="index">
				<image :src="item.image_src" class="nav_img" ></image>
			</view>
		</view>
		<view class="floor-list" v-for="(item,index) in floorData" :key="index">
			<view class="floor-item">
				<image class="floor-title" :src="item.floor_title.image_src" mode="aspectFill"></image>
				<view class="floor-img-box">
					<navigator :url="item.product_list[0].url" class="left-img-box">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<view class="right-img-box">
						<!-- /subpkg/goods_list/goods_list?query=服饰 -->
						<navigator :url="item2.url" class="right-img-item" v-if="item2!==item.product_list[0]" v-for="(item2,index2) in item.product_list" :key="index2">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorData:[]
			}
		},
		onLoad() {
			//调用方法获取轮播图数据
			this.getSwiperList()
			this.getNavList()
			this.getFloorData()
		},
		methods: {
			//获取轮播图数据
			async getSwiperList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status!==200){
					//返回是undefined,但是函数会执行
					
					return uni.$showMsg()
				}
				this.swiperList = res.message
				uni.$showMsg('数据请求成功')
			},
			//获取小分类数据
			async getNavList(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200){
					return uni.$showMsg()
				}
				this.navList = res.message
				uni.$showMsg('数据请求成功')
			},
			//跳转到分类页面
			navClickHandler(item){
				if(item.name ==='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			//获取楼层数据
			async getFloorData(){
				let {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status!==200){
					return uni.$showMsg()
				}
				res.message.forEach(floor=>{
					floor.product_list.forEach(product=>{
						product.url = `/subpkg/goods_list/goods_list?${product.navigator_url.split('?')[1]}`
					})
				})
				this.floorData = res.message
				uni.$showMsg('数据请求成功')
			},
			//跳转至搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="less">
swiper {
	height: 330rpx;
}
.swiper-item,image {
	width: 100%;
	height: 100%;
} 
.nav-list{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin: 30rpx;
	.nav-item{
		height: 160rpx;
		.nav_img{
			width: 128rpx;
			height: 140rpx;
		}
	}
}
.floor-list{
	margin-left: 15rpx;
	margin-right: 10rpx;
	width: 725rpx;
	.floor-title{
		height: 58rpx;
		width: 100%;
		display: flex;
	}
	.floor-img-box{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		.right-img-box{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			flex-wrap: wrap;
		}
	}
}
/* 设置search组件吸顶效果 */
.search-box{
	/* 设置定位效果为吸顶 */
	position: sticky;
	//吸顶的位置
	top: 0;
	//提高层级，防止被轮播图覆盖
	z-index: 999;
}
</style>
