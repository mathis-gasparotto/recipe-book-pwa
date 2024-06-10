import { createData, initData, removeData, updateData } from "./firebaseService"
import { getCurrentUser } from "./userService"
import { v4 as uuidv4 } from 'uuid'

export function updateIngredient (ingredientId, newIngredient) {
  let shoppingList = getShoppingList()
  shoppingList[ingredientId] = {
    ...shoppingList[ingredientId],
    ...newIngredient
  }
  updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + shoppingList[ingredientId].id, shoppingList[ingredientId])
  return shoppingList[ingredientId]
}

export function deleteIngredient (ingredientId) {
  let shoppingList = getShoppingList()
  shoppingList.filter(r => r.id != ingredientId)
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  return shoppingList
}

export function getShoppingList () {
  return JSON.parse(localStorage.getItem('shoppingList'))
}

export function addSingleIngredientToShoppingList (ingredient) {
  const newIngredient = {
    ingredient,
    checked: false,
    id: uuidv4()
  }
  createData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + newIngredient.id, newIngredient)
  return newIngredient
}

export function addIngredientListToShoppingList (ingredients) {
  const shoppingList = Object.values(getShoppingList())
  ingredients.forEach((ingredient) => {
    const ingredientItem = shoppingList.find(ingr => ingr.ingredient.ingredient.id === ingredient.ingredient.id)
    if (ingredientItem) {
      ingredientItem.ingredient.quantity += ingredient.quantity
      updateIngredient(ingredientItem.id, ingredientItem)
    } else {
      addSingleIngredientToShoppingList(ingredient)
    }
  })
  return shoppingList
}

export function checkIngredient (ingredientId) {
  const shoppingList = Object.values(getShoppingList())
  const ingredient = shoppingList.find(ingr => ingr.id === ingredientId)
  ingredient.checked = !ingredient.checked
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + ingredient.id, ingredient)
  return ingredient
}

export function removeAllCheckedIngredients () {
  let shoppingList = getShoppingList()
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
  let shoppingList = getShoppingList()
  Object.keys(shoppingList).forEach(id => {
    updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + id, {checked: true})
  })
}

export function uncheckAllIngredients () {
  let shoppingList = getShoppingList()
  Object.keys(shoppingList).forEach(id => {
    updateData('users/' + getCurrentUser().uid + '/shoppingList' + '/' + id, {checked: false})
  })
}

export function initShoppingList () {
  initData('users/' + getCurrentUser().uid + '/shoppingList', 'shoppingList', [])
}