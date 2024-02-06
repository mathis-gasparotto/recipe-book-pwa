<template> 
    <div class="mt-2">
        <div class="input-newingredient flex">
          <input v-model="newIngredient" type="text" id="newIngredient" class="w-full border rounded p-2" placeholder="Ajouter un nouvel ingrédient">
          <button @click="addIngredient" class="ml-2 bg-pink-500 text-white px-4 py-2 rounded">Ajouter</button>
        </div>
      </div>
    <ul class="max-w-xl">
      <ShoppingListItem v-for="recipe in recipes" :key="recipe" :recipe="recipe" />
    </ul> 
</template>
  
<script>
import ShoppingListItem from './ShoppingListItem.vue'
import { getRecipes } from '../services/recipesService'

export default {
    name: 'ShoppingList',
    components: {
        ShoppingListItem
    },
    setup() {
      const recipes = getRecipes()

      return {
        recipes
      }
    },
    data() {
        return {
        newIngredient: ''
        };
    },
    methods: {
        addIngredient() {
        console.log("Nouvel ingrédient:", this.newIngredient);
        this.newIngredient = '';
        }
    }
}
</script>
<style>
.input-newingredient {
    margin-bottom: 20px;
}    
</style>