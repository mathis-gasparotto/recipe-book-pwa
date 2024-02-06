<template> 
  <ul class="max-w-xl divide-y divide-gray-200 dark:divide-gray-700">
    <RecipeListItem v-for="recipe in recipes" :key="recipe" :recipe="recipe" />
  </ul> 
</template>

<script>
import RecipeListItem from './RecipeListItem.vue'
import recipesList from '../../data/recipes'

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
  computed: {
    recipes() {
      // TODO: Replace with actual user ID
      return this.me ? recipesList.filter(recipe => recipe.author.id === 1) : recipesList
    }
  },
}
</script>