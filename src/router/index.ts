import HelloWorld from "@/components/hello-world.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 路由懒加载
const About = () => import("../components/about.vue");
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HelloWorld, // 非懒加载
  },
  {
    path: "/about",
    component: About,
    // meta类型需要额外声明，此声明在 src/typings/augmenation.d.ts内
    meta: {
      isAdmin: false,
      title: "关于",
    },
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;