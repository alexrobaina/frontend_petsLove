import { observable, action, runInAction } from 'mobx'
import PetsService from 'services/PetsService'
import InputStore from './InputStore'

const REQUIRED = 'Is required for search pets'

class FilterSearchPetsStore {
  @observable isError = false
  @observable petsFiltered = []
  @observable isLoading = false
  @observable optionsCities = []
  @observable city = new InputStore()
  @observable gender = new InputStore()
  @observable country = new InputStore()
  @observable category = new InputStore()
  @observable textAddress = new InputStore()

  constructor() {
    this.petsService = new PetsService()
  }

  @action
  async searchPets(limit, page) {
    this.isLoading = true

    const data = {
      city: this.city.value,
      country: this.country.value,
      gender: this.gender.value,
      category: this.category.value,
    }

    const searchPets = {
      country: this.country.value,
      city: this.city.value,
    }

    localStorage.setItem('searchPets', JSON.stringify(searchPets))

    try {
      const response = await this.petsService.getPets(data, limit, page)

      runInAction(() => {
        this.petsFiltered = response.pets
        this.totalPetsFiltered = response.totalPets
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        console.log(e)
      })
    }
  }

  @action
  setAddressComponents(address) {
    address.address_components.forEach(components => {
      components.types.forEach(type => {
        if (type === 'country') {
          this.country.setValue(components.long_name)
        }
        if (type === 'administrative_area_level_1') {
          this.city.setValue(components.long_name)
        }
      })
    })
  }

  @action
  setTextAddress(value) {
    this.textAddress.setValue(value)
  }

  @action
  setLoadingFalse() {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
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
  validate() {
    this.cleanError()
    let isValid = true

    if (!this.textAddress.value) {
      this.textAddress.setError(true, REQUIRED)

      isValid = false
    }

    return isValid
  }

  @action
  cleanError() {
    this.textAddress.setError(false, '')
  }
}

export default FilterSearchPetsStore
