import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'

class CreatePetStore {
  constructor() {
    this.createPetServices = new CreatePetServices()
  }

  @observable image = []
  @observable name = ''
  @observable pet = []
  @observable address = {}
  @observable category = ''
  @observable textAddress = ''
  @observable urgent = false
  @observable sterilized = false
  @observable lost = false
  @observable vaccinated = false
  @observable gender = ''
  @observable age = ''
  @observable activity = ''
  @observable history = ''
  @observable requiredToAdoption = ''
  @observable isLoading = false
  @observable isError = false
  @observable isEdit = false
  @observable canEdit = false

  @action
  async save(userId) {
    const dataPets = {
      user: userId,
      name: this.name,
      category: this.category,
      textAddress: this.textAddress,
      urgent: this.urgent,
      sterilized: this.sterilized,
      lost: this.lost,
      gender: this.gender,
      age: this.age,
      vaccinated: this.vaccinated,
      history: this.history,
      requiredToAdoption: this.requiredToAdoption,
      activity: this.activity,
    }

    const data = new FormData()

    Object.entries(this.image).forEach(([key, value]) => {
      data.append('image', value)
    })

    Object.entries(dataPets).forEach(([key, value]) => {
      data.append(key, value)
    })

    Object.entries(this.address).forEach(([key, value]) => {
      data.append(key, value)
    })

    try {
      const response = await this.createPetServices.addPet(data)

      runInAction(() => {
        this.pet = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setImage(value) {
    this.image = value
    console.log(this.image)
  }

  @action
  setName(value) {
    this.name = value
  }

  @action
  setCategory(value) {
    this.category = value.value
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
  setUrgent() {
    this.urgent = !this.urgent
  }

  @action
  setLost() {
    this.lost = !this.lost
  }

  @action
  setSterilized() {
    this.sterilized = !this.sterilized
  }

  @action
  setVaccinated() {
    this.vaccinated = !this.vaccinated
  }

  @action
  setGender(value) {
    this.gender = value.value
  }

  @action
  setAge(value) {
    this.age = value.value
  }

  @action
  setHistory(value) {
    this.history = value
  }

  @action
  setRequiredToAdoption(value) {
    this.requiredToAdoption = value
  }

  @action
  setActivity(value) {
    this.activity = value.value
  }

  @action
  setIsEdit() {
    this.isEdit = !this.isEdit
  }
}

export default CreatePetStore
