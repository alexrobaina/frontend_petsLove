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
  async getRols() {
    this.isLoading = true
    try {
      const response = await this.registerService.getUserRol()

      runInAction(() => {
        this.isLoading = false
        this.rols = response
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        console.log(e)
      })
    }
  }

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
    if (value === this.confirmPassword) {
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
    if (value === this.password) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setEmail(value) {
    this.email = value
  }

  @action
  setName(value) {
    this.name = value
  }
}

export default RegisterStore
