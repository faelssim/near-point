import Vue from 'vue'
import App from './App.vue'
import '../style/reset.css'
import '../style/global.css'

Vue.config.productionTip = false

// 自定义指令-loading
Vue.directive('loading', {
    bind: function (el) {
        const loading = document.createElement('div')
        loading.setAttribute('class', 'loading-container')
        loading.appendChild(document.createElement('div'))
        el.loadingHTML = loading
    },
    update: function(el, { value }) {
        if (value) {
            document.body.appendChild(el.loadingHTML)
        } else {
            document.body.removeChild(el.loadingHTML)
        }
    }
})

new Vue({
  render: h => h(App),
}).$mount('#app')


