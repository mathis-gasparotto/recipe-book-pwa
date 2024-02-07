import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import { getRecipe } from './services/recipesService'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Recipe Details') {
    const recipeId = to.params.id
    const recipe = getRecipe(recipeId)
    if (!recipe) {
      return next({ name: 'Recipes' })
    }
  }
  next()
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
