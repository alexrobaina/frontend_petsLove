import { observable } from 'mobx'
import InputStore from 'stores/InputStore'
import moment from 'moment'

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
    this.history = new InputStore()
    this.activityLevel = new InputStore()
    this.lat = new InputStore()
    this.lng = new InputStore()
    this.history = new InputStore()
    this.textAddress = new InputStore()
    this.notes = new InputStore()
    this.vet = new InputStore()
    this.userCreator = new InputStore()
    this.userAdopter = new InputStore()
    this.userTransit = new InputStore()
    this.lastVisitVet = new InputStore()
    this.userTransit = new InputStore()
    this.medicalHistory = medicalHistory
    this.image.setValue([])
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
    this.category.setValue(pet.category)
    this.activityLevel.setValue(pet.activity)
    this.textAddress.setValue(pet.textAddress)
    this.notes.setValue(pet.notes)
    this.history.setValue(pet.history)
    this.userCreator.setValue(pet.userCreator._id)
    this.userAdopter.setValue(pet.userAdopter._id)
    this.lastVisitVet.setValue(pet.lastVisitVet._id)
    this.userTransit.setValue(pet.userTransit._id)
    this.state = pet.state
    this.lost = pet.lost
    this.urgent = pet.urgent
    this.adopted = pet.adopted
    this.medicalHistory = pet.medicalHistory
    this.distemperVaccine = pet.distemperVaccine
    this.felineFluVaccine = pet.felineFluVaccine
    this.felineLeukemiaVaccine = pet.felineLeukemiaVaccine
    this.felineInfectiousPeritonitisVaccine = pet.felineInfectiousPeritonitisVaccine
    this.rabiesVaccine = pet.rabiesVaccine
    this.hepatitisVaccine = pet.hepatitisVaccine
    this.leptospirosisVaccine = pet.leptospirosisVaccine
    this.parvovirusVaccine = pet.parvovirusVaccine
    this.parainfluenzaVaccine = pet.parainfluenzaVaccine
    this.bordetellaBronchisepticVaccine = pet.bordetellaBronchisepticVaccine

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
      name: this.name.value,
      category: this.category.value,
      gender: this.gender.value,
      age: this.age.value,
      activityLevel: this.activityLevel.value,
      lost: this.lost,
      image: this.image.value,
      lat: this.lat.value,
      lng: this.lng.value,
      history: this.history.value,
      lastVisitVet: this.lastVisitVet.value,
      textAddress: this.textAddress.value,
      userCreator: this.userCreator.value,
      userAdopter: this.userAdopter.value,
      userTransit: this.userTransit.value,
      medicalHistory: this.medicalHistory,
      state: this.state,
      notes: this.notes.value,
      urgent: this.urgent,
      adopted: this.adopted,
      distemperVaccine: this.distemperVaccine,
      felineFluVaccine: this.felineFluVaccine,
      felineLeukemiaVaccine: this.felineLeukemiaVaccine,
      felineInfectiousPeritonitisVaccine: this.felineInfectiousPeritonitisVaccine,
      rabiesVaccine: this.rabiesVaccine,
      hepatitisVaccine: this.hepatitisVaccine,
      leptospirosisVaccine: this.leptospirosisVaccine,
      parvovirusVaccine: this.parvovirusVaccine,
      parainfluenzaVaccine: this.parainfluenzaVaccine,
      bordetellaBronchisepticVaccine: this.bordetellaBronchisepticVaccine,
    }
  }
}

export default Pet
