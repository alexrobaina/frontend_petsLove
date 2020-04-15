import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'

class CreatePetStore {
  constructor() {
    this.createPetServices = new CreatePetServices()
  }

  @observable image = []
  @observable name = ''
  @observable pet = []
  @observable imagePreview = []
  @observable newPreviewsImage = []
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

    // eslint-disable-next-line no-unused-vars
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
  async saveEdit(id) {
    const dataPets = {
      _id: id,
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

    // eslint-disable-next-line no-unused-vars
    Object.entries(this.image).forEach(([key, value]) => {
      data.append('image', value)
    })

    // eslint-disable-next-line no-unused-vars
    Object.entries(this.imagePreview).forEach(([key, value]) => {
      data.append('imagePreview', value)
    })

    Object.entries(dataPets).forEach(([key, value]) => {
      data.append(key, value)
    })

    Object.entries(this.address).forEach(([key, value]) => {
      data.append(key, value)
    })

    try {
      const response = await this.createPetServices.editPet(data)

      runInAction(() => {
        this.pet = response
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
  async searchPetForId(id) {
    try {
      const response = await this.createPetServices.searchPetEdit(id)

      runInAction(() => {
        this.pet = response
        this.imagePreview = response.image
        Object.entries(this.pet).forEach(([key, value]) => {
          if (key !== 'image') {
            this[key] = value
          }
        })
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
  }

  @action
  deleteImageArray(image) {
    this.imagePreview = this.imagePreview.filter(preview => {
      return preview !== image
    })
  }

  @action
  deleteNewPreviewsImage(image) {
    this.image = this.newPreviewsImage.filter(preview => {
      return preview.preview !== image
    })
  }

  @action
  setNewsPreviewsImage(image) {
    this.newPreviewsImage = image
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
  setEdit() {
    this.isEdit = true
  }

  @action
  setCancelEdit() {
    this.isEdit = false
  }
}

export default CreatePetStore
