import { createStore } from 'vuex'

export default createStore({
  state: {
    apiBase: import.meta.env.VITE_API_BASE || 'http://localhost:8000',
  },
  getters: {
    apiBase: (s) => s.apiBase,
  },
  mutations: {},
  actions: {},
  modules: {},
})
