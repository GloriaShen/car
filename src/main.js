// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import { Get, Post, Delete, Put, pGet, pPost } from './service/getData'
Vue.prototype.Get = Get;
Vue.prototype.Post = Post;
Vue.prototype.Delete = Delete;
Vue.prototype.Put = Put;
Vue.prototype.pGet = pGet;
Vue.prototype.pPost = pPost;
// Vue.prototype.userInfo = userInfo;


Vue.config.productionTip = false

import { Indicator, Loadmore } from 'mint-ui'
Vue.prototype.Indicator = Indicator;
Vue.component(Loadmore.name, Loadmore);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
