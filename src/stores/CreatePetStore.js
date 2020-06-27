import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'
import ImageService from 'services/ImageService/ImageService'
import EditPetService from 'services/EditPetService/EditPetService'
import Pet from 'models/Pet'

const REQUIRED = 'This input is required'

class CreatePetStore {
  constructor() {
    this.pet = new Pet()
    this.imageService = new ImageService()
    this.editPetService = new EditPetService()
    this.createPetServices = new CreatePetServices()
  }

  @observable pet = []
  @observable vets = []
  @observable image = []
  @observable address = {}
  @observable idImagePet = ''
  @observable imagesNews = []
  @observable isError = false
  @observable canEdit = false
  @observable isLoading = false
  @observable previewsImage = []
  @observable imageForResize = null
  @observable requestSuccess = false
  @observable location = { lat: -34.603722, lng: -58.381592 }

  @action
  async savePet(id) {
    this.isLoading = true
    this.requestSuccess = false

    this.pet.image.setValue(id)
    try {
      const response = await this.createPetServices.addPet(this.pet.getJson())

      runInAction(() => {
        this.isLoading = false
        this.idPet = response._id
        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.isLoading = false
      })
    }
  }

  @action
  async saveImageCreation(images) {
    this.isLoading = true
    this.requestSuccess = false

    try {
      const response = await this.imageService.addImage(images)

      runInAction(() => {
        this.savePet(response._id)

        this.isLoading = false
        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async findOnePet(id) {
    this.isLoading = true
    this.requestSuccess = false

    try {
      const response = await this.editPetService.gePet(id)

      runInAction(() => {
        this.isLoading = false
        this.idPet = response._id
        this.pet.fillJson(response)
        this.previewImage = this.pet.image.value

        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        console.log(e)
      })
    }
  }

  @action
  async updatePet() {
    this.isLoading = true
    this.requestSuccess = false

    try {
      const response = await this.createPetServices.update(this.pet.getJson())

      runInAction(() => {
        this.isLoading = false
        this.idPet = response._id
        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.isLoading = false
      })
    }
  }

  @action
  async uploadImage(images) {
    try {
      await this.imageService.uploadImage(images, this.pet.getImageId)

      runInAction(() => {
        this.updatePet()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  // this function is only for set image previews

  @action
  setIdUser(id) {
    this.pet.setIdUserCreator(id)
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
    this.pet.location.setValue(value)
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
  setBirthday(value) {
    this.pet.birthday.setValue(value)
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
  setActivityLevel(value) {
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
}

export default CreatePetStore
