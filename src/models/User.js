import { observable, action } from 'mobx'
import InputStore from 'stores/InputStore'

const USER_TRANSIT = 'Transit pets.'
const USER_PROTECTIONIST = 'You are protectionist of pets.'
const USER_ADOPTER = 'You want adopt.'

class User {
  @observable state = true
  @observable terms = false
  @observable canTransit = false

  constructor(id) {
    this._id = id
    this.image = new InputStore()
    this.name = new InputStore()
    this.rol = new InputStore()
    this.email = new InputStore()
    this.phone = new InputStore()
    this.aboutUs = new InputStore()
    this.requirementsToAdopt = new InputStore()
    this.lat = new InputStore()
    this.lng = new InputStore()
    this.textAddress = new InputStore()
    this.username = new InputStore()
    this.password = new InputStore()
  }

  setAddress(address) {
    this.lat.setValue(address.lat)
    this.lng.setValue(address.lng)
  }

  @action
  setRole() {
    if (this.rol.value === 'transitUser') {
      return USER_TRANSIT
    }
    if (this.rol.value === 'protectionist') {
      return USER_PROTECTIONIST
    }
    if (this.rol.value === 'adopter') {
      return USER_ADOPTER
    }
    return false
  }

  fillJson(user) {
    this._id = user._id
    this.image.setValue(user.image)
    this.name.setValue(user.name)
    this.rol.setValue(user.rol)
    this.email.setValue(user.email)
    this.phone.setValue(user.phone)
    this.aboutUs.setValue(user.aboutUs)
    this.requirementsToAdopt.setValue(user.requirementsToAdopt)
    this.lat.setValue(user.lat)
    this.lng.setValue(user.lng)
    this.textAddress.setValue(user.textAddress)
    this.username.setValue(user.username)
    this.password.setValue(user.password)
    this.terms = user.terms
    this.canTransit = user.canTransit
  }

  static getJson(user) {
    return {
      _id: user._id,
      image: user.image.value,
      name: user.name.value,
      rol: user.rol.value,
      email: user.email.value,
      phone: user.phone.value,
      aboutUs: user.aboutUs.value,
      lat: user.lat.value,
      lng: user.lng.value,
      username: user.username.value,
      textAddress: user.textAddress.value,
      password: user.password.value,
      requirementsToAdopt: user.requirementsToAdopt.value,
      canTransit: user.canTransit,
      state: user.state,
      terms: user.terms,
    }
  }
}

export default User
