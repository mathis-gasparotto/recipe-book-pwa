import users from '../data/users'

export function initCurrentUser () {
  localStorage.getItem('currentUser') || localStorage.setItem('currentUser', JSON.stringify(users[0]))
}