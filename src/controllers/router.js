import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/djs",
    name: "djs",
    component: () => import("../views/DJs")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;