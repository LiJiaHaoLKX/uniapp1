import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart/cart.js'
import moduleUser from './user/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
	
	modules:{
		'm_cart':moduleCart,
		'm_user':moduleUser
	}
})