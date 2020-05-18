import { action, observable, runInAction } from 'mobx'
import decode from 'jwt-decode'
import AuthService from 'services/AuthService'

class AuthStore {
  constructor() {
    this.init()
  }

  init() {
    this.authService = new AuthService()
    this.validateToken()
    this.getUser()
  }

  @observable user = []
  @observable token = ''
  @observable email = ''
  @observable phone = ''
  @observable password = ''
  @observable isLogin = false
  @observable isLoading = false
  @observable isErrorLogin = false
  @observable tokenLocalStorage = ''

  @action
  async loginUser() {
    this.isLogin = false
    this.isLoading = true
    this.isErrorLogin = false

    const data = {
      email: this.email,
      password: this.password,
    }

    try {
      const response = await this.authService.login(data)

      runInAction(() => {
        console.log(response)
        this.isLogin = true
        this.setUser(response.user)
        this.setToken(response.tokenReturn)
        this.user = response.user
        this.isErrorLogin = false
        this.token = response.tokenReturn
        setTimeout(() => {
          this.isLoading = false
        }, 1000)
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

  setToken = (token) => {
    localStorage.setItem('token', token)
  }

  setUser = (user) => {
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
