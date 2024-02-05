<template> 
  <ul class="max-w-xl divide-y divide-gray-200 dark:divide-gray-700">
    <RecipeListItem v-for="recipe in recipes" :key="recipe" :recipe="recipe" />
  </ul> 
</template>

<script>
import RecipeListItem from './RecipeListItem.vue'
import recipes from '../data/recipes'

export default {
  name: 'RecipeList',
  components: {
    RecipeListItem
  },
  setup() {
    return {
      recipes
    }
  },
}
</script>