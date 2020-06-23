import { observable } from 'mobx'
import InputStore from 'stores/InputStore'

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

  constructor(id, medicalCat) {
    this._id = id
    this.name = new InputStore()
    this.image = new InputStore()
    this.category = new InputStore()
    this.gender = new InputStore()
    this.history = new InputStore()
    this.activityLevel = new InputStore()
    this.birthday = new InputStore()
    this.history = new InputStore()
    this.foundLocation = new InputStore()
    this.textAddress = new InputStore()
    this.notes = new InputStore()
    this.vet = new InputStore()
    this.location = new InputStore()
    this.userCreator = new InputStore()
    this.userAdopter = new InputStore()
    this.userTransit = new InputStore()
    this.lastVisitVet = new InputStore()
    this.userTransit = new InputStore()
    this.medicalCat = medicalCat

    this.userCreator.setValue(null)
    this.userAdopter.setValue(null)
    this.userTransit.setValue(null)
    this.vet.setValue(null)
  }

  fillJson(pet) {
    this._id = pet._id
    this.name.setValue(pet.name)
    this.gender.setValue(pet.gender)
    this.category.setValue(pet.category)
    this.activityLevel.setValue(pet.activity)
    this.textAddress.setValue(pet.textAddress)
    this.notes.setValue(pet.notes)
    this.image.setValue(pet.image)
    this.history.setValue(pet.history)
    this.userCreator.setValue(pet.userCreator)
    this.birthday.setValue(pet.birthday)
    this.foundLocation.setValue(pet.foundLocation)
    this.location.setValue(pet.foundLocation)
    this.lastVisitVet.setValue(pet.lastVisitVet)
    this.state = pet.state
    this.lost = pet.lost
    this.urgent = pet.urgent
    this.adopted = pet.adopted

    if (pet.category === 'cat') {
      this.catMedicalHistory = pet.catMedicalHistory
    }

    if (pet.category === 'dog') {
      this.dogMedicalHistory = pet.dogMedicalHistory
    }

    if (pet.userAdopter) {
      this.userAdopter.setValue(pet.userAdopter)
    }
    if (pet.userTransit) {
      this.userTransit.setValue(pet.userTransit)
    }
  }

  setIdUserCreator(id) {
    this.userCreator.setValue(id)
  }

  catDogMedicalHistory() {
    return {
      lastVisitVet: this.lastVisitVet.value,
      distemperVaccine: this.distemperVaccine,
      rabiesVaccine: this.rabiesVaccine,
      felineFluVaccine: this.felineFluVaccine,
      felineLeukemiaVaccine: this.felineLeukemiaVaccine,
      felineInfectiousPeritonitisVaccine: this.felineInfectiousPeritonitisVaccine,
      notes: this.notes.value,
    }
  }

  dogDogMedicalHistory() {
    return {
      lastVisitVet: this.lastVisitVet.value,
      rabiesVaccine: this.rabiesVaccine,
      hepatitisVaccine: this.hepatitisVaccine,
      leptospirosisVaccine: this.leptospirosisVaccine,
      parvovirusVaccine: this.parvovirusVaccine,
      parainfluenzaVaccine: this.parainfluenzaVaccine,
      bordetellaBronchisepticVaccine: this.bordetellaBronchisepticVaccine,
      notes: this.notes.value,
    }
  }
  
  getJson() {
    const petData = {
      _id: this._id,
      name: this.name.value,
      category: this.category.value,
      lost: this.lost,
      state: this.state,
      urgent: this.urgent,
      gender: this.gender.value,
      adopted: this.adopted,
      userCreator: this.userCreator.value,
      birthday: this.birthday.value,
      activityLevel: this.activityLevel.value,
      foundLocation: this.location.value,
      history: this.history.value,
    }

    if (this.userAdopter.value !== '') {
      petData.userAdopter = this.userAdopter.value
    }

    if (this.userTransit.value !== '') {
      petData.userTransit = this.userTransit.value
    }

    if (this.category.value === 'cat') {
      petData.medicalCat = this.catDogMedicalHistory()
    }

    if (this.category.value === 'dog') {
      petData.medicalDog = this.dogDogMedicalHistory()
    }

    if (this.image.value) {
      petData.image = this.image.value
    }

    return petData
  }
}

export default Pet
