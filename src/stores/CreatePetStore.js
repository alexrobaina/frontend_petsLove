import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'
import ImageService from 'services/ImageService/ImageService'
import EditPetService from 'services/EditPetService/EditPetService'
import { PROTECTIONIST, ADOPTER, VET, TRANSIT_USER } from 'config/roles'
import AuthService from 'services/AuthService'
import Utils from 'utils'
import Pet from 'models/Pet'

const REQUIRED = 'This input is required'

class CreatePetStore {
  constructor() {
    this.pet = new Pet()
    this.imageService = new ImageService()
    this.editPetService = new EditPetService()
    this.createPetServices = new CreatePetServices()
    this.authService = new AuthService()
    this.utils = new Utils()

    this.init()
  }

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
  @observable optionsUserVet = []
  @observable optionsUserAdopter = []
  @observable optionsUserTransit = []
  @observable location = { lat: -34.603722, lng: -58.381592 }

  @action
  init() {
    this.listUserAdopter()
    this.listUserTransit()
    this.listUserVet()
  }

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
        this.isLoading = false
        this.savePet(response._id)

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
    this.pet = new Pet()
    this.isLoading = true

    try {
      const response = await this.editPetService.gePet(id)

      runInAction(() => {
        this.isLoading = false
        this.idPet = response[0]._id
        this.pet.fillJson(response[0])
        this.previewImage = this.pet.image.value
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
        this.idPet = response._id
        this.isLoading = false
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
    this.isLoading = true
    try {
      await this.imageService.uploadImage(images, this.pet.getImageId)

      runInAction(() => {
        this.isLoading = false
        this.updatePet()
      })
    } catch (e) {
      this.isLoading = false
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listUserAdopter() {

    const role = ADOPTER

    try {
      const response = await this.authService.getUserForRole(role)

      runInAction(() => {
        this.optionsUserAdopter = this.utils.formatReactSelectUsers(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listUserVet() {
    const role = VET

    try {
      const response = await this.authService.getUserForRole(role)

      runInAction(() => {
        this.optionsUserVet = this.utils.formatReactSelectUsers(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listUserTransit() {
    const role = TRANSIT_USET

    try {
      const response = await this.authService.getUserForRole(role)

      runInAction(() => {
        this.optionsUserTransit = this.utils.formatReactSelectUsers(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setIdUser(id) {
    this.pet.setIdUserCreator(id)
  }

  @action
  setArrayNewImageForDelete(image) {
    this.imagesNews = image
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
