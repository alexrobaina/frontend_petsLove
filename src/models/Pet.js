import { observable } from 'mobx'
import InputStore from 'stores/InputStore'
import MedicalInformationCat from 'models/MedicalInformationCat'
import MedicalInformationDog from 'models/MedicalInformationDog'

class Pet {
  @observable state = true
  @observable lost = false
  @observable terms = false
  @observable urgent = false
  @observable adopted = false

  constructor(id) {
    this._id = id
    this.name = new InputStore()
    this.city = new InputStore()
    this.gender = new InputStore()
    this.history = new InputStore()
    this.birthday = new InputStore()
    this.history = new InputStore()
    this.image = new InputStore([])
    this.country = new InputStore()
    this.userVet = new InputStore()
    this.textarea = new InputStore()
    this.category = new InputStore()
    this.location = new InputStore()
    this.userVetId = new InputStore()
    this.userCreator = new InputStore()
    this.userAdopter = new InputStore()
    this.userTransit = new InputStore()
    this.textAddress = new InputStore()
    this.emailUserVet = new InputStore()
    this.activityLevel = new InputStore()
    this.foundLocation = new InputStore()
    this.userCreatorId = new InputStore()
    this.userTransitId = new InputStore()
    this.userAdopterId = new InputStore()
    this.emailUserAdopter = new InputStore()
    this.emailUserCreator = new InputStore()
    this.emailUserTransit = new InputStore()

    this.medicalCat = {}
    this.medicalDog = {}

    this.userVet.setValue(null)
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
    this.lost = pet.lost
    this.state = pet.state
    this.urgent = pet.urgent
    this.adopted = pet.adopted
    this.city.setValue(pet.city)
    this.name.setValue(pet.name)
    this.image.setValue(pet.image)
    this.gender.setValue(pet.gender)
    this.country.setValue(pet.country)
    this.history.setValue(pet.history)
    this.birthday.setValue(pet.birthday)
    this.category.setValue(pet.category)
    this.location.setValue(pet.foundLocation)
    this.textAddress.setValue(pet.textAddress)
    this.userCreator.setValue(pet.userCreator)
    this.foundLocation.setValue(pet.foundLocation)
    this.activityLevel.setValue(pet.activityLevel)
    this.emailUserCreator.setValue(pet.userCreator.email)

    this.userCreatorId.setValue(pet.userCreator._id)

    if (pet.userAdopter) {
      this.userAdopter.setValue(pet.userAdopter)
      this.userAdopterId.setValue(pet.userAdopter._id)
      this.emailUserAdopter.setValue(pet.userAdopter.email)
    }

    if (pet.userVet) {
      this.userVet.setValue(pet.userVet)
      this.userVetId.setValue(pet.userVet._id)
      this.emailUserVet.setValue(pet.userVet.email)
    }

    if (pet.userTransit) {
      this.userTransit.setValue(pet.userTransit)
      this.userTransitId.setValue(pet.userTransit._id)
      this.emailUserTransit.setValue(pet.userTransit.email)
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
      lost: this.lost,
      state: this.state,
      urgent: this.urgent,
      name: this.name.value,
      city: this.city.value,
      adopted: this.adopted,
      gender: this.gender.value,
      country: this.country.value,
      history: this.history.value,
      category: this.category.value,
      birthday: this.birthday.value,
      foundLocation: this.location.value,
      textAddress: this.textAddress.value,
      userCreator: this.userCreator.value,
      activityLevel: this.activityLevel.value,
    }

    if (this.userVet.value !== '') {
      petData.userVet = this.userVet.value
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

  setCity(address) {
    address.address_components.forEach(components => {
      components.types.forEach(type => {
        if (type === 'administrative_area_level_1') {
          this.city.setValue(components.long_name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
        }
      })
    })
  }

  setCountry(address) {
    address.address_components.forEach(components => {
      components.types.forEach(type => {
        if (type === 'country') {
          this.country.setValue(
            components.long_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          )
        }
      })
    })
  }

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

  setUserVet(value) {
    this.userVet.setValue(value)
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
    console.log(value)
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

  get getCountry() {
    return this.country.value
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

  get getUserVet() {
    return this.userVet.value
  }

  get getEmailUserVet() {
    return this.emailUserVet.value
  }

  get getEmailUserAdopter() {
    return this.emailUserAdopter.value
  }

  get getEmailUserTransit() {
    return this.emailUserTransit.value
  }

  get getEmailUserCreator() {
    return this.emailUserCreator.value
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

  get getUsersId() {
    return [this.getUserCreatorId, this.getUserVetId, this.getUserAdopterId, this.getUserTransitId]
  }

  get getImagePreviews() {
    if (this.image.value === null) {
      return []
    }
    return this.image.value.filenames
  }

  get getUserCreatorName() {
    return this.userCreator.value.name
  }

  get getUserCreatorPhone() {
    return this.userCreator.value.phone
  }

  get getImageId() {
    if (this.image.value) {
      return this.image.value._id
    }
    return ''
  }
}

export default Pet
