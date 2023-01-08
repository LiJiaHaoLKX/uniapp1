<template>
	<view>
		<view class="goods-list">
			<view @click="goToDateil(item.goods_id)" v-for="(item,index) in goodsList" :key="index" >
				<my-goods :item="item"></my-goods>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数
				queryobj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10,

				},
				//goods列表数据
				goodsList: [],
				//节流阀
				isLoding:true
			};
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoding = false
				let {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryobj)
				cb && cb()
				this.isLoding = true
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}else if(res.message.goods.length===0){
					return uni.$showMsg('暂无更多数据')
				}
				this.queryobj.pagenum+=1
				this.goodsList.push(...res.message.goods)
				uni.$showMsg('请求成功')
			},
			goToDateil(goods_id){
				console.log(goods_id);
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${goods_id}`
				})
			}
		},
		onLoad(options) {
			this.queryobj.query = options.query || ""
			this.queryobj.cid = options.cid || ""
			this.getGoodsList()
		},
		//触底刷新
		onReachBottom() {
			if(!this.isLoding) return
			this.getGoodsList()
		},
		//下来刷新
		onPullDownRefresh(){
			//重置关键数据
			this.queryobj.pagenum = 1
			this.goodsList = []
			//重新发送请求,传递回调函数，结束下来刷新
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		
	}
</script>

<style lang="less">
	.goods-list{
		width: 720rpx;
	}
</style>
