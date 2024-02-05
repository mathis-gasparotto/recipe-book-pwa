<template>
  <div class="dark">
    <div v-if="!currentView.name || currentView.name !== 'NotFound'">
      <NavBar />
      <div class="p-4 sm:ml-64 text-black dark:text-white">
        <router-view></router-view>
        <!-- <component :is="currentView" /> -->
      </div>
    </div>
    <router-view v-else></router-view>
    <!-- <component v-else :is="currentView" /> -->
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import NotFound from './pages/NotFound.vue'
import routes from './routes.js'



export default {
  data() {
    return {
      currentPath: window.location.pathname
    }
  },
  components: {
    NavBar
  },
  computed: {
    currentView() {
      const route = routes.find(r => r.path === this.currentPath)
      return route ? route.component : NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>