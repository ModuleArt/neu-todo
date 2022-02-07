import Vue from "vue";

// plugins
import router from "@/router";
import store from "@/store";
import vuetify from "@/plugins/vuetify";
import "@/plugins/touchEvents";

// components
import App from "@/App.vue";

// styles
import "@/assets/scss/styles.scss";

Vue.prototype.$mapFields = Vue;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  beforeCreate() {
    store.dispatch("initStore");
  },
}).$mount("#app");
