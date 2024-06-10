import { initData, createData, updateData } from './firebaseService'
import { getCurrentUser } from './userService'

export function updateRecipe(recipeId, newRecipe) {
  const newData = {
    ...newRecipe,
    ingredients: newRecipe.ingredients
      .filter((i) => i.ingredient.name !== null && i.ingredient.name !== '' && i.quantity > 0)
      .map((i) => ({
        ingredient: i.ingredient,
        quantity: i.quantity
      })),
    updatedAt: new Date().toISOString()
  }
  updateData('users/' + getCurrentUser().uid + '/recipes' + '/' + recipeId, newData)
}

export function deleteRecipe(recipeId) {
  let recipeList = getMyRecipes()
  recipeList.filter((r) => r.id != recipeId)
  localStorage.setItem('myRecipes', JSON.stringify(recipeList))
  removeData('users/' + getCurrentUser().uid + '/recipes' + '/' + recipeId)
  return recipeList
}

export function getRecipe(recipeId) {
  let recipeList = getRecipes()
  const recipe = recipeList.find((r) => r.id == recipeId)
  if (!recipe) return
  return {
    ingredients: [],
    ...recipe,
    me: false
  }
}

export function getRecipes() {
  const recipes = JSON.parse(localStorage.getItem('recipes'))
  return Object.values(recipes).map((r) => ({
    ingredients: [],
    ...r
  }))
}

export function getMyRecipe(recipeId) {
  let recipeList = getMyRecipes()
  const recipe = recipeList.find((r) => r.id == recipeId)
  if (!recipe) return
  return {
    ingredients: [],
    ...recipe,
    me: true
  }
}

export function getMyRecipes() {
  const recipes = JSON.parse(localStorage.getItem('myRecipes'))
  return Object.values(recipes).map((r) => ({
    ingredients: [],
    ...r
  }))
}

export function createRecipe(recipe) {
  const now = new Date()
  const newRecipe = {
    ...recipe,
    ingredients: recipe.ingredients
      .filter((i) => i.ingredient.name !== null && i.ingredient.name !== '' && i.quantity > 0)
      .map((i) => ({
        ingredient: i.ingredient,
        quantity: i.quantity
      })),
    id: now.getTime(),
    me: true,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  }
  createData('users/' + getCurrentUser().uid + '/recipes' + '/' + newRecipe.id, newRecipe)
  return newRecipe
}

export function initRecipes() {
  initData('recipes', 'recipes')
}

export function initMyRecipes() {
  if (getCurrentUser()) {
    initData('users/' + getCurrentUser().uid + '/recipes', 'myRecipes')
  } else {
    localStorage.setItem('myRecipes', JSON.stringify([]))
  }
}
