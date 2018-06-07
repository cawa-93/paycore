import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import AsyncComputed from 'vue-async-computed'

import App from './App.vue'
import router from './router'

import fontawesome from '@fortawesome/fontawesome'
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'

fontawesome.library.add(faSignOutAlt, faHome)

Vue.use(Vuex)
Vue.use(AsyncComputed)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  router,
  store: require('./store').default,
  render: h => h(App)
}).$mount('#app')
