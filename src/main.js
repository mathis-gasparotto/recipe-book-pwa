import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import { getRecipe, getMyRecipe } from './services/recipesService'
import './firebase'
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { createWorker } from 'tesseract.js'
import { updateData } from './services/firebaseService'
import { getCurrentUser } from './services/userService'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Recipe Details') {
    const recipeId = to.params.id
    const recipe = getRecipe(recipeId) || getMyRecipe(recipeId)
    if (!recipe) {
      return next({ name: 'Recipes' })
    }
  }
  next()
})

createApp(App).use(router).mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    try {
      window.Tesseract = createWorker({
        workerPath: '/assets/lib/tesseract/worker.min.js',
        langPath: '/assets/lib/lang/tesseract/tesseract.js-fra.traineddata.gz',
        corePath: '/assets/lib/tesseract/tesseract-core.wasm.js',
      })
      const registration = await navigator.serviceWorker.register(
        import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw',
        { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
      )
      console.log('SW registered', registration)
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        new Notification('Nouvelle recette');
        // ...
      });
      getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: import.meta.env.VITE_FIREBASE_MESSAGING_PUBLIC_VAPID_KEY
      }).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken)
          if (getCurrentUser()) {
            updateData('users/' + getCurrentUser().uid, {messagingToken: currentToken})
          }
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    } catch (error) {
      console.log('SW registration failed', error)
    }
  })

}


