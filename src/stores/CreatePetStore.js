import { action, observable, runInAction } from 'mobx'

class CreatePetStore {
  constructor() {
    // this.createPetServices = new CreatePetStore()
  }

  @observable image = []
  @observable name = ''
  @observable location = ''
  @observable country = ''
  @observable city = ''
  @observable category = ''
  @observable gender = ''
  @observable ages = ''
  @observable history = ''
  @observable requiredToAdoption = ''
  @observable activity = ''
  @observable isLoading = false
  @observable isError = false

  @action
  async createPet() {
    const data = {
      name: 'alex',
    }
    try {
      const response = await this.createPetServices.addPet(data)

      runInAction(() => {
        this.countries = []
        this.countries = response
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
    this.country = value
  }

  @action
  setCity(value) {
    this.city = value
  }

  @action
  setCategory(value) {
    this.category = value
  }

  @action
  setGender(value) {
    this.gender = value
  }

  @action
  setAge(value) {
    this.age = value
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
    this.activity = value
  }
}

export default CreatePetStore
