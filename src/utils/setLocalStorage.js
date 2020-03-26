class SetLocalStorage {
  getUser = () => {
    const user = localStorage.getItem('user')
    return user
  }
}

export default SetLocalStorage
