import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'
import imageCompression from 'browser-image-compression'
import FormData from 'form-data'
import Pet from 'models/Pet'

const REQUIRED = 'This input is required'

class CreatePetStore {
  constructor() {
    this.createPetServices = new CreatePetServices()
    this.pet = new Pet()
  }

  @observable pet = []
  @observable vets = []
  @observable image = []
  @observable lost = false
  @observable address = {}
  @observable imagesNews = []
  @observable imageResize = []
  @observable urgent = false
  @observable isEdit = false
  @observable adopted = false
  @observable isError = false
  @observable canEdit = false
  @observable isLoading = false
  @observable imagePreview = []
  @observable sterilized = false
  @observable vaccinated = false
  @observable newPreviewsImage = []
  @observable requestSuccess = false
  @observable location = { lat: -34.603722, lng: -58.381592 }

  @action
  async save() {
    this.isLoading = true
    const data = new FormData()
    this.requestSuccess = false

    Object.entries(this.pet.getJson()).forEach(([key, value]) => {
      if (
        key !== 'image' &&
        key !== '_id' &&
        key !== 'userCreator' &&
        key !== 'userTransit' &&
        key !== 'userAdopter'
      ) {
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
        this.isLoading = false
        this.idPet = response._id
        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        console.log(e)
      })
    }
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
    const imageTemporal = this.newPreviewsImage.filter(preview => {
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
    this.pet.userAdopt.setValue(value)
  }

  @action
  setTransitUser(value) {
    this.pet.userTransit.setValue(value)
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
    this.pet.activityLevel.setValue(value.value)
  }

  @action
  setPet(value) {
    this.pet.vet.setValue(value.value)
  }

  @action
  setLastVisitVet(value) {
    this.pet.lastVisitVet.setValue(value)
  }

  @action
  setVet(value) {
    this.pet.vet.setValue(value)
  }

  @action
  setIsCastrated() {
    this.pet.isCastrated = !this.pet.isCastrated
  }

  @action
  setDistemperVaccine() {
    this.pet.distemperVaccine = !this.pet.distemperVaccine
  }

  @action
  setFelineFluVaccine() {
    this.pet.felineFluVaccine = !this.pet.felineFluVaccine
  }

  @action
  setFelineLeukemiaVaccine() {
    this.pet.felineLeukemiaVaccine = !this.pet.felineLeukemiaVaccine
  }

  @action
  setFelineInfectiousPeritonitisVaccine() {
    this.pet.felineInfectiousPeritonitisVaccine = !this.pet.felineInfectiousPeritonitisVaccine
  }

  @action
  setRabiesVaccine() {
    this.pet.rabiesVaccine = !this.pet.rabiesVaccine
  }

  @action
  setHepatitisVaccine() {
    this.pet.hepatitisVaccine = !this.pet.hepatitisVaccine
  }

  @action
  setLeptospirosisVaccine() {
    this.pet.leptospirosisVaccine = !this.pet.leptospirosisVaccine
  }

  @action
  setParvovirusVaccine() {
    this.pet.parvovirusVaccine = !this.pet.parvovirusVaccine
  }

  @action
  setParainfluenzaVaccine() {
    this.pet.parainfluenzaVaccine = !this.pet.parainfluenzaVaccine
  }

  @action
  setBordetellaBronchisepticVaccine() {
    this.pet.bordetellaBronchisepticVaccine = !this.pet.bordetellaBronchisepticVaccine
  }

  @action
  setNotes(value) {
    this.pet.notes.setValue(value)
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
  firstStepValidation() {
    let isValidForm = true
    this.clearError()

    const { name, category, gender } = this.pet

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

    return isValidForm
  }

  @action
  clearError() {
    const { name, category, gender, history, activityLevel, textAddress } = this.pet

    name.clearError()
    category.clearError()
    gender.clearError()
    history.clearError()
    activityLevel.clearError()
    textAddress.clearError()
  }

  // ============================================
  // This functions resize images. Need move to ultils
  // ============================================

  @action
  resize() {
    if (this.pet.image.value.length > 0) {
      Object.values(this.pet.image.value).forEach(image => {
        this.compressImage(image)
      })
    }

    return true
  }

  @action
  async compressImage(event) {
    this.isLoading = true
    // console.log('originalFile instanceof Blob', event instanceof Blob) // true
    // console.log(`originalFile size ${event.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(event, options)
      this.isLoading = false
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      await this.setImageResize(compressedFile) // write your own logic
    } catch (error) {
      this.isLoading = false
      console.log(error)
    }
  }

  @action
  setImageResize(image) {
    this.imageResize.push(image)
  }

  @action
  setImage(value) {
    this.pet.image.setValue(value)
    this.resize()
  }

  // ============================================
  // END resize images.
  // ============================================
}

export default CreatePetStore
