import { observable, action, runInAction, computed } from 'mobx'
import _uniqBy from 'lodash/uniqBy'
import PetsService from '../services/PetsService'

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
  @observable isLoading = false
  @observable lost = false
  @observable urgent = false
  @observable dewormed = false
  @observable sterilized = false
  @observable vaccianated = false

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

  @action
  setFilters() {
    this.urgentText !== '' ? this.filters.push({ text: this.urgentText, typeFilter: 'urgent', }) : this.urgentText
    this.countryLabel !== '' ? this.filters.push({ text: this.countryLabel, typeFilter: 'country', }) : this.countryLabel
    this.cityLabel !== '' ? this.filters.push({ text: this.cityLabel, typeFilter: 'city' }) : this.cityLabel
    this.genderLabel !== '' ? this.filters.push({ text: this.genderLabel, typeFilter: 'gender' }) : this.genderLabel
    this.categoryLabel !== '' ? this.filters.push({text: this.categoryLabel,typeFilter: 'category' }) : this.categoryLabel
    this.lostText !== '' ? this.filters.push({ text: this.lostText, typeFilter: 'lost' }) : this.lostText
    this.dewormedText !== '' ? this.filters.push({ text: this.dewormedText, typeFilter: 'dewormed' }) : this.dewormedText
    this.vaccianatedText !== '' ? this.filters.push({ text: this.vaccianatedText, typeFilter: 'vaccianated' }) : this.vaccianatedText
    this.sterilizedText !== '' ? this.filters.push({ text: this.sterilizedText, typeFilter: 'sterilized' }) : this.sterilizedText

    const deleteFiltersDuplicate = _uniqBy(this.filters, function (e) {
      return e.typeFilter;
    });

    this.filters = deleteFiltersDuplicate
   }

  @action
  deleteFilter(valueText, typeFilter) {
    let newFilter = []

    this.filters.forEach(filter => {
      if (typeFilter === filter.typeFilter) {
        this.urgent = false
        this.urgentText = ''
      }
      if (typeFilter === filter.typeFilter) {
        this.country = ''
        this.countryLabel = ''
      }
      if (typeFilter === filter.typeFilter) {
        this.city = ''
        this.cityLabel = ''
      }
      if (typeFilter === 'gender') {
        this.gender = ''
        this.genderLabel = ''
      }
      if (typeFilter === 'category') {
        this.category = ''
        this.categoryLabel = ''
      }
      if (typeFilter === 'lost') {
        this.lost = false
        this.lostText = ''
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
    })

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
      categorie: this.category,
      sterilized: this.sterilized,
      vaccianated: this.vaccianated,
    }

    this.setFilters()

    try {
      const response = await this.petsService.getPets(data)

      runInAction(() => {
        this.pets = response
        this.setLoadingFalse()

        this.isFilter = true
      })
    } catch (e) {
      runInAction(() => {
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
    this.isLoading = false
  }

// set items for search
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
  setAge(value) {
    this.categoryLabel = value.label
    this.age = value.value
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
