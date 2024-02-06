<template> 
  <ul class="max-w-xl divide-y divide-gray-200 dark:divide-gray-700">
    <RecipeListItem v-for="recipe in recipes" :key="recipe" :recipe="recipe" @edit="reloadData" />
  </ul> 
</template>

<script>
import { getRecipes } from '../../services/recipesService'
import RecipeListItem from './RecipeListItem.vue'

export default {
  name: 'RecipeList',
  components: {
    RecipeListItem
  },
  props: {
    me: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      recipes: []
    }
  },
  created() {
    this.reloadData()
  },
  methods: {
    reloadData() {
      const recipesList = getRecipes()
      const getUser = JSON.parse(localStorage.getItem('getUser'))
      this.recipes = this.me ? recipesList.filter(recipe => recipe.author.id === getUser.id) : recipesList
    }
  }
}
</script>