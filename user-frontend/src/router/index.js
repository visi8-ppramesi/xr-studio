import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  // {
  //   path: "/blog",
  //   name: "Blog",
  //   component: () => import(/* webpackChunkName: "blog" */ "../views/Blog.vue"),
  // },
  {
    path: "/assets/:type?/:query?",
    name: "Assets",
    component: () => import("@/views/assets/Assets.vue"),
  },
  {
    path: "/asset/:id",
    name: "Asset",
    component: () => import("@/views/assets/Asset.vue"),
  },
  {
    path: "/equipments/:type?/:query?",
    name: "Equipments",
    component: () => import("@/views/equipments/Equipments.vue"),
  },
  {
    path: "/equipment/:id",
    name: "Equipment",
    component: () => import("@/views/equipments/Equipment.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
