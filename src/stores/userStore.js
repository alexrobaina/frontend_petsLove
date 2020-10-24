import { action, observable, runInAction } from 'mobx'
import EditUserServices from 'services/EditUserServices'
import imageCompression from 'browser-image-compression'
import AsyncApiStore from 'stores/AsyncApiStore'
import ImageService from 'services/ImageService/ImageService'
import InputStore from 'stores/InputStore'
import { validationPassword, validationPasswordMatch } from 'utils/validationPassword'
import SetLocalStorage from '../utils/setLocalStorage'
import User from '../models/User'

const USER_TRANSIT = 'Transit pets.'
const USER_PROTECTIONIST = 'You are protectionist of pets.'
const USER_ADOPTER = 'You want adopt.'

class UserStore extends AsyncApiStore {
  constructor(id) {
    super()

    this.user = new User()
    this.imageService = new ImageService()
    this.setLocalStorage = new SetLocalStorage()
    this.editUserServices = new EditUserServices()

    this.loadUser(id)
  }

  @observable phone = ''
  @observable email = ''
  @observable address = {}
  @observable location = {}
  @observable password = ''
  @observable isEdit = true
  @observable canEdit = false
  @observable isError = false
  @observable isSaved = false
  @observable imageResize = []
  @observable textAddress = ''
  @observable isResize = false
  @observable isUpdated = false
  @observable toggleToast = false
  @observable newPreviewsImage = []
  @observable passwordError = false
  @observable isUserTransit = false
  @observable localStorageUser = []
  @observable isLoadingResize = false
  @observable passwordSuccess = false
  @observable confirmPassword = new InputStore()
  @observable selectedImageUser = new InputStore()

  @action
  async saveUser() {
    try {
      await this.editUserServices.userUpdate(this.user.getJson())

      runInAction(() => {
        this.clearError()
        this.isSaved = true
        this.isUpdated = true
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.finishRequest()
        this.setServerError()
      })
    }
  }

  @action
  async saveImage() {
    const data = new FormData()

    try {
      await this.editUserServices.userUpdate(data)

      runInAction(() => {
        this.clearError()
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.finishRequest()
        this.setServerError()
      })
    }
  }

  @action
  async save() {
    this.preRequest()
    this.isSaved = false
    this.isUpdated = false

    try {
      await this.imageService.deleteUserImage(this.user.image.filenames[0])
      if (this.user.getImageId()) {
        await this.imageService.updateImageUser(
          this.user.getImageId(),
          this.selectedImageUser.value
        )
      } else {
        const response = await this.imageService.addImageUser(this.selectedImageUser.value)

        this.user.setImageId(response._id)
      }

      runInAction(() => {
        this.saveUser()
      })
    } catch (e) {
      runInAction(() => {
        this.isSaved = false
        this.isUpdated = false
        console.log(e)
        this.finishRequest()
        this.setServerError()
      })
    }
  }

  @action
  async loadUser(id) {
    this.preRequest()

    try {
      const response = await this.editUserServices.getUser(id)

      runInAction(() => {
        this.formatNameRole()
        this.user.fillJson(response)
        this.phone = response.phone
        this.email = response.email
        this.setLocalStorage.setUser(response)
        this.clearError()
        this.onSuccessRequest()
        return true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.finishRequest()
        this.setServerError()
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
    if (this.user.role.value === 'transitUser') {
      this.nameRol = USER_TRANSIT
    }
    if (this.user.role.value === 'protectionist') {
      this.nameRol = USER_PROTECTIONIST
    }
    if (this.user.role.value === 'adopter') {
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

    if (validationPassword(this.user.password)) {
      isValidate = false
    }

    if (validationPasswordMatch(this.confirmPassword, this.user.password)) {
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

  @action
  setToggleToast(value) {
    this.toggleToast = value
  }

  // ============================================
  // This functions resize images. Need move to ultils
  // ============================================

  @action
  resize() {
    this.compressImage(this.selectedImageUser.value)
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
    this.selectedImageUser.setValue(value)
    this.resize()
  }

  // ============================================
  // END resize images.
  // ============================================
}

export default UserStore
