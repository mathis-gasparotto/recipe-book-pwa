export function getIngredients () {
  return JSON.parse(localStorage.getItem('ingredients'))
}

export function getIngredientById (ingredientId) {
  let ingredients = getIngredients()
  return ingredients.find(r => r.id == ingredientId)
}
