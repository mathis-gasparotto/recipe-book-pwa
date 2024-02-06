<template>
  <h1 class="mb-12">My Recipes</h1>
  <RecipeList me />
</template>

<script>
import RecipeList from '../components/Recipe/RecipeList.vue'

export default {
  name: 'MyRecipePage',
  components: {
    RecipeList
  }
}
</script>