import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
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
];

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
      class: "Home",
    },
  },
  {
    path: "/shoots/list",
    name: "list",
    component: () => import("../views/shoots/ShootsList.vue"),
    meta: {
      requiresAuth: true,
      class: "Shoot",
    },
  },
  {
    path: "/shoots/list/:shootId",
    name: "subList",
    component: () => import("../views/shoots/ShootsList.vue"),
    meta: {
      requiresAuth: true,
      class: "Shoot",
    },
  },
  {
    path: "/shoots/list/:shootId/assets",
    name: "assetSubList",
    component: () => import("../views/shoots/ShootsList.vue"),
    meta: {
      requiresAuth: true,
      class: "Shoot",
    },
  },
  {
    path: "/shoots/list/:shootId/equipments",
    name: "equipmentsSubList",
    component: () => import("../views/shoots/ShootsList.vue"),
    meta: {
      requiresAuth: true,
      class: "Shoot",
    },
  },
  {
    path: "/shoots/list/:shootId/procedures",
    name: "proceduresSubList",
    component: () => import("../views/shoots/ShootsList.vue"),
    meta: {
      requiresAuth: true,
      class: "Shoot",
    },
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

  if (to.meta.requiresLoggedOut && !!loggedIn) {
    return next("/");
  }

  if (to.meta.requiresAuth && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
