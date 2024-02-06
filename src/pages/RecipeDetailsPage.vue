<template>
  <div v-if="getUser.id === recipe.author.id">
    <Modal :show="showDeleteModal" title="Delete recipe" acceptText="Yes, delete" declineText="Cancel"
      @accept="deleteRecipe" @decline="showDeleteModal = false" @close="showDeleteModal = false">
      <p>Are you sure you want to delete this recipe?</p>
    </Modal>
    <Modal :show="showEditModal" title="Edit recipe" acceptText="Submit" declineText="Cancel" @accept="editRecipe"
      @decline="showEditModal = false" @close="showEditModal = false">
      <RecipeForm hideSubmit v-model:formData="recipeForEdit" />
    </Modal>
  </div>
  <div class="text-center">
    <h1 class="mb-4">Recipe Details</h1>
    <h2 class="mb-12">{{ recipe.title }}</h2>
    <div class="flex justify-center" v-if="recipe.author.id === getUser.id">
      <Button text="Edit" color="blue" @click="showEdit" />
      <Button text="Delete" color="red" @click="showDeleteModal = true" />
    </div>
    <p class="text-sm">{{ recipe.author.name }} - {{ recipe.createdAt === recipe.updatedAt || !recipe.updatedAt ?
      'Created: ' + formatting().dateTimeFormattingNumeric(recipe.createdAt) : 'Updated: ' +
      formatting().dateTimeFormattingNumeric(recipe.updatedAt) }}</p>
    <p class="text-sm font-bold">{{ recipe.cookingTime }} min</p>
    <p v-html="formatting().mdToHtml(recipe.description)"></p>
    <h3 class="mt-10 mb-4">Recipe Ingredients</h3>
    <ul>
      <li v-for="ingr in recipe.ingredients" :key="ingr.ingredient.id">{{ ingr.ingredient.name }} <span class="font-bold"> x {{ ingr.quantity
      }}{{ ingr.unit }}</span></li>
    </ul>
    <div class="mt-6">
      <Button text="Add Ingredients to shop list" @click="addToShopList" />
      <Button text="Back to list" @click="$router.push('/recipes')" />
    </div>
  </div>
</template>

<script>
import formatting from '../services/formatting'
import Button from '../components/Button.vue'
import Modal from '../components/Modal.vue'
import RecipeForm from '../components/Recipe/RecipeForm.vue'
import { getRecipe, updateRecipe } from '../services/recipesService'

export default {
  name: 'RecipeDetailsPage',
  components: {
    Button,
    Modal,
    RecipeForm
  },
  setup() {
    const getUser = JSON.parse(localStorage.getItem('getUser'))

    return {
      formatting,
      getUser
    }
  },
  data() {
    return {
      showEditModal: false,
      showDeleteModal: false,
      recipeForEdit: {},
      recipe: {}
    }
  },
  created() {
    this.reloadData()
  },
  methods: {
    reloadData() {
      this.recipe = getRecipe(this.$route.params.id)
    },
    addToShopList() {
      console.log(this.recipe.ingredients)
    },
    showEdit() {
      this.showEditModal = true
      this.recipeForEdit = { ...this.recipe }
    },
    editRecipe() {
      updateRecipe(this.recipeForEdit.id, this.recipeForEdit)
      this.reloadData()
      this.$emit('edit')
      this.showEditModal = false
    },
    deleteRecipe() {
      console.log('Delete recipe')
      this.$emit('delete')
      this.showDeleteModal = false
    }
  }
}
</script>