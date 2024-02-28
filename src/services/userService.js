import users from '../data/users'

export function getCurrentUser () {
  return JSON.parse(localStorage.getItem('currentUser'))
}

export function initCurrentUser () {
  localStorage.getItem('currentUser') || localStorage.setItem('currentUser', JSON.stringify(users[0]))
}

export function initUsers () {
  localStorage.getItem('users') || localStorage.setItem('users', JSON.stringify(users))
}

export function getUserByID (id) {
  return JSON.parse(localStorage.getItem('users')).find(user => user.id === id)
}