import { getCurrentUser, getUserByID } from './userService'
import recipes from '../data/recipes'

export function updateRecipe (recipeId, newRecipe) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  const index = recipeList.findIndex(r => r.id == recipeId)
  const now = new Date().toISOString()
  recipeList[index] = {
    ...recipeList[index],
    ...newRecipe,
    ingredients: newRecipe.ingredients.filter(i => i.ingredient !== null),
    updatedAt: now
  }
  localStorage.setItem('recipes', JSON.stringify(recipeList))
  return recipeList[index]
}

export function deleteRecipe (recipeId) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  recipeList.filter(r => r.id != recipeId)
  localStorage.setItem('recipes', JSON.stringify(recipeList))
  return recipeList
}

export function getRecipe (recipeId) {
  let recipeList = getRecipes()
  let recipe = recipeList.find(r => r.id == recipeId)
  recipe.author = getUserByID(recipe.author)
  return recipe
}

export function getRecipes () {
  return JSON.parse(localStorage.getItem('recipes'))
}

export function getMyRecipes () {
  const user = getCurrentUser()
  return JSON.parse(localStorage.getItem('recipes')).filter(recipe => recipe.author === user.id)
}

export function createRecipe (recipe) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  const author = getCurrentUser().id
  const id = recipeList[recipeList.length - 1].id + 1
  const now = new Date().toISOString()
  const newRecipe = {
    ...recipe,
    ingredients: recipe.ingredients.filter(i => i.ingredient !== null),
    id,
    author,
    createdAt: now,
    updatedAt: now
  }
  recipeList.push(newRecipe)
  localStorage.setItem('recipes', JSON.stringify(recipeList))
  return newRecipe
}

export function initRecipes () {
  localStorage.getItem('recipes') || localStorage.setItem('recipes', JSON.stringify(recipes))
}