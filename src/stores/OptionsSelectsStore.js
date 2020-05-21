import { observable, action, runInAction } from 'mobx'
import LocationsService from 'services/LocationsService'
import GenderService from 'services/GenderService'
import CategoriesPetsService from 'services/CategoriesPetsService'
import PetsAgesServices from 'services/PetsAgesService/PetsAgesServices'
import ActivityService from 'services/ActivityService'
import Utils from 'utils'

class OptionsSelectsStore {
  constructor() {
    this.locationsService = new LocationsService()
    this.genderServices = new GenderService()
    this.categoriesPetsService = new CategoriesPetsService()
    this.petsAgesService = new PetsAgesServices()
    this.activityService = new ActivityService()
    this.utils = new Utils()
  }

  @observable cities = []
  @observable countries = []
  @observable gender = []
  @observable categories = []
  @observable ages = []
  @observable activity = []
  @observable isLoading = false

  @action
  async listContries() {
    try {
      const response = await this.locationsService.getCountries()

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
  async listCitiesUnitedState() {
    try {
      const response = await this.locationsService.getCitiesUnitedState()

      runInAction(() => {
        this.cities = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listCitiesArgentina() {
    try {
      const response = await this.locationsService.getCitiesArgentina()

      runInAction(() => {
        this.cities = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listGender() {
    try {
      const response = await this.genderServices.getGender()

      runInAction(() => {
        this.gender = response
        console.log(this.gender)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listCategories() {
    try {
      const response = await this.categoriesPetsService.getTypePets()

      runInAction(() => {
        this.categories = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listAges() {
    try {
      const response = await this.petsAgesService.getAge()

      runInAction(() => {
        this.ages = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listActiviy() {
    try {
      const response = await this.activityService.getActivity()

      runInAction(() => {
        this.activity = response
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setOptionsCities() {
    if (this.country === 'unitedStates') {
      this.listCitiesUnitedState()
    }
    if (this.country === 'argentina') {
      this.listCitiesArgentina()
    }
  }

  @action
  setLoadingTrue() {
    this.isLoading = true
  }

  @action
  setLoadingFalse() {
    this.isLoading = false
  }

  @action
  setCountry(value) {
    this.countryLabel = value.label
    this.country = value.value
  }
}

export default OptionsSelectsStore
