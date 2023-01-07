<template>
	<view class="search-box">
		<uni-search-bar v-model="kw" :focus="true" :cancelButton="none" :radius="36" @input="input"></uni-search-bar>
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item,index) in searchList" :key="item.goods_id">
				<view class="goods_name" @click="goToDetail(item.goods_id)">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<view class="search-history-box" v-show="kw.length===0">
			<view class="search-history">
				<text>搜索历史</text>
				<uni-icons @click="clearHistory" :size="24" type="trash"></uni-icons>
			</view>
			<view class="search-history-text">
				<ul>
					<li @click="changeInput(item)" v-for="(item,index) in searchHistory" :key="index">{{item}}</li>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//定时器变量
				timer: null,
				//搜索文字
				kw: '',
				//商品列表
				searchList: [],
				//搜索历史
				searchHistory: []
			};
		},
		methods: {
			//输入搜索框
			async input(e) {
				//防抖
				if (this.kw.length === 0) {
					return this.searchList = []
				}
				let result = await new Promise((res, rej) => {
					clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						res(e)
					}, 500)
				})
				this.kw = result
				if (this.kw.length === 0) {
					this.searchList = []
					return
				}
				let {
					data: res
				} = await uni.$http.get(`/api/public/v1/goods/qsearch?query=${this.kw}`)
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				this.searchList = res.message

				if(this.searchList.length===0){
					uni.$showMsg('暂无该商品')
				}
				//节流
				/* if(this.flag){
					this.kw = e
					this.flag=!this.flag
					setTimeout(()=>{
						this.flag = true
					},1000)
				} */
			},
			//跳转住deteil页面
			goToDetail(id) {
				uni.navigateTo({
					url: `/subpkg/goods_detail/goods_detail?goods_id=${id}`
				})
				//判断搜索历史数组长度是否大于xxx
				if (this.searchHistory.indexOf(this.kw) === -1) {
					this.searchHistory.push(this.kw)
					if (this.searchHistory.length > 8) {
						this.searchHistory.shift()
					}
				}
				//清空搜索栏文字
				this.kw = ''
				//将搜索记录加入本地缓存
				uni.setStorage({
					key: 'searchList',
					data: this.searchHistory,
				})
			},
			//搜索历史记录
			changeInput(e) {
				this.kw = e
			},
			//清空历史记录
			clearHistory(){
				this.searchHistory = []
				//将搜索记录加入本地缓存
				uni.setStorage({
					key: 'searchList',
					data: this.searchHistory,
				})
			},
			//加载页面时获取本地数据
			onReady() {
				this.searchHistory = uni.getStorageSync("searchList") ||[];
			}
		}
	}
</script>

<style lang="less">
	.search-box {
		/* 吸顶效果 */
		position: sticky;
		top: 0;
		z-index: 999;

		.sugg-list {
			padding: 0 5px;

			.sugg-item {
				font-size: 24rpx;
				padding: 26rpx 0;
				border-bottom: 1px solid #efefef;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.goods-name {
					//文字不许换行
					white-space: normal;
					//溢出部分隐藏
					overflow: hidden;
					//溢出部分用...代替
					text-overflow: ellipsis;
					margin-right: 6rpx;
				}
			}
		}

		.search-history-box {
			padding: 20rpx 20rpx;

			.search-history {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #efefef;
				padding: 0 0 20rpx 0;
			}

			.search-history-text {
				margin-top: 10rpx;

				ul {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;

					li {
						border-radius: 15rpx;
						background-color: #f7f7f7;
						font-size: 40rpx;
						padding: 5rpx 30rpx;
						margin: 5rpx;
					}
				}
			}
		}
	}
</style>
