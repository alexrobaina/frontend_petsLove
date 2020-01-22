import { observable, action, runInAction, computed } from 'mobx'
import _ from 'lodash'
import LocationsService from '../services/LocationsService'
import GenderService from '../services/GenderService'
import CategoriesPetsService from '../services/CategoriesPetsService'
import PetsService from '../services/PetsService/PetsService'

class InitialFormFiltersStore {
  constructor() {
    this.locationsService = new LocationsService()
    this.genderServices = new GenderService()
    this.categoriesPetsService = new CategoriesPetsService()
    this.petsService = new PetsService()
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
  @observable isFilter = false
  @observable filters = false

  // validation if selects have value
  @observable countryIsDirtry = false
  @observable cityIsDirtry = false
  @observable genderIsDirtry = false
  @observable categoryIsDirtry = false

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
      const response = await this.genderServices.getTypePets()

      runInAction(() => {
        this.typeGender = this.formatDataReactSelect(response)

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
        this.categoriesPets = this.formatDataReactSelect(response)

        this.setLoading()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  validation() {
    this.countryIsDirtry = false
    this.cityIsDirtry = false
    this.genderIsDirtry = false
    this.categoryIsDirtry = false
  }

  @action
  async searchPets() {
    this.setLoading()
    this.isLoading = true


    const data = {
      country: this.country,
      city: this.city,
      categorie: this.category,
      gender: this.gender,
      birthdate: this.birthdate,
      zone: this.zone,
    }

    try {
      const response = await this.petsService.getPets(data)

      runInAction(() => {
        this.pets = response

        this.isFilter = true
        this.isLoading = false
        this.setLoading()
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
    this.countryLabel = value.label
    this.country = value.value
  }

  @action
  setCity(value) {
    this.cityLabel = value.label
    this.city = value.value
  }

  @action
  setGender(value) {
    this.genderLabel = value.label
    this.gender = value.value
  }

  @action
  setCategory(value) {
    this.categoryLabel = value.label
    this.category = value.value
  }

  @action
  deleteFilter(value) {
    this.searchPets()
  }
}

export default InitialFormFiltersStore
