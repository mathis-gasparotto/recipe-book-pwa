<template>
  <div class="mt-2">
    <div class="input-newingredient flex">
      <input v-model="newIngredient" type="text" id="newIngredient" class="w-full border rounded p-2"
        placeholder="Ajouter un nouvel ingrédient">
      <button @click="addIngredient" class="ml-2 bg-pink-500 text-white px-4 py-2 rounded">Ajouter</button>
    </div>
  </div>
  <ul class="max-w-xl">
    <li>
      <div class="flex items-center space-x-6 rtl:space-x-reverse ">
        <div class="flex-1 min-w-0">

          <ShoppingListItem v-for="ingr in shoppingList" :ingredient="ingr" :key="ingr.id" @reload="reloadData" />
        </div>
      </div>
    </li>
  </ul>
  <Button text="Uncheck All" @click="uncheckAll"/>
  <Button text="Check All" @click="checkAll"/>
  <Button text="Remove All Checked" @click="removeAllChecked"/>
  <Button text="Remove All" @click="removeAll"/>
</template>
  
<script>
import ShoppingListItem from './ShoppingListItem.vue'
import { addSingleIngredientToShoppingList, checkAllIngredients, getShoppingList, uncheckAllIngredients, removeAllCheckedIngredients, removeAllIngredients } from '../../services/shoppingListService'
import Modal from '../Modal.vue'
import Button from '../Button.vue';

export default {
  name: 'ShoppingList',
  components: {
    ShoppingListItem,
    Modal,
    Button
},
  data() {
    return {
      newIngredient: '',
      shoppingList: [],
    };
  },
  created() {
    this.reloadData()
  },
  methods: {
    reloadData()  {
      this.shoppingList = getShoppingList()
    },
    addIngredient() {
      addSingleIngredientToShoppingList({name: this.newIngredient});
      this.newIngredient = '';
      this.reloadData();
    },
    checkAll() {
      checkAllIngredients()
      this.reloadData()
    },
    uncheckAll() {
      uncheckAllIngredients()
      this.reloadData()
    },
    removeAllChecked() {
      removeAllCheckedIngredients()
      this.reloadData()
    },
    removeAll() {
      removeAllIngredients()
      this.reloadData()
    }
  }
}
</script>