export function updateRecipe (recipeId, recipe) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  const index = recipeList.findIndex(r => r.id === recipeId)
  recipeList[index] = { 
    ...recipe,
    ingredients: recipe.ingredients.filter(i => i.ingredient !== null)
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
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  return recipeList.find(r => r.id == recipeId)
}

export function getRecipes () {
  return JSON.parse(localStorage.getItem('recipes'))
}

export function createRecipe (recipe) {
  let recipeList = JSON.parse(localStorage.getItem('recipes'))
  recipeList.push(recipe)
  localStorage.setItem('recipes', JSON.stringify(recipeList))
  return recipe
}