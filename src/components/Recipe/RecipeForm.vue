<template>
  <form class="max-w-sm mx-auto">
    <div class="mb-5">
      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" id="title"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="recipe.title" required>
    </div>

    <div class="mb-5">
      <label for="shortDescription" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short
        Description</label>
      <textarea id="shortDescription"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
        v-model="recipe.shortDescription" rows="5" required></textarea>
    </div>

    <div class="mb-5">
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
      <textarea id="description"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="recipe.description" rows="5" required></textarea>
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Import from picture</label>
      <input @change="handleFileUpload"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input" type="file">
    </div>

    <div class="mb-5">
      <label for="cookingTime" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cooking Time
        (min)</label>
      <input type="number" scope="1" min="0" id="cookingTime"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="recipe.cookingTime" required>
    </div>

    <div class="mb-5">
      <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Ingredients</p>
      <div v-for="(ingr, index) in recipe.ingredients" :key="index" class="flex mb-4">
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="recipe.ingredients[index].ingredient">
          <option disabled :value="null">-- Choose ingredient --</option>
          <option v-for="ingredientData in ingredients" :value="ingredientData" :key="ingredientData.id">{{
            ingredientData.name }}</option>
        </select>
        <div class="flex">
          <input type="number" scope="1" min="0" v-model="recipe.ingredients[index].quantity"
            v-if="recipe.ingredients[index]"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required>
          <input type="text" v-model="recipe.ingredients[index].unit" v-if="recipe.ingredients[index]"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required>
        </div>
        <button type="button" @click="deleteIngredient(index)"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512">
            <path
              d="M424 64h-88V48c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16H88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283C87.788 491.919 108.848 512 134.512 512h242.976c25.665 0 46.725-20.081 47.945-45.717L439.256 176H448c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zM208 48c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zM80 104c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40H80zm313.469 360.761A15.98 15.98 0 0 1 377.488 480H134.512a15.98 15.98 0 0 1-15.981-15.239L104.78 176h302.44z"
              fill="currentColor"></path>
            <path
              d="M256 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16zM336 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16zM176 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
              fill="currentColor"></path>
          </svg>
          <span class="sr-only">Add Ingredient</span>
        </button>
      </div>
      <button type="button" @click="addIngredient"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 512">
          <path fill="currentColor"
            d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z">
          </path>
          <path fill="currentColor"
            d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z">
          </path>
        </svg>
        <span class="sr-only">Add Ingredient</span>
      </button>
    </div>

    <button v-if="!hideSubmit" type="submit" @click.prevent="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</template>

<script>
import Tesseract from 'tesseract.js'

export default {
  name: 'RecipeForm',
  props: {
    formData: {
      type: Object,
      default: {
        title: '',
        shortDescription: '',
        description: '',
        cookingTime: 0,
        ingredients: []
      }
    },
    hideSubmit: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const ingredients = JSON.parse(localStorage.getItem('ingredients'))

    return {
      ingredients
    }
  },
  computed: {
    recipe: {
      get() {
        return this.formData
      },
      set(val) {
        this.$emit('update:formData', val)
      }
    }
  },
  methods: {
    addIngredient() {
      this.recipe.ingredients.push({
        ingredient: null,
        quantity: 0,
        unit: ''
      })
    },
    submit() {
      this.$emit('submit', {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter(i => i.ingredient !== null)
      })
    },
    deleteIngredient(index) {
      this.recipe.ingredients.splice(index, 1)
    },
    // Fonction appelée lorsqu'un fichier est sélectionné
    handleFileUpload(event) {
      const fileInput = event.target
      if (fileInput.files.length > 0) {
        const uploadedImage = fileInput.files[0]
        this.processImage(uploadedImage)
      }
    },
    // Fonction pour traiter l'image avec Tesseract.js
    processImage(image) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target.result

        Tesseract.recognize(imageData, 'fra', {
          logger: m => console.log(m)
        })
          .then(({ data: { text } }) => {

            this.recipe.description = text
          })
          .catch(error => {
            console.error('Erreur lors du traitement de l\'image:', error)
          })
      }
      reader.readAsDataURL(image)
    }
  }
}
</script>