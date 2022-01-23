import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#009688",
      },
    },
  },
};

export default new Vuetify(opts);
