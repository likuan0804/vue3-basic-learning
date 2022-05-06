import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import fs from 'fs'
// 你同样可以使用 unplugin-vue-components
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 或者使用 unplugin-element-plus
import ElementPlus from 'unplugin-element-plus/vite'

// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/style/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    ElementPlus({
      useSource: true,
    }),
  ],
})
