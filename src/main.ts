import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')


//vue2的创建方式
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })