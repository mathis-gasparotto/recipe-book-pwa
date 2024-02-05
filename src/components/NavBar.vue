<template>
  <aside id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="route in routes" :key="route.path">
          <router-link :to="route.path"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <svg v-if="route.svgPaths"
              class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path v-for="path in route.svgPaths" :key="path" :d="path" />
            </svg>
            <span class="ms-3">{{ route.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>

  <div
    class="sm:translate-y-16 transition-transform fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
    <div class="flex justify-evenly h-full max-w-lg mx-auto font-medium">
      <router-link :to="route.path" v-for="route in routes" :key="route.path"
        class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg v-if="route.svgPaths"
          class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path v-for="path in route.svgPaths" :key="path" :d="path" />
        </svg>
        <span
          class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{{ route.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import routes from '../routes'

export default {
  name: 'NavBar',
  setup() {
    return {
      routes
    }
  }
}
</script>