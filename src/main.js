import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from "axios";
import '../src/assets/css/reset.css';
import debounce from "./assets/debounce";
import { Indicator } from 'mint-ui';


Vue.prototype.$debounce = debounce;
// axios.defaults.baseURL = 'http://192.168.43.116:3003';
axios.defaults.baseURL = 'https://api.songjintao.cn';
axios.defaults.timeoUt = 3000;
// axios.defaults.baseURL = 'http://192.168.2.110:3003';
// 请求拦截
axios.interceptors.request.use(config => {
  Indicator.open({
    text: '拼命加载中...',
    spinnerType: 'fading-circle'
  })
  return config
}, err => {
  Indicator.close();
  return Promise.reject(err)
})
//相应拦截
axios.interceptors.response.use(response => {
  Indicator.close();
  return response
}, err => {
  Indicator.close();
  return Promise.reject(err)
})


Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
