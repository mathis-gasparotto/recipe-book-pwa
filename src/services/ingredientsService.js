import ingredients from '../data/ingredients'

export function getIngredients () {
  return JSON.parse(localStorage.getItem('ingredients'))
}

export function getIngredientById (ingredientId) {
  let ingredients = getIngredients()
  return ingredients.find(r => r.id == ingredientId)
}

export function initIngredients () {
  localStorage.getItem('ingredients') || localStorage.setItem('ingredients', JSON.stringify(ingredients))
}