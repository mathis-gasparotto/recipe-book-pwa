<template> 
  <ul class="max-w-xl divide-y divide-gray-200 dark:divide-gray-700 mx-auto">
    <RecipeListItem v-for="recipe in recipes" :key="recipe" :recipe="recipe" @edit="reloadData" @delete="reloadData" />
  </ul> 
</template>

<script>
import { getRecipes } from '../../services/recipesService'
import { getUser } from '../../services/userService'
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
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    refresh() {
      if (this.refresh) {
        this.reloadData()
        this.$emit('update:refresh', false)
      }
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
      const user = getUser()
      this.recipes = this.me ? recipesList.filter(recipe => recipe.author.id === user.id) : recipesList
    }
  }
}
</script>