import { observable } from 'mobx'
import InputStore from 'stores/InputStore'

const USER_TRANSIT = 'Transit pets.'
const USER_PROTECTIONIST = 'You are protectionist of pets.'
const USER_ADOPTER = 'You want adopt.'

class User {
  @observable state = true
  @observable terms = false
  @observable canTransit = false

  constructor(id, location) {
    this._id = id
    this.location = location
    this.image = new InputStore()
    this.name = new InputStore()
    this.firstname = new InputStore()
    this.lastname = new InputStore()
    this.role = new InputStore()
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
    if (this.role.value === 'transitUser') {
      return USER_TRANSIT
    }
    if (this.role.value === 'protectionist') {
      return USER_PROTECTIONIST
    }
    if (this.role.value === 'adopter') {
      return USER_ADOPTER
    }
    return ''
  }

  fillJson(user) {
    this._id = user._id
    this.image.setValue(user.image)
    this.name.setValue(user.name)
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.role.setValue(user.role)
    this.email.setValue(user.email)
    this.phone.setValue(user.phone)
    this.aboutUs.setValue(user.aboutUs)
    this.lat.setValue(user.lat)
    this.lng.setValue(user.lng)
    this.textAddress.setValue(user.textAddress)
    this.requirementsToAdopt.setValue(user.requirementsToAdopt)
    this.username.setValue(user.username)
    this.location = user.location
    this.terms = user.terms
    this.canTransit = user.canTransit
  }

  getJson() {
    return {
      _id: this._id,
      image: this.image.value,
      name: this.name.value,
      firstname: this.firstname,
      lastname: this.lastname,
      role: this.role.value,
      email: this.email.value,
      phone: this.phone.value,
      aboutUs: this.aboutUs.value,
      lat: this.lat.value,
      lng: this.lng.value,
      username: this.username.value,
      textAddress: this.textAddress.value,
      location: this.location,
      password: this.password.value,
      requirementsToAdopt: this.requirementsToAdopt.value,
      canTransit: this.canTransit,
      state: this.state,
      terms: this.terms,
    }
  }
}

export default User
