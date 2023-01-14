import { mapGetters } from 'vuex'
	export default {
		data(){
			return {
				
			}
		},
		computed:{
			...mapGetters('m_cart',['total'])
		},
		methods:{
			setBadge(){
				uni.setTabBarBadge({
					index:1,
					text:this.total+'' //text不能位数字，所以我们在数字后面加上''
				})
			}
		},
		onShow() {
			this.setBadge()
		}
	}