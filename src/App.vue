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
import { initRecipes, initMyRecipes, getMyRecipe, getRecipe } from './services/recipesService'
import { initIngredients } from './services/ingredientsService'
import { registerUser, loginUser } from './services/firebaseService'

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
    // loginUser('test@test.tes', 'testtest')
    // registerUser('test@test.tes', 'testtest')
    initShoppingList()
    initRecipes()
    initMyRecipes()
    initIngredients()
  }
}
</script>