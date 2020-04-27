import { action, observable, runInAction } from 'mobx'
import EditUserServices from 'services/EditUserServices'
import SetLocalStorage from '../utils/setLocalStorage'

class EditUserStore {
  constructor() {
    this.editUserServices = new EditUserServices()
    this.setLocalStorage = new SetLocalStorage()
  }

  @observable localStorageUser = []
  @observable user = []
  @observable id = ''
  @observable name = ''
  @observable rol = ''
  @observable email = ''
  @observable aboutUs = ''
  @observable password = ''
  @observable confirmPassword = ''
  @observable requirementsToAdopt = ''
  @observable image = null
  @observable canTransit = false
  @observable address = {}
  @observable textAddress = ''
  @observable nickname = ''
  @observable nameRol = ''
  @observable isEdit = false
  @observable isUserTransit = false
  @observable canEdit = false
  @observable isLoading = false
  @observable isError = false
  @observable passwordSuccess = false
  @observable passwordError = false

  @action
  async saveUser() {
    const data = new FormData()

    if (this.image) {
      data.append('image', this.image)
    } else {
      data.append('image', this.user.image)
    }

    if (this.passwordSuccess) {
      data.append('password', this.password)
    }

    if (this.address.lat) {
      data.append('lat', this.address.lat)
      data.append('lng', this.address.lng)
    }
    data.append('_id', this.user._id)
    data.append('name', this.user.name)
    data.append('rol', this.user.rol)
    data.append('email', this.user.email)
    data.append('phone', this.phone)
    data.append('aboutUs', this.aboutUs)
    data.append('requirementsToAdopt', this.requirementsToAdopt)
    data.append('canTransit', this.canTransit)
    data.append('textAddress', this.textAddress)
    data.append('nickname', this.nickname)

    try {
      const response = await this.editUserServices.save(data)

      runInAction(() => {
        this.user = response
        this.loadUser(this.user._id)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async loadUser(id) {
    try {
      const response = await this.editUserServices.getUser(id)

      runInAction(() => {
        this.user = response
        this.setLocalStorage.setUser(response)
        this.rol = response.rol
        this.canTransit = response.canTransit
        this.formatNameRole()
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
    this.rol = value
  }

  @action
  formatNameRole() {
    if (this.rol === 'transitUser') {
      this.nameRol = 'Transit pets.'
    }
    if (this.rol === 'protectionist') {
      this.nameRol = 'You are protectionist of pets.'
    }
    if (this.rol === 'adopter') {
      this.nameRol = 'You want adopt.'
    }
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
  setPhone(value) {
    this.phone = value
  }

  @action
  setEmail(value) {
    this.email = value
  }

  @action
  setAboutUs(value) {
    this.aboutUs = value
  }

  @action
  setRequirementsToAdopt(value) {
    this.requirementsToAdopt = value
  }

  @action
  setImage(value) {
    this.image = value
  }

  @action
  setCanTransit() {
    this.canTransit = !this.canTransit
  }

  @action
  setAddress(value) {
    this.address = value
  }

  @action
  setTextAddress(value) {
    this.textAddress = value
  }

  @action
  setNickname(value) {
    this.nickname = value
  }
}

export default EditUserStore
