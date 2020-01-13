import { observable, action, runInAction } from 'mobx'
import _ from 'lodash'
import LocationsService from '../services/LocationsService'
import GenderService from '../services/GenderService'
import CategoriesPetsService from '../services/CategoriesPetsService'

class InitialFormFiltersStore {
  constructor() {
    this.locationsService = new LocationsService()
    this.genderServices = new GenderService()
    this.categoriesPetsService = new CategoriesPetsService()
  }

  @observable pets = []
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
  async listContries() {
    this.setLoading()

    try {
      const response = await this.locationsService.getCountries()

      runInAction(() => {
        this.countries = response

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setCities() {
    if (this.country === 'unitedStates') {
      this.listCitiesUnitedState()
    }
    if (this.country === 'argentina') {
      this.listCitiesArgentina()
    }
  }

  @action
  async listCitiesUnitedState() {
    this.setLoading()

    try {
      const response = await this.locationsService.getCitiesUnitedState()

      runInAction(() => {
        this.cities = response

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listCitiesArgentina() {
    this.setLoading()

    try {
      const response = await this.locationsService.getCitiesArgentina()

      runInAction(() => {
        this.cities = response

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listGender() {
    this.setLoading()

    try {
      const response = await this.genderServices.getGender()

      runInAction(() => {
        this.typeGender = response

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async listCategoriesPets() {
    this.setLoading()

    try {
      const response = await this.categoriesPetsService.getTypePets()

      runInAction(() => {
        this.categoriesPets = this.formatData(response)

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  async searchPets() {
    this.setLoading()

    this.filters = {
      city: this.city,
      country: this.country,
      gender: this.gender,
      category: this.category,
    }

    try {
      const response = await this.petsService.getPets(this.filters)

      runInAction(() => {
        this.pets = response[0].pets

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  formatData(data) {
    let result = []
    data.forEach(item => {
      result.push(_.zipObject(['value', 'label'], [item._id, item.name]))
    })

    return result
  }

  @action
  setSearch(value) {
    this.search = value.value
  }

  @action
  setLoading() {
    this.isLoading = !this.isLoading
  }

  @action
  setCountry(value) {
    this.country = value.value
  }

  @action
  setCity(value) {
    this.city = value.value
  }

  @action
  setGender(value) {
    this.gender = value.value
  }

  @action
  setCategory(value) {
    this.category = value.value
  }
}

export default InitialFormFiltersStore
