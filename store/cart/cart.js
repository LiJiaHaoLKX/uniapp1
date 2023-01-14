export default {
	namespaced:true,
	actions:{
		
	},
	mutations:{
		addToCart(state,goods){
			let flag = state.cart.find((x)=>x.goods_id===goods.goods_id)
			if(!flag){
				state.cart.push(goods)
			}else{
				//如果存在直接添加数量，ps：因为这里拿到的flag是浅拷贝所以修改flag是可以影响state.cart
				flag.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		}, 
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		changeRadio(state,goods){
			state.cart.forEach((item,index)=>{
				if(item.goods_id===goods.goods_id){
					state.cart.splice(index,1,goods)
				}
			})
			this.commit('m_cart/saveToStorage')
		},
		deleteList(state,goods){
			state.cart.forEach((item,index)=>{
				if(item.goods_id===goods.goods_id){
					state.cart.splice(index,1)
				}
			})
			this.commit('m_cart/saveToStorage')
		},
		changeCheckAll(state,flag){
			state.cart.forEach((item)=>{
				item.goods_state = flag
			})
			this.commit('m_cart/saveToStorage')
		}
	},
	state:{
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	getters:{
		total(state){
			//循环统计
			return  state.cart.reduce((prev,cur)=>{
				return cur.goods_count+prev
			},0)
			
		},
		//全选按钮状态
		isCheckAll(state){
			return state.cart.every((item)=>{
				return item.goods_state
			})
		},
		//总计
		aggregate(state){
			return state.cart.reduce((prev,current)=>{
				return prev+=current.goods_price*current.goods_count
			},0)
		},
		//购物车数量
		cartLength(state){
			return state.cart.length
		}
	},
}