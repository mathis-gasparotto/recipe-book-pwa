export function getCurrentUser () {
  return JSON.parse(localStorage.getItem('currentUser'))
}

export function setCurrentUser (user) {
  localStorage.setItem('currentUser', JSON.stringify({
    uid: user.uid,
    email: user.email
  }))
}