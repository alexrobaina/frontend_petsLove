import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'
import Pet from 'models/Pet'

// const REQUIRED = 'This input is required'
const REQUIRED = 'required'

class CreatePetStore {
  constructor() {
    this.createPetServices = new CreatePetServices()
    this.pet = new Pet()
  }

  @observable image = []
  @observable pet = []
  @observable imagePreview = []
  @observable imagesNews = []
  @observable newPreviewsImage = []
  @observable address = {}
  @observable location = { lat: -34.603722, lng: -58.381592 }
  @observable urgent = false
  @observable sterilized = false
  @observable lost = false
  @observable vaccinated = false
  @observable adopted = false
  @observable isLoading = false
  @observable isError = false
  @observable isEdit = false
  @observable canEdit = false
  @observable requestSuccess = false

  @action
  async save(userId) {
    if (this.validationForm()) {
      const data = new FormData()
      this.requestSuccess = false
      this.pet.user.setValue(userId)

      Object.entries(this.pet.getJson()).forEach(([key, value]) => {
        if (key !== 'userAdopt' && key !== 'userTransit' && key !== 'image' && key !== '_id') {
          data.append(key, value)
        }
      })

      if (this.pet.image.value.length > 0) {
        Object.values(this.pet.image.value).forEach(value => {
          data.append('image', value)
        })
      }

      try {
        const response = await this.createPetServices.addPet(data)

        runInAction(() => {
          this.pet = response

          this.idPet = this.pet._id
          this.requestSuccess = true
        })
      } catch (e) {
        runInAction(() => {
          console.log(e)
        })
      }
    }
  }

  @action
  async saveEdit() {
    this.requestSuccess = false
    const data = new FormData()

    if (this.pet.image.value.length > 0) {
      Object.values(this.pet.image.value).forEach(value => {
        data.append('image', value)
      })
    }

    Object.values(this.imagePreview).forEach(value => {
      data.append('imagePreview', value)
    })

    Object.entries(this.pet.getJson()).forEach(([key, value]) => {
      if (key !== 'userAdopt' && key !== 'userTransit' && key !== 'image') {
        data.append(key, value)
      }
      if (key === 'userAdopt') {
        if (value !== '' && value !== undefined) {
          data.append(key, value)
        }
      }
      if (key === 'userTransit') {
        if (value !== '' && value !== undefined) {
          data.append(key, value)
        }
      }
    })

    try {
      const response = await this.createPetServices.editPet(data)

      runInAction(() => {
        this.pet = response
        this.idPet = this.pet._id

        this.requestSuccess = true
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
      const response = await this.createPetServices.searchPet(id)

      runInAction(() => {
        this.pet.fillJson(response)
        this.imagePreview = this.pet.image.value

        if (this.pet.userAdopt.value) {
          this.emailUserAdopt = this.pet.userAdopt.value
        }
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setImage(value) {
    this.pet.image.setValue(value)
  }

  // this function is only for set image previews
  @action
  deleteImageArray(image) {
    this.imagePreview = this.imagePreview.filter(preview => {
      return preview !== image
    })
    this.imagePreview.forEach(preview => {
      this.pet.image.setValue(preview !== image)
    })
  }

  // this function is only for set image previews
  @action
  deleteNewPreviewsImage(image) {
    let imageTemporal = this.newPreviewsImage.filter(preview => {
      return preview.preview !== image.preview
    })
    this.newPreviewsImage = imageTemporal
  }

  @action
  setNewsPreviewsImage(image) {
    this.newPreviewsImage = image
  }

  @action
  setArrayNewImageForDelete(image) {
    this.imagesNews = image
  }

  @action
  setName(value) {
    this.pet.name.setValue(value)
  }

  @action
  setCategory(value) {
    this.pet.category.setValue(value.value)
  }

  @action
  setUserAdopter(value) {
    this.pet.userAdopt.setValue(value.value)
  }

  @action
  setTransitUser(value) {
    this.pet.userTransit.setValue(value.value)
  }

  @action
  setAddress(value) {
    this.location = value
    this.pet.setAddress(value)
  }

  @action
  setTextAddress(value) {
    this.pet.textAddress.setValue(value)
  }

  @action
  setUrgent() {
    this.pet.urgent = !this.pet.urgent
  }

  @action
  setAdopted() {
    this.pet.adopted = !this.pet.adopted
  }

  @action
  setLost() {
    this.pet.lost = !this.pet.lost
  }

  @action
  setSterilized() {
    this.pet.sterilized = !this.pet.sterilized
  }

  @action
  setVaccinated() {
    this.pet.vaccinated = !this.pet.vaccinated
  }

  @action
  setGender(value) {
    this.pet.gender.setValue(value.value)
  }

  @action
  setAge(value) {
    this.pet.age.setValue(value.value)
  }

  @action
  setHistory(value) {
    this.pet.history.setValue(value)
  }

  @action
  setRequiredToAdoption(value) {
    this.pet.requiredToAdoption.setValue(value)
  }

  @action
  setActivity(value) {
    this.pet.activity.setValue(value.value)
  }

  @action
  setEdit() {
    this.isEdit = true
  }

  @action
  setCancelEdit() {
    this.isEdit = false
  }

  @action
  validationForm() {
    let isValidForm = true
    this.clearError()

    const { name, category, gender, history, requiredToAdoption, activity, textAddress } = this.pet

    if (!name.value) {
      name.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!category.value) {
      category.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!gender.value) {
      gender.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!activity.value) {
      activity.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!requiredToAdoption.value) {
      requiredToAdoption.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!history.value) {
      history.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!textAddress.value) {
      textAddress.setError(true, REQUIRED)

      isValidForm = false
    }

    return isValidForm
  }

  @action
  clearError() {
    const { name, category, gender, history, requiredToAdoption, activity, textAddress } = this.pet

    name.clearError()
    category.clearError()
    gender.clearError()
    history.clearError()
    requiredToAdoption.clearError()
    activity.clearError()
    requiredToAdoption.clearError()
    textAddress.clearError()
  }
}

export default CreatePetStore
