<template>
    <li>
        <div class="flex items-center space-x-6 rtl:space-x-reverse ">
            <div class="flex-1 min-w-0">
            
                <div v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                    <div class="flex justify-between">
                        <div>
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    

                        <label for="default-checkbox" class="text-sm font-medium text-gray-900 truncate dark:text-white">
                        
                                {{ ingredient.quantity }} 
                                {{ ingredient.name }}
                            
                        
                        </label>
                        </div>
                        <div>
                            <i @click="openEditModal(ingredient)" class="cursor-pointer ml-1 material-icons text-gray-500 dark:text-gray-400">edit</i>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {{ recipe.title }}
                    </p>
                    
                </div>
            </div>
        </div>

        <!-- popup update quantity -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div class="bg-white p-8 rounded-md">
                <label for="newQuantity">Nouvelle quantité:</label>
                <input v-model="newQuantity" type="text" id="newQuantity" class="w-full border rounded p-2 mb-4">
                <button @click="updateQuantity" class="bg-blue-500 text-white px-4 py-2 rounded">OK</button>
                <button @click="closeModal" class="bg-gray-400 text-white px-4 py-2 rounded ml-2">Annuler</button>
            </div>
        </div>
    </li>
</template>
  
<script>
export default {
    name: 'ShoppingListItem',
    props: {
        recipe: {
        type: Object,
        required: true
        }
    },
    data() {
        return {
        isModalOpen: false,
        newQuantity: '',
        editingIngredient: null
        };
    },
    methods: {
        openEditModal(ingredient) {
            this.editingIngredient = ingredient;
            this.newQuantity = ingredient.quantity;
            this.isModalOpen = true;
        },
        updateQuantity() {
            console.log("Nouvelle quantité:", this.newQuantity);
            this.closeModal();
        },
        closeModal() {
            this.isModalOpen = false;
            this.editingIngredient = null;
            this.newQuantity = '';
        }
    }
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