import { Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as userModule from './user-module'

export default new Store({
  modules: { user: userModule },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      filter ({type}) {
        return ['initUser'].includes(type)
      }
    })
  ]
})
