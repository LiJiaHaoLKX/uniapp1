<template>
	<view>
		<view class="address-change-box">
			<button v-if="!address.telNumber" size="mini" type="primary" @click="chooseAddress">请选择收货地址+</button>
			<view  @click="chooseAddress" v-if="address.telNumber" class="address-info-box">
				<view class="address-info-box-top">
					<text>收货人：{{address.userName}}</text>
					<view class="phone">
						<text>电话:{{address.telNumber}}</text>
						<uni-icons size="12" type="right"></uni-icons>
					</view>
				</view>
				<view class="address-info-box-bottom">
					收货地址:{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<image src="@/static/image/login.png" mode="widthFix"></image>
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		methods:{
			async chooseAddress(){
				/* const res = await uni.chooseAddress().catch(err=>err) */
				uni.chooseAddress({
					success: (res) => {
						this.changeAddress(res)
					}
				})
			},
			...mapMutations('m_user',['changeAddress'])
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
			
		}
	}
</script>

<style lang="less">
	.address-change-box {
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25rpx;
		.address-info-box{
			width: 95%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.address-info-box-top{
				display: flex;
				justify-content: space-between;
			}
		}
	}
	image {
		width: 100%;
	}
</style>