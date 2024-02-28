import { createData, initData, removeData, updateData } from "./firebaseService"
import { getCurrentUser } from "./userService"

export function updateIngredient (ingredientId, newIngredient) {
  let shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
  shoppingList[ingredientId] = {
    ...shoppingList[ingredientId],
    ...newIngredient
  }
  updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + shoppingList[ingredientId].id, shoppingList[ingredientId])
  return shoppingList[ingredientId]
}

export function deleteIngredient (ingredientId) {
  let shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
  shoppingList.filter(r => r.id != ingredientId)
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  return shoppingList
}

export function getShoppingList () {
  return JSON.parse(localStorage.getItem('shoppingList'))
}

export function addSingleIngredientToShoppingList (ingredient) {
  const id = Date.now()
  const newIngredient = {
    ingredient,
    checked: false,
    id
  }
  createData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + newIngredient.id, newIngredient)
  return newIngredient
}

export function addIngredientListToShoppingList (ingredients) {
  let shoppingList = Object.values(JSON.parse(localStorage.getItem('shoppingList')))
  ingredients.forEach(ingredient => {
    let ingredientItem = shoppingList.find(ingr => ingr.ingredient.id === ingredient.ingredient.id)
    if (ingredientItem) {
      ingredientItem.quantity += ingredient.quantity
      updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + ingredientItem.id, ingredientItem)
    } else {
      const id = Date.now()
      const newIngredient = {
        id,
        ...ingredient,
        checked: false
      }
      createData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + newIngredient.id, newIngredient)
    }
  })
  return shoppingList
}

export function checkIngredient (ingredientId) {
  const shoppingList = Object.values(JSON.parse(localStorage.getItem('shoppingList')))
  const ingredient = shoppingList.find(ingr => ingr.id === ingredientId)
  ingredient.checked = !ingredient.checked
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + ingredient.id, ingredient)
  return ingredient
}

export function removeAllCheckedIngredients () {
  let shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
  Object.keys(shoppingList).forEach(id => {
    if (shoppingList[id].checked) {
      removeData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + id)
    }
  })
}

export function removeAllIngredients () {
  localStorage.setItem('shoppingList', JSON.stringify([]))
  removeData('users/' + getCurrentUser().uid + '/shoppingList')
}

export function checkAllIngredients () {
  let shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
  Object.keys(shoppingList).forEach(id => {
    updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + id, {checked: true})
  })
}

export function uncheckAllIngredients () {
  let shoppingList = JSON.parse(localStorage.getItem('shoppingList'))
  Object.keys(shoppingList).forEach(id => {
    updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + id, {checked: false})
  })
}

export function initShoppingList () {
  initData('users/' + getCurrentUser().uid + '/shoppingList', 'shoppingList', [])
}