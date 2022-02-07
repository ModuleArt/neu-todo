import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// pages
import MainPage from "@/pages/MainPage/MainPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Main",
    component: MainPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
