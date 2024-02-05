<template>
  <h1 class="text-4xl mb-12">Recipe List</h1>
  <RecipeList />
</template>

<script>
import RecipeList from '../components/RecipeList.vue'

export default {
  name: 'RecipeListPage',
  components: {
    RecipeList
  }
}
</script>