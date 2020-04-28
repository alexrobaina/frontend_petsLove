class SetLocalStorage {
  setUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

  getToken = () => {
    return localStorage.getItem('token')
  }
}

export default SetLocalStorage
