import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.scss'
import Buefy from 'buefy/dist/buefy'
import 'buefy/dist/buefy.css'
Vue.config.productionTip = false
Vue.use(Buefy)
new Vue({
  render: h => h(App),
}).$mount('#app')
