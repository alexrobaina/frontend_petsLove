import { action, observable, runInAction } from 'mobx'
import decode from 'jwt-decode'
import AuthService from 'services/AuthService'

class AuthStore {
  constructor() {
    this.authService = new AuthService()
    this.validateToken()
    this.getUser()
  }

  @observable token = ''
  @observable tokenLocalStorage = ''
  @observable email = ''
  @observable phone = ''
  @observable password = ''
  @observable user = []
  @observable isLogin = false
  @observable isErrorLogin = false

  @action
  async loginUser() {
    this.isErrorLogin = false
    this.isLoading = true
    this.isLogin = false

    const data = {
      email: this.email,
      password: this.password,
    }

    try {
      const response = await this.authService.login(data)

      runInAction(() => {
        this.user = response.user
        this.token = response.tokenReturn
        this.setToken(this.token)
        this.setUser(this.user)
        this.isLogin = true
        this.isLoading = false
        this.isErrorLogin = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isErrorLogin = true
        this.isLogin = false
        console.log(e)
      })
    }
  }

  @action
  async loadUser() {
    try {
      const response = await this.authService.getUserId(this.user._id)

      runInAction(() => {
        this.user = response
        this.setUser(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  validateToken = () => {
    this.getTokenLocalStorage()

    if (this.tokenLocalStorage) {
      if (decode(this.tokenLocalStorage)) {
        this.isLogin = true
      }
    }
  }

  setToken = () => {
    localStorage.setItem('token', this.token)
  }

  setUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  @action
  setEmail(value) {
    this.email = value
  }

  @action
  getTokenLocalStorage() {
    const token = localStorage.getItem('token')
    this.tokenLocalStorage = token
  }

  @action
  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  @action
  setPassword(value) {
    this.password = value
  }

  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

export default AuthStore
