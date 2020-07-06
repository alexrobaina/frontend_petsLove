import { observable } from 'mobx'
import InputStore from 'stores/InputStore'
import MedicalInformationCat from 'models/MedicalInformationCat'
import MedicalInformationDog from 'models/MedicalInformationDog'

class Pet {
  @observable state = true
  @observable lost = false
  @observable urgent = false
  @observable terms = false
  @observable adopted = false

  constructor(id) {
    this._id = id
    this.name = new InputStore()
    this.image = new InputStore([])
    this.category = new InputStore()
    this.gender = new InputStore()
    this.history = new InputStore()
    this.activityLevel = new InputStore()
    this.birthday = new InputStore()
    this.history = new InputStore()
    this.textarea = new InputStore()
    this.foundLocation = new InputStore()
    this.textAddress = new InputStore()
    this.location = new InputStore()
    this.userCreator = new InputStore()
    this.userAdopter = new InputStore()
    this.userTransit = new InputStore()
    this.userCreatorId = new InputStore()
    this.medicalCat = {}
    this.medicalDog = {}

    this.userCreator.setValue(null)
    this.userAdopter.setValue(null)
    this.userTransit.setValue(null)

    this.userAdopterId = new InputStore()
    this.userTransitId = new InputStore()

    this.medicalInformationCat = new MedicalInformationCat()
    this.medicalInformationDog = new MedicalInformationDog()
  }

  fillJson(pet) {
    this._id = pet._id
    this.name.setValue(pet.name)
    this.gender.setValue(pet.gender)
    this.category.setValue(pet.category)
    this.activityLevel.setValue(pet.activityLevel)
    this.textAddress.setValue(pet.textAddress)
    this.image.setValue(pet.image)
    this.history.setValue(pet.history)
    this.userCreator.setValue(pet.userCreator)
    this.birthday.setValue(pet.birthday)
    this.foundLocation.setValue(pet.foundLocation)
    this.location.setValue(pet.foundLocation)
    this.state = pet.state
    this.lost = pet.lost
    this.urgent = pet.urgent
    this.adopted = pet.adopted

    this.userCreatorId.setValue(pet.userCreator._id)

    if (pet.userAdopter) {
      this.userAdopterId.setValue(pet.userAdopter._id)
    }

    if (pet.userTransit) {
      this.userTransitId.setValue(pet.userTransit._id)
    }

    if (pet.category === 'cat') {
      this.medicalCat = this.medicalInformationCat.fillJson(pet.catMedicalHistory)
    }

    if (pet.category === 'dog') {
      this.medicalDog = this.medicalInformationDog.fillJson(pet.dogMedicalHistory)
    }

    if (pet.userAdopter) {
      this.userAdopter.setValue(pet.userAdopter)
    }
    if (pet.userTransit) {
      this.userTransit.setValue(pet.userTransit)
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
      textAddress: this.textAddress.value,
      history: this.history.value,
    }

    if (this.userAdopter.value !== '') {
      petData.userAdopter = this.userAdopter.value
    }

    if (this.userTransit.value !== '') {
      petData.userTransit = this.userTransit.value
    }

    if (this.category.value === 'cat') {
      petData.medicalCat = this.medicalInformationCat.getJson()
    }

    if (this.category.value === 'dog') {
      petData.medicalDog = this.medicalInformationDog.getJson()
    }

    if (this.image.value) {
      petData.image = this.image.value
    }

    return petData
  }

  // ============================================
  // Setters
  // ============================================

  setFoundLocation(value) {
    this.foundLocation.setValue(value)
  }

  setLocation(value) {
    this.location.setValue(value)
  }

  setTextAddress(value) {
    this.textAddress.setValue(value)
  }

  setIdUserCreator(id) {
    this.userCreator.setValue(id)
  }

  setName(value) {
    this.name.setValue(value)
  }

  setCategoty(value) {
    this.category.setValue(value)
  }

  setLost() {
    this.lost = !this.lost
  }

  setUrgent() {
    this.urgent = !this.urgent
  }

  setGender(value) {
    this.gender.setValue(value)
  }

  setAdopted() {
    this.adopted = !this.adopted
  }

  setUserCreator(value) {
    this.userCreator.setValue(value)
  }

  setBirthday(value) {
    this.birthday.setValue(value)
  }

  setUserAdopter(value) {
    this.userAdopter.setValue(value)
  }

  setUserTransit(value) {
    this.userTransit.setValue(value)
  }

  setUserAdopterId(value) {
    this.userAdopterId.setValue(value)
  }

  setUserTransitId(value) {
    this.userTransitId.setValue(value)
  }

  setActivityLevel(value) {
    this.activityLevel.setValue(value)
  }

  setNotes(value) {
    if (this.category === 'cat') {
      this.medicalInformationCat.setNotes(value)
    }
    if (this.category === 'dog') {
      this.medicalInformationDog.setNotes(value)
    }
  }

  setHistory(value) {
    this.history.setValue(value)
  }

  setLastVisitVet(value) {
    if (this.category.value === 'cat') {
      this.medicalInformationCat.setLastVisitVet(value)
    }
    if (this.category.value === 'dog') {
      this.medicalInformationDog.setLastVisitVet(value)
    }
  }

  // ============================================
  // Getters
  // ============================================

  get getRabiesVaccine() {
    if (this.category.value === 'cat') {
      return this.medicalInformationCat.getLastVisitVet
    }
    if (this.category.value === 'dog') {
      return this.medicalInformationDog.getRabiesVaccine
    }
    return false
  }

  get idUserCreator() {
    return this.userCreator.value
  }

  get getName() {
    return this.name.value
  }

  get getCategory() {
    return this.category.value
  }

  get getLost() {
    return this.lost
  }

  get getUrgent() {
    return this.urgent
  }

  get getGender() {
    return this.gender.value
  }

  get getAdopted() {
    return this.adopted
  }

  get getUserCreator() {
    return this.userCreator.value
  }

  get getUserAdopter() {
    return this.idUserAdopter
  }

  get getUserAdopterId() {
    return this.userAdopterId.value
  }

  get getUserTransit() {
    return this.userTransit.value
  }

  get getUserTransitId() {
    return this.userTransitId.value
  }

  get getBirthday() {
    return this.birthday.value
  }

  get getActivityLevel() {
    return this.activityLevel.value
  }

  get getFoundLocation() {
    return this.foundLocation.value
  }

  get getTextAddress() {
    return this.textAddress.value
  }

  get getHistory() {
    return this.history.value
  }

  get getUserCreatorId() {
    return this.userCreatorId.value
  }

  get getImagePreviews() {
    return this.image.value.filenames
  }

  get getUserCreatorName() {
    return this.userCreator.value.name
  }

  get getUserCreatorPhone() {
    return this.userCreator.value.phone
  }

  get getImageId() {
    return this.image.value._id
  }
}

export default Pet
