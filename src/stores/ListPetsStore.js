import { observable, action, runInAction } from 'mobx'
import LocationsService from '../services/LocationsService'
import GenderService from '../services/GenderService'
import CategoriesPetsService from '../services/CategoriesPetsService'

class InitialFormFiltersStore {
  constructor() {
    this.locationsService = new LocationsService()
    this.genderServices = new GenderService()
    this.categoriesPetsService = new CategoriesPetsService()
  }

  @observable city = ''
  @observable gender = ''
  @observable cities = []
  @observable country = ''
  @observable category = ''
  @observable countries = []
  @observable typeGender = []
  @observable categoriesPets = []
  @observable isLoading = false

  @action
  async listGender() {
    this.setLoading()

    try {
      const response = await this.genderServices.getGender()

      runInAction(() => {
        this.typeGender = response[0].gender

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setLoading() {
    this.isLoading = !this.isLoading
  }

  @action
  setCategory(value) {
    this.category = value.value
  }
}

export default InitialFormFiltersStore
