import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import vClickOutside from 'v-click-outside'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import utc from 'dayjs/plugin/utc'

dayjs.locale(ru)
dayjs.extend(utc)

Vue.config.productionTip = false

Vue.use(vClickOutside)

Vue.prototype.$date = dayjs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
