<template>
  <div v-if="me">
    <Modal :show="showDeleteModal" title="Delete recipe" acceptText="Yes, delete" declineText="Cancel"
      @accept="deleteRecipe" @decline="showDeleteModal = false" @close="showDeleteModal = false">
      <p>Are you sure you want to delete this recipe?</p>
    </Modal>
    <Modal :show="showEditModal" title="Edit recipe" acceptText="Submit" declineText="Cancel" @accept="editRecipe"
      @decline="showEditModal = false" @close="showEditModal = false">
      <RecipeForm hideSubmit v-model:formData="recipeForEdit" />
    </Modal>
  </div>
  <li class="pb-3 sm:pb-4">
    <router-link :to="`/recipes/${recipe.id}`">
      <div class="flex items-center space-x-6 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {{ recipe.title }}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            {{ recipe.shortDescription }}
          </p>
        </div>
        <div v-if="me"
          class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <Button text="Edit" color="blue" @click="showEdit" />
          <Button text="Delete" color="red" @click="showDeleteModal = true" />
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {{ recipe.cookingTime }} min
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
import { deleteRecipe, updateRecipe } from '../../services/recipesService'
import Button from '../Button.vue'
import Modal from '../Modal.vue'
import RecipeForm from './RecipeForm.vue'

export default {
  name: 'RecipeListItem',
  emits: ['edit', 'delete'],
  components: {
    Button,
    Modal,
    RecipeForm
  },
  props: {
    me: {
      type: Boolean,
      default: false
    },
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showEditModal: false,
      showDeleteModal: false,
      recipeForEdit: {}
    }
  },
  created() {
    this.recipeForEdit = { ...this.recipe }
  },
  methods: {
    showEdit() {
      this.showEditModal = true
      this.recipeForEdit = { ...this.recipe }
    },
    editRecipe() {
      updateRecipe(this.recipeForEdit.id, this.recipeForEdit)
      this.$emit('edit')
      this.showEditModal = false
    },
    deleteRecipe() {
      deleteRecipe(this.recipe.id)
      this.$emit('delete')
      this.showDeleteModal = false
    }
  }
}
</script>