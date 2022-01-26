import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import '@/element-ui'
import '../vue.config.js'
import { Loading } from 'element-ui'

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:3000"

let loadingInstance = null
axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service({ fullscreen: true })
  return config
})

axios.interceptors.response.use(response => {
  loadingInstance.close()
  return response
})

Vue.filter('dateFormat', (dtStr) => {
  const dt = new Date(dtStr)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

function padZero(n) {
  return n > 9 ? n : '0' + n
}
Vue.prototype.$http = axios
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
