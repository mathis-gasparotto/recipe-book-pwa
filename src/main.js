import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routes'
import * as VueRouter from 'vue-router'

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async function() {
//     try {
//       const registration = await navigator.serviceWorker.register(new URL('./service-worker.js'), { type: 'module' })
//       console.log('SW registered', registration)
//     } catch (error) {
//       console.log('SW registration failed', error)
//     }
//   })
// }
