import { createStore } from 'vuex'
// 本地持久化存储
import createPersistedState from 'vuex-persistedstate'
import enumData from './modules/enumData'

// 存储的值
const PERSIST_PATHS = ['panorama.defaultActive']

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    enumData,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: PERSIST_PATHS,
    }),
  ],
})
