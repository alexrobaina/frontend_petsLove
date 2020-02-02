import { observable, action, runInAction, computed } from 'mobx'
import _ from 'lodash'
import LocationsService from '../services/LocationsService'
import GenderService from '../services/GenderService'
import CategoriesPetsService from '../services/CategoriesPetsService'
import PetsAgesServices from '../services/PetsAgesService/PetesAgesServices'

class OptionsSelectsStore {
  constructor() {
    this.locationsService = new LocationsService()
    this.genderServices = new GenderService()
    this.categoriesPetsService = new CategoriesPetsService()
    this.petsAgesService = new PetsAgesServices()
  }

  @observable cities = []
  @observable countries = []
  @observable gender = []
  @observable categories = []
  @observable ages = []
  @observable isLoading = false

  @action
  async listContries() {
    try {
      const response = await this.locationsService.getCountries()

      runInAction(() => {
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
      const response = await this.genderServices.getTypePets()

      runInAction(() => {
        this.gender = this.formatDataReactSelect(response)
        this.gender.push({ value: '', label: 'All genders' })
        this.gender = this.gender.reverse()
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
        this.categories = this.formatDataReactSelect(response)
        this.categories.push({ value: '', label: 'All Categories' })
        this.categories = this.categories.reverse()
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
        this.ages = this.formatDataReactSelect(response)
        this.ages.push({ value: '', label: 'All Ages' })
        this.ages = this.ages.reverse()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  formatDataReactSelect(data) {
    let result = []
    data.forEach(item => {
      if (item.age) {
        result.push(_.zipObject(['value', 'label'], [item._id, item.age]))
      }
      result.push(_.zipObject(['value', 'label'], [item._id, item.name]))
    })

    return result
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
