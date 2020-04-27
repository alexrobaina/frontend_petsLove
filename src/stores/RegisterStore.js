import { observable, action, runInAction } from 'mobx'
import RegisterService from 'services/RegisterService'

class RegisterStore {
  constructor() {
    this.registerService = new RegisterService()
  }

  @observable rol = ''
  @observable password = ''
  @observable confirmPassword = ''
  @observable email = ''
  @observable name = ''
  @observable rols = []
  @observable token = []
  @observable user = []
  @observable isLoading = false
  @observable isError = false
  @observable passwordSuccess = false
  @observable passwordError = false
  @observable isRegister = false

  @action
  async createUser() {
    this.isLoading = true

    const data = {
      name: this.name,
      password: this.password,
      email: this.email,
      rol: this.rol.value,
      terms: true,
    }

    try {
      const response = await this.registerService.register(data)

      runInAction(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
        this.user = response
        this.isRegister = true
      })
    } catch (e) {
      runInAction(() => {
        this.isRegister = false
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setUserRol(value) {
    this.rol = value
  }

  @action
  setPassword(value) {
    this.password = value
    if (this.password === this.confirmPassword) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword = value
    if (this.confirmPassword === this.password) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setEmail(value) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(value).toLowerCase())) {
      this.email = value.toLowerCase()
      console.log(this.email)
    }
  }

  @action
  setName(value) {
    this.name = value
  }

  @action
  setErrorPassword() {
    this.passwordError = true
  }

  @action
  cancelErrorPassword() {
    this.passwordError = false
  }
}

export default RegisterStore
