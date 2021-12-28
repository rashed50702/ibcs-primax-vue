import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import store from 'vuex'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import "@/assets/global.css"
import {func} from './func.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


const options = {
  draggable: false
}

Vue.use(Toast, options);

Vue.prototype.$func = func


Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
