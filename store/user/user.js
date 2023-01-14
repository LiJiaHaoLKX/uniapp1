export default {
	namespaced:true,
	actions:{
		
	},
	mutations:{
		changeAddress(state,address){
			state.address = address
			uni.setStorageSync('address',JSON.stringify(address))
		}
	},
	state:{
		address:JSON.parse(uni.getStorageSync('address') ||'{}')
	},
	getters:{
		addstr(state){
			if(state.address){
				return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
			}
			return ''
		},

	},
}