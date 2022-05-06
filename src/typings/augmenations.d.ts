/**
 * 模块导出的2种方式
 */
// 方法一：全局导出声明
// 确保是模块
// export {}

// declare module 'vue-router' {
//   // 自定义元字段声明
//   interface RouteMeta {
//     // is optional
//     isAdmin?: boolean
//     // must be declared by every route
//     requiresAuth?: boolean,
//     title?: string
//   }
// }

// // 方法二：模块导出声明
declare interface RouteMeta {
  // is optional
  isAdmins: boolean
  // must be declared by every route
  requiresAuth?: boolean
  title: string
}
