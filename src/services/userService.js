import user from '../data/user'

export function getCurrentUser () {
  return JSON.parse(localStorage.getItem('currentUser'))
}

export function initCurrentUser () {
  localStorage.getItem('currentUser') || localStorage.setItem('currentUser', JSON.stringify(user))
}