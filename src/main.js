// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
Vue.config.productionTip = false
Vue.use(ElementUI);
const APP_ID = '';
const APP_KEY = '';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
