import Vue from 'vue'
import App from '@/views/app.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})

