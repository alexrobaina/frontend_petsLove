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
  @observable countryLabel = ''
  @observable cityLabel = ''
  @observable GenderLabel = ''
  @observable categoryLabel = ''

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
        this.typeGender = this.formatData(response)

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


  //falta agregar filtro country
  @action
  formatDataSearch(response) {
    let filterPet
    if (this.city) {
      filterPet = response.filter(filter => {
        return filter.city.toLowerCase().indexOf(this.city.label.toLowerCase()) > -1
      })
    }
    if (this.category) {
      filterPet = filterPet.filter(filter => {
        return filter.categorie._id.indexOf(this.category) > -1
      })
    }
    if (this.gender) {
      filterPet = filterPet.filter(filter => {
        return filter.gender._id.indexOf(this.gender) > -1
      })
    } else {
      return response
    }
    return filterPet
  }

  @action
  async searchPets() {
    this.setLoading()
    this.isLoading = true

    this.filters = [
      { text: this.cityLabel },
      { text: this.countryLabel },
      { text: this.categoryLabel },
      { text: this.GenderLabel },
    ]

    try {
      const response = await this.petsService.getPets()

      runInAction(() => {
        this.pets = this.formatDataSearch(response)

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
    this.countryLabel = value.label
    this.country = value.value
  }

  @action
  setCity(value) {
    this.cityLabel = value.label
    this.city = value
  }

  @action
  setGender(value) {
    this.GenderLabel = value.label
    this.gender = value.value
  }

  @action
  setCategory(value) {
    this.categoryLabel = value.label
    this.category = value.value
  }

  @action
  deleteFilter(filter) {
    console.log(filter)
    this.searchPets()
  }
  
}

export default InitialFormFiltersStore
