import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import mitt from "mitt";

const emitter = mitt();
const authRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
    meta: {
      requiresLoggedOut: true,
      class: "Auth",
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/auth/Logout.vue"),
    meta: {
      requiresAuth: true,
      class: "Auth",
    },
  },
];

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
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (from.name && from.name !== "Login") {
    const fromRoute = {
      name: from.name,
      params: from.params,
      query: from.query,
    };
    localStorage.setItem("fromRoute", JSON.stringify(fromRoute));
  }

  emitter.emit("navigate");
  const loggedIn = localStorage.getItem("uid");

  if (to.meta.requiresAuth && !loggedIn) {
    return next("/");
  }

  next();
});
export default router;
