<template>
	<view>
		<!-- 自定义的组件 -->
		<my-search @myclick="gotoSearch"></my-search>
		<view class="scroll-view-container">

			<!-- 左侧的滑动区域 -->
			<scroll-view scroll-y="true" class="left-scroll-view">
				<view @click="changeActive(item)" v-for="(item,index) in cateList" class="left-scroll-view-item"
					:class="{active:item.cat_id===active}">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="right-scroll-view">
				<view class="right-scroll-view-box" v-for="(item,index) in cateLevel2" :key="item.cat_id">
					<view class="right-scroll-view-cateLevel2">
						/ {{item.cat_name}} /
					</view>
					<view class="right-scroll-view-cateLevel3-box">
						<view class="right-scroll-view-cateLevel3" v-for="(item2,index) in item.children"
							@click="goToGoodsList(item2)">
							<image :src="item2.cat_icon"></image>
							<p>{{item2.cat_name}}</p>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: '',
				//分类数据列表
				cateList: [],
				//列表排他变量
				active: 1,
				//二级分类的列表
				cateLevel2: [],
				//距离顶部的距离
				scrollTop: 1
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList()
		},
		methods: {
			async getCateList() {
				//发送请求
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) {
					return uni.$showMsg()
				}
				res.message.forEach((item) => {
					item.children.forEach((item2) => {
						if (item2.children) {
							item2.children.forEach((item3) => {
								item3.cat_icon = 'https://api-ugo-web.itheima.net/' + item3
									.cat_icon.split('/')[3] + '/' + item3.cat_icon.split('/')[
										4]
							})
						}
					})
				})
				this.cateList = res.message
				this.cateLevel2 = this.cateList[0].children
				uni.$showMsg('请求成功')
			},
			changeActive({
				cat_id
			}) {
				this.active = cat_id
				this.cateList.forEach((item) => {
					if (item.cat_id === cat_id) {
						this.cateLevel2 = item.children
					}
				})
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			goToGoodsList({
				cat_id
			}) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?cid=${cat_id}`
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="less">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;
			height: 100vh;

			.left-scroll-view-item {
				background-color: #f7f7f7;
				line-height: 60px;
				text-align: center;
				font-size: 12px;

				&.active {
					background-color: #ffffff;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.right-scroll-view {
			height: 100vh;
			width: 510rpx;

			.right-scroll-view-box {
				.right-scroll-view-cateLevel2 {
					text-align: center;
					font-weight: bold;
					margin-top: 30rpx;
					font-size: 14px;
				}

				.right-scroll-view-cateLevel3-box {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					align-content: space-around;

					.right-scroll-view-cateLevel3 {
						width: 130rpx;
						height: 130rpx;
						margin-top: 30rpx;
						padding: 20rpx;

						image {
							width: 100%;
							height: 80%;
						}

						p {
							text-align: center;
							font-size: 14px;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
