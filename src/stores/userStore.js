import { action, observable, runInAction } from 'mobx'
import EditUserServices from 'services/EditUserServices'
import SetLocalStorage from '../utils/setLocalStorage'
import User from '../models/User'
import InputStore from './InputStore'

const USER_TRANSIT = 'Transit pets.'
const USER_PROTECTIONIST = 'You are protectionist of pets.'
const USER_ADOPTER = 'You want adopt.'

class UserStore {
  constructor() {
    this.editUserServices = new EditUserServices()
    this.setLocalStorage = new SetLocalStorage()
    this.user = new User()
  }

  @observable address = {}
  @observable location = {}
  @observable password = ''
  @observable isEdit = false
  @observable canEdit = false
  @observable isError = false
  @observable textAddress = ''
  @observable isLoading = false
  @observable newPreviewsImage = ''
  @observable passwordError = false
  @observable isUserTransit = false
  @observable localStorageUser = []
  @observable passwordSuccess = false
  @observable confirmPassword = new InputStore()

  @action
  async saveUser() {
    this.isLoading = true
    const data = new FormData()

    Object.entries(this.user.getJson()).forEach(([key, value]) => {
      data.append(key, value)
    })

    try {
      await this.editUserServices.save(data)

      runInAction(() => {
        this.isLoading = false
        window.location.reload()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async loadUser(id) {
    this.isLoading = true
    try {
      const response = await this.editUserServices.getUser(id)

      runInAction(() => {
        this.formatNameRole()
        this.user.fillJson(response)
        this.setLocalStorage.setUser(response)
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  cancelEdit() {
    this.isEdit = false
  }

  @action
  setIsEdit() {
    this.isEdit = true
  }

  @action
  setRol(value) {
    this.user.rol.setValue(value)
  }

  @action
  formatNameRole() {
    if (this.user.rol.value === 'transitUser') {
      this.nameRol = USER_TRANSIT
    }
    if (this.user.rol.value === 'protectionist') {
      this.nameRol = USER_PROTECTIONIST
    }
    if (this.user.rol.value === 'adopter') {
      this.nameRol = USER_ADOPTER
    }
  }

  @action
  setNewsPreviewsImage(image) {
    this.newPreviewsImage = image
  }

  @action
  setPassword(value) {
    this.user.password.setValue(value)
    if (this.user.password.value === this.confirmPassword.value) {
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
    if (this.confirmPassword.value === this.user.password.value) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setPhone(value) {
    this.user.phone.setValue(value)
  }

  @action
  setEmail(value) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(value).toLowerCase())) {
      this.user.email.setValue(value.toLowerCase())
    }
  }

  @action
  setAboutUs(value) {
    this.user.aboutUs.setValue(value)
  }

  @action
  setRequirementsToAdopt(value) {
    this.user.requirementsToAdopt.setValue(value)
  }

  @action
  setImage(value) {
    this.user.image.setValue(value)
  }

  @action
  setCanTransit() {
    this.user.canTransit = !this.user.canTransit
  }

  @action
  setAddress(value) {
    this.location = value
    this.user.setAddress(value)
  }

  @action
  setTextAddress(value) {
    this.user.textAddress.setValue(value)
  }

  @action
  setUsername(value) {
    this.user.username.setValue(value)
  }
}

export default UserStore
