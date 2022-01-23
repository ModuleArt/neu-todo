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
        secondary: "#b0bec5",
        accent: "#A7FFEB",
        error: "#E91E63",
      },
    },
  },
};

export default new Vuetify(opts);
