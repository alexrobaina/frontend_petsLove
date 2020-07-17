import { observable, action, runInAction } from 'mobx'
import Cities from 'services/Cities'
import PetsService from 'services/PetsService'
import InputStore from './InputStore'

const REQUIRED = 'Is required for search pets'

class SearchPetsStore {
  constructor() {
    this.petsService = new PetsService()
    this.cities = new Cities()
  }

  @observable pets = []
  @observable isError = false
  @observable petsAdopted = []
  @observable isLoading = false
  @observable petsUserAdopt = []
  @observable petsForAdoption = []
  @observable petsUserTransit = []
  @observable optionsCities = []
  @observable city = new InputStore()
  @observable gender = new InputStore()
  @observable country = new InputStore()
  @observable category = new InputStore()

  @action
  async searchPets() {
    if (this.validate()) {
      this.isLoading = true

      const data = {
        city: this.city.value,
        gender: this.gender.value,
        category: this.category.value,
      }

      const searchPets = {
        country: this.country,
        city: this.city,
      }

      localStorage.setItem('searchPets', JSON.stringify(searchPets))

      try {
        const response = await this.petsService.getPets(data)

        runInAction(() => {
          this.pets = response
          this.isLoading = false
        })
      } catch (e) {
        runInAction(() => {
          this.isLoading = false
          console.log(e)
        })
      }
    }
  }

  @action
  async loadPetsForUser(userId) {
    this.isLoading = true
    try {
      const response = await this.petsService.loadPetsUserAdopt(userId)

      runInAction(() => {
        this.petsUserAdopt = response
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  async getPetAdopted(userId) {
    this.isLoading = true

    try {
      const response = await this.petsService.loadPetsAdopted(userId)

      runInAction(() => {
        this.petsAdopted = response
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  async getPetsForAdoption(userId) {
    this.isLoading = true

    try {
      const response = await this.petsService.loadPetForAdoption(userId)

      runInAction(() => {
        this.petsForAdoption = response
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  async getPetsUserAdopt(userId) {
    this.isLoading = true

    try {
      const response = await this.petsService.loadPetsUserAdopt(userId)

      runInAction(() => {
        this.petsUserAdopt = response
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  async getPetsUserTransit(userId) {
    this.isLoading = true

    try {
      const response = await this.petsService.loadPetsUserTransit(userId)

      runInAction(() => {
        this.petsUserTransit = response
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setLoadingFalse() {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }

  // set items for search
  @action
  setCountry(value) {
    if (value) {
      this.country.setValue(value)
    }
    this.selectedCities()
  }

  @action
  setCity(value) {
    if (value) {
      this.city.setValue(value)
    } else {
      this.city.setValue('')
    }
  }

  @action
  setGender(value) {
    if (value) {
      this.gender.setValue(value)
    } else {
      this.gender.setValue('')
    }
  }

  @action
  setCategory(value) {
    if (value) {
      this.category.setValue(value)
    } else {
      this.category.setValue('')
    }
  }

  @action
  selectedCities() {
    if (this.country.value === 'argentina') {
      this.optionsCities = this.cities.argentina
    }
    if (this.country.value === 'venezuela') {
      this.optionsCities = this.cities.venezuela
    }
    if (this.country.value === 'colombia') {
      this.optionsCities = this.cities.colombia
    }
  }

  @action
  validate() {
    this.cleanError()
    let isValid = true

    if (!this.country.value) {
      this.country.setError(true, REQUIRED)

      isValid = false
    }

    if (!this.city.value) {
      this.city.setError(true, REQUIRED)

      isValid = false
    }

    return isValid
  }

  @action
  cleanError() {
    this.city.setError(false, '')
    this.country.setError(false, '')
  }
}

export default SearchPetsStore
