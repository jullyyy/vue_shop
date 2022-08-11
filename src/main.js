import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
// 导入用于表格的插件
import TreeTable from 'vue-table-with-tree-grid'
// 导入全局样式表
import '../src/assets/css/global.css'

// 导入字体图标
import '../src/assets/fonts/iconfont.css'
import axios from 'axios'

// 配置请求的根路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 设置 Vue.prototype.$http 为 axios 的别名
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
