import user from '../data/user'

export function getUser () {
  return JSON.parse(localStorage.getItem('user'))
}

export function initUser () {
  localStorage.getItem('user') || localStorage.setItem('user', JSON.stringify(user))
}