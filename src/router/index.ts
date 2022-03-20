import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// layouts
import MainLayout from "@/layouts/MainLayout/MainLayout.vue";

// pages
import MainPage from "@/pages/MainPage/MainPage.vue";
import SearchPage from "@/pages/SearchPage/SearchPage.vue";
import FoldersPage from "@/pages/FoldersPage/FoldersPage.vue";

Vue.use(VueRouter);

// routes
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "main",
    redirect: "/tasks",
    component: MainLayout,
    children: [
      {
        path: "/tasks",
        name: "tasks",
        component: MainPage,
      },
      {
        path: "/search",
        name: "search",
        component: SearchPage,
      },
      {
        path: "/folders",
        name: "folders",
        component: FoldersPage,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
