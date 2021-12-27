import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import store from 'vuex'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import "@/assets/global.css"



const options = {
  draggable: false
}

Vue.use(Toast, options);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
