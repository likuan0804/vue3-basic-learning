/**
 * createRouter 这个为创建路由的方法
 * createWebHashHistory 这个就是vue2中路由的模式，
 *                      这里的是hash模式，这个还可以是createWebHistory等
 * RouteRecordRaw 这个为要添加的路由记录，也可以说是routes的ts类型
 */
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
// 路由记录，这个跟vue2中用法一致
const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'todolist',
    component: () => import("@/views/TodoList.vue"),
    alias: '/todolist',
    meta: {
      title: 'todolist页面'
    }
  },
  {
    path: '/father',
    name: 'father',
    component: () => import("@/views/Father.vue"),
    meta: {
      title: 'father页面'
    }
  },
  {
    path: '/myFun',
    name: 'myFun',
    component: () => import("@/views/myFun.vue"),
    meta: {
      title: 'father页面'
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;