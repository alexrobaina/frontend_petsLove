import { observable } from 'mobx'
import InputStore from 'stores/InputStore'
import moment from 'moment';

class Pet {
  @observable state = true
  @observable lost = false
  @observable urgent = false
  @observable terms = false
  @observable isCastrated = false
  @observable adopted = false
  @observable distemperVaccine = false
  @observable felineFluVaccine = false
  @observable felineLeukemiaVaccine = false
  @observable felineInfectiousPeritonitisVaccine = false
  @observable rabiesVaccine = false
  @observable hepatitisVaccine = false
  @observable leptospirosisVaccine = false
  @observable parvovirusVaccine = false
  @observable parainfluenzaVaccine = false
  @observable bordetellaBronchisepticVaccine = false

  constructor(id, medicalHistory) {
    this._id = id
    this.name = new InputStore()
    this.image = new InputStore()
    this.category = new InputStore()
    this.gender = new InputStore()
    this.age = new InputStore()
    this.activityLevel = new InputStore()
    this.lat = new InputStore()
    this.lng = new InputStore()
    this.history = new InputStore()
    this.textAddress = new InputStore()
    this.requiredToAdoption = new InputStore()
    this.vet = new InputStore()
    this.userCreator = new InputStore()
    this.userAdopt = new InputStore()
    this.userTransit = new InputStore()
    this.lastVisitVet = new InputStore()
    this.userTransit = new InputStore()
    this.medicalHistory = medicalHistory
    this.image.setValue([])
  }

  setAddress(address) {
    this.lat.setValue(address.lat)
    this.lng.setValue(address.lng)
  }

  fillJson(pet) {
    this._id = pet._id
    this.image.setValue(pet.image)
    this.age.setValue(pet.age)
    this.lat.setValue(pet.lat)
    this.lng.setValue(pet.lng)
    this.name.setValue(pet.name)
    this.gender.setValue(pet.gender)
    this.history.setValue(pet.history)
    this.category.setValue(pet.category)
    this.activity.setValue(pet.activity)
    this.textAddress.setValue(pet.textAddress)
    this.requiredToAdoption.setValue(pet.requiredToAdoption)
    this.user.setValue(pet.user._id)
    this.state = pet.state
    this.lost = pet.lost
    this.urgent = pet.urgent
    this.adopted = pet.adopted
    this.dewormed = pet.dewormed
    this.vaccinated = pet.vaccinated
    this.sterilized = pet.sterilized
    this.medicalHistory = pet.medicalHistory

    if (pet.userAdopt) {
      this.userAdopt.setValue(pet.userAdopt.value)
    }
    if (pet.userTransit) {
      this.userTransit.setValue(pet.userTransit.value)
    }
  }

  getAddress() {
    const addressObject = {
      lat: this.pet.lat,
      lng: this.pet.lng,
    }
    return addressObject
  }

  getJson() {
    return {
      _id: this._id,
      image: this.image.value,
      age: this.age.value,
      lat: this.lat.value,
      lng: this.lng.value,
      name: this.name.value,
      gender: this.gender.value,
      history: this.history.value,
      category: this.category.value,
      activity: this.activity.value,
      textAddress: this.textAddress.value,
      requiredToAdoption: this.requiredToAdoption.value,
      user: this.user.value,
      userAdopt: this.userAdopt.value,
      userTransit: this.userTransit.value,
      medicalHistory: this.medicalHistory,
      state: this.state,
      lost: this.lost,
      urgent: this.urgent,
      adopted: this.adopted,
      dewormed: this.dewormed,
      vaccinated: this.vaccinated,
      sterilized: this.sterilized,
    }
  }
}

export default Pet
