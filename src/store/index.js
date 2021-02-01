import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: [
      { id: 1, title: 'Покормить кота', status: true, date: '2021-05-05' },
      { id: 2, title: 'Поесть', status: false, date: '2021-01-20' },
      { id: 3, title: 'Почесать ногу', status: true, date: '2021-05-05' },
      { id: 4, title: 'Погулять', status: false, date: '2021-03-15' },
      { id: 5, title: 'Купить ёршик', status: true, date: '2021-10-20' }
    ]
  },
  actions: {
    CreateTask({ commit }, payload) {
      const newTask = {
        id: Math.floor(Math.random() * 100),
        title: payload.title,
        date: payload.date,
        status: false
      }
      commit('CREATE_TASK', newTask)
    },
    DeleteTask({ commit }, payload) {
      commit('DELETE_TASK', payload)
    }
  },
  mutations: {
    CREATE_TASK: (state, payload) => {
      state.taskList.push(payload)
    },
    DELETE_TASK: (state, payload) => {
      state.taskList = state.taskList.filter(item => item.id !== payload)
    }
  },
  modules: {}
})
