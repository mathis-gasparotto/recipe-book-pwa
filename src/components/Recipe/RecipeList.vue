<template> 
  <ul class="max-w-xl divide-y divide-gray-200 dark:divide-gray-700 mx-auto">
    <RecipeListItem v-for="recipe in recipes" :key="recipe" :recipe="recipe" @edit="reloadData" @delete="reloadData" :me="me" />
  </ul> 
</template>

<script>
import { getRecipes, getMyRecipes } from '../../services/recipesService'
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
      this.recipes = this.me ? getMyRecipes() : getRecipes()
    }
  }
}
</script>