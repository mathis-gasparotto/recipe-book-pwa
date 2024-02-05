import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

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
