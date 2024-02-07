<template>
  <Modal :show="showAddModal" title="Edit recipe" acceptText="Submit" declineText="Cancel" @accept="submitAdd"
    @decline="cancelToAdd" @close="cancelToAdd">
    <RecipeForm hideSubmit v-model:formData="recipe" />
  </Modal>

  <h1 class="mb-12">My Recipes</h1>
  <RecipeList me />

  <div class="fixed sm:bottom-10 sm:right-10 bottom-20 right-5">
    <button type="button" @click="showAdd"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512">
        <path
          d="M437.332 192H32c-17.664 0-32 14.336-32 32v21.332c0 17.664 14.336 32 32 32h405.332c17.664 0 32-14.336 32-32V224c0-17.664-14.336-32-32-32zm0 0"
          fill="currentColor"></path>
        <path
          d="M192 32v405.332c0 17.664 14.336 32 32 32h21.332c17.664 0 32-14.336 32-32V32c0-17.664-14.336-32-32-32H224c-17.664 0-32 14.336-32 32zm0 0"
          fill="currentColor"></path>
      </svg>
      <span class="sr-only">Icon description</span>
    </button>
  </div>
</template>

<script>
import RecipeList from '../components/Recipe/RecipeList.vue'
import Modal from '../components/Modal.vue'
import RecipeForm from '../components/Recipe/RecipeForm.vue'
import { createRecipe } from '../services/recipesService'

export default {
  name: 'MyRecipePage',
  components: {
    RecipeList,
    Modal,
    RecipeForm
  },
  data() {
    return {
      showAddModal: false,
      recipe: {}
    }
  },
  methods: {
    initForm() {
      this.recipe = {
        title: 'test',
        shortDescription: 'test',
        description: 'test',
        cookingTime: 30,
        ingredients: []
      }
    },
    showAdd() {
      this.showAddModal = true
      this.initForm()
    },
    cancelToAdd() {
      this.showAddModal = false
      this.initForm()
    },
    submitAdd() {
      this.showAddModal = false
      const recipeCreated = createRecipe(this.recipe)
      this.$router.push({ name: 'Recipe Details', params: { id: recipeCreated.id }})
      this.initForm()
    }
  }
}
</script>