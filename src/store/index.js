import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: [
      { id: 1, title: 'Покормить кота', status: true },
      { id: 2, title: 'Поесть', status: false },
      { id: 3, title: 'Почесать ногу', status: true },
      { id: 4, title: 'Погулять', status: false },
      { id: 5, title: 'Купить ёршик', status: true }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
})
