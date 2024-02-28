import recipes from '../data/recipes'
import myRecipes from '../data/my_recipes'

export function updateRecipe (recipeId, newRecipe) {
  let recipeList = getMyRecipes()
  const index = recipeList.findIndex(r => r.id == recipeId)
  const now = new Date().toISOString()
  recipeList[index] = {
    ...recipeList[index],
    ...newRecipe,
    ingredients: newRecipe.ingredients.filter(i => i.ingredient.name !== null && i.ingredient.name !== '' && i.quantity > 0).map(i => ({
      ingredient: i.ingredient,
      quantity: i.quantity,
      custom: i.custom || false
    })),
    updatedAt: now
  }
  localStorage.setItem('myRecipes', JSON.stringify(recipeList))
  return recipeList[index]
}

export function deleteRecipe (recipeId) {
  let recipeList = getMyRecipes()
  recipeList.filter(r => r.id != recipeId)
  localStorage.setItem('myRecipes', JSON.stringify(recipeList))
  return recipeList
}

export function getRecipe (recipeId) {
  let recipeList = getRecipes()
  return recipeList.find(r => r.id == recipeId)
}

export function getRecipes () {
  return JSON.parse(localStorage.getItem('recipes'))
}

export function getMyRecipe (recipeId) {
  let recipeList = getMyRecipes()
  return recipeList.find(r => r.id == recipeId)
}

export function getMyRecipes () {
  console.log(JSON.parse(localStorage.getItem('myRecipes')))
  return JSON.parse(localStorage.getItem('myRecipes'))
}

export function createRecipe (recipe) {
  let recipeList = getMyRecipes()
  const now = new Date()
  const newRecipe = {
    ...recipe,
    ingredients: recipe.ingredients.filter(i => i.ingredient.name !== null && i.ingredient.name !== '' && i.quantity > 0).map(i => ({
      ingredient: i.ingredient,
      quantity: i.quantity,
      custom: i.custom || false
    })),
    id: now.getTime(),
    me: true,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  }
  recipeList.push(newRecipe)
  localStorage.setItem('myRecipes', JSON.stringify(recipeList))
  return newRecipe
}

export function initRecipes () {
  localStorage.getItem('recipes') || localStorage.setItem('recipes', JSON.stringify(recipes))
}

export function initMyRecipes () {
  localStorage.getItem('myRecipes') || localStorage.setItem('myRecipes', JSON.stringify(myRecipes))
}