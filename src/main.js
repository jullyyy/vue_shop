import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'

// 导入全局样式表
import '../src/assets/css/global.css'

// 导入字体图标
import '../src/assets/fonts/iconfont.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')