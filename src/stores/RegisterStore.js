import { observable, action, runInAction } from 'mobx'
import RegisterService from 'services/RegisterService'
import RegisterUser from 'models/RegisterUser'
import InputStore from './InputStore'

const REQUIRED = 'This input is required'
const EMAIL_ERROR = 'The email is incorrect'
const VALIDATION_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

class RegisterStore {
  @observable token = []
  @observable isError = false
  @observable isLoading = false
  @observable isRegister = false
  @observable isErrorRequest = ''
  @observable confirmPassword = new InputStore()
  @observable passwordError = false
  @observable passwordSuccess = false

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
    if (this.validate()) {
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
  }

  @action
  setName(value) {
    this.registerUser.name.setValue(value)
  }

  @action
  setUsername(value) {
    this.registerUser.username.setValue(value)
  }

  @action
  setEmail(value) {
    this.registerUser.email.setValue(value)
  }

  @action
  setRole(value) {
    this.registerUser.rol.setValue(value)
  }

  @action
  setPhone(value) {
    this.registerUser.phone.setValue(value)
  }

  @action
  setPassword(value) {
    this.registerUser.password.setValue(value)
    if (this.registerUser.password.value === this.confirmPassword.value) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword.setValue(value)
    if (this.confirmPassword.value === this.registerUser.password.value) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  validate() {
    let isValidForm = true
    this.clearError()

    const { name, email, password, rol, phone, username } = this.registerUser

    if (!name.value) {
      name.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!password.value) {
      password.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!phone.value) {
      phone.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!rol.value) {
      rol.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!username.value) {
      username.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!this.confirmPassword.value) {
      this.confirmPassword.setError(true, REQUIRED)

      isValidForm = false
    }

    // eslint-disable-next-line no-useless-escape
    if (!email.value) {
      email.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!VALIDATION_EMAIL.test(email.value)) {
      email.setError(true, EMAIL_ERROR)

      isValidForm = false
    }

    return isValidForm
  }

  @action
  clearError() {
    const { name, email, password, rol, phone, username } = this.registerUser

    name.clearError()
    email.clearError()
    password.clearError()
    rol.clearError()
    phone.clearError()
    username.clearError()
  }
}

export default RegisterStore
