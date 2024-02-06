<template>
  <h1 class="mb-12">Recipe List</h1>
  <RecipeList />
</template>

<script>
import RecipeList from '../components/Recipe/RecipeList.vue'

export default {
  name: 'RecipeListPage',
  components: {
    RecipeList
  }
}
</script>