import { observable, action, runInAction } from 'mobx'
import RegisterService from 'services/RegisterService'
import RegisterUser from 'models/RegisterUser'

class RegisterStore {
  @observable password = ''
  @observable confirmPassword = ''
  // @observable rols = []
  @observable token = []
  // @observable user = []
  @observable isLoading = false
  @observable isError = false
  @observable isErrorRequest = ''
  @observable emailError = false
  @observable passwordSuccess = false
  @observable isRegister = false
  @observable passwordError = true

  constructor() {
    this.registerService = new RegisterService()
    this.registerUser = new RegisterUser()

    this.init()
  }

  init() {
    this.registerUser.terms = true
  }

  @action
  async createUser() {
    this.validate()
    this.isLoading = true

    try {
      await this.registerService.register(this.registerUser.getJson())

      runInAction(() => {
        this.isLoading = false
        this.isRegister = true
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isErrorRequest = true
        console.log(e)
      })
    }
  }

  @action
  setForm(valuesForm) {
    Object.entries(valuesForm).forEach(([key, value]) => {
      if (key !== 'passwordConfirm') {
        this.registerUser[key] = value
      }
    })
    this.createUser()
  }

  @action
  setUserRol(value) {
    this.registerUser.rol = value.value
  }

  @action
  setTextAddress(value) {
    this.registerUser.textAddress = value
  }

  @action
  setAddress(value) {
    this.registerUser.lat = value.lat
    this.registerUser.lng = value.lng
  }

  @action
  setPhone(value) {
    this.registerUser.phone = value
  }

  @action
  validate() {
    Object.values(this.registerUser).forEach(value => {
      if (value === undefined) {
        this.isError = true
      }
    })
  }
}

export default RegisterStore
