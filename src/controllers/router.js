import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/Dashboard")
  },
  {
    path: "/djs",
    name: "djs",
    component: () => import("../views/DJs")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;