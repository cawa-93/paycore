import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import AsyncComputed from 'vue-async-computed'

import App from './App.vue'
import router from './router'

Vue.use(Vuex)
Vue.use(AsyncComputed)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store: require('./store').default,
  render: h => h(App)
}).$mount('#app')
