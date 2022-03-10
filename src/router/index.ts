import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// pages
import MainPage from "@/pages/MainPage/MainPage.vue";
import SearchPage from "@/pages/SearchPage/SearchPage.vue";

Vue.use(VueRouter);

// routes
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/search",
    name: "search",
    component: SearchPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
