import { observable } from 'mobx'
import InputStore from 'stores/InputStore'

const POSITION_DEFAULT = {
  lat: -34.603722,
  lng: -58.381592,
}

class RegisterUser {
  @observable terms = true

  constructor() {
    this.email = new InputStore()
    this.password = new InputStore()
    this.role = new InputStore()
    this.username = new InputStore()
    this.firstname = new InputStore()
    this.lastname = new InputStore()
    this.phone = new InputStore()
  }

  getJson() {
    return {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
      location: this.setLocationFormat(),
      username: this.username.value,
      phone: this.phone.value,
      terms: this.terms,
    }
  }

  // ============================================
  // Setters
  // ============================================

  setLocationFormat() {
    if (this.location) {
      return this.location.value
    }
    return POSITION_DEFAULT
  }
}

export default RegisterUser
