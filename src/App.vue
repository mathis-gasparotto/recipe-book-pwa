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
import { initShoppingList } from './services/shoppingListService'
import { initCurrentUser } from './services/userService'
import { initRecipes, initMyRecipes } from './services/recipesService'
import { initIngredients } from './services/ingredientsService'

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
    initCurrentUser()
    initRecipes()
    initMyRecipes()
    initIngredients()
  }
}
</script>