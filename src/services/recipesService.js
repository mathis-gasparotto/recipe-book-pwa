import { getUser } from "./userService"

export function updateRecipe (recipeId, recipe) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  const index = recipeList.findIndex(r => r.id === recipeId)
  const now = new Date().toISOString()
  recipeList[index] = { 
    ...recipe,
    ingredients: recipe.ingredients.filter(i => i.ingredient !== null),
    updatedAt: now
  }
  localStorage.setItem('recipes', JSON.stringify(recipeList))
  return recipeList[index]
}

export function deleteRecipe (recipeId) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  const index = recipeList.findIndex(r => r.id === recipeId)
  recipeList.splice(index, 1)
  localStorage.setItem('recipes', JSON.stringify(recipeList))
  return recipeList
}

export function getRecipe (recipeId) {
  let recipeList = getRecipes()
  return recipeList.find(r => r.id == recipeId)
}

export function getRecipes () {
  return JSON.parse(localStorage.getItem('recipes'))
}

export function createRecipe (recipe) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  const author = getUser()
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