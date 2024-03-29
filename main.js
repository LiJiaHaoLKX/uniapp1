import App from './App'
import { $http } from '@escook/request-miniprogram'
import store from './store/store.js'
// #ifndef VUE3
import Vue from 'vue'
uni.$http = $http

//设置根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

//请求拦截器
$http.beforeRequest = function (options){
	uni.showLoading({
		title:"数据加载中"
	})
}
//响应拦截器
$http.afterRequest = function (options){
	uni.hideLoading()
}

//封装一个弹窗
uni.$showMsg = function (title='数据请求失败',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif