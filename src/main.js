import Vue from "vue";
// import App from "./App.vue";
import Main from "./views/main.vue";
import router from "./base/router";
import store from "./base/store";
import http from './base/http'

require('./base/mock')
Vue.use(http)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Main)
}).$mount("#app");
