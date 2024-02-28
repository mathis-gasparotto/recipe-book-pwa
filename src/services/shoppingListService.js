
export function updateIngredient (ingredientId, newIngredient) {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  const index = shopppingList.findIndex(r => r.id == ingredientId)
  shopppingList[index] = {
    ...shopppingList[index],
    ...newIngredient
  }
  console.log(shopppingList)
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return shopppingList[index]
}

export function deleteIngredient (ingredientId) {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  shopppingList.filter(r => r.id != ingredientId)
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return shopppingList
}

export function getShoppingList () {
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function addSingleIngredientToShoppingList (ingredient) {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  const id = Date.now()
  shopppingList.push({
    ingredient,
    checked: false,
    id
  })
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function addIngredientListToShoppingList (ingredients) {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  ingredients.forEach(ingredient => {
    let ingredientItem = shopppingList.find(ingr => ingr.ingredient.id === ingredient.ingredient.id)
    if (ingredientItem) {
      ingredientItem.quantity += ingredient.quantity
    } else {
      const id = Date.now()
      shopppingList.push({
        id,
        ...ingredient,
        checked: false
      })
    }
  })
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function checkIngredient (ingredientId) {
  const shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  const ingredient = shopppingList.find(ingr => ingr.id === ingredientId)
  ingredient.checked = !ingredient.checked
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function removeAllCheckedIngredients () {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  shopppingList = shopppingList.filter(ingredient => !ingredient.checked)
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function removeAllIngredients () {
  localStorage.setItem('shopppingList', JSON.stringify([]))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function checkAllIngredients () {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  shopppingList = shopppingList.map(ingredient => {
    ingredient.checked = true
    return ingredient
  })
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function uncheckAllIngredients () {
  let shopppingList = JSON.parse(localStorage.getItem('shopppingList'))
  shopppingList = shopppingList.map(ingredient => {
    ingredient.checked = false
    return ingredient
  })
  localStorage.setItem('shopppingList', JSON.stringify(shopppingList))
  return JSON.parse(localStorage.getItem('shopppingList'))
}

export function initShoppingList () {
  localStorage.getItem('shopppingList') || localStorage.setItem('shopppingList', JSON.stringify([]))
}