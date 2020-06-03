import { observable } from 'mobx'
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
    return ''
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
    this.terms = user.terms
    this.canTransit = user.canTransit
  }

  getJson() {
    return {
      _id: this._id,
      image: this.image.value,
      name: this.name.value,
      rol: this.rol.value,
      email: this.email.value,
      phone: this.phone.value,
      aboutUs: this.aboutUs.value,
      lat: this.lat.value,
      lng: this.lng.value,
      username: this.username.value,
      textAddress: this.textAddress.value,
      password: this.password.value,
      requirementsToAdopt: this.requirementsToAdopt.value,
      canTransit: this.canTransit,
      state: this.state,
      terms: this.terms,
    }
  }
}

export default User
