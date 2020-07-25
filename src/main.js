import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueYoutube from "vue-youtube";

export const eventBus = new Vue();

Vue.use(VueYoutube);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
