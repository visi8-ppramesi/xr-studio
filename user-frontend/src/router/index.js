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
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
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

const assetRoutes = [
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
];

const equipmentRoutes = [
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
];

const creatorRoutes = [
  {
    path: "/creators/:type?/:query?",
    name: "Creators",
    component: () => import("@/views/creators/Creators.vue"),
  },
  {
    path: "/creator/:id",
    name: "Creator",
    component: () => import("@/views/creators/Creator.vue"),
  },
  {
    path: "/creator/notification",
    name: "Creator",
    component: () => import("@/views/creators/Notification.vue"),
  },
];

const preproRoutes = [
  {
    path: "/production/service-request",
    name: "PreproductionServiceRequest",
    component: () =>
      import("@/views/production/PreproductionServiceRequest.vue"),
  },
  {
    path: "/production/service-about",
    name: "PreproductionServiceAbout",
    component: () => import("@/views/production/PreproductionServiceAbout.vue"),
  },
  {
    path: "/production/custom-asset-request",
    name: "CustomAssetRequest",
    component: () => import("@/views/production/CustomAssetRequest.vue"),
  },
];

const studioRoutes = [
  {
    path: "/studio/calendar",
    name: "Calendar",
    component: () => import("@/views/studio/Calendar.vue"),
  },
  {
    path: "/studio/about-shoot",
    name: "AboutShoot",
    component: () => import("@/views/studio/AboutShoot.vue"),
  },
  {
    path: "/studio/register-shoot",
    name: "RegisterShoot",
    component: () => import("@/views/studio/RegisterShoot.vue"),
  },
];

const shopRoutes = [
  {
    path: "/shopping/cart",
    name: "Cart",
    component: () => import("@/views/shopping/Cart.vue"),
  },
];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  ...authRoutes,
  ...assetRoutes,
  ...equipmentRoutes,
  ...creatorRoutes,
  ...preproRoutes,
  ...studioRoutes,
  ...shopRoutes,
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  //eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
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
