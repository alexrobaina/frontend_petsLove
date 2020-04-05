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
  @observable requirementsToAdopt = ''
  @observable image = null
  @observable canTransit = false
  @observable address = []
  @observable textAddress = ''
  @observable nickname = ''
  @observable isEdit = false
  @observable canEdit = false

  @action
  async saveUser() {
    const data = new FormData()

    data.append('_id', this.user._id)
    data.append('name', this.user.name)
    data.append('rol', this.user.rol)
    data.append('email', this.user.email)
    data.append('phone', this.phone)
    data.append('aboutUs', this.aboutUs)
    data.append('requirementsToAdopt', this.requirementsToAdopt)
    data.append('image', this.image)
    data.append('canTransit', this.canTransit)
    data.append('address', this.address)
    data.append('textAddress', this.textAddress)
    data.append('nickname', this.nickname)

    try {
      const response = await this.editUserServices.save(data)

      runInAction(() => {
        this.user = response
        this.loadUser(this.user._id)
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
    console.log(this.image)
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
