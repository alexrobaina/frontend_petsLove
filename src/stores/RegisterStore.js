import { observable, action, runInAction } from 'mobx'
import RegisterService from 'services/RegisterService'
import RegisterUser from 'models/RegisterUser'
import { validationPassword, validationPasswordMatch } from 'utils/validationPassword'
import InputStore from './InputStore'

const REQUIRED = 'common:isRequired'
const USERNAME_EXIST = 'common:usernameExist'
const USER_EXIST = 'common:userExist'
const EMAIL_ERROR = 'common:errorEmail'
const VALIDATION_EMAIL = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

class RegisterStore {
  @observable token = []
  @observable isError = false
  @observable isLoading = false
  @observable isRegister = false
  @observable toggleToast = false
  @observable isErrorRequest = ''
  @observable passwordError = false
  @observable passwordSuccess = false
  @observable toastError = new InputStore()
  @observable confirmPassword = new InputStore()

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

          if (e.response) {
            if (e.response.data.message === 'The username already exist') {
              this.registerUser.username.setError(true, USERNAME_EXIST)

              this.toastError.setError(true, USERNAME_EXIST)
              this.registerUser.isValidForm = false
            }
            if (e.response.data.message === 'The user already exist') {
              this.registerUser.email.setError(true, USER_EXIST)

              this.toastError.setError(true, USER_EXIST)
              this.registerUser.isValidForm = false
            }
            this.setToggleToast(true)
          }
        })
      }
    }
  }

  @action
  setFirstname(value) {
    this.registerUser.firstname.setValue(value)
  }

  @action
  setLastname(value) {
    this.registerUser.lastname.setValue(value)
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
    this.registerUser.role.setValue(value)
  }

  @action
  setPhone(value) {
    this.registerUser.phone.setValue(value)
  }

  @action
  setToggleToast(value) {
    this.toggleToast = value
  }

  @action
  setPassword(value) {
    this.registerUser.password.setValue(value)
    this.validatePassword()
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword.setValue(value)
    this.validatePassword()
  }

  @action
  validatePassword() {
    let isValidForm = true

    if (validationPassword(this.registerUser.password)) {
      isValidForm = false
    }

    if (validationPasswordMatch(this.registerUser.password, this.confirmPassword)) {
      isValidForm = false
    }

    return isValidForm
  }

  @action
  validate() {
    let isValidForm = true
    this.clearError()

    const { firstname, lastname, email, role, phone, username } = this.registerUser

    if (!firstname.value) {
      firstname.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!lastname.value) {
      lastname.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!phone.value) {
      phone.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!role.value) {
      role.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!username.value) {
      username.setError(true, REQUIRED)

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
    const { firstname, lastname, email, password, role, phone, username } = this.registerUser

    this.toastError.clearError()
    firstname.clearError()
    lastname.clearError()
    email.clearError()
    password.clearError()
    role.clearError()
    phone.clearError()
    username.clearError()
  }
}

export default RegisterStore
