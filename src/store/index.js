import Vue from 'vue'
import Vuex from 'vuex'
import Contacts from '@/store/contacts'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  modules: {
    Contacts
  }
})
