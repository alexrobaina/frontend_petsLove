import { observable, action, runInAction } from 'mobx'
import _uniqBy from 'lodash/uniqBy'
import PetsService from 'services/PetsService'

class SearchPetsStore {
  constructor() {
    this.petsService = new PetsService()
  }

  @observable age = ''
  @observable city = ''
  @observable pets = false
  @observable gender = ''
  @observable filters = []
  @observable country = ''
  @observable category = ''
  @observable activity = ''
  @observable lost = false
  @observable urgent = false
  @observable dewormed = false
  @observable isLoading = false
  @observable sterilized = false
  @observable vaccianated = false
  @observable isError = false

  // Filters
  @observable urgentText = ''
  @observable countryLabel = ''
  @observable cityLabel = ''
  @observable genderLabel = ''
  @observable categoryLabel = ''
  @observable lostText = ''
  @observable dewormedText = ''
  @observable vaccianatedText = ''
  @observable sterilizedText = ''
  @observable activityLabel = ''
  @observable ageLabel = ''
  @observable deleteFiltersDuplicate = []

  // Reset filters
  @observable clearSelectCountry = true
  @observable clearSelectCity = true
  @observable clearSelectGender = true
  @observable clearSelectCategory = true
  @observable clearSelectActivity = true
  @observable clearSelectAge = true

  setFiltersPets = (textFilter, typeFilter, arrayFilter) => {
    if (textFilter !== '') {
      return arrayFilter.push({
        text: textFilter,
        typeFilter,
      })
    }
    return textFilter
  }

  @action
  setFilters() {
    this.setFiltersPets(this.urgentText, 'urgent', this.filters)
    this.setFiltersPets(this.countryLabel, 'country', this.filters)
    this.setFiltersPets(this.cityLabel, 'city', this.filters)
    this.setFiltersPets(this.genderLabel, 'gender', this.filters)
    this.setFiltersPets(this.categoryLabel, 'category', this.filters)
    this.setFiltersPets(this.lostText, 'lost', this.filters)
    this.setFiltersPets(this.dewormedText, 'dewormed', this.filters)
    this.setFiltersPets(this.ageLabel, 'age', this.filters)
    this.setFiltersPets(this.vaccianatedText, 'vaccianated', this.filters)
    this.setFiltersPets(this.sterilizedText, 'sterilized', this.filters)
    this.setFiltersPets(this.activityLabel, 'activity', this.filters)

    this.deleteFiltersDuplicate = _uniqBy(this.filters, e => {
      return e.typeFilter
    })

    this.filters = this.deleteFiltersDuplicate
  }

  @action
  deleteFilter(valueText, typeFilter) {
    let newFilter = []
    if (typeFilter === 'urgent') {
      this.urgent = false
      this.urgentText = ''
    }
    if (typeFilter === 'country') {
      this.country = ''
      this.countryLabel = ''
      this.clearSelectCountry = false

      setTimeout(() => {
        this.clearSelectCountry = true
      }, 500)
    }
    if (typeFilter === 'age') {
      this.age = ''
      this.ageLabel = ''
      this.clearSelectAge = false

      setTimeout(() => {
        this.clearSelectAge = true
      }, 500)
    }
    if (typeFilter === 'city') {
      this.city = ''
      this.cityLabel = ''
      this.clearSelectCity = false

      setTimeout(() => {
        this.clearSelectCity = true
      }, 500)
    }
    if (typeFilter === 'gender') {
      this.gender = ''
      this.genderLabel = ''
      this.clearSelectGender = false

      setTimeout(() => {
        this.clearSelectGender = true
      }, 500)
    }
    if (typeFilter === 'category') {
      this.category = ''
      this.categoryLabel = ''
      this.clearSelectCategory = false

      setTimeout(() => {
        this.clearSelectCategory = true
      }, 500)
    }
    if (typeFilter === 'lost') {
      this.lost = false
      this.lostText = ''
    }
    if (typeFilter === 'activity') {
      this.activity = ''
      this.activityLabel = ''
      this.clearSelectActivity = false

      setTimeout(() => {
        this.clearSelectActivity = true
      }, 500)
    }
    if (typeFilter === 'dewormed') {
      this.dewormed = false
      this.dewormedText = ''
    }
    if (typeFilter === 'vaccianated') {
      this.vaccianated = false
      this.vaccianatedText = ''
    }
    if (typeFilter === 'sterilized') {
      this.sterilized = false
      this.sterilizedText = ''
    }

    newFilter = this.filters.filter(filter => {
      return valueText !== filter.text
    })

    this.filters = newFilter
    this.searchPets()
  }

  @action
  async searchPets() {
    this.setLoadingTrue()
    const data = {
      age: this.age,
      lost: this.lost,
      city: this.city,
      urgent: this.urgent,
      gender: this.gender,
      country: this.country,
      dewormed: this.dewormed,
      activity: this.activity,
      categorie: this.category,
      sterilized: this.sterilized,
      vaccianated: this.vaccianated,
    }

    const searchPets = {
      country: this.country,
      city: this.city,
    }

    localStorage.setItem('searchPets', JSON.stringify(searchPets))

    this.setFilters()
    this.isError = false

    try {
      const response = await this.petsService.getPets(data)

      runInAction(() => {
        this.pets = response
        this.setLoadingFalse()

        this.isFilter = true
      })
    } catch (e) {
      runInAction(() => {
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setLoadingTrue() {
    this.isLoading = true
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
    this.countryLabel = value.label
    this.country = value.value
  }

  @action
  setAge(value) {
    this.ageLabel = value.label
    this.age = value.value
  }

  @action
  setActivity(value) {
    this.activityLabel = value.label
    this.activity = value.value
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
  setLost() {
    this.lostText = 'lost'
    this.lost = !this.lost
  }

  @action
  setDewormed() {
    this.dewormedText = 'dewormed'
    this.dewormed = !this.dewormed
  }

  @action
  setVaccianated() {
    this.vaccianatedText = 'vaccianated'
    this.vaccianated = !this.vaccianated
  }

  @action
  setUrgent() {
    this.urgentText = 'urgent'
    this.urgent = !this.urgent
  }

  @action
  setSterilized() {
    this.sterilizedText = 'sterilized'
    this.sterilized = !this.sterilized
  }
}

export default SearchPetsStore
