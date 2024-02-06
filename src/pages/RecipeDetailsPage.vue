<template>
  <div class="text-center">
    <h1 class="mb-4">Recipe Details</h1>
    <h2 class="mb-12">{{ recipe.title }}</h2>
    <p class="text-sm">{{ recipe.author.name }} - {{ recipe.createdAt === recipe.updatedAt || !recipe.updatedAt ? 'Created: ' + formatting().dateTimeFormattingNumeric(recipe.createdAt) : 'Updated: ' + formatting().dateTimeFormattingNumeric(recipe.updatedAt) }}</p>
    <p class="text-sm font-bold">{{ recipe.cookingTime }} min</p>
    <p v-html="recipe.description"></p>
    <h3 class="mt-10 mb-4">Recipe Ingredients</h3>
    <ul>
      <li v-for="ingr in recipe.ingredients" :key="ingr.id">{{ ingr.name }} <span class="font-bold"> x {{ ingr.quantity }}{{ ingr.unit }}</span></li>
    </ul>
    <div class="mt-6">
      <Button text="Add Ingredients to shop list" @click="addToShopList" />
      <Button text="Back to list" @click="$router.push('/recipes')" />
    </div>
  </div>
</template>

<script>
import recipes from '../data/recipes'
import formatting from '../services/formatting'
import Button from '../components/Button.vue'

export default {
  name: 'RecipeDetailsPage',
  components: {
    Button
  },
  setup() {
    return {
      formatting
    }
  },
  computed: {
    recipe() {
      const id = this.$route.params.id
      const recipe = recipes.find(recipe => recipe.id == id)
      return {
        ...recipe,
        description: this.formatting().mdToHtml(recipe.description)
      }
    }
  },
  methods: {
    addToShopList() {
      console.log(this.recipe.ingredients)
    }
  }
}
</script>