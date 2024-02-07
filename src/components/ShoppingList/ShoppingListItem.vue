<template>
  <div class="flex justify-between">

    <Modal :show="showModal" title="Edit ingredient" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center" @accept="submit" @decline="showModal = false" acceptText="Submit" declineText="Cancel" @close="showModal = false">
      <form class="max-w-sm mx-auto">
        <div class="mb-5" v-if="!editingIngredient.ingredient.id">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient Name</label>
          <input type="text" id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="editingIngredient.ingredient.name" required>
        </div>
        <div class="mb-5" v-else>
          <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingredient Quantity</label>
          <input type="number" min="0" step="1" id="quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="editingIngredient.quantity" required>
        </div>
      </form>
    </Modal>
    <div>
      <input id="default-checkbox" type="checkbox" :checked="ingredient.checked" @input="updateCheckIngredient"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">


      <label for="default-checkbox" class="text-sm font-medium text-gray-900 truncate dark:text-white">

        {{ ingredient.ingredient.name }} <span class="font-bold" v-if="ingredient.quantity"> x {{ ingredient.quantity }}{{
          ingredient.ingredient.unit }}</span>


      </label>
    </div>
    <div>
      <i @click="showModalFunction" class="cursor-pointer ml-1 material-icons text-gray-500 dark:text-gray-400">edit</i>
    </div>
  </div>
</template>
  
<script>
import { checkIngredient, updateIngredient } from '../../services/shoppingListService';
import Modal from '../Modal.vue';

export default {
  name: 'ShoppingListItem',
  props: {
    ingredient: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newQuantity: '',
      editingIngredient: null,
      showModal: false
    };
  },
  methods: {
    updateCheckIngredient() {
      this.ingredient.checked = !this.ingredient.checked;
      checkIngredient(this.ingredient.id);
    },
    submit() {
      updateIngredient(this.ingredient.id, this.editingIngredient);
      this.showModal = false;
      this.$emit('reload');
    },
    showModalFunction() {
      this.showModal = true
      this.editingIngredient = {
        ...this.ingredient,
        ingredient: { ...this.ingredient.ingredient }
      }
    }
  },
  components: { Modal }
}
</script>

<style>
#default-checkbox {
  margin-right: 10px;
}

.cursor-pointer {
  margin-right: 0;
}
</style>