import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$axios = axios

Vue.use(ElementUI)

// axios拦截器, 默认增加请求头token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

new Vue({
  render: h => h(App),
}).$mount('#app')
