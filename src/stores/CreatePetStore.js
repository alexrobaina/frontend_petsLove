import { action, observable, runInAction } from 'mobx'
import CreatePetServices from 'services/CreatePetServices'
import ImageService from 'services/ImageService/ImageService'
import EditPetService from 'services/EditPetService/EditPetService'
import { ADOPTER, VET, TRANSIT_USER } from 'config/roles'
import AuthService from 'services/AuthService'
import AsyncApiStore from 'stores/AsyncApiStore'
import Utils from 'utils'
import Pet from 'models/Pet'

const REQUIRED = 'common:isRequired'

class CreatePetStore extends AsyncApiStore {
  constructor() {
    super()

    this.pet = new Pet()
    this.utils = new Utils()
    this.authService = new AuthService()
    this.imageService = new ImageService()
    this.editPetService = new EditPetService()
    this.createPetServices = new CreatePetServices()

    this.init()
  }

  @observable vets = []
  @observable image = []
  @observable address = {}
  @observable idImagePet = ''
  @observable imagesNews = []
  @observable isError = false
  @observable canEdit = false
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
    this.preRequest()
    this.requestSuccess = false

    this.pet.image.setValue(id)

    try {
      const response = await this.createPetServices.addPet(this.pet.getJson())

      runInAction(() => {
        this.onSuccessRequest()

        this.idPet = response._id
        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async saveImageCreation(images) {
    this.preRequest()

    try {
      const response = await this.imageService.addImagePet(images)

      runInAction(() => {
        this.onSuccessRequest()
        this.savePet(response._id)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async findOnePet(id) {
    this.preRequest()

    this.pet = new Pet()

    try {
      const response = await this.editPetService.gePet(id)

      runInAction(() => {
        this.onSuccessRequest()
        this.idPet = response[0]._id
        this.pet.fillJson(response[0])
        this.previewImage = this.pet.image.value
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async updatePet() {
    this.preRequest()
    this.requestSuccess = false

    try {
      const response = await this.createPetServices.update(this.pet.getJson())

      runInAction(() => {
        this.onSuccessRequest()
        this.idPet = response._id
        this.requestSuccess = true
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()

        this.requestSuccess = false
      })
    }
  }

  @action
  async uploadImage(images) {
    this.preRequest()

    try {
      await this.imageService.uploadImagePet(images, this.pet.getImageId)

      runInAction(() => {
        this.updatePet()
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async uploadImageFromPreview(images) {
    this.preRequest()

    try {
      await this.imageService.uploadImagePet(images, this.pet.getImageId)

      runInAction(() => {
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async listUserAdopter() {
    this.preRequest()

    const role = ADOPTER

    try {
      const response = await this.authService.getUserForRole(role)

      runInAction(() => {
        this.onSuccessRequest()
        this.optionsUserAdopter = this.utils.formatReactSelectUsers(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async listUserVet() {
    this.preRequest()

    const role = VET

    try {
      const response = await this.authService.getUserForRole(role)

      runInAction(() => {
        this.onSuccessRequest()
        this.optionsUserVet = this.utils.formatReactSelectUsers(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
      })
    }
  }

  @action
  async listUserTransit() {
    this.preRequest()

    const role = TRANSIT_USER

    try {
      const response = await this.authService.getUserForRole(role)

      runInAction(() => {
        this.optionsUserTransit = this.utils.formatReactSelectUsers(response)
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.clearError()
        this.onSuccessRequest()
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

    const { name, category, gender, history, activityLevel } = this.pet

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

    if (!history.value) {
      history.setError(true, REQUIRED)

      isValidForm = false
    }

    if (!activityLevel.value) {
      activityLevel.setError(true, REQUIRED)

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
