## 启动

> 现发现 windows 下 build 会有问题，windows 系统的同学可将 build 打包命令由`vuedx-typecheck . && vite build` 改为 `vite build && tsc`,ci 脚本内加一条
> ：`run: npx --no-install vuedx-typecheck`

```bash
# node version >= 12
node -v
# 8.9.4
nvm use 12
# 使用 nvm 管理 node 版本
# 或者根目录下 .nvmrc 直接配置12版本
# 启动
yarn dev
# 打包
yarn build
# preview 打包预览
yarn serve
# lint
yarn lint
```
## 说明

- 技术栈：`vue3 & vite2 & ts; node version >= 12`,请使用 `nvm + avn 管理node版本`
- 基本使用： pc
- 可在根目录下添加/修改 `移动端适配` 相关样式作为移动端项目模板
- 已添加配套的 `axios` & `router` 基础配置&封装文件
- 全局样式和样式相关变量在`src/styles/index.less`文件中
  - 局部变量在 `src/styles/varible.less`中配置
- 富文本：只兼容 pc 端
  1. [Vue3-Editor](https://github.com/wangeditor-team/wangEditor-with-vue3)
  2. [ts-Editor](https://github.com/wangeditor-team/wangEditor-with-ts/blob/master/package.json)

```ts
// vite.config.ts
// 配置scss/less全局变量
{
  preprocessorOptions: {
    scss: {
      additionalData: `$primary: blue;`
    },
    less: {
      modifyVars: {
        'primary-color': '#1DA57A',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      },
      javascriptEnabled: true,
    }
  }
}
```

## 开发说明
```json
// tsconfig.json
// 在 node 后面增加一项xxx即可
{
  "types": ["vite/client", "node", "xxx"]
}
```

## 选择 UI 组件：

目前 2 种比较流行的 UI 组件库全都引入了一遍，都有问题，其中 element plus 问题更大，所以选择用 antd2

### UI 组件的问题

> element-plus
> and-design-vue 版本问题！！！现发现 `form & input`组件在引入 es 包时一直报
> 错`The requesed module '/node_modules/is-mobile/index.js' is dose not provide an export named 'isMobile'`，遂升级至 2.1.1 版本，同时删除 vite.config 里
> optimizeDeps 的 exclude 的配置,才能使用

- 详见[组件库依赖的 ismobilejs 存在兼容性问题](https://github.com/vueComponent/ant-design-vue/issues/1936)

### ant-design-vue 按需加载问题

查看[Imports using @ant-design/icons-vue should be importing the ESM version](https://github.com/vueComponent/ant-design-vue/issues/3570)

```js
// 引入模块
import Button from "ant-design-vue/es/button";
// 同时引入样式文件，路径相同
import "ant-design-vue/es/button/style";
```

### Element-plus 包问题

查
看[element plus issues: [Bug Report] error: [ vite:dep-scan ] Failed to resolve entry for package "element-plus". The package may have incorrect main/module/exports specified in its package.json](https://github.com/element-plus/element-plus/issues/1632)

### 参考

- [Vue3](https://v3.cn.vuejs.org/api/global-api.html#withdirectives)
- [Vue Router4](https://next.router.vuejs.org/zh/guide/#html)
- [Vite2](https://vitejs.dev/guide/api-javascript.html)
- [TS](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [typescript-eslint 配置](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
- [esbuild](https://esbuild.github.io/getting-started/#bundling-for-the-browser)
