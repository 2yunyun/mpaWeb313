import Vue from 'vue'
import App from '@/views/custom/formMaker/formMaker.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


new Vue({
	el: '#app', // this id is in public/index.html
	render: h => h(App)
})
