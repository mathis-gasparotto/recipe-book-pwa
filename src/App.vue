<template>
  <div class="dark">
    <div v-if="route.name || route.name !== 'NotFound'">
      <NavBar />
      <div class="p-4 sm:ml-64 text-black dark:text-white">
        <router-view></router-view>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { useRoute } from 'vue-router'
import user from './data/user'
import recipes from './data/recipes'
import ingredients from './data/ingredients'
import { initShoppingList } from './services/shoppingListService'

export default {
  setup() {
    const route = useRoute()
    return {
      route
    }
  },
  components: {
    NavBar
  },
  created() {
    initShoppingList()
    localStorage.getItem('shopppingList') || localStorage.setItem('shopppingList', JSON.stringify([]))
    localStorage.getItem('user') || localStorage.setItem('user', JSON.stringify(user))
    localStorage.getItem('recipes') || localStorage.setItem('recipes', JSON.stringify(recipes))
    localStorage.getItem('ingredients') || localStorage.setItem('ingredients', JSON.stringify(ingredients))
  }
}
</script>