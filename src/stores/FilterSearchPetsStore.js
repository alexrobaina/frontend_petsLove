import { observable, action, runInAction } from 'mobx'
import PetsService from 'services/PetsService'
import InputStore from './InputStore'

class FilterSearchPetsStore {
  @observable isError = false
  @observable petsFiltered = []
  @observable isLoading = false
  @observable optionsCities = []
  @observable totalPetsFiltered = 0
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
      city: this.city.value.toLowerCase(),
      country: this.country.value.toLowerCase(),
      gender: this.gender.value,
      category: this.category.value,
    }

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
  setCountry(value) {
    this.country.setValue(value)
  }

  @action
  setCity(value) {
    this.city.setValue(value)
  }
}

export default FilterSearchPetsStore
