import { action, observable, runInAction } from 'mobx'
import EditUserServices from 'services/EditUserServices'

class CreatePetStore {
  constructor() {
    this.EditUserServices = new EditUserServices()
  }

  @observable image = []
  @observable name = ''
  @observable address = ''
  @observable email = ''
  @observable nickname = ''
  @observable phone = ''
  @observable alias = ''
  @observable user = []
  @observable numberAccount = ''
  @observable isContent = false
  @observable location = {}

  @action
  async saveUser() {
    const data = {
      image: this.image,
      name: this.name,
      address: this.address,
      email: this.email,
      nickname: this.nickname,
      phone: this.phone,
      alias: this.alias,
      numberAccount: this.numberAccount,
      location: this.location,
    }
    try {
      const response = await this.EditUserServices.save(data)

      runInAction(() => {
        this.user = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setName(value) {
    this.name = value
  }

  @action
  setLocation(value) {
    this.location = value
  }

  @action
  setCountry(value) {
    this.email = value
  }

  @action
  setCity(value) {
    this.address = value
  }

  @action
  setCategory(value) {
    this.image = value
  }

  @action
  setGender(value) {
    this.nickname = value
  }

  @action
  setAge(value) {
    this.phone = value
  }

  @action
  setHistory(value) {
    this.numberAccount = value
  }
}

export default CreatePetStore
