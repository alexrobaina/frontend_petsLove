import { action, observable, runInAction } from 'mobx'
import EditUserServices from 'services/EditUserServices'
import imageCompression from 'browser-image-compression'
import SetLocalStorage from '../utils/setLocalStorage'
import User from '../models/User'
import InputStore from './InputStore'
import validationPassword from '../utils/validationPassword'

const USER_TRANSIT = 'Transit pets.'
const USER_PROTECTIONIST = 'You are protectionist of pets.'
const USER_ADOPTER = 'You want adopt.'

const PASSWORD_MATCH = 'The password need match'
const REQUERID = 'The password is requerid'

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
  @observable imageResize = []
  @observable textAddress = ''
  @observable isResize = false
  @observable isLoading = false
  @observable newPreviewsImage = ''
  @observable passwordError = false
  @observable isUserTransit = false
  @observable localStorageUser = []
  @observable isLoadingResize = false
  @observable passwordSuccess = false
  @observable confirmPassword = new InputStore()

  @action
  async saveUser() {
    this.isLoading = true
    const data = new FormData()

    Object.entries(this.user.getJson()).forEach(([key, value]) => {
      if (key !== 'password') {
        data.append(key, value)
      }
      if (key === 'password') {
        if (value !== '') {
          data.append(key, value)
        }
      }
    })

    try {
      await this.editUserServices.save(data)

      runInAction(() => {
        this.isLoading = false
        window.location.reload()
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
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
        this.isLoading = false
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
    this.validate()
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword.setValue(value)
    this.validate()
  }

  @action
  validate() {
    let isValidate = true

    if (!this.user.password.value) {
      this.user.password.setError(true, REQUERID)

      isValidate = false
    }

    if (this.confirmPassword.value !== this.user.password.value) {
      this.confirmPassword.setError(true, PASSWORD_MATCH)

      isValidate = false
    }

    if (validationPassword(this.user.password)) {
      isValidate = false
    }

    return isValidate
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

  // ============================================
  // This functions resize images. Need move to ultils
  // ============================================

  @action
  resize() {
    this.compressImage(this.user.image.value)
  }

  @action
  async compressImage(event) {
    this.isResize = false
    this.isLoadingResize = true
    // console.log('originalFile instanceof Blob', event instanceof Blob) // true
    // console.log(`originalFile size ${event.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(event, options)
      this.isLoadingResize = false
      this.isResize = true
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      await this.setImageResize(compressedFile) // write your own logic
    } catch (error) {
      this.isLoadingResize = false
      console.log(error)
    }
  }

  @action
  setImageResize(image) {
    this.imageResize.push(image)
  }

  @action
  setImage(value) {
    this.user.image.setValue(value)
    this.resize()
  }

  // ============================================
  // END resize images.
  // ============================================
}

export default UserStore
